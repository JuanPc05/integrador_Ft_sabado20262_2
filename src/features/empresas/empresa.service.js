// src/features/empresas/empresa.service.js
import { httpClient } from '@/core/httpClient';

const EMPRESAS_BASE_PATH = '/api/empresas';

export const empresaService = {
  listar: () => httpClient.get(EMPRESAS_BASE_PATH),
  obtenerPorId: (id) => httpClient.get(`${EMPRESAS_BASE_PATH}/${id}`),
  crear: (payload) => httpClient.post(EMPRESAS_BASE_PATH, payload),
  actualizar: (id, payload) => httpClient.put(`${EMPRESAS_BASE_PATH}/${id}`, payload),
  desactivar: (id) => httpClient.delete(`${EMPRESAS_BASE_PATH}/${id}`),
};

export default empresaService;

