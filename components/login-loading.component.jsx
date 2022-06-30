import {ActivityIndicator, SafeAreaView, Text} from "react-native";
import React from "react";

const LoginLoading = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <ActivityIndicator />
      <Text style={{
        marginTop: 10
      }}>Logging in with Device ID...</Text>
    </SafeAreaView>
  )
}

export default LoginLoading