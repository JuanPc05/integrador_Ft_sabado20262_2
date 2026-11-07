// src/features/auth/auth.service.js
import { httpClient } from '@/core/httpClient';

const AUTH_BASE_PATH = '/api/v1/auth';
const USUARIOS_BASE_PATH = '/api/v1/usuarios';

/**
 * Servicio de Dominio para Autenticación y Perfil de Usuario.
 */
export const authService = {
  login: (credentials) => {
    return httpClient.post(`${AUTH_BASE_PATH}/login`, credentials);
  },

  register: (userData) => {
    return httpClient.post(`${AUTH_BASE_PATH}/register`, userData);
  },

  updateProfile: (id, payload) => {
    return httpClient.put(`${USUARIOS_BASE_PATH}/${id}`, payload);
  },
};

export default authService;
