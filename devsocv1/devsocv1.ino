#include <Wire.h>
#include <MPU6050.h>
#include <MAX30105.h>
#include <SD.h>
#include <WiFi.h>
#include <SPI.h>

// Constants
#define MPU6050_ADDRESS 0x68
#define MAX30102_ADDRESS_1 0x57
#define MAX30102_ADDRESS_2 0x58
#define MAX30102_ADDRESS_3 0x59
#define SD_CS_PIN 10
#define BUZZER_PIN 9

// Variables
MPU6050 mpu;
MAX30105 heartRateSensor1, heartRateSensor2, heartRateSensor3;
File dataFile;
volatile bool fallDetected = false;
volatile bool alertTriggered = false;
int sensitivity = 5; // Configurable sensitivity for fall detection

// Function Prototypes
void setupSensors();
void readSensors();
void detectFall(int16_t ax, int16_t ay, int16_t az);
void sendAlert();
void logData(int16_t ax, int16_t ay, int16_t az, float heartRate1, 
            float spo2_1, float heartRate2, float spo2_2, float heartRate3, 
            float spo2_3);
void calibrateSensors();
void setupWiFi();
void setupSDCard();
void buzzerAlert();
void interruptHandler();

void setup() {
    Serial.begin(115200);
    pinMode(BUZZER_PIN, OUTPUT);
    
    setupWiFi();
    setupSDCard();
    setupSensors();
    
    // Attach interrupt for fall detection
    attachInterrupt(digitalPinToInterrupt(MPU6050_ADDRESS), interruptHandler, RISING);
}

void loop() {
    readSensors();
    delay(100); // Adjust delay for power efficiency
}

void setupSensors() {
    Wire.begin();
    mpu.initialize();
    heartRateSensor1.begin(MAX30102_ADDRESS_1);
    heartRateSensor2.begin(MAX30102_ADDRESS_2);
    heartRateSensor3.begin(MAX30102_ADDRESS_3);
    
    calibrateSensors();
}

void readSensors() {
    // Read MPU6050 data
    int16_t ax, ay, az, gx, gy, gz;
    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    
    // Read heart rate and SpO2 from each MAX30102
    float heartRate1, spo2_1;
    heartRateSensor1.getHeartRateAndSpO2(&heartRate1, &spo2_1);
    
    float heartRate2, spo2_2;
    heartRateSensor2.getHeartRateAndSpO2(&heartRate2, &spo2_2);
    
    float heartRate3, spo2_3;
    heartRateSensor3.getHeartRateAndSpO2(&heartRate3, &spo2_3);
    
    detectFall(ax, ay, az);
    logData(ax, ay, az, heartRate1, spo2_1, heartRate2, spo2_2, heartRate3, spo2_3);
}

void detectFall(int16_t ax, int16_t ay, int16_t az) {
    // Simple fall detection algorithm based on accelerometer data
    // Example logic: if acceleration in the Z-axis is below a threshold
    if (az < sensitivity) {
        fallDetected = true;
    } else {
        fallDetected = false;
    }

    if (fallDetected && !alertTriggered) {
        sendAlert();
        alertTriggered = true;
    }
}

void sendAlert() {
    buzzerAlert();
    // Implement WiFi alert (e.g., send HTTP request)
    Serial.println("Fall detected! Sending alert...");
}

void logData(int16_t ax, int16_t ay, int16_t az, float heartRate1, float spo2_1, float heartRate2, float spo2_2, float heartRate3, float spo2_3) {
    // Log data to SD card
    if (dataFile) {
        dataFile.print("AX: "); dataFile.print(ax);
        dataFile.print(", AY: "); dataFile.print(ay);
        dataFile.print(", AZ: "); dataFile.print(az);
        dataFile.print(", HR1: "); dataFile.print(heartRate1);
        dataFile.print(", SpO2_1: "); dataFile.print(spo2_1);
        dataFile.print(", HR2: "); dataFile.print(heartRate2);
        dataFile .print(", SpO2_2: "); dataFile.print(spo2_2);
        dataFile.print(", HR3: "); dataFile.print(heartRate3);
        dataFile.print(", SpO2_3: "); dataFile.println(spo2_3);
        dataFile.flush();
    }
}

void calibrateSensors() {
    // Implement sensor calibration logic
    Serial.println("Calibrating sensors...");
}

void setupWiFi() {
    // Connect to WiFi
    WiFi.begin("SSID", "PASSWORD");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void setupSDCard() {
    if (!SD.begin(SD_CS_PIN)) {
        Serial.println("SD Card initialization failed!");
        return;
    }
    dataFile = SD.open("datalog.txt", FILE_WRITE);
    if (!dataFile) {
        Serial.println("Failed to open file for writing");
    }
}

void buzzerAlert() {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(1000); // Buzzer on for 1 second
    digitalWrite(BUZZER_PIN, LOW);
}

void interruptHandler() {
    // Handle interrupt for fall detection
    fallDetected = true; // Set fallDetected to true when interrupt occurs
} 