import { ClientStats } from 'pages/client/client.interface'
import { BASE_URL } from '../../constants/url.constant'
import { DashboardStats } from '../dashboard/dashboard.interface'
import APIClient from './index.rest'

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await APIClient.get(`${BASE_URL.STATS}/dashboard`)

    return response.data.data
}

export const getClientStats = async (): Promise<ClientStats> => {
    const response = await APIClient.get(`${BASE_URL.STATS}/client`)

    return response.data.data
}

export const getTrainerStats = async (): Promise<ClientStats> => {
    const response = await APIClient.get(`${BASE_URL.STATS}/trainer`)

    return response.data.data
}
