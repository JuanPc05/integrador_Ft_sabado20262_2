// src/components/detalleReto/ChallengeSidebar.jsx

export const ChallengeSidebar = () => {
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
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-surface-variant to-secondary flex items-center justify-center text-white font-bold text-headline-sm font-headline-sm shadow-inner">
            RS
          </div>
          <div>
            <h5 className="text-body-lg font-body-lg text-white font-bold">Ing. Roberto Saldarriaga</h5>
            <p className="text-body-sm font-body-sm text-on-surface-variant">Docente Escuela de Tecnología CESDE</p>
            <span className="text-caption font-caption text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> En línea para retroalimentación
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 flex gap-2">
          <button className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white hover:border-primary-container/40 text-label-sm font-label-sm font-semibold transition-colors flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">mail</span>
            Contactar
          </button>
          <button className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white hover:border-primary-container/40 text-label-sm font-label-sm font-semibold transition-colors flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            Agendar Asesoría
          </button>
        </div>
      </div>

      {/* Card 2: Criterios de Evaluación */}
      <div className="rounded-3xl bg-surface-container-low border border-white/10 p-6 backdrop-blur-md relative shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h4 className="text-headline-sm font-headline-sm text-white font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">balance</span>
            Criterios de Evaluación
          </h4>
          <span className="text-caption font-caption text-outline">100% Ponderado</span>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {/* Criterio 1 */}
          <div>
            <div className="flex justify-between items-center text-body-sm font-body-sm mb-1.5">
              <span className="text-white font-semibold">Viabilidad Técnica</span>
              <span className="text-tertiary font-bold">40%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-tertiary to-primary-container h-2 rounded-full" 
                style={{ width: "40%" }}
              ></div>
            </div>
            <p className="text-caption font-caption text-on-surface-variant mt-1">
              Capacidad de cómputo en baja latencia y cobertura GPS.
            </p>
          </div>

          {/* Criterio 2 */}
          <div>
            <div className="flex justify-between items-center text-body-sm font-body-sm mb-1.5">
              <span className="text-white font-semibold">Impacto e Innovación</span>
              <span className="text-primary font-bold">30%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary-container to-secondary-container h-2 rounded-full" 
                style={{ width: "30%" }}
              ></div>
            </div>
            <p className="text-caption font-caption text-on-surface-variant mt-1">
              Valor agregado para la logística de última milla.
            </p>
          </div>

          {/* Criterio 3 */}
          <div>
            <div className="flex justify-between items-center text-body-sm font-body-sm mb-1.5">
              <span className="text-white font-semibold">Calidad de Código y Arquitectura</span>
              <span className="text-secondary font-bold">30%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-secondary-container to-secondary h-2 rounded-full" 
                style={{ width: "30%" }}
              ></div>
            </div>
            <p className="text-caption font-caption text-on-surface-variant mt-1">
              Buenas prácticas, documentación y modularidad.
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: Canal de Dudas & Foro */}
      <div className="rounded-3xl bg-gradient-to-br from-surface-container-low to-surface-container border border-white/10 p-6 backdrop-blur-md relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-primary-container/20 text-primary border border-primary-container/30">
            <span className="material-symbols-outlined text-[24px]">forum</span>
          </div>
          <div>
            <h4 className="text-headline-sm font-headline-sm text-white font-bold">Canal de Dudas &amp; Foro</h4>
            <p className="text-body-sm font-body-sm text-on-surface-variant">Interacción directa con los equipos</p>
          </div>
        </div>
        <p className="mt-4 text-body-sm font-body-sm text-on-surface-variant">
          Hay <strong className="text-white font-semibold">3 preguntas pendientes</strong> de resolución planteadas por los participantes sobre la API de NovaLogistics.
        </p>
        <a 
          className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-container-high border border-white/10 text-white font-bold hover:bg-surface-variant hover:border-primary-container/50 transition-all text-label-md font-label-md" 
          href="#"
        >
          <span>Abrir Foro de Discusión</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>

    </aside>
  );
};

export default ChallengeSidebar;