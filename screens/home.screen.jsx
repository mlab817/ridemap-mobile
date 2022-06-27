/**
 * This is the only screen of the project.
 */

import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions, Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as FaceDetector from "expo-face-detector";
import { Camera, CameraType } from "expo-camera";
import {fetchStations, submitFaces} from "../utils";
import {AuthContext} from "../contexts/auth.context";

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

const HomeScreen = () => {
    const { deviceId, isAuthenticated, loading } = useContext(AuthContext)

    const [stationId, setStationId] = useState(null)

    const [stations, setStations] = useState([])

    const [hasPermission, setHasPermission] = useState(null);

    const [faces, setFaces] = useState([])

    const [lastFace, setLastFace] = useState(null)

    const [type, setType] = useState(CameraType.back);

    // fetch stations
    useEffect(() => {
        const onFetchStations = async () => {
            const data = await fetchStations()

            setStations(data)
        }

        onFetchStations()
    }, [])

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
                        face_id: f.faceID
                    })
                )

            const response = await submitFaces(facesToSubmit)

            console.log('/api/faces: ', response)
        } catch (e) {
            console.log(`error in handleFacesDetected: `, e)
        }
    };

    console.log(`deviceId: `, deviceId)
    console.log(isAuthenticated)

    // if loading, show loading screen
    if (loading) {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator />
                <Text style={{
                    marginTop: 10
                }}>Logging in with Device ID...</Text>
            </SafeAreaView>
        )
    }

    // if not logged in, show that device id is invalid
    // and not registered in the server
    if (!isAuthenticated) {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>DEVICE NOT REGISTERED</Text>

                <Image style={{
                    marginBottom: 10,
                    marginTop: 10,
                    height: 300,
                    width: 300
                }} source={{
                    uri:`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${deviceId}`
                }} />

                <Text style={{
                    marginTop: 10
                }}>{deviceId}</Text>

                <Text style={{
                    marginTop: 10
                }}>Provide this device ID to LTFRB PUVSC PIU IT Unit</Text>
            </SafeAreaView>
        )
    }

    //
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>No permission to access camera yet.</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
            </View>
        );
    }

    // if there is no station id select,
    // prompt user to select one
    if (!stationId) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    fontSize: 24,
                    color: '#1434a3'
                }}>SELECT STATION</Text>
                {
                    stations.map(station => (
                        <TouchableOpacity style={{
                            marginTop: 10
                        }} key={station.id} onPress={() => setStationId(station.id)}>
                            <Text>{station.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    // show camera page
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 36
            }}>RIDEMAP</Text>

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

            <Text style={{ marginTop: 10, fontSize: 24 }}>{stations.find(station => station.id === stationId).name}</Text>

            <TouchableOpacity style={{
                marginTop: 10
            }} onPress={() => setStationId(null)}>
                <Text>Change Station</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    camera: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
    }
});

export default HomeScreen
