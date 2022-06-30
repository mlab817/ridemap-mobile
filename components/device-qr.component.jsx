import {Alert, Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import { useContext, useRef } from "react";
import {AuthContext} from "../contexts/auth.context";
import AntDesign from 'react-native-vector-icons/AntDesign'
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library'

const DeviceQr = () => {
  const { deviceId, loginWithDeviceId } = useContext(AuthContext)

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const qr = useRef(null)

  const retryLogin = () => loginWithDeviceId()

  const takeScreenshot = async () => {
    try {
      const uri = await qr.current.capture()

      console.log('status', status)

      const permission = await MediaLibrary.requestPermissionsAsync()

      if (permission.granted) {
        await MediaLibrary.saveToLibraryAsync(uri)
        Alert.alert('Success', 'Your photo has been saved')
      } else {
        Alert.alert('Permission Denied', 'Unable to solve image without permission')
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{
        fontSize: 20
      }}>DEVICE NOT REGISTERED</Text>

      <ViewShot ref={qr} style={{
        padding: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center'
      }} options={{
        format: 'png',
        quality: 1
      }}>
        <Image style={{
          marginBottom: 10,
          marginTop: 10,
          height: 256,
          width: 256
        }} source={{
          uri:`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${deviceId}`
        }} />

        <Text style={{
          marginTop: 10
        }}>{deviceId}</Text>

      </ViewShot>

      <Text style={{
        marginTop: 30
      }}>Provide this device ID to LTFRB PUVSC PIU IT Unit</Text>

      <View style={{
        flexDirection: 'row'
      }}>
        <TouchableOpacity style={{
          borderWidth: 0.5,
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 30,
          borderColor: '#d4d4d4',
          width: 90
        }} onPress={takeScreenshot}>
          <AntDesign name="download" size={30} color="#000000" />
          <Text style={{
            marginTop: 10
          }}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          borderWidth: 0.5,
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 30,
          borderColor: '#d4d4d4',
          width: 90,
          marginLeft: 30
        }} onPress={retryLogin}>
          <AntDesign name="reload1" size={30} color="#000000" />
          <Text style={{
            marginTop: 10
          }}>Retry</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default DeviceQr