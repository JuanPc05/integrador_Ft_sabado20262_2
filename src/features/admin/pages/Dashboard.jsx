// src/features/admin/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useMetrics } from '@/hooks/useMetrics';

export const Dashboard = () => {
  const { data, loading, error, refetch } = useMetrics();

  // Cálculo rápido de totales para las tarjetas resumen superiores
  const totalRetosGlobal = data.reduce(
    (acc, item) => acc + (item.total_retos || 0),
    0
  );
  const totalFinalizadosGlobal = data.reduce(
    (acc, item) => acc + (item.retos_finalizados || 0),
    0
  );
  const promedioCumplimiento =
    data.length > 0
      ? (
          data.reduce((acc, item) => acc + (item.tasa_cumplimiento || 0), 0) /
          data.length
        ).toFixed(1)
      : '0.0';

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Encabezado del Dashboard Analítico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px]">
              monitoring
            </span>
            <span>Misión 2 · Analytics API (FastAPI + Pandas)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Dashboard Analítico de Innovación
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Indicadores clave de desempeño (KPIs) por empresa aliados a CESDE Conecta.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button
            type="button"
            onClick={refetch}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              refresh
            </span>
            <span>Actualizar KPIs</span>
          </button>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-medium transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[18px] text-indigo-400">
              arrow_back
            </span>
            <span>Volver</span>
          </Link>
        </div>
      </div>

      {/* 1. Estado de Carga (Loading Skeleton / Spinner) */}
      {loading && (
        <div className="w-full rounded-2xl bg-slate-900/70 border border-slate-800 p-12 flex flex-col items-center justify-center gap-4 min-h-[380px]">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          <p className="text-slate-300 font-medium text-base">
            Procesando métricas en tiempo real con Pandas...
          </p>
          <span className="text-xs text-slate-500">
            Consultando http://localhost:8000/v1/metrics/top-companies
          </span>
        </div>
      )}

      {/* 2. Estado de Error Amigable */}
      {!loading && error && (
        <div className="w-full rounded-2xl bg-rose-950/40 border border-rose-500/40 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
              <span className="material-symbols-outlined text-[28px]">
                error
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-200">
                No fue posible cargar las métricas analíticas
              </h2>
              <p className="text-sm text-rose-300/90 mt-1">{error}</p>
              <p className="text-xs text-rose-400/80 mt-2">
                Verifica que el microservicio FastAPI esté activo en el puerto 8000 (`uvicorn api.main:app --reload --port 8000`).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={refetch}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-colors cursor-pointer shrink-0"
          >
            Reintentar conexión
          </button>
        </div>
      )}

      {/* 3. Contenido Principal (Tarjetas KPI + Gráfico de Barras Recharts) */}
      {!loading && !error && (
        <>
          {/* Tarjetas de Resumen Rápido */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Empresas en el Ranking
              </span>
              <p className="text-3xl font-extrabold text-white mt-2">
                {data.length}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Total Retos Analizados
              </span>
              <p className="text-3xl font-extrabold text-indigo-400 mt-2">
                {totalRetosGlobal}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Cumplimiento Promedio ({totalFinalizadosGlobal} Finalizados)
              </span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">
                {promedioCumplimiento}%
              </p>
            </div>
          </div>

          {/* Contenedor del Gráfico de Barras (Recharts) */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                  Top Empresas por Volumen de Retos Radicados
                </h2>
                <p className="text-sm text-slate-400">
                  Comparativa de retos totales frente a retos finalizados por organización.
                </p>
              </div>
            </div>

            {data.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                No hay registros de métricas disponibles para graficar.
              </div>
            ) : (
              <div className="w-full h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#334155"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="nombre"
                      stroke="#94a3b8"
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                      angle={-15}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      tick={{ fill: '#cbd5e1', fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        color: '#f8fafc',
                      }}
                      cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px', color: '#cbd5e1' }}
                    />
                    <Bar
                      dataKey="total_retos"
                      name="Total de Retos"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                      barSize={38}
                    />
                    <Bar
                      dataKey="retos_finalizados"
                      name="Retos Finalizados"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                      barSize={38}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

