import axios from 'axios'
import { ClientStats } from '../../interface/client.interface'
import { DashboardStats } from '../dashboard/dashboard.interface'

const BASE_URL = `${process.env.REACT_APP_API_URL}/stats`

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await axios.get(`${BASE_URL}/dashboard`)

    return response.data.data
}

export const getClientStats = async (): Promise<ClientStats> => {
    const response = await axios.get(`${BASE_URL}/client`)

    return response.data.data
}

export const getTrainerStats = async (): Promise<ClientStats> => {
    const response = await axios.get(`${BASE_URL}/trainer`)

    return response.data.data
}
