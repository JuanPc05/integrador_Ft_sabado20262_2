// src/services/reto.service.js
import { httpClient } from '@/services/httpClient';

const RETOS_BASE_PATH = '/api/retos';

export const retoService = {
  listar: () => httpClient.get(RETOS_BASE_PATH),
  obtenerPorId: (id) => httpClient.get(`${RETOS_BASE_PATH}/${id}`),
  crear: (payload) => httpClient.post(RETOS_BASE_PATH, payload),
  actualizar: (id, payload) => httpClient.put(`${RETOS_BASE_PATH}/${id}`, payload),
  eliminar: (id) => httpClient.delete(`${RETOS_BASE_PATH}/${id}`),
};

export default retoService;

