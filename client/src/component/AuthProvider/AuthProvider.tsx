import {
    createContext,
    FC,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import axios from 'axios'
import { isEmpty } from 'lodash'

import { Spin } from 'antd'
import message from 'component/CustomMessage/CustomMessage'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROLE } from '../../constants/common.constant'
import { GYM_TOKEN_KEY } from '../../constants/localStorage.constant'
import { UserDetails } from '../../pages/Login/login.interface'
import {
    extractDetailsFromToken,
    getFulfilledResponseInterceptor,
    getRejectedResponseInterceptor,
    getRequestInterceptor,
} from '../utils/axios.utils'
import { localStorageState } from '../utils/localStorage.utils'
import {
    AuthProviderContextProps,
    AuthProviderProps,
} from './AuthProvider.interface'

const AuthProviderContext = createContext<AuthProviderContextProps>(
    {} as AuthProviderContextProps
)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [authProviderLoading, setAuthProviderLoading] = useState(true)
    const [axiosRequestInterceptorId, setAxiosRequestInterceptorId] =
        useState(0)
    const [axiosResponseInterceptorId, setAxiosResponseInterceptorId] =
        useState(0)

    const [accessToken, setAccessToken] = useState<string>('')
    const [userDetails, setUserDetails] = useState<UserDetails>()

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
            message.info(t('message.token-expired'))
        } else if (isLogin) {
            navigate('/')
        }
    }

    const handleLogout = (): void => {
        clearAccessToken()
        navigate('/login')
    }

    const handleUnauthenticatedAccess = () => {
        handleLogout()
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

        // axios.interceptors.response.use(function (config) {
        //     if (config.data.body) {
        //         return { ...config, data: config.data.body }
        //     }

        //     return config
        // })
    }

    const updateAccessToken = (token: string): void => {
        setAccessToken(token)
        initAxios(token)
        // update access token value in local storage
        localStorageState.setItem(GYM_TOKEN_KEY, token)
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

    const setBaseUrl = (): void => {
        axios.defaults.baseURL = process.env.GYM_PROXY_SERVER
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

    const authProviderContext = useMemo(
        () => ({
            accessToken,
            userDetails,
            isAdmin: userDetails?.isAdmin ?? false,
            isAuthenticated: Boolean(accessToken),
            handleLogin,
            handleLogout,
        }),
        [accessToken, userDetails, accessToken, handleLogin, handleLogout]
    )

    if (authProviderLoading) {
        return (
            <div className="app-loading">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <AuthProviderContext.Provider value={authProviderContext}>
            {children}
        </AuthProviderContext.Provider>
    )
}

export const useAuthProvider = (): AuthProviderContextProps =>
    useContext(AuthProviderContext)
