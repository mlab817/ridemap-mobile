import {Button, Keyboard, TextInput, TouchableWithoutFeedback, View} from "react-native";
import Layout from "./layout.component";
import {Fragment, useContext, useState} from "react";
import {StationContext} from "../contexts/station.context";
import {submitCount} from "../utils";

const PassengerCounter = () => {
  const { stationId } = useContext(StationContext)

  const [passengersIn, setPassengersIn] = useState('')

  const [passengersOut, setPassengersOut] = useState('')

  const handleDismissKeyboard = () => Keyboard.dismiss()

  const resetCounts = () => {
    console.log('resetting log')
    setPassengersIn('')
    setPassengersOut('')
  }

  const handleSubmit = async () => {
    const payload = {
      station_id: stationId,
      passenger_in: parseInt(passengersIn ?? 0),
      passenger_out: parseInt(passengersOut ?? 0),
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
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View>

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

        </View>
      </TouchableWithoutFeedback>
    </Layout>
  )
}

export default PassengerCounter