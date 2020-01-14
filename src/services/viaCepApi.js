import api from './api';

export const viaCepApi = {
    consultarCep: cep => api.get(`https://viacep.com.br/ws/${cep}/json`),
}
