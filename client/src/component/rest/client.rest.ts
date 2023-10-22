import { AxiosResponse } from 'axios'
import { ClientCode, ClientData } from 'pages/client/client.interface'
import { BASE_URL } from '../../constants/url.constant'
import APIClient from './index.rest'

export const generateClientCode = async (): Promise<ClientCode> => {
    const response = await APIClient.get(`${BASE_URL.CLIENT}/clientCode`)

    return response.data
}

export const getClients = async (): Promise<ClientData[]> => {
    const response = await APIClient.get(BASE_URL.CLIENT)

    return response.data.data
}

export const getClientByCode = async (code: string): Promise<ClientData> => {
    const response = await APIClient.get(`${BASE_URL.CLIENT}/${code}`)

    return response.data.data
}

export const addClients = async (data: ClientData): Promise<AxiosResponse> => {
    const response = APIClient.post(BASE_URL.CLIENT, data)

    return response
}

export const updateClient = async (
    clientCode: number,
    data: ClientData
): Promise<ClientData> => {
    const response = await APIClient.put(
        `${BASE_URL.CLIENT}/${clientCode}`,
        data
    )

    return response.data
}

export const deactivateClient = async (id: string): Promise<AxiosResponse> => {
    const response = await APIClient.patch(
        `${BASE_URL.CLIENT}/deactivate/${id}`
    )

    return response.data
}

export const deactivatingClients = async (): Promise<ClientData[]> => {
    const response = await APIClient.get(
        `${BASE_URL.CLIENT}/deactivatingClient`
    )

    return response.data.data
}

export const updateClientMembership = async (
    clientCode: number,
    data: any
): Promise<any> => {
    const response = await APIClient.put(
        `${BASE_URL.CLIENT}/updateMembership/${clientCode}`,
        data
    )

    return response.data
}

// export const deleteMember = async (id) => {
//     const response = await APIClient.delete(`${BASE_URL}/${id}`);
//     return response.data;
// };
