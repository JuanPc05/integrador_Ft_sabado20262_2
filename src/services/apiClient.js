// src/services/apiClient.js
import axios from 'axios';

/**
 * URLs base obtenidas desde las variables de entorno de Vite (.env.development)
 * con fallback seguro a los puertos locales por defecto.
 */
const SPRING_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const PYTHON_BASE_URL =
  import.meta.env.VITE_PYTHON_API_BASE_URL || 'http://localhost:8000';

/**
 * 1. Instancia de Axios para el Backend Central en Spring Boot (Puerto 8080)
 * Maneja toda la lógica transaccional (Autenticación, Empresas, Retos, Catálogos).
 */
export const springApi = axios.create({
  baseURL: SPRING_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Interceptor de Petición (Request Interceptor) EXCLUSIVO para springApi.
 * Se ejecuta automáticamente antes de que cada petición HTTP salga hacia Spring Boot.
 */
springApi.interceptors.request.use(
  (config) => {
    // Obtiene el token JWT almacenado en localStorage (soporta 'token' y 'accessToken' usado en AuthContext)
    const token =
      localStorage.getItem('token') || localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 2. Instancia de Axios para el Microservicio Analítico en Python/FastAPI (Puerto 8000)
 * API de solo lectura para consumo de KPIs y métricas en formato JSON.
 * NO incluye el interceptor JWT para evitar enviar credenciales innecesarias o disparar preflights extra.
 */
export const pythonApi = axios.create({
  baseURL: PYTHON_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  springApi,
  pythonApi,
};

