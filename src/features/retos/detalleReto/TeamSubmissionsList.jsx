// src/features/retos/detalleReto/TeamSubmissionsList.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamFilterBar from './TeamFilterBar';
import { scrollToSection } from '@/utils/scrollToSection';

/**
 * Datos de demostración: el backend todavía no expone equipos ni entregables por reto.
 * Cuando exista el endpoint, esta lista se reemplaza por la respuesta real.
 */
const EQUIPOS_DEMO = [
  {
    id: 'innovatech',
    iniciales: 'IC',
    nombre: 'Innovatech CESDE',
    integrantes: 4,
    lider: 'Valentina Montoya',
    escuela: 'Escuela de Software & IA',
    estado: 'Entregable Enviado',
    estadoTexto: 'Entregable Final Cargado (v1.2)',
    entregado: 'Ayer, 18:40 hrs',
    pendiente: 'Pendiente Calificación Jurado',
    puntaje: null,
    archivos: [
      { icon: 'code', label: 'Repositorio GitHub' },
      { icon: 'picture_as_pdf', label: 'Documento Técnico PDF (4.2 MB)' },
      { icon: 'rocket_launch', label: 'Demo URL interactiva' },
    ],
    accion: { tipo: 'mensajes', label: 'Dejar Feedback', icon: 'rate_review' },
  },
  {
    id: 'logiroute',
    iniciales: 'LR',
    nombre: 'LogiRoute Devs',
    integrantes: 3,
    lider: 'Mateo Restrepo',
    escuela: 'Desarrollo Web & Analítica',
    estado: 'Calificado',
    estadoTexto: 'Calificado - 4.9 / 5.0',
    puntaje: 4.9,
    archivos: [
      { icon: 'terminal', label: 'Notebook Jupyter (.ipynb)' },
      { icon: 'play_circle', label: 'Video Pitch (3 min)' },
    ],
    feedback:
      'Excelente modelado heurístico de rutas urbanas en el Valle de Aburrá. Reducción estimada del 22% en tiempos de congestión.',
    evaluador: 'Ing. Roberto Saldarriaga',
    accion: { tipo: 'calificacion', label: 'Ver Calificación', icon: 'visibility' },
  },
  {
    id: 'codenexus',
    iniciales: 'CN',
    nombre: 'CodeNexus Lab',
    integrantes: 3,
    lider: 'Andrés Felipe Gómez',
    escuela: 'Ingeniería de Software',
    estado: 'En Borrador',
    estadoTexto: 'Entregable en Borrador',
    vence: 'Vence en 48 hrs (Plazo de gracia técnico)',
    actividad: 'Última actividad: Hoy, 11:20 hrs',
    resumen:
      'El equipo ha subido el esquema preliminar de base de datos Postgres y el boceto de la API de integración con mapas abiertos.',
    puntaje: null,
    archivos: [],
    accion: { tipo: 'mensajes', label: 'Escribir al equipo', icon: 'send' },
  },
];

const ESTILOS = {
  'Entregable Enviado': {
    hover: 'hover:border-primary-container/40',
    avatar: 'bg-linear-to-br from-primary-container to-secondary-container text-white shadow-md',
    badge: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 font-semibold',
    badgeIcon: 'check_circle',
    badgeIconClass: '',
    boton: 'bg-linear-to-r from-primary-container to-secondary-container text-white font-bold hover:shadow-[0_0_18px_rgba(225,29,116,0.35)]',
  },
  Calificado: {
    hover: 'hover:border-secondary/40',
    avatar: 'bg-surface-container-high border border-white/10 text-secondary',
    badge: 'bg-secondary-container/30 border-secondary-container text-secondary font-bold',
    badgeIcon: 'stars',
    badgeIconClass: 'text-amber-400',
    boton: 'bg-secondary-container/40 border border-secondary text-white font-semibold hover:bg-secondary-container',
  },
  'En Borrador': {
    hover: 'hover:border-amber-400/40',
    avatar: 'bg-surface-container-high border border-white/10 text-amber-400',
    badge: 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-semibold',
    badgeIcon: 'edit_note',
    badgeIconClass: '',
    boton: 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold hover:bg-amber-500/30',
  },
};

