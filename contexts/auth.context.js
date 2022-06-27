/**
 * This file handles device authentication.
 */

import {createContext, useEffect, useState} from "react";
import {Platform} from "react-native";
import * as Application from "expo-application";
import {deviceAuthentication} from "../utils";

export const AuthContext = createContext({
    isAuthenticated: false,
    deviceId: null,
    loading: false
})

export const AuthProvider = ({ children }) => {
    const [deviceId, setDeviceId] = useState(null)

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDeviceId = async () => {
            if (Platform.OS === 'android') {
                setDeviceId(Application.androidId)
            } else if (Platform.OS === 'ios') {
                const iosDeviceId = await Application.getIosIdForVendorAsync()
                console.log(`ios deviceId: `, iosDeviceId)
                setDeviceId(iosDeviceId)
            }
        }

        getDeviceId()
    }, [])

    // handle login
    useEffect(() => {
        const loginWithDeviceId = async () => {
            setLoading(true)

            console.log(`deviceId from login: `, deviceId)

            const loginSuccessful = await deviceAuthentication(deviceId)

            if (loginSuccessful) {
                setIsAuthenticated(true)
            }

            setLoading(false)
        }

        loginWithDeviceId()
    }, [deviceId])

    const value = {deviceId, isAuthenticated, loading}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
