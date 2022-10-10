import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/login`;

export const authenticateLoginData = async (data) => {
    const response = await axios.post(BASE_URL, data , {
        withCredentials: true,
      });
    return response.data;
};
