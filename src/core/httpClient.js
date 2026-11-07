// src/core/httpClient.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const TOKEN_STORAGE_KEY = 'accessToken';
export const USER_STORAGE_KEY = 'cesde_user';

/**
 * Extrae el mensaje detallado de validación o error de negocio enviado por Spring Boot.
 * Soporta tanto mapas/arrays de validación (validationErrors, errors, errores)
 * como mensajes directos (message, mensaje).
 */
function extractBackendErrorMessage(errorData, status) {
  if (!errorData) {
    return `Error en la petición HTTP (${status})`;
  }

  // 1. Buscar en colecciones de errores de validación de campos (MethodArgumentNotValidException)
  const validationContainer =
    errorData.validationErrors || errorData.errors || errorData.errores;

  if (validationContainer) {
    // Si es un Array (ej. [{ defaultMessage: "..." }] o ["..."])
    if (Array.isArray(validationContainer) && validationContainer.length > 0) {
      const messages = validationContainer
        .map((item) =>
          typeof item === 'string'
            ? item
            : item?.defaultMessage || item?.message || item?.mensaje
        )
        .filter(Boolean);

      if (messages.length > 0) {
        return messages.join(' ');
      }
    }

    // Si es un Objeto/Mapa clave-valor (ej. { password: "La contraseña debe tener entre 8 y 100 caracteres." })
    if (typeof validationContainer === 'object' && !Array.isArray(validationContainer)) {
      const messages = Object.values(validationContainer).filter(
        (val) => typeof val === 'string' && val.trim().length > 0
      );

      if (messages.length > 0) {
        return messages.join(' ');
      }
    }
  }

  // 2. Si no hay errores de campos específicos, usar message o mensaje
  if (errorData.message) {
    return errorData.message;
  }

  if (errorData.mensaje) {
    return errorData.mensaje;
  }

  if (errorData.error) {
    return errorData.error;
  }

  // 3. Fallback genérico por defecto
  return `Ocurrió un error inesperado en el servidor (${status}).`;
}

/**
 * Función núcleo que intercepta peticiones, inyecta el JWT y procesa respuestas HTTP.
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

  // Si la respuesta NO es exitosa, parsear el cuerpo del error antes de lanzar
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const mensajeExtraido = extractBackendErrorMessage(errorData, response.status);
    throw new Error(mensajeExtraido);
  }

  // Manejo de respuestas exitosas sin contenido (204 No Content)
  if (response.status === 204) {
    return null;
  }

  return response.json().catch(() => null);
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
