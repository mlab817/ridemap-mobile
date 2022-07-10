import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import {StationContext} from "../contexts/station.context";
import Banner from "./banner.component";
import * as Application from 'expo-application'
import Version from "./version.component";

const Layout = ({ children }) => {
  const { stationId, setStationId, stations } = useContext(StationContext)

  return (
    <SafeAreaView style={styles.container}>
      <Banner />

      <View style={styles.main}>
        { children }
      </View>

      <View style={{
        justifyContent: 'center'
      }}>
        <Text style={{ marginTop: 5, fontSize: 24 }}>
          {stations && stations.find(station => station.id === stationId).name}
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setStationId(null)}>
          <Text>Change Station</Text>
        </TouchableOpacity>
      </View>

      <Version />
    </SafeAreaView>
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
  main: {
    flexGrow: 1
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  }
});

export default Layout