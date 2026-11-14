// src/hooks/useMetrics.js
import { useState, useEffect, useCallback } from 'react';
import { pythonApi } from '@/services/apiClient';

/**
 * Custom Hook para consumir los KPIs analíticos desde el microservicio FastAPI (Puerto 8000).
 * Desacopla la lógica de red y estado (loading, error, data, fuenteDatos) de la vista de React.
 */
export const useMetrics = () => {
  const [data, setData] = useState([]);
  const [fuenteDatos, setFuenteDatos] = useState('spring_boot_live');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Petición GET sin caché estática para traer siempre los datos frescos desde MySQL vía FastAPI
      const response = await pythonApi.get('/v1/metrics/top-companies', {
        params: { _t: Date.now() },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      const metricsArray = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
          ? response.data
          : [];

      setData(metricsArray);
      setFuenteDatos(response.data?.fuente_datos || 'spring_boot_live');
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        'No se pudo conectar con el microservicio de analítica (Puerto 8000).';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopCompanies();
  }, [fetchTopCompanies]);

  return {
    data,
    fuenteDatos,
    loading,
    error,
    refetch: fetchTopCompanies,
  };
};

export default useMetrics;

