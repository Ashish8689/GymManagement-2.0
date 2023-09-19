import axios from 'axios'
import { AUTH_CONFIG, GYM_CONFIG } from '../../constants/auth'
import {
    getFulfilledResponseInterceptor,
    getRejectedResponseInterceptor,
    getRequestInterceptor,
} from './axios.utils'

export const clearAccessToken = (state: any): void => {
    state.setAccessToken('')
    state.setIsAuthenticated(false)

    localStorage.setItem(
        AUTH_CONFIG,
        JSON.stringify({
            accessToken: '',
        })
    )
    localStorage.setItem(GYM_CONFIG, JSON.stringify({ email: '', name: '' }))
}

const handleUnauthenticatedAccess = (state: any): void => {
    clearAccessToken(state)
}

export const initAxios = (token: string, state: any): void => {
    console.log(state)

    // Clear existing interceptors
    axios.interceptors.request.eject(state.AXIOS_REQUEST_INTERCEPTOR_ID)
    axios.interceptors.response.eject(state.AXIOS_REQUEST_INTERCEPTOR_ID)

    if (token) {
        // Set new interceptors
        state.AXIOS_REQUEST_INTERCEPTOR_ID(
            axios.interceptors.request.use(getRequestInterceptor(token))
        )
        state.AXIOS_REQUEST_INTERCEPTOR_ID(
            axios.interceptors.response.use(
                getFulfilledResponseInterceptor(),
                getRejectedResponseInterceptor(
                    handleUnauthenticatedAccess(state)
                )
            )
        )
    }
    // axios.interceptors.response.use(function (config) {
    //     if (config.data.body) {
    //         return { ...config, data: config.data.body }
    //     }

    //     return config
    // })
}
