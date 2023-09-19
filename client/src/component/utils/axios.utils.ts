import { get } from 'lodash'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import jwtDecode from 'jwt-decode'
import { isEmpty } from 'lodash'
import { localStorageState } from './localStorage.utils'
import { TokenDetails } from '../../pages/login/login.interface'
import { GYM_TOKEN_KEY } from '../../constants/localStorage.constant'

// Returns axios request interceptor
export const getRequestInterceptor = (
    accessToken: string
): ((
    requestConfig: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig) => {
    const requestInterceptor = (
        requestConfig: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
        // If access token is available, attach it to the request
        if (accessToken) {
            requestConfig.headers.Authorization = `Bearer ${accessToken}`
        }

        return requestConfig
    }

    return requestInterceptor
}

// Returns axios fulfilled response interceptor
export const getFulfilledResponseInterceptor = (): (<T>(
    response: T
) => T | Promise<T>) => {
    const fulfilledResponseInterceptor = <T>(response: T): T | Promise<T> => {
        // Forward the fulfilled response
        return response
    }

    return fulfilledResponseInterceptor
}

// Returns axios rejected response interceptor
export const getRejectedResponseInterceptor = (
    unauthenticatedAccessFn: () => void
): ((error: AxiosError) => void) => {
    const rejectedResponseInterceptor = (error: AxiosError): void => {
        // error.response?.data = error.response?.data.body
        let message = get(error, 'response.data.error.message', '')
        message = message.toString().trim()

        if (error && error.response && error.response.status === 401) {
            // Unauthenticated access
            unauthenticatedAccessFn && unauthenticatedAccessFn()
        } else if (error && error.response && message) {
            console.log({ error, message })

            // enqueueSnackbar(message, getErrorSnackbarOption())
        }

        throw error
    }

    return rejectedResponseInterceptor
}

export interface JwtPayload {
    iss?: string
    sub?: string
    aud?: string[] | string
    exp?: number
    nbf?: number
    iat?: number
    jti?: string
    data: TokenDetails['data']
}

export const EXPIRY_THRESHOLD_MILLES = 5 * 60 * 1000

/**
 * @exp expiry of token
 * @isExpired wether token is already expired or not
 * @diff Difference between token expiry & current time in ms
 * @timeoutExpiry time in ms for try to silent sign-in
 * @returns exp, isExpired, diff, timeoutExpiry
 */
export const extractDetailsFromToken = async (
    token?: string
): Promise<TokenDetails> => {
    const localStorageToken = localStorageState.getItem(GYM_TOKEN_KEY)
    if (!isEmpty(token ?? localStorageToken)) {
        try {
            const { data, exp } = jwtDecode<JwtPayload>(
                localStorageToken ?? token
            )

            const dateNow = Date.now()

            const diff = exp && exp * 1000 - dateNow
            const timeoutExpiry =
                diff && diff > EXPIRY_THRESHOLD_MILLES
                    ? diff - EXPIRY_THRESHOLD_MILLES
                    : 0

            return {
                exp,
                isExpired: exp && dateNow >= exp * 1000,
                diff,
                timeoutExpiry,
                data,
            }
        } catch (error) {
            console.error('Error parsing id token.', error)
        }
    }

    return {
        exp: 0,
        isExpired: true,
        diff: 0,
        timeoutExpiry: 0,
        data: {} as TokenDetails['data'],
    }
}
