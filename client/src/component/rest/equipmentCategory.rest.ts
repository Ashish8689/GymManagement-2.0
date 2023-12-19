import { AxiosResponse } from 'axios'
import { BASE_URL } from 'constants/url.constant'
import { Category } from 'pages/Equipments/Category/category.interface'
import { Equipment } from 'pages/Equipments/Equipment/Equipment.interface'
import APIClient from './index.rest'

export const getCategoryList = async (): Promise<Category[]> => {
    const response = await APIClient.get(BASE_URL.EQUIPMENT_CATEGORY)

    return response.data.data
}

export const getCategoryByName = async (
    category: string
): Promise<Category> => {
    const response = await APIClient.get(
        `${BASE_URL.EQUIPMENT_CATEGORY}/${category}`
    )

    return response.data
}

export const addEquipmentCategory = async (
    data: Category
): Promise<AxiosResponse> => {
    const response = APIClient.post(BASE_URL.EQUIPMENT_CATEGORY, data)

    return response
}

export const updateEquipmentCategory = async (
    id: string,
    data: Category
): Promise<Category> => {
    const response = await APIClient.put(
        `${BASE_URL.EQUIPMENT_CATEGORY}/${id}`,
        data
    )

    return response.data
}

export const deleteCategoryAPI = async (id: string): Promise<Category> => {
    const response = await APIClient.delete(
        `${BASE_URL.EQUIPMENT_CATEGORY}/${id}`
    )

    return response.data
}

// Equipments rest functions

export const addEquipment = async (data: Category): Promise<AxiosResponse> => {
    const response = APIClient.post(BASE_URL.EQUIPMENT, data)

    return response
}

export const getEquipmentsByCategory = async (
    category: string
): Promise<Equipment[]> => {
    const response = await APIClient.get(`${BASE_URL.EQUIPMENT}/${category}`)

    return response.data.data
}

export const deleteEquipmentAPI = async (id: string): Promise<Equipment> => {
    const response = await APIClient.delete(`${BASE_URL.EQUIPMENT}/${id}`)

    return response.data
}