export const TeamSubmissionsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [orderBy, setOrderBy] = useState('recientes');
  const [calificacionesAbiertas, setCalificacionesAbiertas] = useState([]);

  const equipos = useMemo(() => {
    const termino = searchTerm.trim().toLowerCase();
    const filtrados = EQUIPOS_DEMO.filter((e) => {
      const coincideTexto =
        !termino ||
        e.nombre.toLowerCase().includes(termino) ||
        e.lider.toLowerCase().includes(termino);
      const coincideEstado = statusFilter === 'Todos' || e.estado === statusFilter;
      return coincideTexto && coincideEstado;
    });

    if (orderBy === 'puntaje') {
      return [...filtrados].sort((a, b) => (b.puntaje ?? -1) - (a.puntaje ?? -1));
    }
    if (orderBy === 'az') {
      return [...filtrados].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    }
    return filtrados;
  }, [searchTerm, statusFilter, orderBy]);

  const irAMensajes = () => {
    navigate('/dashboard');
    setTimeout(() => scrollToSection('mensajes'), 150);
  };

  const alternarCalificacion = (id) =>
    setCalificacionesAbiertas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onAccion = (equipo) => {
    if (equipo.accion.tipo === 'calificacion') alternarCalificacion(equipo.id);
    else irAMensajes();
  };

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      {/* Barra de Búsqueda y Filtros */}
      <TeamFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        orderBy={orderBy}
        onOrderChange={setOrderBy}
      />

      {/* Aviso: datos de ejemplo */}
      <div className="flex items-start gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-caption font-caption">
        <span className="material-symbols-outlined text-[16px] shrink-0">info</span>
        <span>
          Vista de demostración: los equipos y entregables de esta lista son de ejemplo. Aún no
          están conectados al backend.
        </span>
      </div>

      {/* Lista de Tarjetas de Equipos */}
      <div className="flex flex-col gap-5">
        {equipos.length === 0 && (
          <div className="rounded-3xl bg-surface-container-low border border-white/10 p-10 text-center text-body-md font-body-md text-on-surface-variant">
            Ningún equipo coincide con tu búsqueda o filtro.
          </div>
        )}

        {equipos.map((e) => {
          const estilo = ESTILOS[e.estado];
          const calificacionAbierta = calificacionesAbiertas.includes(e.id);

          return (
            <article
              key={e.id}
              className={`rounded-3xl bg-surface-container-low border border-white/10 p-6 backdrop-blur-md relative transition-all duration-300 shadow-lg ${estilo.hover}`}
            >
              {/* Cabecera de la Tarjeta */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-4 border-b border-white/5">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-headline-sm font-headline-sm ${estilo.avatar}`}
                  >
                    {e.iniciales}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-headline-sm font-headline-sm text-white font-bold">
                        {e.nombre}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-caption font-caption bg-surface-container-highest text-on-surface-variant font-medium">
                        {e.integrantes} integrantes
                      </span>
                    </div>
                    <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                      Líder: <strong className="text-white">{e.lider}</strong> • {e.escuela}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm border self-start ${estilo.badge}`}
                >
                  <span
                    className={`material-symbols-outlined text-[15px] ${estilo.badgeIconClass}`}
                    style={e.estado === 'Calificado' ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {estilo.badgeIcon}
                  </span>
                  {e.estadoTexto}
                </span>
              </div>

              {/* Detalles del Entregable */}
              <div className="py-4 flex flex-col gap-3">
                {e.entregado && (
                  <div className="flex flex-wrap items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-2">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>
                      Entregado: <strong className="text-white">{e.entregado}</strong>
                    </span>
                    {e.pendiente && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-container/10 text-primary text-label-sm font-label-sm border border-primary-container/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        {e.pendiente}
                      </span>
                    )}
                  </div>
                )}

                {e.vence && (
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-2">
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <span className="material-symbols-outlined text-[16px]">alarm</span>
                      {e.vence}
                    </span>
                    <span className="text-caption font-caption text-outline">{e.actividad}</span>
                  </div>
                )}

                {e.resumen && (
                  <p className="text-body-sm font-body-sm text-on-surface-variant">{e.resumen}</p>
                )}

                {/* Archivos adjuntos (informativos) */}
                {e.archivos.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {e.archivos.map((a) => (
                      <span
                        key={a.label}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 text-label-sm font-label-sm text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">{a.icon}</span>
                        <span>{a.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Feedback registrado (se muestra con "Ver Calificación") */}
                {e.feedback && calificacionAbierta && (
                  <div className="p-3.5 rounded-xl bg-surface-container/70 border border-white/5 text-body-sm font-body-sm text-on-surface-variant flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      format_quote
                    </span>
                    <p>
                      <strong className="text-white">Feedback registrado:</strong> &ldquo;{e.feedback}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Acción inferior */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="text-caption font-caption text-on-surface-variant flex items-center gap-1.5">
                  {e.evaluador && (
                    <>
                      <span className="material-symbols-outlined text-[15px] text-emerald-400">verified_user</span>
                      Evaluación completada por {e.evaluador}
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onAccion(e)}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-label-md font-label-md cursor-pointer ${estilo.boton}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {e.accion.tipo === 'calificacion' && calificacionAbierta ? 'visibility_off' : e.accion.icon}
                  </span>
                  <span>
                    {e.accion.tipo === 'calificacion' && calificacionAbierta
                      ? 'Ocultar Calificación'
                      : e.accion.label}
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default TeamSubmissionsList;