import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_API_URL}/gym`

export const getGym = async () => {
    const response = await axios.get(BASE_URL)

    return response.data.data.gym
}

export const addGym = async (data) => {
    const response = await axios.post(BASE_URL, data)

    return response.data
}

export const updateGym = async (id, data) => {
    const response = await axios.put(`${BASE_URL}/${id}`, data)

    return response.data
}

export const updateGymStatus = async (id, data) => {
    const response = await axios.put(`${BASE_URL}/updateStatus/${id}`, data)

    return response.data
}

export const deleteGym = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`)

    return response.data
}
