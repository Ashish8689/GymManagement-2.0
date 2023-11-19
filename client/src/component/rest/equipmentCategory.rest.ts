import { AxiosResponse } from 'axios'
import { BASE_URL } from 'constants/url.constant'
import { CategoryData } from 'pages/EquipmentsCategory/equipments.interface'
import APIClient from './index.rest'

export const getEquipmentCategory = async (): Promise<CategoryData[]> => {
    const response = await APIClient.get(BASE_URL.EQUIPMENT_CATEGORY)

    return response.data.data
}

export const addEquipmentCategory = async (
    data: CategoryData
): Promise<AxiosResponse> => {
    const response = APIClient.post(BASE_URL.CLIENT, data)

    return response
}

export const updateEquipmentCategory = async (
    id: string,
    data: CategoryData
): Promise<CategoryData> => {
    const response = await APIClient.put(`${BASE_URL.CLIENT}/${id}`, data)

    return response.data
}
