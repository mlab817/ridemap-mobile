import React from 'react';
import HomeScreen from "./screens/home.screen";
import {AuthProvider} from "./contexts/auth.context";

const App = () => {
  return (
      <AuthProvider>
        <HomeScreen />
      </AuthProvider>
  )
}

export default App
