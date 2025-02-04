#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

// MPU6050 setup
Adafruit_MPU6050 mpu;

// MAX30105 setup
MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255

#if defined(_AVR_ATmega328P) || defined(AVR_ATmega168_)
uint16_t irBuffer[100]; // infrared LED sensor data
uint16_t redBuffer[100];  // red LED sensor data
#else
uint32_t irBuffer[100]; // infrared LED sensor data
uint32_t redBuffer[100];  // red LED sensor data
#endif

int32_t bufferLength; // data length
int32_t spo2; // SPO2 value
int8_t validSPO2; // indicator to show if the SPO2 calculation is valid
int32_t heartRate; // heart rate value
int8_t validHeartRate; // indicator to show if the heart rate calculation is valid

// Buzzer and button setup
const int buzzerPin = 12; // Pin for the buzzer
const int buttonPin = 14; // Pin for the button
bool timerActive = false;
unsigned long countdownStart;
const unsigned long countdownDuration = 10000; // 10 seconds

void setup() {
  Serial.begin(115200); // initialize serial communication at 115200 bits per second:

  // Initialize MPU6050
  if (!mpu.begin()) {
    while (1) {
      delay(10);
    }
  }

  // Initialize MAX30105
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    while (1);
  }

  // Configure the MAX30105 sensor
  byte ledBrightness = 60; // Options: 0=Off to 255=50mA
  byte sampleAverage = 4; // Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; // Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte sampleRate = 100; // Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; // Options: 69, 118, 215, 411
  int adcRange = 4096; // Options: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); // Configure sensor with these settings

  // Setup buzzer and button
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP); // Use internal pull-up resistor
}

void loop() {
  // Get accelerometer and gyroscope readings
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Read heart rate and SPO2
  bufferLength = 100; // buffer length of 100 stores 4 seconds of samples running at 25sps

  // Read the first 100 samples
  for (byte i = 0; i < bufferLength; i++) {
    while (particleSensor.available() == false) // do we have new data?
      particleSensor.check(); // Check the sensor for new data

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); // We're finished with this sample so move to next sample
  }

  // Calculate heart rate and SpO2 after first 100 samples
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

  // Print values without spaces
  Serial.print(g.gyro.x);
  Serial.print(",");
  Serial.print(g.gyro.y);
  Serial.print(",");
  Serial.print(g.gyro.z);
  Serial.print(",");
  Serial.print(a.acceleration.x);
  Serial.print(",");
  Serial.print(a.acceleration.y);
  Serial.print(",");
  Serial.print(a.acceleration.z);
  Serial.print(",");
  Serial.print(heartRate);
  Serial.print(",");
  Serial.print(spo2);
  
  // Check IR value and manage buzzer and countdown
  if (irBuffer[bufferLength - 1] < 50000) {
    if (!timerActive) {
      timerActive = true;
      countdownStart = millis();
    }
  }

  // Handle countdown
  if (timerActive) {
    unsigned long elapsedTime = millis() - countdownStart;
    if (elapsedTime < countdownDuration) {
      // Sound the buzzer
      digitalWrite(buzzerPin, HIGH);
      delay(100); // Buzzer on for 100 ms
      digitalWrite(buzzerPin, LOW);
      delay(100); // Buzzer off for 100 ms

      // Check if button is pressed to cancel the timer
      if (digitalRead(buttonPin) == LOW) {
        timerActive = false; // Cancel the timer
      }
    } else {
      // Timer finished
      Serial.print(",1"); // Print 1 if timer runs out
      timerActive = false; // Reset timer
    }
  } else {
    Serial.print(",0"); // Print 0 if timer is not active
  }

  Serial.println(); // New line for the next set of values
  delay(1000); // Delay before the next loop iteration
}