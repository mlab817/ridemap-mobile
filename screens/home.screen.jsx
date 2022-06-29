/**
 * This is the only screen of the project.
 */

import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Camera, CameraType } from "expo-camera";
import {fetchStations} from "../utils";
import {AuthContext} from "../contexts/auth.context";
import * as BarcodeScanner from 'expo-barcode-scanner'
import {ScansContext} from "../contexts/scans.context";

const HomeScreen = () => {
    const { deviceId, isAuthenticated, loading } = useContext(AuthContext)

    const [stationId, setStationId] = useState(null)

    const [stations, setStations] = useState([])

    const [hasPermission, setHasPermission] = useState(null);

    const [scanned, setScanned] = useState(false)

    const [type, setType] = useState(CameraType.back);

    const { scans, addScan, handleSubmitData } = useContext(ScansContext)

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
    const handleScanned = ({ type, data }) => {
        setScanned(true)

        console.log(`type: `, type)
        console.log(`barcodetype: `, BarcodeScanner.Constants.BarCodeType.qr)

        if (type === BarcodeScanner.Constants.BarCodeType.qr) {
            const newScan = {
                station_id: stationId,
                qr_code: data,
                scanned_at: (new Date()).toLocaleString('en-US', {
                    hour12: false
                })
            }

            console.log(newScan)

            addScan(newScan)

            Alert.alert('QR Scanned', data, [
                {
                    text: 'Scan Again',
                    onPress: () => setScanned(false)
                }
            ],{
                cancelable: true,
                onDismiss: () => setScanned(false)
            })
        } else {
            console.log('not qr')
        }
    }

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

            {
                !scanned
                  ? <Camera
                      onBarCodeScanned={scanned ? undefined : handleScanned}
                      style={styles.camera}
                      type={type} />
                  : <View style={[styles.camera,{backgroundColor:'#1f1f1f'}]} />
            }


            <Text style={{ marginTop: 10, fontSize: 24 }}>
                {stations.find(station => station.id === stationId).name}
            </Text>

            <View style={{
                flexDirection: 'row',
                marginTop: 10
            }}>
                <Text>
                    QRs scanned: {scans.length}
                </Text>

                <TouchableOpacity onPress={() => handleSubmitData()}>
                    <Text style={{
                        marginLeft: 20
                    }}>
                        Manual Submit
                    </Text>
                </TouchableOpacity>
            </View>

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
