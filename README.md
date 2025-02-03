# CardiA: Intelligent Wearable Health Monitoring System

## Overview
CardiA is an advanced wearable device designed for comprehensive health and safety monitoring, targeting industrial safety and healthcare applications.

## Hardware Specifications

### Core Components
- **Microcontroller**: ESP32 or equivalent
- **Motion Sensor**: MPU6050 6-axis Accelerometer
- **Pulse Oximetry**: 3x MAX30102 Optical Heart Rate and SpO2 Sensors
- **Storage**: SD Card Module
- **Connectivity**: WiFi, Bluetooth Low Energy
- **Alert Mechanism**: Piezo Buzzer

### Technical Specifications
- **Power Supply**: 3.7V Lithium Polymer Battery
- **Battery Life**: Up to 72 hours continuous monitoring
- **Data Logging**: Real-time sensor data logging
- **Sampling Rate**: 
  - Accelerometer: 100 Hz
  - Heart Rate: 20 Hz
  - SpO2: 20 Hz
- **Memory**: 4GB SD Card (expandable)
- **Dimensions**: 45mm x 35mm x 10mm
- **Weight**: Under 50 grams

## Key Features
- Real-time fall detection
- Continuous heart rate monitoring
- Blood oxygen saturation tracking
- Emergency alert system
- Cloud-based data analytics
- Low-power consumption design

## Use Cases
- Industrial worker safety
- Elderly care monitoring
- Remote patient tracking
- Athletic performance monitoring

## Installation & Setup
1. Connect sensors to designated I2C/SPI pins
2. Configure WiFi credentials
3. Insert formatted SD card
4. Power on and calibrate
