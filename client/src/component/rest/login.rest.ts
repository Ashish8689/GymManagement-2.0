import { AxiosResponse } from 'axios'

import { BASE_URL } from '../../constants/url.constant'
import APIClient from './index.rest'

interface LoginData {
    username: string
    password: string
}

export const authenticateLoginData = async (
    data: LoginData
): Promise<AxiosResponse> => {
    const response = await APIClient.post(BASE_URL.LOGIN, data, {
        withCredentials: true,
    })

    return response.data
}
