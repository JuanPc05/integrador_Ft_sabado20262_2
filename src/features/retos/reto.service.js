// src/services/reto.service.js
import { httpClient } from '@/core/httpClient';

const RETOS_BASE_PATH = '/api/retos';

export const retoService = {
  listar: () => httpClient.get(RETOS_BASE_PATH),
  obtenerTodos: () => httpClient.get(RETOS_BASE_PATH),
  obtenerPorId: (id) => httpClient.get(`${RETOS_BASE_PATH}/${id}`),
  crear: (payload) => httpClient.post(RETOS_BASE_PATH, payload),
  actualizar: (id, payload) => httpClient.put(`${RETOS_BASE_PATH}/${id}`, payload),
  eliminar: (id) => httpClient.delete(`${RETOS_BASE_PATH}/${id}`),
  listarCategorias: () => httpClient.get('/api/categorias'),
  crearCategoria: (payload) => httpClient.post('/api/categorias', payload),
  listarPrioridades: () => httpClient.get('/api/prioridades'),
  crearPrioridad: (payload) => httpClient.post('/api/prioridades', payload),
};

export default retoService;

