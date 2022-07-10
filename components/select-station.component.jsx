import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import {StationContext} from "../contexts/station.context";
import Banner from "./banner.component";
import Version from "./version.component";

const SelectStation = () => {
  const { stations, setStationId, loading } = useContext(StationContext)

  const handleSetStation = (stationId) => {
    setStationId(stationId)
  }

  return (
    <View style={{
      flex: 1
    }}>
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Banner />

        {
          loading
            ?
              <>
                <ActivityIndicator />
                <Text>Loading stations...</Text>
              </>
            : (
              <>
              <Text style={{
                fontSize: 24,
                color: '#1434a3'
              }}>SELECT STATION</Text>
                {
                  stations.map(({ name, id }) => (
                  <TouchableOpacity style={{
                  marginTop: 10
                }} key={id} onPress={() => handleSetStation(id)}>
                  <Text>{name}</Text>
                  </TouchableOpacity>
                  ))
                }
              </>
            )
        }
      </View>

      <Version />
    </View>
  )
}

export default SelectStation