// src/services/auth.service.js
import { httpClient } from '@/services/httpClient';

const AUTH_BASE_PATH = '/api/v1/auth';

/**
 * Servicio de Dominio para Autenticación.
 * Cumple con SRP y DIP: encapsula los endpoints de autenticación y delega el transporte a httpClient.
 */
export const authService = {
  /**
   * Inicia sesión con credenciales de usuario.
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ accessToken: string, refreshToken?: string, usuario?: object }>}
   */
  login: (credentials) => {
    return httpClient.post(`${AUTH_BASE_PATH}/login`, credentials);
  },

  /**
   * Registra un nuevo usuario en la plataforma.
   * @param {object} userData - Datos alineados con UsuarioRequestDTO
   * @returns {Promise<object>} UsuarioResponseDTO
   */
  register: (userData) => {
    return httpClient.post(`${AUTH_BASE_PATH}/register`, userData);
  },
};

export default authService;

