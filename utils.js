import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const api = axios.create({
    baseURL: 'http://172.20.10.3:8000/api'
})

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
    }, err => console.log(err)
)

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
        console.log(e)
        return false
    }
}

export const deviceCreate = async (deviceId) => {
    try {
        const response = await api.post('/device-register', {
            device_id: deviceId
        })

        console.log('deviceCreate: ', response)

        return response.data.success
    } catch (e) {
        console.log(e)
    }
}