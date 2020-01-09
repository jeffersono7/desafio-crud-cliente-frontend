import api from './api';

const clienteApi = {

    obterTodos: () => api.get('/clientes'),
    obterPorId: (id) => api.get(`/cliente/${id}`),
    criar: (cliente) => api.post('/clientes', cliente),
    atualizar: (cliente) => api.put('/clientes', cliente),
    deletar: (id) => api.delete(`/clientes/${id}`),
}

export default clienteApi;
