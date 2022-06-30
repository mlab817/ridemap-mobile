import {Button, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Layout from "./layout.component";
import {Fragment, useContext, useState} from "react";
import {StationContext} from "../contexts/station.context";
import {submitCount} from "../utils";

const PassengerCounter = () => {
  const { stationId, stations, setStationId } = useContext(StationContext)

  const [passengersIn, setPassengersIn] = useState('')

  const [passengersOut, setPassengersOut] = useState('')

  const resetCounts = () => {
    console.log('resetting log')
    setPassengersIn('')
    setPassengersOut('')
  }

  const handleSubmit = async () => {
    const payload = {
      station_id: stationId,
      passenger_in: parseInt(passengersIn),
      passenger_out: parseInt(passengersOut),
      scanned_at: (new Date()).toLocaleString('en-US', {
        hour12: false
      })
    }

    try {
      const response = await submitCount(payload)

      // clear counts
      resetCounts()

      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Fragment>
          <Text style={{ marginTop: 10, fontSize: 24 }}>
            {stations.find(station => station.id === stationId).name}
          </Text>

          <View style={{
            flexDirection: 'row',
            marginTop: 100,
            marginBottom: 100
          }}>
            <TextInput style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              width: 120,
              height: 120,
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 45
            }} value={passengersIn} placeholder="IN" keyboardType="numeric" onChangeText={setPassengersIn} />

            <TextInput style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              width: 120,
              height: 120,
              alignItems: 'center',
              textAlign: 'center',
              marginLeft: 30,
              fontSize: 45
            }} value={passengersOut} placeholder="OUT" keyboardType="numeric" onChangeText={setPassengersOut} />
          </View>

          <Button title="Submit" onPress={handleSubmit} />

          <TouchableOpacity style={{
            marginTop: 10
          }} onPress={() => setStationId(null)}>
            <Text>Change Station</Text>
          </TouchableOpacity>
        </Fragment>
      </TouchableWithoutFeedback>
    </Layout>
  )
}

export default PassengerCounter