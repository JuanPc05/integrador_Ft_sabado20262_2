// src/features/retos/DetalleRetoPage.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { retoService } from '@/features/retos/reto.service';
import { useAuth } from '@/features/auth/useAuth';
import {
  ChallengeTabs,
  TeamSubmissionsList,
  ChallengeSidebar,
  CriteriaCard,
} from '@/features/retos/detalleReto';

function formatearFecha(fechaStr) {
  if (!fechaStr) return 'Por definir';
  const fecha = new Date(fechaStr);
  if (Number.isNaN(fecha.getTime())) return fechaStr;
  return fecha.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function calcularDiasRestantes(fechaStr) {
  if (!fechaStr) return null;
  const hoy = new Date();
  const limite = new Date(fechaStr);
  if (Number.isNaN(limite.getTime())) return null;
  const diffTime = limite.getTime() - hoy.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export function DetalleRetoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reto, setReto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('postulaciones');

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    const cargarReto = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await retoService.obtenerPorId(id);
        if (isMounted) {
          setReto(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.message || 'No fue posible cargar la información del reto.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    cargarReto();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-on-surface-variant">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          progress_activity
        </span>
        <p className="text-body-md font-body-md">
          Cargando detalle del reto...
        </p>
      </div>
    );
  }

  if (error || !reto) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-3xl bg-surface-container-low border border-red-500/30 p-8 text-center flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-4xl text-red-400">
          error
        </span>
        <p className="text-body-md font-body-md text-red-200">
          {error || 'No se encontró el reto solicitado.'}
        </p>
        <Link
          to="/dashboard"
          className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold"
        >
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  const tituloReto = reto.titulo || reto.nombre || 'Reto sin título';
  const nombreEmpresa =
    reto.empresa?.nombre || reto.nombreEmpresa || 'Empresa Aliada CESDE';
  const nombreCategoria =
    reto.categoria?.nombre || reto.nombreCategoria || 'Sin categoría';
  const nombrePrioridad =
    reto.prioridad?.nombre || reto.nombrePrioridad || 'Prioridad Estándar';
  const estadoActual = reto.estadoActual || reto.estado || 'RADICADO';
  // Los estudiantes solo consultan el reto: editar queda para admin y empresa
  const puedeEditar =
    user?.rol === 'ADMIN_UNIVERSIDAD' || user?.rol === 'REPRESENTANTE_EMPRESA';
  const fechaCreacionFormateada = reto.fechaCreacion ? formatearFecha(reto.fechaCreacion) : null;

  const fechaInicioFormateada = formatearFecha(reto.fechaInicio);
  const fechaLimiteRaw = reto.fechaFin || reto.fechaLimiteRpta;
  const fechaLimiteFormateada = formatearFecha(fechaLimiteRaw);
  const diasRestantes = calcularDiasRestantes(fechaLimiteRaw);

  const totalEquipos = reto.equiposAsignados?.length || 0;
  const totalEntregables = reto.entregablesRecibidos?.length || 0;
  const porcentajeEntregables =
    totalEquipos > 0 ? Math.round((totalEntregables / totalEquipos) * 100) : 0;
  const calificacionPromedio = reto.calificacionPromedio ?? 'N/A';

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Migas de pan */}
      <nav className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
        <Link
          className="hover:text-white transition-colors flex items-center gap-1"
          to="/dashboard"
        >
          <span className="material-symbols-outlined text-[16px]">
            dashboard
          </span>
          Dashboard
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline-variant">
          chevron_right
        </span>
        <Link className="hover:text-white transition-colors" to="/dashboard">
          Gestión de Retos
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline-variant">
          chevron_right
        </span>
        <span className="text-primary font-semibold truncate max-w-xs md:max-w-md">
          {tituloReto}
        </span>
      </nav>

      {/* 2. Cabecera principal del reto (Tarjeta Superior) */}
      <section className="rounded-3xl bg-surface-container-low border border-white/10 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8),0_0_24px_-2px_rgba(225,29,116,0.12)]">
        {/* Brillo decorativo esquina superior */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-linear-to-br from-primary-container/20 to-secondary-container/20 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6 relative z-10">
          <div className="flex flex-col gap-4 flex-1">
            {/* Badges de Estado, Categoría y Prioridad */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {estadoActual}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-high border border-white/10 text-tertiary">
                <span className="material-symbols-outlined text-[14px]">
                  psychology
                </span>
                {nombreCategoria}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-primary-container/10 border border-primary-container/30 text-primary">
                <span className="material-symbols-outlined text-[14px]">
                  priority_high
                </span>
                {nombrePrioridad}
              </span>
            </div>

            {/* Título del Reto */}
            <h1 className="text-headline-xl font-headline-xl text-white tracking-tight">
              {tituloReto}
            </h1>

            {/* Patrocinador y Fechas Clave */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-body-sm font-body-sm text-on-surface-variant pt-1">
              {/* Perfil Patrocinador */}
              <div className="flex items-center gap-2 bg-surface-container/60 px-3.5 py-1.5 rounded-xl border border-white/5">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  domain
                </span>
                <span className="font-semibold text-white">
                  {nombreEmpresa}
                </span>
                <span
                  className="inline-flex items-center text-emerald-400"
                  title="Empresa Verificada"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </span>
              </div>

              {/* Fecha Inicio */}
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-outline">
                  calendar_today
                </span>
                <span>
                  Inicio:{' '}
                  <strong className="text-on-surface font-semibold">
                    {fechaInicioFormateada}
                  </strong>
                </span>
              </div>

              {/* Fecha Límite */}
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-outline">
                  event_busy
                </span>
                <span>
                  Límite:{' '}
                  <strong className="text-on-surface font-semibold">
                    {fechaLimiteFormateada}
                  </strong>
                </span>
              </div>

              {/* Píldora Tiempo Restante */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-label-sm font-label-sm">
                <span className="material-symbols-outlined text-[16px]">
                  hourglass_top
                </span>
                <span>
                  {diasRestantes !== null
                    ? `${diasRestantes} días restantes para cierre`
                    : 'Plazo en curso'}
                </span>
              </div>
            </div>
          </div>

          {/* Botones de Acción Rápida */}
          <div className="flex items-center gap-3 pt-2 lg:pt-0 shrink-0">
            {puedeEditar && (
              <button
                type="button"
                onClick={() => navigate(`/dashboard/retos/nuevo?edit=${reto.id}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white hover:border-primary/40 hover:bg-surface-variant transition-all duration-200 text-label-md font-label-md shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span>Actualizar</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveTab('descripcion')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-primary-container to-secondary-container text-white font-bold hover:shadow-[0_0_24px_rgba(225,29,116,0.45)] hover:scale-[1.02] active:scale-95 transition-all duration-200 text-label-md font-label-md shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span>Ver descripción</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Resumen de KPIs del reto (Tarjetas Inferiores) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Postulaciones */}
        <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-primary-container/40 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Total Postulaciones
            </span>
            <span className="p-2 rounded-xl bg-primary-container/10 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">
                groups
              </span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-headline-lg font-headline-lg text-white">
              {totalEquipos}
            </span>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              Equipos Activos
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
            <span className="text-emerald-400 font-semibold">
              {totalEquipos}
            </span>{' '}
            registrados en esta convocatoria
          </div>
        </div>

        {/* Card 2: Entregables Recibidos */}
        <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Entregables Recibidos
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">
                task_alt
              </span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-headline-lg font-headline-lg text-white">
                {totalEntregables}
              </span>
              <span className="text-body-sm font-body-sm text-on-surface-variant">
                de {totalEquipos} equipos
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-caption font-caption bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-bold">
              {porcentajeEntregables}% Listo
            </span>
          </div>
          {/* Barra de progreso */}
          <div className="mt-3 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-emerald-500 to-tertiary h-1.5 rounded-full"
              style={{ width: `${porcentajeEntregables}%` }}
            ></div>
          </div>
        </div>

        {/* Card 3: Calificación Promedio */}
        <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-secondary/40 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Calificación Promedio
            </span>
            <span className="p-2 rounded-xl bg-secondary-container/20 text-secondary group-hover:scale-110 transition-transform">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-headline-lg font-headline-lg text-white">
              {calificacionPromedio}
            </span>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              / 5.0
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-amber-400">
            <span className="text-caption font-caption text-on-surface-variant">
              {reto.equiposCalificados
                ? `(${reto.equiposCalificados} ya calificados)`
                : '(Sin calificaciones registradas)'}
            </span>
          </div>
        </div>

        {/* Card 4: Tiempo Restante */}
        <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-amber-400/40 transition-all duration-200 group">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Tiempo Restante
            </span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">
                schedule
              </span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-headline-lg font-headline-lg text-white">
              {diasRestantes !== null ? `${diasRestantes} Días` : 'N/A'}
            </span>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              calendario
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-caption font-caption text-amber-300">
            <span className="material-symbols-outlined text-[14px]">
              notifications_active
            </span>
            Cierre el {fechaLimiteFormateada}
          </div>
        </div>
      </section>

      {/* 4. Navegación por pestañas del reto */}
      <ChallengeTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* 5. Contenido según la pestaña activa */}
      {activeTab === 'postulaciones' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <TeamSubmissionsList challengeId={id} />
          <ChallengeSidebar challenge={reto} />
        </div>
      )}

      {activeTab === 'descripcion' && (
        <section className="rounded-3xl bg-surface-container-low border border-white/10 p-6 md:p-8 flex flex-col gap-6">
          <div>
            <h2 className="text-headline-sm font-headline-sm text-white font-bold mb-3">
              Descripción del reto
            </h2>
            <p className="text-body-md font-body-md text-on-surface leading-relaxed whitespace-pre-line">
              {reto.descripcion || 'Este reto aún no tiene una descripción registrada.'}
            </p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-body-sm font-body-sm">
            {[
              ['Empresa', nombreEmpresa],
              ['Categoría', nombreCategoria],
              ['Prioridad', nombrePrioridad],
              ['Estado', estadoActual],
              ['Fecha de inicio', fechaInicioFormateada],
              ['Fecha límite', fechaLimiteFormateada],
            ].map(([etiqueta, valor]) => (
              <div
                key={etiqueta}
                className="rounded-xl bg-surface-container/60 border border-white/5 px-4 py-3"
              >
                <dt className="text-caption font-caption text-outline">{etiqueta}</dt>
                <dd className="text-on-surface font-semibold mt-0.5">{valor}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {activeTab === 'rubrica' && (
        <div className="max-w-2xl">
          <CriteriaCard />
        </div>
      )}

      {activeTab === 'historial' && (
        <section className="rounded-3xl bg-surface-container-low border border-white/10 p-6 md:p-8">
          <h2 className="text-headline-sm font-headline-sm text-white font-bold mb-5">
            Historial de cambios
          </h2>
          <ol className="flex flex-col gap-5 border-l border-white/10 pl-6">
            {[
              fechaCreacionFormateada && {
                icono: 'add_circle',
                titulo: 'Reto registrado',
                detalle: fechaCreacionFormateada,
              },
              { icono: 'flag', titulo: 'Estado actual', detalle: estadoActual },
              { icono: 'calendar_today', titulo: 'Fecha de inicio', detalle: fechaInicioFormateada },
              { icono: 'event_busy', titulo: 'Fecha límite', detalle: fechaLimiteFormateada },
            ]
              .filter(Boolean)
              .map((item) => (
                <li key={item.titulo} className="relative">
                  <span className="absolute -left-9.25 top-0 w-6 h-6 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-primary">{item.icono}</span>
                  </span>
                  <p className="text-label-md font-label-md text-white font-semibold">{item.titulo}</p>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">{item.detalle}</p>
                </li>
              ))}
          </ol>
        </section>
      )}
    </div>
  );
}

export default DetalleRetoPage;