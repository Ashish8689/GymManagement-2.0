import axios from 'axios'
import { ClientData } from '../../types/clientTypes'

const BASE_URL = `${process.env.REACT_APP_API_URL}/client`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getClients = async () => {
    const response = await axios.get(BASE_URL)

    return response.data.data.member
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const addClients = async (data: ClientData) => {
    const response = axios.post(BASE_URL, data)

    return response
}

// export const updateMember = async (id,data) => {
//     const response = await axios.put(`${BASE_URL}/${id}`,data);
//     return response.data;
// };

// export const updateMemberStatus = async (id,data) => {
//     const response = await axios.put(`${BASE_URL}/updateStatus/${id}`,data);
//     return response.data;
// };

// export const updateMembership = async (id,data) => {
//     const response = await axios.put(`${BASE_URL}/updateMembership/${id}`,data);
//     return response.data;
// };

// export const deleteMember = async (id) => {
//     const response = await axios.delete(`${BASE_URL}/${id}`);
//     return response.data;
// };
