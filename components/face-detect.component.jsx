import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import * as FaceDetector from 'expo-face-detector'
import Layout from "./layout.component";
import {submitFaces} from "../utils";
import {useContext, useEffect, useState} from "react";
import {Camera, CameraType} from "expo-camera";
import {StationContext} from "../contexts/station.context";

/**
 * You can fine tune the face detector settings here
 *
 * see https://docs.expo.dev/versions/latest/sdk/facedetector/#settings
 */
const faceDetectorSettings = {
  mode: FaceDetector.FaceDetectorMode.accurate,
  detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
  runClassifications: FaceDetector.FaceDetectorClassifications.all,
  minDetectionInterval: 500, // in milliseconds
  tracking: true,
}

const FaceDetect = () => {
  const { stationId, stations, setStationId } = useContext(StationContext)

  const [faces, setFaces] = useState([])

  const [hasPermission, setHasPermission] = useState(null);

  const [lastFace, setLastFace] = useState(null)

  const [type, setType] = useState(CameraType.back);

  // ask for camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // handle face detection and send to server
  const handleFacesDetected = async ({ faces }) => {
    if (!faces.length) {
      setFaces([])
      return
    }

    setFaces(faces)

    setLastFace(Math.max(...faces.map(f => f.faceID)))

    try {

      // filter faceID to exclude duplicates
      // from previous detection
      const facesToSubmit = faces
        .filter(f => f.faceID > lastFace)
        .map(f => (
          {
            station_id: stationId,
            face_id: f.faceID,
            timestamp: (new Date()).toLocaleString('en-US', {
              hour12: false
            })
          })
        )

      const response = await submitFaces(facesToSubmit)

      console.log('/api/faces: ', response)
    } catch (e) {
      console.log(`error in handleFacesDetected: `, e)
    }
  };

  return (
    <Layout>
      <Camera
        // other props
        style={styles.camera}
        onFacesDetected={handleFacesDetected}
        type={type}
        faceDetectorSettings={faceDetectorSettings}
      />

      {
        faces.length > 0
        && faces.map(({ bounds, faceID }, index) => {
          return (<View key={index} style={{
            borderWidth: 2,
            borderColor: 'yellow',
            position: 'absolute',
            top: bounds.origin.y + 100, // add 100 for the top adjustment
            left: bounds.origin.x,
            height: bounds.size.height,
            width: bounds.size.width
          }}>
            <Text style={{color: 'yellow'}}>{faceID}</Text>
          </View>)
        })
      }

      <Text style={{
        marginTop: 10
      }}>
        Total: {lastFace ?? 0} faces detected
      </Text>

      <Text style={{ marginTop: 10, fontSize: 24 }}>
        {stations.find(station => station.id === stationId).name}
      </Text>

      <TouchableOpacity style={{
        marginTop: 10
      }} onPress={() => setStationId(null)}>
        <Text>Change Station</Text>
      </TouchableOpacity>
    </Layout>
  )
}

const styles = {
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 300,
  }
}

export default FaceDetect