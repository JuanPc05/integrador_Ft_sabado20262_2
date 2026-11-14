// src/features/retos/detalleReto/ChallengeSidebar.jsx
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/utils/scrollToSection';

const CORREO_SOPORTE = 'admin.conecta@cesde.edu.co';

const CRITERIOS = [
  {
    nombre: 'Viabilidad Técnica',
    peso: 40,
    texto: 'Solidez técnica de la solución frente al problema planteado.',
    colorPeso: 'text-tertiary',
    barra: 'bg-linear-to-r from-tertiary to-primary-container',
  },
  {
    nombre: 'Impacto e Innovación',
    peso: 30,
    texto: 'Valor agregado y novedad de la propuesta para la empresa.',
    colorPeso: 'text-primary',
    barra: 'bg-linear-to-r from-primary-container to-secondary-container',
  },
  {
    nombre: 'Calidad de Código y Arquitectura',
    peso: 30,
    texto: 'Buenas prácticas, documentación y modularidad.',
    colorPeso: 'text-secondary',
    barra: 'bg-linear-to-r from-secondary-container to-secondary',
  },
];

/** Tarjeta de criterios de evaluación (se usa en la pestaña "Rúbrica de Evaluación"). */
export const CriteriaCard = () => (
  <div className="rounded-3xl bg-surface-container-low border border-white/10 p-6 backdrop-blur-md relative shadow-lg">
    <div className="flex items-center justify-between pb-3 border-b border-white/5">
      <h4 className="text-headline-sm font-headline-sm text-white font-bold flex items-center gap-2">
        <span className="material-symbols-outlined text-tertiary text-[20px]">balance</span>
        Criterios de Evaluación
      </h4>
      <span className="text-caption font-caption text-outline">100% Ponderado</span>
    </div>

    <div className="mt-4 flex flex-col gap-4">
      {CRITERIOS.map((c) => (
        <div key={c.nombre}>
          <div className="flex justify-between items-center text-body-sm font-body-sm mb-1.5">
            <span className="text-white font-semibold">{c.nombre}</span>
            <span className={`${c.colorPeso} font-bold`}>{c.peso}%</span>
          </div>
          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
            <div className={`${c.barra} h-2 rounded-full`} style={{ width: `${c.peso}%` }}></div>
          </div>
          <p className="text-caption font-caption text-on-surface-variant mt-1">{c.texto}</p>
        </div>
      ))}
    </div>
  </div>
);

export const ChallengeSidebar = () => {
  const navigate = useNavigate();

  const irAMensajes = () => {
    navigate('/dashboard');
    setTimeout(() => scrollToSection('mensajes'), 150);
  };

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      {/* Card 1: Mentor Asignado */}
      <div className="rounded-3xl bg-surface-container-low border border-white/10 p-6 backdrop-blur-md relative shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h4 className="text-headline-sm font-headline-sm text-white font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">school</span>
            Mentor Asignado
          </h4>
          <span className="text-caption font-caption px-2 py-0.5 rounded-md bg-primary-container/10 text-primary border border-primary-container/20">
            CESDE
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-linear-to-tr from-surface-variant to-secondary flex items-center justify-center text-white font-bold text-headline-sm font-headline-sm shadow-inner">
            RS
          </div>
          <div>
            <h5 className="text-body-lg font-body-lg text-white font-bold">Ing. Roberto Saldarriaga</h5>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Docente Escuela de Tecnología CESDE
            </p>
            <span className="text-caption font-caption text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Disponible por correo
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex gap-2">
          <a
            href={`mailto:${CORREO_SOPORTE}?subject=${encodeURIComponent('Consulta sobre un reto')}`}
            className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white hover:border-primary-container/40 text-label-sm font-label-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            Contactar
          </a>
          <a
            href={`mailto:${CORREO_SOPORTE}?subject=${encodeURIComponent('Solicitud para agendar asesoría')}`}
            className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white hover:border-primary-container/40 text-label-sm font-label-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Agendar Asesoría
          </a>
        </div>
      </div>

      {/* Card 2: Canal de Dudas */}
      <div className="rounded-3xl bg-linear-to-br from-surface-container-low to-surface-container border border-white/10 p-6 backdrop-blur-md relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary-container/20 text-primary border border-primary-container/30">
            <span className="material-symbols-outlined text-[24px]">forum</span>
          </div>
          <div>
            <h4 className="text-headline-sm font-headline-sm text-white font-bold">Canal de Dudas</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Interacción directa con los equipos
            </p>
          </div>
        </div>
        <p className="mt-4 text-body-sm font-body-sm text-on-surface-variant">
          Resuelve dudas con el equipo docente y los participantes desde el hilo de mensajes del
          panel principal.
        </p>
        <button
          type="button"
          onClick={irAMensajes}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-container-high border border-white/10 text-white font-bold hover:bg-surface-variant hover:border-primary-container/50 transition-all text-label-md font-label-md cursor-pointer"
        >
          <span>Ir a Mensajes</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
};

export default ChallengeSidebar;