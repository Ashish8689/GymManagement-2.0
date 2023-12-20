import { AxiosResponse } from 'axios'
import { BASE_URL } from 'constants/url.constant'
import { Staff } from 'pages/Staff/Staff.interface'
import APIClient from '../index.rest'

export const addStaffAPI = async (data: Staff): Promise<AxiosResponse> => {
    const response = APIClient.post(BASE_URL.STAFF, data)

    return response
}

export const getStaffListAPI = async (): Promise<Staff[]> => {
    const response = await APIClient.get(BASE_URL.STAFF)

    return response.data.data
}

export const updateStaffAPI = async (
    id: string,
    data: Staff
): Promise<AxiosResponse> => {
    const response = APIClient.put(`${BASE_URL.STAFF}/${id}`, data)

    return response
}

export const deleteStaffAPI = async (id: string): Promise<Staff> => {
    const response = await APIClient.delete(`${BASE_URL.STAFF}/${id}`)

    return response.data
}
