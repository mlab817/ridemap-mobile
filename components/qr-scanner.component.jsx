import {Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType} from "expo-camera";
import React, {useContext, useEffect, useState} from "react";
import {ScansContext} from "../contexts/scans.context";
import * as BarcodeScanner from "expo-barcode-scanner";
import {StationContext} from "../contexts/station.context";
import styled from 'styled-components/native'
import Layout from "./layout.component";

const Spacer = styled(View)`
  flex-grow: 1;
`

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const [scanned, setScanned] = useState(false)

  const [type, setType] = useState(CameraType.back);

  const { stationId, stations, setStationId } = useContext(StationContext)

  const { scans, addScan, handleSubmitData } = useContext(ScansContext)

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
    <Layout>

      {
        !scanned
          ? <Camera
            onBarCodeScanned={scanned ? undefined : handleScanned}
            style={styles.camera}
            type={type} />
          : <View style={[styles.camera,{backgroundColor:'#1f1f1f'}]} />
      }

      <View style={{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
      }}>
        <Text>
          QRs scanned: {scans.length}
        </Text>

        <TouchableOpacity disabled={!scans.length} onPress={() => handleSubmitData()}>
          <Text style={{
            marginLeft: 20
          }}>
            Manual Submit
          </Text>
        </TouchableOpacity>
      </View>

    </Layout>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 300,
  }
});

export default QrScanner