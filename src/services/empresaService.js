import { apiFetch } from './api';

// POST /api/empresas
export const crearEmpresa = (datos) =>
  apiFetch('/api/empresas', { method: 'POST', body: JSON.stringify(datos) });

// GET /api/empresas/{id}
export const obtenerEmpresa = (id) => apiFetch(`/api/empresas/${id}`);
