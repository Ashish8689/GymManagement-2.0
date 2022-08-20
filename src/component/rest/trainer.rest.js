import axios from 'axios';

const BASE_URL =  `${process.env.REACT_APP_API_URL}/trainer`;


export const getTrainer = async () => {
    const response = await axios.get(BASE_URL);
    return response.data.data.trainer;
};

export const addTrainer = async (data) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
};

export const updateTrainer = async (_id,data) => {
    const response = await axios.put(`${BASE_URL}/${_id}`,data);
    return response.data;
};

export const deleteTrainer = async (_id) => {
    const response = await axios.delete(`${BASE_URL}/${_id}`);
    return response.data;
};

