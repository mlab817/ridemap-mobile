import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import {StationContext} from "../contexts/station.context";

const SelectStation = () => {
  const { stations, setStationId, loading } = useContext(StationContext)

  const handleSetStation = (stationId) => {
    setStationId(stationId)
  }

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
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

  )
}

export default SelectStation