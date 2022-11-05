import axios from 'axios'
import { Stats } from '../dashboard/dashboard.interface'

const BASE_URL = `${process.env.REACT_APP_API_URL}/stats`

export const getStats = async (): Promise<Stats> => {
    const response = await axios.get(BASE_URL)

    return response.data.data
}
