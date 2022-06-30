import React from 'react';
import HomeScreen from "./screens/home.screen";
import {AuthProvider} from "./contexts/auth.context";
import {ScansProvider} from "./contexts/scans.context";
import {StationProvider} from "./contexts/station.context";
import {ModeProvider} from "./contexts/mode.context";
import {EntriesProvider} from "./contexts/entries.context";
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <ModeProvider>
          <StationProvider>
            <EntriesProvider>
              <ScansProvider>
                <HomeScreen />
              </ScansProvider>
            </EntriesProvider>
          </StationProvider>
        </ModeProvider>
      </AuthProvider>
    </RootSiblingParent>
  )
}

export default App
