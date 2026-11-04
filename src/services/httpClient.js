// src/services/httpClient.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const TOKEN_STORAGE_KEY = 'accessToken';
export const USER_STORAGE_KEY = 'cesde_user';

/**
 * Error personalizado para respuestas HTTP no exitosas.
 */
export class HttpError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Función núcleo que intercepta peticiones, inyecta el JWT y procesa respuestas HTTP.
 * Cumple con SRP: su única responsabilidad es el transporte HTTP.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  // Manejo de respuestas sin contenido (204 No Content)
  if (response.status === 204) {
    return null;
  }

  // Intentar parsear el cuerpo como JSON de forma segura
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Extrae el mensaje estructurado del backend (ErrorResponse de Spring Boot: data.mensaje)
    const backendMessage =
      data?.mensaje ||
      data?.message ||
      data?.error ||
      `Error en la petición HTTP (${response.status})`;

    throw new HttpError(backendMessage, response.status, data);
  }

  return data;
}

export const httpClient = {
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'DELETE' }),
};

export default httpClient;

