import {Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType} from "expo-camera";
import React, {useContext, useEffect, useState} from "react";
import {ScansContext} from "../contexts/scans.context";
import * as BarcodeScanner from "expo-barcode-scanner";
import {StationContext} from "../contexts/station.context";
import styled from 'styled-components/native'

const Spacer = styled(View)`
  flex-grow: 1;
`

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const [scanned, setScanned] = useState(false)

  const [type, setType] = useState(CameraType.back);

  const { stationId, stations, setStationId } = useContext(StationContext)

  const { scans, addScan, handleSubmitData } = useContext(ScansContext)

  const handleResetStation = () => {
    handleSubmitData()
    setStationId(null)
  }

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

  return (
    (
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/images/banner.png')} style={styles.banner} />

        <Spacer />

        {
          !scanned
            ? <Camera
              onBarCodeScanned={scanned ? undefined : handleScanned}
              style={styles.camera}
              type={type} />
            : <View style={[styles.camera,{backgroundColor:'#1f1f1f'}]} />
        }

        <Spacer />

        <Text style={{ marginTop: 10, fontSize: 24 }}>
          {stations.find(station => station.id === stationId).name}
        </Text>

        <Spacer />

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

        <Spacer />

        <TouchableOpacity style={{
          marginTop: 10,
          marginBottom: 10
        }} onPress={handleResetStation}>
          <Text>Change Station</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 300,
  },
  banner: {
    marginTop: 20,
    width: 300,
    height: 100,
    resizeMode: 'contain'
  }
});

export default QrScanner