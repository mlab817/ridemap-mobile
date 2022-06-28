import React from 'react';
import HomeScreen from "./screens/home.screen";
import {AuthProvider} from "./contexts/auth.context";
import {ScansProvider} from "./contexts/scans.context";

const App = () => {
  return (
    <AuthProvider>
      <ScansProvider>
        <HomeScreen />
      </ScansProvider>
    </AuthProvider>
  )
}

export default App
