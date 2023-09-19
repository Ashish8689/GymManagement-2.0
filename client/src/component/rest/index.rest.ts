import axios from 'axios'
// import Qs from 'qs';

const axiosClient = axios.create({
    // baseURL: '/api/v1',
    baseURL: 'http://localhost:8000',
    // paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'comma' }),
})

export default axiosClient
