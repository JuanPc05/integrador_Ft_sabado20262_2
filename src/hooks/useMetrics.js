// src/hooks/useMetrics.js
import { useState, useEffect, useCallback } from 'react';
import { pythonApi } from '@/services/apiClient';

/**
 * Custom Hook para consumir los KPIs analíticos desde el microservicio FastAPI (Puerto 8000).
 * Desacopla la lógica de red y estado (loading, error, data) de la vista de React.
 */
export const useMetrics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Petición GET al microservicio de Python usando la instancia sin interceptor JWT
      const response = await pythonApi.get('/v1/metrics/top-companies');

      // TopCompaniesResponse devuelve la lista de empresas dentro de `response.data.data`
      const metricsArray = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
          ? response.data
          : [];

      setData(metricsArray);
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
    loading,
    error,
    refetch: fetchTopCompanies,
  };
};

export default useMetrics;

