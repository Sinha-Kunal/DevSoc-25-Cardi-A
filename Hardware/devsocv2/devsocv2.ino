#include <Wire.h>
#include "MAX30105.h"
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_MLX90614.h>

MAX30105 pulseOx;
Adafruit_MPU6050 mpu;
Adafruit_MLX90614 tempSensor;

// Configuration
const float ACCEL_THRESHOLD = 2.0;
const unsigned long FALL_WINDOW = 500;
const float BASE_HEART_RATE = 70.0;
const float BASE_TEMP = 37.0;

// Variables
long lastBeat = 0;
float beatsPerMinute = 0;
bool customBeatDetected = false;  // Renamed flag

void setup() {
  Serial.begin(115200);
  Wire.begin();
  

  pulseOx.setup();

  if (!mpu.begin()) {
    Serial.println("MPU6050 error!");
    while(1);
  }
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);

  if (!tempSensor.begin()) {
    Serial.println("MLX90614 error!");
    while(1);
  }
  if (!pulseOx.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30105 error!");
    while(1);
  }*/
}

void loop() {
  detectFall();
  monitorStress();
  delay(100);
}

void detectFall() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  
  float totalAccel = sqrt(
    pow(a.acceleration.x, 2) + 
    pow(a.acceleration.y, 2) + 
    pow(a.acceleration.z, 2)
  );

  if (totalAccel > ACCEL_THRESHOLD) {
    Serial.println("Fall detected!");
  }
}

// Renamed function
bool customCheckForBeat(long sensorValue) {
  static long lastValue = 0;
  static unsigned long lastBeatTime = 0;
  const long BEAT_THRESHOLD = 10000;

  long delta = sensorValue - lastValue;
  lastValue = sensorValue;

  if (delta > BEAT_THRESHOLD && !customBeatDetected) {
    customBeatDetected = true;
    lastBeatTime = millis();
    return true;
  }

  if (customBeatDetected && (millis() - lastBeatTime > 100)) {
    customBeatDetected = false;
  }

  return false;
}

void monitorStress() {
  long irValue = pulseOx.getIR();
  
  // Use renamed function
  if (customCheckForBeat(irValue)) {
    long delta = millis() - lastBeat;
    lastBeat = millis();
    
    if (delta > 0) {
      beatsPerMinute = 60.0 / (delta / 1000.0);
    }
  }

  float bodyTemp = tempSensor.readObjectTempC();

  if (beatsPerMinute > 30 && beatsPerMinute < 200) {
    float hrDeviation = abs(beatsPerMinute - BASE_HEART_RATE);
    float tempDeviation = abs(bodyTemp - BASE_TEMP);
    
    int stressLevel = (hrDeviation * 2) + (tempDeviation * 5);

    if (stressLevel > 10) {
      Serial.print("Stress Alert! HR: ");
      Serial.print(beatsPerMinute);
      Serial.print(" BPM, Temp: ");
      Serial.print(bodyTemp);
      Serial.print("°C, Level: ");
      Serial.println(stressLevel);
    }
  }
}