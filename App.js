import React from 'react';
import HomeScreen from "./screens/home.screen";
import { AuthProvider } from "./contexts/auth.context";
import { ScansProvider } from "./contexts/scans.context";
import { StationProvider } from "./contexts/station.context";
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  return (
    <RootSiblingParent>
      <AuthProvider>
          <StationProvider>
            <ScansProvider>
              <HomeScreen />
            </ScansProvider>
          </StationProvider>
      </AuthProvider>
    </RootSiblingParent>
  )
}

export default App
