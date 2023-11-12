import { AxiosResponse } from 'axios'

import { BASE_URL } from '../../constants/url.constant'
import {
    AccessTokenResponse,
    LoginPayload,
} from '../../pages/Login/login.interface'
import axiosClient from './index.rest'

export const authenticateLoginData = async (
    data: LoginPayload
): Promise<AccessTokenResponse> => {
    const response = await axiosClient.post<
        LoginPayload,
        AxiosResponse<AccessTokenResponse>
    >(BASE_URL.LOGIN, data, {
        withCredentials: true,
    })

    return response.data
}
