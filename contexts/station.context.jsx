import {createContext, useEffect, useState} from "react";
import {fetchStations} from "../utils";

export const StationContext = createContext({
  stations: [],
  stationId: null,
  setStationId: () => null,
  loading: false
})

export const StationProvider = ({children}) => {
  const [stations, setStations] = useState([])

  const [stationId, setStationId] = useState(null)

  const [loading, setLoading] = useState(false)
  // fetch stations
  useEffect(() => {
    setLoading(true)
    const onFetchStations = async () => {
      const data = await fetchStations()

      setStations(data)
      setLoading(false)
    }

    onFetchStations()
  }, [])

  const value = {
    stations,
    stationId,
    setStationId,
    loading
  }

  return <StationContext.Provider value={value}>{children}</StationContext.Provider>
}