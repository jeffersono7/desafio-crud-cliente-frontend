import axios from 'axios';

const getToken = () => {

    try {
        return localStorage.getItem('token');
    } catch {
        return '';
    }
};

const getHeadersToken = (token) => ({
    Authorization: `Bearer ${token}`,
})

const api = axios.create({ baseURL: 'http://localhost:8080' });

api.interceptors.request.use((request) => {

    request.headers = getHeadersToken(getToken());

    return request;
})

api.interceptors.response.use((response) => {

    if (response.status === 401) {
        console.log('token expired!');
    }

    return response;
})

export default api;