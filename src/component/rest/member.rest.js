import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/member`;

export const getMember = async () => {
    const response = await axios.get(BASE_URL);
    return response.data.data.member;
};

export const addMember = async (data) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
};

export const updateMember = async (id,data) => {
    const response = await axios.put(`${BASE_URL}/${id}`,data);
    return response.data;
};

export const updateMemberStatus = async (id,data) => {
    const response = await axios.put(`${BASE_URL}/updateStatus/${id}`,data);
    return response.data;
};

export const updateMembership = async (id,data) => {
    const response = await axios.put(`${BASE_URL}/updateMembership/${id}`,data);
    return response.data;
};

export const deleteMember = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};
