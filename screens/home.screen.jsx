/**
 * This is the only screen of the project.
 */

import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Image,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as FaceDetector from "expo-face-detector";
import {fetchStations, submitData} from "../utils";
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

    const [passengersIn, setPassengersIn] = useState('')

    const [passengersOut, setPassengersOut] = useState('')

    const handleSubmit = async () => {
        const payload = {
            station_id: stationId,
            passenger_in: parseInt(passengersIn),
            passenger_out: parseInt(passengersOut),
            scanned_at: (new Date()).toLocaleString('en-US', {
                hour12: false
            })
        }

        try {
            const response = await submitData(payload)

            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    // fetch stations
    useEffect(() => {
        const onFetchStations = async () => {
            const data = await fetchStations()

            setStations(data)
        }

        onFetchStations()
    }, [])

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 36
                }}>RIDEMAP</Text>

                <Text style={{ marginTop: 10, fontSize: 24 }}>
                    {stations.find(station => station.id === stationId).name}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 100,
                    marginBottom: 100
                }}>
                    <TextInput style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        width: 120,
                        height: 120,
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: 45
                    }} placeholder="IN" keyboardType="numeric" onChangeText={setPassengersIn} />

                    <TextInput style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        width: 120,
                        height: 120,
                        alignItems: 'center',
                        textAlign: 'center',
                        marginLeft: 30,
                        fontSize: 45
                    }} placeholder="OUT" keyboardType="numeric" onChangeText={setPassengersOut} />
                </View>

                <Button title="Submit" onPress={handleSubmit} />

                <TouchableOpacity style={{
                    marginTop: 10
                }} onPress={() => setStationId(null)}>
                    <Text>Change Station</Text>
                </TouchableOpacity>
            </View>
      </TouchableWithoutFeedback>
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
