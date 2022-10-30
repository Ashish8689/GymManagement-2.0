import axios, { AxiosResponse } from 'axios'
import { TrainerCode, TrainerData } from '../../types/trainer.interface'

const BASE_URL = `${process.env.REACT_APP_API_URL}/trainer`

export const generateTrainerCode = async (): Promise<TrainerCode> => {
    const response = await axios.get(`${BASE_URL}/trainerCode`)

    return response.data
}

export const getTrainers = async (): Promise<TrainerData[]> => {
    const response = await axios.get(BASE_URL)

    return response.data.data
}

export const addTrainer = async (data: TrainerData): Promise<TrainerData> => {
    const response = await axios.post(BASE_URL, data)

    return response.data
}

export const updateTrainer = async (
    trainerCode: number,
    data: TrainerData
): Promise<TrainerData> => {
    const response = await axios.put(`${BASE_URL}/${trainerCode}`, data)

    return response.data
}

export const deactivateTrainer = async (id: string): Promise<AxiosResponse> => {
    const response = await axios.patch(`${BASE_URL}/deactivate/${id}`)

    return response.data
}
