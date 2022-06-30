import {createContext, useState} from 'react'

export const ModeContext = createContext({
  mode: '',
  setMode: () => null
})

export const modes = {
  QR_SCANNER: 'QR_SCANNER',
  KIOSK: 'KIOSK',
  FACE_DETECTOR: 'FACE_DETECTOR',
  COUNTER: 'COUNTER'
}


export const ModeProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState(null)

  const handleSetCurrentMode = (mode) => {
    setCurrentMode(modes[mode])
  }

  const clearMode = () => setCurrentMode(null)

  const value = {
    currentMode,
    handleSetCurrentMode,
    clearMode
  }

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}