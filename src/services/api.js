import axios from 'axios';

const token = '';

headers = {
    Authorization: `Bearer ${token}`,
}

const api = axios.create({ baseURL: 'http://localhost:8080', headers });

export default api;