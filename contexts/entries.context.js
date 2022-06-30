import {createContext, useEffect, useState} from "react";
import {submitPassengers} from "../utils";

export const EntriesContext = createContext({
    entries: [],
    setEntries: () => null
})

export const EntriesProvider = ({ children }) => {
    const [entries, setEntries] = useState([])

    const addEntry = (newEntry) => {
        setEntries([
            ...entries,
            newEntry
        ])
    }

    const clearEntries = () => setEntries([])

    const submitPassengersAsync = async () => {
        const entriesToSubmit = [...entries]
        console.log('entriesToSubmit: ', entriesToSubmit)
        clearEntries()
        await submitPassengers(entriesToSubmit)
    }

    // every time that the number of entries reach 10,
    // send the data to the server
    useEffect(() => {
        if (entries.length >= 10) {
            submitPassengersAsync()
        }
    }, [entries])

    const value = { entries, addEntry, submitPassengersAsync }

    return <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
}