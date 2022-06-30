import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-root-toast";

/**
 * Create axios instance to use in all requests
 * Replace baseURL to point to the API endpoint
 *
 * @type {AxiosInstance}
 */
export const api = axios.create({
    baseURL: 'https://ridemap.thedeveconomist.com/api'
})

/**
 * Add token to request
 */
api.interceptors.request.use(async (config) => {
        const token = await SecureStore.getItemAsync('RIDEMAP_TOKEN')

        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        return config
    }, e => console.log(`error in axios config: `, e)
)

/**
 * Handle device authentication
 *
 * @param deviceId
 * @returns {Promise<boolean>}
 */
export const deviceAuthentication = async (deviceId) => {
    try {
        const response = await api.post('/device-auth', {
            device_id: deviceId
        })

        console.log(`response: ${JSON.stringify(response.data.token)}`)

        const { success, token } = response.data

        // store token
        if (success) {
            await SecureStore.setItemAsync('RIDEMAP_TOKEN', token)
        } else {
            return false
        }

        return true
    } catch (e) {
        console.log(`error in device authentication: `, e)

        showToastMessage(e.message)

        return false
    }
}

/**
 * Handle fetching stations from backend
 *
 * @returns {Promise<*[]|any>}
 */
export const fetchStations = async () => {
    try {
        const response = await api.get('/stations')

        return response.data
    } catch (e) {
        console.log(`error in fetching stations: `, e)

        return []
    }
}

/**
 * Handle submission of faces data to backend
 *
 * @returns {Promise<*>}
 * @param scansToSubmit
 */
export const submitQrScans = async (scansToSubmit) => {
    console.log(`scansToSubmit: `, scansToSubmit)

    try {
        const response = await api.post('/qrs', {
            scans: scansToSubmit
        })

        const { message, success } = response.data

        showToastMessage(message)

        return success
    } catch (e) {
        console.log(`error in submitFaces: `,e)

        showToastMessage(e.message)
    }
}

/**
 * Handle submission of faces data to backend
 *
 * @returns {Promise<*>}
 * @param data
 */
export const submitCount = async (data) => {
    console.log(`scansToSubmit: `, data)

    try {
        const response = await api.post('/passenger-count', data)

        const { message, success } = response.data

        showToastMessage(message)

        return success
    } catch (e) {
        console.log(`error in submitFaces: `,e)

        showToastMessage(e.message)
    }
}

/**
 * Handle submission of faces data to backend
 *
 * @returns {Promise<*>}
 * @param passengers
 */
export const submitPassengers = async (passengers) => {
    try {
        const response = await api.post('/kiosks', {
            passengers: passengers
        })

        const { success, message } = response.data

        showToastMessage(message)

        return success
    } catch (e) {
        console.log(`error in submitPassengers: `, e)

        showToastMessage(e.message)
    }
}

/**
 * Handle submission of faces data to backend
 *
 * @param facesToSubmit
 * @returns {Promise<*>}
 */
export const submitFaces = async (facesToSubmit) => {
    try {
        const response = await api.post('/faces', {
            faces: facesToSubmit
        })

        const { message, success } = response.data

        showToastMessage(message)

        return success
    } catch (e) {
        console.log(`error in submitFaces: `, e)
    }
}

const showToastMessage = (message) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        hideOnPress: true
    })
}