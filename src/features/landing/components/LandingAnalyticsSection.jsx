// src/features/landing/components/LandingAnalyticsSection.jsx
import { useState, useEffect, useCallback } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { pythonApi } from '@/services/apiClient';

// Paleta de colores corporativa alineada con la identidad visual de CESDE Conecta
const PIE_COLORS = ['#E11D74', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export const LandingAnalyticsSection = () => {
  const [analytics, setAnalytics] = useState({
    fuente_datos: 'spring_boot_live',
    total_retos: 0,
    total_empresas: 0,
    tasa_exito_global: 0,
    por_categoria: [],
    por_estado: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarResumen = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Petición asíncrona sin caché al microservicio de Python (Puerto 8000)
      const { data } = await pythonApi.get('/api/analytics/resumen', {
        params: { _t: Date.now() },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });

      setAnalytics({
        fuente_datos: data?.fuente_datos || 'spring_boot_live',
        total_retos: data?.total_retos ?? 0,
        total_empresas: data?.total_empresas ?? 0,
        tasa_exito_global: data?.tasa_exito_global ?? 0,
        por_categoria: Array.isArray(data?.por_categoria) ? data.por_categoria : [],
        por_estado: Array.isArray(data?.por_estado) ? data.por_estado : [],
      });
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          'No se pudo conectar con el motor de analítica en tiempo real (Puerto 8000).'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarResumen();
  }, [cargarResumen]);

  return (
    <section id="impacto-analitico" className="scroll-mt-28">
      {/* Encabezado de la sección */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/15 border border-primary-container/30 text-primary text-caption font-caption uppercase font-bold tracking-widest">
              <span className="material-symbols-outlined text-[15px]">
                analytics
              </span>
              Analítica en Tiempo Real · FastAPI + Pandas
            </span>

            {analytics.fuente_datos === 'synthetic_simulation' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-caption font-caption uppercase font-bold tracking-widest">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                Modo Simulación
              </span>
            )}
          </div>
          <h2 className="text-headline-xl font-headline-xl text-on-surface font-bold">
            Impacto del Ecosistema CESDE Conecta
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2 max-w-2xl">
            Visualización en vivo de las áreas tecnológicas más demandadas por el sector productivo y el estado actual de los desafíos de innovación abierta.
          </p>
        </div>

        {/* Píldoras de indicadores globales */}
        {!loading && !error && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-surface-container-low border border-white/10">
              <span className="block text-[11px] uppercase tracking-wider text-outline">
                Retos Totales
              </span>
              <span className="text-lg font-extrabold text-primary">
                {analytics.total_retos}
              </span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-surface-container-low border border-white/10">
              <span className="block text-[11px] uppercase tracking-wider text-outline">
                Empresas Aliadas
              </span>
              <span className="text-lg font-extrabold text-tertiary">
                {analytics.total_empresas}
              </span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-surface-container-low border border-white/10">
              <span className="block text-[11px] uppercase tracking-wider text-outline">
                Tasa de Éxito
              </span>
              <span className="text-lg font-extrabold text-emerald-400">
                {analytics.tasa_exito_global}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 1. Estado de Carga (Loading) */}
      {loading && (
        <div className="rounded-3xl bg-surface-container-low border border-white/5 p-12 flex flex-col items-center justify-center gap-4 min-h-[340px]">
          <div className="w-11 h-11 rounded-full border-4 border-primary-container/30 border-t-primary-container animate-spin" />
          <p className="text-body-md font-medium text-on-surface">
            Consultando métricas del ecosistema...
          </p>
        </div>
      )}

      {/* 2. Estado de Error */}
      {!loading && error && (
        <div className="rounded-3xl bg-surface-container-low border border-rose-500/30 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-rose-400 text-2xl shrink-0">
              cloud_off
            </span>
            <div>
              <h3 className="text-base font-bold text-on-surface">
                Servicio de analítica temporalmente fuera de línea
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-1">
                {error}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={cargarResumen}
            className="px-4 py-2 rounded-xl bg-primary-container text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* 3. Grid Responsive con las 2 Gráficas (BarChart + PieChart) */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfica 1: BarChart - Retos por Categoría Académica */}
          <div className="bg-surface-container-low rounded-3xl border border-white/5 p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">
                Retos por Categoría Técnica
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Volumen de desafíos radicados según línea académica del CESDE.
              </p>
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.por_categoria}
                  margin={{ top: 10, right: 16, left: -10, bottom: 25 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="categoria"
                    stroke="#94a3b8"
                    tick={{ fill: '#cbd5e1', fontSize: 11 }}
                    interval={0}
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: '#cbd5e1', fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#12141C',
                      borderColor: 'rgba(255,255,255,0.12)',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                    }}
                    cursor={{ fill: 'rgba(225, 29, 116, 0.08)' }}
                  />
                  <Bar
                    dataKey="total"
                    name="Cantidad de Retos"
                    fill="#E11D74"
                    radius={[8, 8, 0, 0]}
                    barSize={42}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfica 2: PieChart - Distribución por Estado de los Retos */}
          <div className="bg-surface-container-low rounded-3xl border border-white/5 p-6 sm:p-8 shadow-lg flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">
                Distribución por Estado del Reto
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Proporción actual del ciclo de vida de los proyectos integradores.
              </p>
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.por_estado}
                    dataKey="cantidad"
                    nameKey="nombre"
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                  >
                    {analytics.por_estado.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.estado || index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#12141C',
                      borderColor: 'rgba(255,255,255,0.12)',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LandingAnalyticsSection;

