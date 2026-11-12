// src/features/empresas/components/dashboard/ChallengeTable.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ESTADO_BADGE = {
  EN_CONVOCATORIA: {
    label: 'En Convocatoria',
    classes: 'bg-primary-container/15 text-primary border-primary-container/30',
    dot: 'bg-primary-container animate-pulse',
  },
  RADICADO: {
    label: 'En Convocatoria',
    classes: 'bg-primary-container/15 text-primary border-primary-container/30',
    dot: 'bg-primary-container animate-pulse',
  },
  EN_REVISION: {
    label: 'En Revisión',
    classes: 'bg-surface-variant/60 text-on-surface-variant border-outline-variant/30',
    dot: 'bg-outline',
  },
  EN_DESARROLLO: {
    label: 'En Desarrollo',
    classes: 'bg-tertiary-container/20 text-tertiary border-tertiary-container/40',
    dot: 'bg-tertiary',
  },
  ASIGNADO: {
    label: 'En Desarrollo',
    classes: 'bg-tertiary-container/20 text-tertiary border-tertiary-container/40',
    dot: 'bg-tertiary',
  },
  FINALIZADO: {
    label: 'Finalizado',
    classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  RESUELTO: {
    label: 'Finalizado',
    classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  APLAZADO: {
    label: 'Aplazado',
    classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    dot: 'bg-amber-400',
  },
  CANCELADO: {
    label: 'Cancelado',
    classes: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    dot: 'bg-rose-400',
  },
  RECHAZADO: {
    label: 'Rechazado',
    classes: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    dot: 'bg-rose-400',
  },
};

export const ChallengeTable = ({ retos = [], loading = false }) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const totalTodos = retos.length;
  const totalConvocatoria = retos.filter((r) => {
    const est = r.estadoActual || r.estado;
    return est === 'EN_CONVOCATORIA' || est === 'RADICADO';
  }).length;
  const totalDesarrollo = retos.filter((r) => {
    const est = r.estadoActual || r.estado;
    return est === 'EN_DESARROLLO' || est === 'ASIGNADO' || est === 'EN_REVISION';
  }).length;
  const totalFinalizados = retos.filter((r) => {
    const est = r.estadoActual || r.estado;
    return est === 'FINALIZADO' || est === 'RESUELTO';
  }).length;

  const retosVisibles = useMemo(() => {
    return retos.filter((r) => {
      const est = r.estadoActual || r.estado;

      if (filtroEstado === 'CONVOCATORIA' && est !== 'EN_CONVOCATORIA' && est !== 'RADICADO') {
        return false;
      }
      if (
        filtroEstado === 'DESARROLLO' &&
        est !== 'EN_DESARROLLO' &&
        est !== 'ASIGNADO' &&
        est !== 'EN_REVISION'
      ) {
        return false;
      }
      if (filtroEstado === 'FINALIZADO' && est !== 'FINALIZADO' && est !== 'RESUELTO') {
        return false;
      }

      if (busqueda.trim()) {
        const q = busqueda.toLowerCase();
        const coincideNombre = (r.nombre || '').toLowerCase().includes(q);
        const coincideEmpresa = (r.nombreEmpresa || '').toLowerCase().includes(q);
        const coincideCategoria = (r.nombreCategoria || '').toLowerCase().includes(q);
        return coincideNombre || coincideEmpresa || coincideCategoria;
      }

      return true;
    });
  }, [retos, filtroEstado, busqueda]);

  return (
    <div className="bg-surface-container-low rounded-3xl border border-white/5 p-6 shadow-xl">
      {/* Encabezado de Sección y Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-surface font-bold">
            Gestión de Retos Publicados
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            Supervisa convocatorias, equipos asignados y avances técnicos.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <input
              className="w-full pl-8 pr-3 py-1.5 bg-surface-container rounded-lg border border-white/10 text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container"
              placeholder="Filtrar por reto o empresa..."
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-base text-outline">
              filter_alt
            </span>
          </div>
        </div>
      </div>

      {/* Píldoras de Filtro Rápido */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto custom-scrollbar">
        <button
          type="button"
          onClick={() => setFiltroEstado('TODOS')}
          className={`px-3 py-1 rounded-full text-caption font-caption font-semibold cursor-pointer transition-colors ${
            filtroEstado === 'TODOS'
              ? 'bg-primary-container text-on-primary-container'
              : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Todos ({totalTodos})
        </button>
        <button
          type="button"
          onClick={() => setFiltroEstado('CONVOCATORIA')}
          className={`px-3 py-1 rounded-full text-caption font-caption font-medium cursor-pointer transition-colors ${
            filtroEstado === 'CONVOCATORIA'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
          }`}
        >
          En Convocatoria ({totalConvocatoria})
        </button>
        <button
          type="button"
          onClick={() => setFiltroEstado('DESARROLLO')}
          className={`px-3 py-1 rounded-full text-caption font-caption font-medium cursor-pointer transition-colors ${
            filtroEstado === 'DESARROLLO'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
          }`}
        >
          En Desarrollo ({totalDesarrollo})
        </button>
        <button
          type="button"
          onClick={() => setFiltroEstado('FINALIZADO')}
          className={`px-3 py-1 rounded-full text-caption font-caption font-medium cursor-pointer transition-colors ${
            filtroEstado === 'FINALIZADO'
              ? 'bg-primary-container text-on-primary-container font-semibold'
              : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Finalizados ({totalFinalizados})
        </button>
      </div>

      {/* TABLA DE RETOS INTERACTIVA */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-variant/40 text-outline text-caption font-caption uppercase tracking-wider">
              <th className="py-3 px-4">Reto &amp; Área</th>
              <th className="py-3 px-4">Cronograma</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Empresa</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-body-sm font-body-sm">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                  Cargando retos...
                </td>
              </tr>
            ) : retosVisibles.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                  No hay retos registrados para mostrar.
                </td>
              </tr>
            ) : (
              retosVisibles.map((reto) => {
                const estadoKey = reto.estadoActual || reto.estado || 'EN_CONVOCATORIA';
                const badge = ESTADO_BADGE[estadoKey] || ESTADO_BADGE.EN_CONVOCATORIA;
                return (
                  <tr
                    key={reto.id}
                    className="bg-surface-container/60 hover:bg-surface-container transition-colors rounded-xl group border-l-4 border-l-primary-container"
                  >
                    <td className="py-4 px-4">
                      <Link
                        to={`/dashboard/retos/${reto.id}`}
                        className="font-semibold text-on-surface group-hover:text-primary transition-colors block"
                      >
                        {reto.nombre}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-tertiary">
                          {reto.nombreCategoria || 'Categoría General'}
                        </span>
                        <span className="text-caption font-caption text-outline">
                          Prioridad {reto.nombrePrioridad || 'Media'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">
                      <div className="text-body-sm font-medium text-on-surface">
                        Cierre: {reto.fechaFin || 'Por definir'}
                      </div>
                      <div className="text-caption text-outline">
                        Inicio: {reto.fechaInicio || 'Inmediato'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-caption font-semibold border ${badge.classes}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">
                      {reto.nombreEmpresa || 'CESDE Aliado'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/dashboard/retos/${reto.id}`}
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1 text-caption font-caption font-medium"
                        >
                          <span className="material-symbols-outlined text-sm">
                            visibility
                          </span>
                          <span>Ver</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pie de tabla */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-caption font-caption text-outline">
        <div>
          Mostrando {retosVisibles.length} de {totalTodos} retos registrados
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded bg-surface-container hover:bg-surface-container-high disabled:opacity-30"
            disabled
          >
            <span className="material-symbols-outlined text-base">
              chevron_left
            </span>
          </button>
          <span className="px-2 text-on-surface">Página 1 de 1</span>
          <button
            className="p-1 rounded bg-surface-container hover:bg-surface-container-high disabled:opacity-30"
            disabled
          >
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeTable;
