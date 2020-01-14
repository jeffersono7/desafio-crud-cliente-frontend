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

const ignoreUrlBase = 'https://viacep.com.br';

api.interceptors.request.use((request) => {

    if (!request.url.includes(ignoreUrlBase)) {
        request.headers = {
            ...request.headers,
            ...getHeadersToken(getToken()),
        };
    }

    return request;
})

api.interceptors.response.use((response) => {

    if (response.status === 401) {
        window.location.href = window.location.origin;
    }

    return response;
})

export default api;