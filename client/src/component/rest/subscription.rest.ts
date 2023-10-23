import { AxiosResponse } from 'axios'
import { Subscription } from 'pages/Subscription/Subscription.interface'
import { BASE_URL } from '../../constants/url.constant'
import APIClient from './index.rest'

export const getSubscriptions = async (): Promise<Subscription[]> => {
    const response = await APIClient.get(BASE_URL.SUBSCRIPTION)

    return response.data.data
}

export const addSubscription = async (
    data: Subscription
): Promise<AxiosResponse> => {
    const response = APIClient.post(BASE_URL.SUBSCRIPTION, data)

    return response
}

export const updateSubscription = async (
    id: number,
    data: Subscription
): Promise<Subscription> => {
    const response = await APIClient.put(`${BASE_URL.SUBSCRIPTION}/${id}`, data)

    return response.data
}

export const deleteSubscription = async (
    id: string
): Promise<AxiosResponse> => {
    const response = await APIClient.delete(`${BASE_URL.SUBSCRIPTION}/${id}`)

    return response.data
}
