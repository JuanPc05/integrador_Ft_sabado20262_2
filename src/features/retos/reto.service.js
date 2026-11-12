// src/features/retos/reto.service.js
import { springApi } from '@/services/apiClient';

const RETOS_BASE_PATH = '/api/retos';

export const retoService = {
  listar: () => springApi.get(RETOS_BASE_PATH).then((r) => r.data),
  obtenerTodos: () => springApi.get(RETOS_BASE_PATH).then((r) => r.data),
  obtenerPorId: (id) => springApi.get(`${RETOS_BASE_PATH}/${id}`).then((r) => r.data),
  crear: (payload) => springApi.post(RETOS_BASE_PATH, payload).then((r) => r.data),
  actualizar: (id, payload) => springApi.put(`${RETOS_BASE_PATH}/${id}`, payload).then((r) => r.data),
  actualizarEstado: (id, estadoActual) =>
    springApi.patch(`${RETOS_BASE_PATH}/${id}/estado`, { estadoActual }).then((r) => r.data),
  eliminar: (id) => springApi.delete(`${RETOS_BASE_PATH}/${id}`).then((r) => r.data),
  listarCategorias: () => springApi.get('/api/categorias').then((r) => r.data),
  crearCategoria: (payload) => springApi.post('/api/categorias', payload).then((r) => r.data),
  listarPrioridades: () => springApi.get('/api/prioridades').then((r) => r.data),
  crearPrioridad: (payload) => springApi.post('/api/prioridades', payload).then((r) => r.data),
};

export default retoService;
