import axios from "axios";
import * as SecureStore from 'expo-secure-store';

/**
 * Create axios instance to use in all requests
 * Replace baseURL to point to the API endpoint
 *
 * @type {AxiosInstance}
 */
export const api = axios.create({
    baseURL: 'https://ridemap-php.herokuapp.com/api'
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
            deviceId: deviceId
        })

        console.log(`response: ${JSON.stringify(response.data.token)}`)
        // store token
        await SecureStore.setItemAsync('RIDEMAP_TOKEN', response.data.token)

        return true
    } catch (e) {
        console.log(`error in device authentication: `, e)
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
 * @param facesToSubmit
 * @returns {Promise<*>}
 */
export const submitFaces = async (facesToSubmit) => {
    try {
        const response = await api.post('/faces', {
            faces: facesToSubmit
        })

        return response.data.success
    } catch (e) {
        console.log(`error in submitFaces: `,e)
    }
}

/**
 * Handle device registration
 *
 * @param deviceId
 * @returns {Promise<*>}
 */
export const deviceCreate = async (deviceId) => {
    try {
        const response = await api.post('/device-register', {
            device_id: deviceId
        })

        console.log('deviceCreate: ', response)

        return response.data.success
    } catch (e) {
        console.log(`error in deviceCreate: `, e)
    }
}