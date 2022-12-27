import { AxiosResponse } from 'axios'

import APIClient from './index.rest'
import { BASE_URL } from '../../constants/url.constant'
import { TrainerCode, TrainerData } from '../../interface/trainer.interface'

export const generateTrainerCode = async (): Promise<TrainerCode> => {
    const response = await APIClient.get(`${BASE_URL.TRAINER}/trainerCode`)

    return response.data
}

export const getTrainers = async (): Promise<TrainerData[]> => {
    const response = await APIClient.get(BASE_URL.TRAINER)

    return response.data.data
}

export const addTrainer = async (data: TrainerData): Promise<TrainerData> => {
    const response = await APIClient.post(BASE_URL.TRAINER, data)

    return response.data
}

export const getTrainerByCode = async (code: string): Promise<TrainerData> => {
    const response = await APIClient.get(`${BASE_URL.TRAINER}/${code}`)

    return response.data.data
}

export const updateTrainer = async (
    trainerCode: number,
    data: TrainerData
): Promise<TrainerData> => {
    const response = await APIClient.put(
        `${BASE_URL.TRAINER}/${trainerCode}`,
        data
    )

    return response.data
}

export const deactivateTrainer = async (id: string): Promise<AxiosResponse> => {
    const response = await APIClient.patch(
        `${BASE_URL.TRAINER}/deactivate/${id}`
    )

    return response.data
}
