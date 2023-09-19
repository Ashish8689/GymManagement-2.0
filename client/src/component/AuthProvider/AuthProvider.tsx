import React, {
    createContext,
    FC,
    useContext,
    useEffect,
    useState,
} from 'react'

import axios from 'axios'
import { isEmpty } from 'lodash'

import { useNavigate } from 'react-router-dom'
import {
    AuthProviderContextProps,
    AuthProviderProps,
} from './AuthProvider.interface'
import {
    extractDetailsFromToken,
    getFulfilledResponseInterceptor,
    getRejectedResponseInterceptor,
    getRequestInterceptor,
} from '../utils/axios.utils'
import { GYM_TOKEN_KEY } from '../../constants/localStorage.constant'
import { localStorageState } from '../utils/localStorage.utils'
import { ROLE } from '../../constants/common'
import { UserDetails } from '../../pages/login/login.interface'

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate()
    const [authProviderLoading, setAuthProviderLoading] = useState(true)
    const [axiosRequestInterceptorId, setAxiosRequestInterceptorId] =
        useState(0)
    const [axiosResponseInterceptorId, setAxiosResponseInterceptorId] =
        useState(0)

    const [accessToken, setAccessToken] = useState<string>('')
    const [userDetails, setUserDetails] = useState<UserDetails>()

    const updateAccessToken = (token: string): void => {
        setAccessToken(token)
        initAxios(token)
        // update access token value in local storage
        localStorageState.setItem(GYM_TOKEN_KEY, token)
    }

    const clearAccessToken = (): void => {
        setAccessToken('')
        localStorageState.removeItem(GYM_TOKEN_KEY)
    }

    const startTokenExpiryTimer = async (isLogin?: boolean): Promise<void> => {
        // Extract expiry
        const { isExpired } = await extractDetailsFromToken()

        if (isExpired) {
            clearAccessToken()
            navigate('/login')
        } else {
            if (isLogin) {
                navigate('/')
            }
        }
    }

    const updateUserDetails = async (token?: string): Promise<void> => {
        const { data } = await extractDetailsFromToken(token)

        if (!isEmpty(data)) {
            setUserDetails({ ...data, isAdmin: data.role === ROLE.ADMIN })
        }
    }

    const handleLogin = async (token: string): Promise<void> => {
        await updateUserDetails(token)
        updateAccessToken(token)
    }

    const handleLogout = (): void => {
        clearAccessToken()
        navigate('/login')
    }

    const handleUnauthenticatedAccess = (): void => {
        handleLogout()
    }

    const setBaseUrl = (): void => {
        axios.defaults.baseURL = process.env.GYM_PROXY_SERVER
    }

    const initAxios = (token: string): void => {
        // Clear existing interceptors
        axios.interceptors.request.eject(axiosRequestInterceptorId)
        axios.interceptors.response.eject(axiosResponseInterceptorId)

        // Set new interceptors
        setAxiosRequestInterceptorId(
            axios.interceptors.request.use(getRequestInterceptor(token))
        )
        setAxiosResponseInterceptorId(
            axios.interceptors.response.use(
                getFulfilledResponseInterceptor(),
                getRejectedResponseInterceptor(handleUnauthenticatedAccess)
            )
        )
    }

    useEffect(() => {
        setBaseUrl()
        // Access token changed, initialize axios
        setAuthProviderLoading(true)
        // set access token state from local storage upon page reload

        const token = localStorageState.getItem(GYM_TOKEN_KEY)

        if (!isEmpty(token)) {
            setAccessToken(token)
            initAxios(token)
            startTokenExpiryTimer()
            updateUserDetails()
        }
        setAuthProviderLoading(false)
    }, [])

    const authProviderContext = {
        accessToken,
        isAdmin: userDetails?.isAdmin ?? false,
        isAuthenticated: Boolean(accessToken),
        handleLogin,
        handleLogout,
    }

    // Loading indicator
    if (authProviderLoading) {
        return <h1>Loading</h1>
    }

    return (
        <AuthProviderContext.Provider value={authProviderContext}>
            {children}
        </AuthProviderContext.Provider>
    )
}

const AuthProviderContext = createContext<AuthProviderContextProps>(
    {} as AuthProviderContextProps
)

export const useAuthProvider = (): AuthProviderContextProps =>
    useContext(AuthProviderContext)