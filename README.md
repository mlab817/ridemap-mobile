# RIDEMAP: Passenger Count through Face Detection using Smartphone Camera

## Description

This mobile app allows registered smartphones to upload data
of passengers' faces counted through face detection. 

`Note: This app does not collect data on faces of passengers, it 
relies instead upon the faceID created when a face is detected by 
the app's camera.`

## Hardware and Software

1. Laravel for backend development
2. React Native and Expo for mobile app development
3. Smartphones with camera

The Laravel backend for the Ridemap already supports this app. The
endpoint for submission of face detection is `/api/faces`. The backend
accepts an array of `faces` with the following attributes: `face_id`,
`station_id`, and `scanned_at`. `device_id` is extracted from a token
used to authenticate the device.

## Building the App

Since this app has been created with [expo](expo.dev),
the app can also be built with it through the
[Expo Application Services](https://docs.expo.dev/eas/).
To do this make sure that `eas-cli` is installed in your
computer with `npm i -g eas-cli`. Then, in your app's root
directory, just run `eas build` and follow the instruction.
You can view the progress in [expo.dev](https://expo.dev/) 
website, i.e. dashboard. Afterwards, you can download the 
app bundle which you can distribute to users or submit to
app / play store.

__Important__: Do not forget to update the api configuration in the
`utils.js` file to point to the url of the API of the backend. Specifically,
this line:

```
export const api = axios.create({
   baseURL: 'https://ridemap-php.herokuapp.com/api'
})
```

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

## Limitations

The accuracy of this app will depend on at least the following factors:

1. Camera quality of the device
2. Quality of the environment (placement of the device, lighting)
3. Quality of targets (angle of the face, obstructions such as face masks/caps)

There is also the issue of duplication since the app does not use a
backend to analyze facial features and eliminate duplicates. So if a 
person takes too long in the queueing line, they can be scanned more than
once.