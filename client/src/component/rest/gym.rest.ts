import axios, { AxiosResponse } from 'axios'
import { GymData } from 'pages/Gym/gym.interface'

const BASE_URL = `${process.env.GYM_PROXY_SERVER}/gym`

export const generateGymCode = async (): Promise<GymData> => {
    const response = await axios.get(`${BASE_URL}/gymCode`)

    return response.data
}

export const getGyms = async (): Promise<GymData[]> => {
    const response = await axios.get(BASE_URL)

    return response.data.data
}

export const addGym = async (data: GymData): Promise<GymData> => {
    const response = await axios.post(BASE_URL, data)

    return response.data
}

export const updateGym = async (
    code: number,
    data: GymData
): Promise<GymData> => {
    const response = await axios.put(`${BASE_URL}/${code}`, data)

    return response.data
}

export const deactivateGym = async (id: string): Promise<AxiosResponse> => {
    const response = await axios.patch(`${BASE_URL}/deactivate/${id}`)

    return response.data
}

// export const updateGymStatus = async (id,data) => {
//     const response = await axios.put(`${BASE_URL}/updateStatus/${id}`,data);
//     return response.data;
// };

// export const deleteGym = async (id) => {
//     const response = await axios.delete(`${BASE_URL}/${id}`);
//     return response.data;
// };
