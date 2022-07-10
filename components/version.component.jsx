import {StyleSheet, Text, View} from "react-native";
import * as Application from "expo-application";

const Version = () => {
  return (
    <View style={styles.version}>
      <View style={{
        flexGrow: 1
      }} />
      <Text style={{
        fontSize: 10
      }}>v.{Application.nativeBuildVersion}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  version: {
    flexDirection: 'row',
    padding: 2,
    alignContent: 'flex-end'
  }
})

export default Version