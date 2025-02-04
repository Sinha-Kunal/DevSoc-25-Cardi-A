import serial
import time
import requests
import datetime

# Initialize Firebase
FIREBASE_DATABASE_URL = ""
DATABASE_SECRET = ""

# Initialize Sinch
now = datetime.datetime.now()
key = ""
secret = ""
from_number = ""
to = ""
locale = "en-US"
url = "" 

accel_values = []
gyro_values = []
bpm_values = []
spo2_values = []

def array_to_json(data_array):
    """
    Convert an array to a structured JSON object.
    
    :param data_array: List of values in the order [gyro_x, gyro_y, gyro_z, acc_x, acc_y, acc_z, bpm, spo2, sos]
    :return: JSON object with structured keys
    """

    json_data = {
        "bpm": data_array[6],
        "spo2": data_array[7],
        "sos": data_array[8]
    }
    
    return json_data

# Send data to Firebase Realtime Database
def send_to_rtdbms(data):
    """
    Send data to Firebase Realtime Database using the Database Secret.
    :param data: Dictionary containing the data to send.
    """
    # Construct the full URL with the database secret
    url = f"{FIREBASE_DATABASE_URL}/sensor_data.json?auth={DATABASE_SECRET}"
    
    # Send a POST request to add data
    response = requests.post(url, json=array_to_json(data))
    
    # Check if the request was successful
    if response.status_code == 200:
        print("Data sent successfully!")
    else:
        print(f"Failed to send data: {response.text}")


def process_serial_input(line):
    data = [float(i) for i in line.split(",")]
    return data

def heart_rate_detection(arr):
    if len(arr) < 2:
        return False
    zero_to_nonzero = False
    nonzero_to_zero = False
    for i in range(len(arr) - 1):
        current = arr[i]
        next_num = arr[i + 1]
        if current == 0 and next_num != 0:
            zero_to_nonzero = True
        elif current != 0 and next_num == 0:
            nonzero_to_zero = True
    return (zero_to_nonzero and nonzero_to_zero)

def fall_detection(accel_values, gyro_values, threshold_magnitude=2.5, threshold_angle=45, window_size=10):
    if len(accel_values) != len(gyro_values):
        raise ValueError("Acceleration and gyroscope data must have same length")
    if len(accel_values) < window_size:
        return False
    
    def calculate_magnitude(vector):
        """Calculate vector magnitude"""
        return np.sqrt(sum(x**2 for x in vector))
    
    def calculate_orientation_change(prev_vector, curr_vector):
        """Calculate angle between two vectors"""
        dot_product = sum(p*c for p, c in zip(prev_vector, curr_vector))
        magnitude_product = np.sqrt(sum(p**2 for p in prev_vector)) * \
                            np.sqrt(sum(c**2 for c in curr_vector))
        
        # Prevent division by zero
        if magnitude_product == 0:
            return 0
        
        cos_angle = dot_product / magnitude_product
        angle = np.degrees(np.arccos(np.clip(cos_angle, -1, 1)))
        return angle
    
    # Analyze the last window of data
    for i in range(len(accel_values) - window_size + 1):
        window_accel = accel_values[i:i+window_size]
        window_gyro = gyro_values[i:i+window_size]
        
        # Check acceleration magnitudes
        max_accel_magnitude = max(calculate_magnitude(vec) for vec in window_accel)
        
        # Check rotation rates
        max_rotation_change = max(
            calculate_orientation_change(window_accel[j], window_accel[j+1])
            for j in range(len(window_accel) - 1)
        )
        
        # Fall detection logic
        if (max_accel_magnitude > threshold_magnitude and 
            max_rotation_change > threshold_angle):
            return True
    
    return False

def call():


    payload = {
    "method": "ttsCallout",
    "ttsCallout": {
        "cli": from_number,
        "destination": {
        "type": "number",
        "endpoint": to
        },
        "locale": locale,
        "text": f"CRITICAL ALERT - POTENTIAL FATALITY DETECTED Location: Anna Audi Time of Detection: {now.date()}  First Responders Informed END ALERT"
    }
    }

    headers = {"Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers, auth=(key, secret))

    data = response.json()
    print(data)


def read_serial_port(port='COM1', baud_rate=9600, timeout=1):

    try:
        # Configure and open serial port
        ser = serial.Serial(
            port=port,
            baudrate=baud_rate,
            timeout=timeout,
            bytesize=serial.EIGHTBITS,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE
        )
        
        print(f"Connected to {port}")
        
        # Main reading loop
        while True:
            try:
                # Check if data is available to read
                if ser.in_waiting > 0:
                    # Read line of data
                    line = ser.readline().decode('utf-8').strip()
                    print(f"Received: {line}")
                    
                    data = process_serial_input(line)
                    
                    gyro_values.append(data[:3])
                    accel_values.append(data[3:6])
                    bpm_values.append(data[6])
                    spo2_values.append(data[7])
                    sos = data[-1]
                    
                    fall_detected = fall_detection(accel_values, gyro_values)
                    heart_rate_detected = heart_rate_detection(bpm_values)
                    
                    send_to_rtdbms(data)

                    if (fall_detected or heart_rate_detected)and sos:
                        call()
                    
                # Small delay to prevent CPU overload
                time.sleep(0.1)
                
            except KeyboardInterrupt:
                print("\nReading stopped by user")
                break
            except Exception as e:
                print(f"Error reading data: {e}")
                break
                
    except serial.SerialException as e:
        print(f"Error opening serial port: {e}")
    
    finally:
        # Clean up and close port
        if 'ser' in locals() and ser.is_open:
            ser.close()
            print("Serial port closed")


read_serial_port(port='COM8', baud_rate=115200)