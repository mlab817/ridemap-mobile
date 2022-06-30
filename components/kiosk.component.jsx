import Layout from "./layout.component";
import {Text, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {StationContext} from "../contexts/station.context";
import {EntriesContext} from "../contexts/entries.context";

const Kiosk = () => {
  const { stationId, stations, setStationId } = useContext(StationContext)

  const { entries, addEntry, submitPassengersAsync } = useContext(EntriesContext)

  const [filteredStations, setFilteredStations] = useState(stations)

  useEffect(() => {
    const filtered = stations.filter(station => station.id !== stationId)

    setFilteredStations(filtered)
  }, [stationId, stations])

  const handleAddEntry = (id) => {
    const newEntry = {
      originStationId: stationId,
      destinationStationId: id,
      timestamp: (new Date()).toLocaleString('en-US', {
        hour12: false
      })
    }

    addEntry(newEntry)
  }

  return (
    <Layout>
      <View style={{
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 16
        }}>SELECT DESTINATION</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
      }}>
        {
          filteredStations.map(({ id, name }) => (
            <View key={id} style={{
              width: '50%',
              padding: 5
            }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  backgroundColor: '#1434a3',
                  padding: 8,
                }} onPress={() => handleAddEntry(id)}>
                <Text style={{
                  color: '#ffffff'
                }}>{name}</Text>
              </TouchableOpacity>
            </View>
          ))
        }
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <Text>Entered: {entries.length}</Text>

        <TouchableOpacity style={{
          marginLeft: 20
        }} onPress={submitPassengersAsync}>
          <Text>Manual Submit</Text>
        </TouchableOpacity>
      </View>

    </Layout>
  )
}

export default Kiosk