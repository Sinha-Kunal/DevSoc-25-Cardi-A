# CardiA: Wearable Health Monitor

## Hardware Specifications

| Component | Specification | Details |
|-----------|--------------|---------|
| Microcontroller | ESP32-WROOM-32D | - 240 MHz dual-core processor<br>- 520 KB SRAM<br>- Built-in WiFi/BLE |
| Motion Sensor | MPU6050 | - ±2g to ±16g accelerometer range<br>- ±250°/s to ±2000°/s gyroscope range<br>- 16-bit ADC<br>- I2C interface |
| Heart Rate Sensor | MAX30102 | - -40°C to +85°C operating range<br>- 600nm to 900nm spectral range<br>- I2C interface<br>- 14-bit ADC resolution |
| Temperature Sensor | MLX90614 | - -70°C to 380°C measurement range<br>- Medical accuracy: ±0.2°C<br>- I2C interface<br>- 17-bit ADC resolution |
| Storage | microSD Module | - Up to 32GB capacity<br>- SPI interface<br>- FAT32 file system |
| Power Supply | LiPo Battery | - 3.7V, 2000mAh<br>- JST-PH connector<br>- Integrated charging circuit |
| PCB | 4-layer FR4 | - 1.6mm thickness<br>- ENIG surface finish<br>- Size: 40mm x 30mm |

## I2C Address Configuration
- MPU6050: 0x68
- MAX30102: 0x57
- MLX90614: 0x5A

## Power Requirements
- Operating Voltage: 3.3V
- Peak Current: 150mA
- Sleep Current: <1mA
- Battery Life: ~48 hours

## Pinout
| Pin | Function |
|-----|----------|
| 21 | I2C SDA |
| 22 | I2C SCL |
| 5 | SD CS |
| 18 | SD SCK |
| 19 | SD MISO |
| 23 | SD MOSI |
