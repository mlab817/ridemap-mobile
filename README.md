# RIDEMAP: Passenger Count through QR Code Scanning

## Description

This mobile app allows registered smartphones to collect data on the number of passengers through multiple modes.
The app has four modes: QR Code, Face Detector, Manual Counter, and Kiosk.

## Requirements

1. [Free Expo account](https://expo.dev/signup)
2. Laravel for backend development
3. React Native and Expo for mobile app development
4. Smartphones with camera

The Laravel backend for the Ridemap already supports this app. The
endpoint for submission of face detection is `/api/qrs`. The backend
accepts an array of `faces` with the following attributes: `qr_code`,
`station_id`, and `scanned_at`. `user_id` is extracted from a token
used to authenticate the device.

__Important__: Do not forget to update the api configuration in the
`utils.js` file to point to the url of the API of the backend. Specifically,
this line:

```
export const api = axios.create({
   baseURL: 'https://ridemap-php.herokuapp.com/api'
})
```

## Getting Started

Install the necessary tools:

1. Any IDE (Webstorm is preferred but you can also use Atom and VS Code)
2. Install Nodejs
3. Install Expo
4. Install Expo Go in IOS/Android
5. Install Git

Follow the steps below to get set up:

1. Clone this repository

```console
git clone https://github.com/mlab817/ridemap-mobile.git
```

2. Change directory to ridemap-counter

```console
cd ridemap-mobile
```

3. Install dependencies


```console
npm install
```

4. Update the API endpoint in utils.js file

```javascript
export const api = axios.create({
   baseURL: 'https://ridemap-php.herokuapp.com/api'
})
```

5. Start expo dev server


```console
expo start
```

Or

```console
expo r -c
```

The second command is used when you cannot connect your device to the webserver. 

Follow the instructions in the CLI message to connect your simulator or physical device.

## Building and Distributing the App

To build the app, install the Expo Application Services.

1. Create a free account in [Expo](https://expo.dev).
2. Install eas-cli to use eas in command prompt and/or terminal.

```console
npm i -g eas-cli
```

3. From the root directory, run:

```console
eas build
```

You can control the build configuration by editing the `eas.json` file. Open this [link](https://docs.expo.dev/build/eas-json/) for more information

Follow the on-screen instructions. You will find the android/ios bundles in your Expo account under Build menu, e.g. https://expo.dev/accounts/{accountName}/projects/ridemap-counter/builds. You may also integrate submission to Play Store
and App Store.

> Note: Unfortunately, to build IOS applications, you will need to apply and register to Apple Developer Program which 
> costs $99 yearly. Android build is free and can be downloaded for distribution.

## Workflow

### Device Authentication

To use this app, devices must be registered in the server. To do
this, follow the instructions below:

1. Download the app
2. Open the app to connect to the server for the first time
3. The app will show an invalid device message along with the device ID.
Use this device ID to register the device in the server.

`
Note: The device ID does not refer to the actual device ID of the
device but rather the device ID of the app tied to the server. This
is unique for every app that is installed in the device.`

Read more here: [Android](https://docs.expo.dev/versions/v45.0.0/sdk/application/#applicationandroidid)
and [iOS](https://docs.expo.dev/versions/v45.0.0/sdk/application/#applicationgetiosidforvendorasync)

### Using the App

1. Open app
2. Device connects to server
3. Server verifies that device is registered
   1. If device is not registered, display invalid device message along with the device ID. Note that the device ID is not the actual device ID but rather the ID of the device tied with the app.
   2. If device is registered, proceed
4. Prompt user to select station where it is located
5. Put the smartphone in the best position to start scanning faces 
6. Start scanning

The app will send data for every batch of faces detected.

## Table Structure

### - users

Stores data of users of the system

| Attribute | Type      | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | int autoincrement  | Primary key of the table |
| name      | varchar   | Name of the user                 |
| email     | varchar   | Email of the user               |
| email_verified_at     | timestamp   | Timestamp when the user validated their email              |
| password  | varchar   | Hashed password of the user     |
| device_id | varchar   | Device ID of the user               | |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

### - stations

Stores data of stations in EDSA Busway

| Attribute | Type               | Description              |
|-----------|--------------------|--------------------------|
| id        | int autoincrement  | Primary key of the table |
| name      | varchar            | Name of the station      |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

### - passenger_qrs (QR Code)

Stores data on scanned QR codes

| Attribute | Type      | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | int autoincrement | Primary key of the table                 |
| station_id| int       | Foreign key referencing stations table                 |
| qr_code   | varchar   | String representation of QR code scanned               |
| scanned_at| timestamp | Timestamp when the QR code was scanned                 |
| user_id   | int       | Foreign key referencing users table    |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

### - faces (Face Detector)

Stores data on scanned QR codes

| Attribute | Type      | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | int autoincrement | Primary key of the table                 |
| face_id | int       | Face ID auto-generated by the device when the face was detected            |
| station_id| int       | Foreign key referencing stations table            |
| scanned_at| timestamp | Timestamp when the entry was generated |
| user_id   | int       | Foreign key referencing users table (user that submitted the data)   |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

### - passenger_counts (Manual Counter)

Stores data on scanned QR codes

| Attribute | Type      | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | int autoincrement | Primary key of the table                 |
| station_id| int       | Foreign key referencing stations table            |
| passenger_in| int   | Count of passengers entering the vehicle            |
| passenger_out| int   | Count of passengers leaving the vehicle            |
| scanned_at| timestamp | Timestamp when the entry was generated |
| user_id   | int       | Foreign key referencing users table (user that submitted the data)   |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

### - kiosks (Kiosk)

Stores data on scanned QR codes

| Attribute | Type      | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | int autoincrement | Primary key of the table                 |
| origin_station_id| int       | Foreign key referencing stations table (where data was collected)                 |
| destination_station_id   | varchar   | Foreign key referencing stations table (chosen destination)              |
| captured_at| timestamp | Timestamp when the entry was generated |
| user_id   | int       | Foreign key referencing users table    |
| created_at| timestamp | Timestamp when the record was saved in the database    |
| updated_at| timestamp | Timestamp when the record was updated in the database  |

## Screenshots

| ![Splash Screen](https://user-images.githubusercontent.com/29625844/176331478-e042c273-ffab-4603-ad00-693382aa546d.png) | ![Device ID) - 2022-06-30 at 15 14 59](https://user-images.githubusercontent.com/29625844/176795893-6dd18d98-ac68-4bc0-b1aa-9c2b92b6593b.png) | ![Request Permission](https://user-images.githubusercontent.com/29625844/176331417-ba934b85-d0cd-4374-948d-7e13d8bcda61.png)  |
|:-------------:|:------------:|:-------------:|
| | ![Select Station](https://user-images.githubusercontent.com/29625844/176332218-291c28f1-666c-4fdf-88b6-259fd7178f55.png) | ![Menu](https://user-images.githubusercontent.com/29625844/176795601-b8960064-6bc3-46d3-9bcc-ab99fa6d6d47.jpeg) | ![QR Scanner](https://user-images.githubusercontent.com/29625844/176795060-e03a3e75-b951-43cf-bd19-293e13327a63.jpeg) |
| ![Face Detector](https://user-images.githubusercontent.com/29625844/176795111-018791fd-1612-4bd1-ada0-fa194ecda885.jpeg) | ![Manual Counter](https://user-images.githubusercontent.com/29625844/176795570-452a2692-c78a-4cef-8a39-c04780cbc32f.jpeg) | ![Kiosk](https://user-images.githubusercontent.com/29625844/176795582-fc2cc7be-f10c-4c4e-91a5-3a0c31f97591.jpeg) |

1. Screen 1 - Splash screen
2. Screen 2 - Device ID - use this to register the device
3. Screen 3 - Request permission to use camera
4. Screen 4 - Select station where device is located
5. Screen 5 - Menu - Select which mode to use to collect data
6. Screen 6 - QR Scanner
7. Screen 7 - Face Detector
8. Screen 8 - Manual Counter
9. Screen 9 - Kiosk

> For qr scanner and kiosk, data is submitted for every 10 scans or can be triggered manually. Face Detector and Manual Counter are submitted manually.

## Limitations!

- One major limitation for scanning QR code are the logistics involved with it. Since it multiplies
the number of QR scans by as much as 50x per vehicle (for buses) compared to RAMA, this may take
more than the assigned dwell time for vehicles (5s scan per passenger x 50 = 250s or 4 min 10s). 
Average dwell time ranges from 1 - 1.5 mins. Further, there's a need to assign more inspectors to 
operate the QR scanners, distribute QR codes, and collect them afterwards.

- For face detector, a major factor here is the quality of the device, the environment, and the targets.

- For manual counter, a time and motion study must be done to ensure how quickly and accurately transport inspectors can manually count the passengers boarding and leaving the vehicle.

- For kiosk, a major factor is ensuring that passengers do not enter their destination station twice. Security is also a major consideration
here esp. if the devices will be left behind and set up.

Proper testing and simulation can help address some of these through improved protocols.

## Author

This app is developed by [Mark Lester Bolotaolo](https://github.com/mlab817).
