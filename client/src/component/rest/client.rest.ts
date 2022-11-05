import axios, { AxiosResponse } from 'axios'
import { ClientCode, ClientData } from '../../types/clientTypes'

const BASE_URL = `${process.env.REACT_APP_API_URL}/client`

export const generateClientCode = async (): Promise<ClientCode> => {
    const response = await axios.get(`${BASE_URL}/clientCode`)

    return response.data
}

export const getClients = async (): Promise<ClientData[]> => {
    const response = await axios.get(BASE_URL)

    return response.data.data
}

export const getClientByCode = async (code: string): Promise<ClientData> => {
    const response = await axios.get(`${BASE_URL}/${code}`)

    return response.data.data
}

export const addClients = async (data: ClientData): Promise<AxiosResponse> => {
    const response = axios.post(BASE_URL, data)

    return response
}

export const updateClient = async (
    clientCode: number,
    data: ClientData
): Promise<ClientData> => {
    const response = await axios.put(`${BASE_URL}/${clientCode}`, data)

    return response.data
}

export const deactivateClient = async (id: string): Promise<AxiosResponse> => {
    const response = await axios.patch(`${BASE_URL}/deactivate/${id}`)

    return response.data
}

// export const updateMembership = async (id,data) => {
//     const response = await axios.put(`${BASE_URL}/updateMembership/${id}`,data);
//     return response.data;
// };

// export const deleteMember = async (id) => {
//     const response = await axios.delete(`${BASE_URL}/${id}`);
//     return response.data;
// };
