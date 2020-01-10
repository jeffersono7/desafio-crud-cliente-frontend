import api from './api';

const tipoClienteApi = {
    obterTodos: () => api.get('/tipos-telefone')
}

export default tipoClienteApi;