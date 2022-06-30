import {createContext, useEffect, useState} from "react";
import { submitQrScans} from "../utils";

export const ScansContext = createContext({
    scans: [],
    addScan: () => null,
    handleSubmitData: () => null
})

export const ScansProvider = ({ children }) => {
    const [scans, setScans] = useState([])

    const addScan = (newScan) => {
        setScans([...scans, newScan])
    }

    const handleSubmitData = async () => {
        const scansToSubmit = [...scans]

        clearScans()

        await submitQrScans(scansToSubmit)
    }

    const clearScans = () => setScans([])

    useEffect(() => {
        if (scans.length >= 10) {
            handleSubmitData()
        }
    }, [scans])

    const value = { scans, addScan, handleSubmitData}


    return <ScansContext.Provider value={value}>{children}</ScansContext.Provider>
}