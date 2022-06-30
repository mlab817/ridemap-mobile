import {Button, Keyboard, TextInput, TouchableWithoutFeedback, View} from "react-native";
import Layout from "./layout.component";
import {Fragment, useContext, useEffect, useState} from "react";
import {StationContext} from "../contexts/station.context";
import {submitCount} from "../utils";

const PassengerCounter = () => {
  const { stationId } = useContext(StationContext)

  const [passengersIn, setPassengersIn] = useState('')

  const [passengersOut, setPassengersOut] = useState('')

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (passengersIn !== '' || passengersOut !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [passengersIn, passengersOut])

  const handleDismissKeyboard = () => Keyboard.dismiss()

  const resetCounts = () => {
    setPassengersIn('')
    setPassengersOut('')
  }

  const handleSubmit = async () => {
    const numPassengersIn = passengersIn === '' ? 0 : parseInt(passengersIn)
    const numPassengersOut = passengersOut === '' ? 0 : parseInt(passengersOut)

    const payload = {
      station_id: stationId,
      passenger_in: numPassengersIn,
      passenger_out: numPassengersOut,
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

          <Button disabled={disabled} title="Submit" onPress={handleSubmit} />

        </View>
      </TouchableWithoutFeedback>
    </Layout>
  )
}

export default PassengerCounter