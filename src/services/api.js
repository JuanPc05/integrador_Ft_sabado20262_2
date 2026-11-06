// Dirección del backend. Si algún día cambia, se define VITE_API_URL en un archivo .env
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

function extraerMensaje(data) {
  if (!data) return null;
  if (typeof data === 'string') return data;
  if (Array.isArray(data.errors) && data.errors.length) {
    return data.errors.map((e) => e.defaultMessage || e.message || e).join(' ');
  }
  if (data.errors && typeof data.errors === 'object') {
    return Object.values(data.errors).join(' ');
  }
  return data.message || data.error || data.detail || null;
}

// Hace la petición al backend y devuelve el JSON. Si algo falla, lanza un Error con un mensaje legible.
export async function apiFetch(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisa que el backend esté encendido.');
  }

  if (response.status === 204) return null;

  const texto = await response.text();
  let data = null;
  try {
    data = texto ? JSON.parse(texto) : null;
  } catch {
    data = texto || null;
  }

  if (!response.ok) {
    throw new Error(extraerMensaje(data) ?? `Error ${response.status}`);
  }
  return data;
}
