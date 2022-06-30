import {useContext} from "react";
import {ModeContext, modes} from "../contexts/mode.context";
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SelectModes = () => {
  const { handleSetCurrentMode } = useContext(ModeContext)

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/banner.png')} style={styles.banner} />

      <Text style={styles.prompt}>SELECT MODE</Text>

      <View style={styles.modeContainer}>
        <TouchableOpacity style={styles.btnMode} onPress={() => handleSetCurrentMode(modes.QR_SCANNER)}>
          <AntDesign name="qrcode" size={100} style={styles.icon} />
          <Text style={{
            color: '#ffffff'
          }}>QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnMode, {marginLeft: 20}]} onPress={() => handleSetCurrentMode(modes.COUNTER)}>
          <MaterialCommunityIcons name="counter" size={100} style={styles.icon} />
          <Text style={{
            color: '#ffffff'
          }}>MANUAL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modeContainer}>

        <TouchableOpacity style={styles.btnMode} onPress={() => handleSetCurrentMode(modes.FACE_DETECTOR)}>
          <MaterialCommunityIcons name="face-recognition" size={100} style={styles.icon} />
          <Text style={{
            color: '#ffffff'
          }}>FACE DETECTOR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnMode, {marginLeft: 20}]} onPress={() => handleSetCurrentMode(modes.KIOSK)}>
          <FontAwesome name="braille" size={100} style={styles.icon} />
          <Text style={{
            color: '#ffffff'
          }}>KIOSK</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  banner: {
    width: 300,
    height: 100,
    resizeMode: 'contain'
  },
  prompt: {
    fontSize: 24
  },
  modeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  btnMode: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#1434a3',
    color: '#ffffff',
    borderRadius: 10
  },
  icon: {
    color: '#ffffff'
  }
})

export default SelectModes