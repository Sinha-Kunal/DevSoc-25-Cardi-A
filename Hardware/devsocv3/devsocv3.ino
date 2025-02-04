#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_MLX90614.h>
#include "MAX30105.h"

// Create sensor objects
Adafruit_MPU6050 mpu;
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
MAX30105 particleSensor;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  // Initialize MPU6050
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");

  // Initialize MLX90614
  if (!mlx.begin()) {
    Serial.println("Error connecting to MLX sensor. Check wiring.");
    while (1);
  }
  Serial.print("Emissivity = "); Serial.println(mlx.readEmissivity());
  Serial.println("================================================");

  // Initialize MAX30105
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    while (1);
  }

  // Setup MAX30105
  byte ledBrightness = 60; // Options: 0=Off to 255=50mA
  byte sampleAverage = 4; // Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; // Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte sampleRate = 100; // Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; // Options: 69, 118, 215, 411
  int adcRange = 4096; // Options: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); // Configure sensor with these settings
}

void loop() {
  // Get accelerometer readings
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Read temperature from MLX90614
  float temperature = mlx.readObjectTempC(); // Read object temperature in Celsius

  // Read IR and Red values from MAX30105
  uint32_t irValue = particleSensor.getIR(); // Get IR value
  uint32_t redValue = particleSensor.getRed(); // Get Red value

  // Print the values to the Serial Monitor
  Serial.print("temp: "); Serial.print(temperature); 
  Serial.print(" accx: "); Serial.print(a.acceleration.x);
  Serial.print(" accy: "); Serial.print(a.acceleration.y);
  Serial.print(" accz: "); Serial.print(a.acceleration.z);
  Serial.print(" irval: "); Serial.print(irValue);
  Serial.print(" redval: "); Serial.println(redValue);
  delay(1000); // Delay for readability
}