import React from 'react';
import HomeScreen from "./screens/home.screen";
import {AuthProvider} from "./contexts/auth.context";
import {ScansProvider} from "./contexts/scans.context";
import {StationProvider} from "./contexts/station.context";

const App = () => {
  return (
    <AuthProvider>
      <StationProvider>
        <ScansProvider>
          <HomeScreen />
        </ScansProvider>
      </StationProvider>
    </AuthProvider>
  )
}

export default App
