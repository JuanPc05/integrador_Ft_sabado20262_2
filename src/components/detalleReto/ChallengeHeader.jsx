// src/components/detalleReto/ChallengeHeader.jsx

export const ChallengeHeader = () => {
  return (
    <section className="rounded-3xl bg-surface-container-low border border-white/10 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8),0_0_24px_-2px_rgba(225,29,116,0.12)]">
      {/* Brillo decorativo esquina superior */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-primary-container/20 to-secondary-container/20 blur-2xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6 relative z-10">
        <div className="flex flex-col gap-4 flex-1">
          
          {/* Badges de Estado y Categoría */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              En Evaluación / Recepción de Entregables
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-high border border-white/10 text-tertiary">
              <span className="material-symbols-outlined text-[14px]">psychology</span>
              Tecnología &amp; IA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-primary-container/10 border border-primary-container/30 text-primary">
              <span className="material-symbols-outlined text-[14px]">priority_high</span>
              Alta Prioridad
            </span>
          </div>

          {/* Título del Reto */}
          <h1 className="text-headline-xl font-headline-xl text-white tracking-tight">
            Algoritmo de Ruteo Inteligente en Tiempo Real
          </h1>

          {/* Patrocinador y Fechas Clave */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-body-sm font-body-sm text-on-surface-variant pt-1">
            {/* Perfil Patrocinador */}
            <div className="flex items-center gap-2 bg-surface-container/60 px-3.5 py-1.5 rounded-xl border border-white/5">
              <span className="material-symbols-outlined text-[18px] text-primary">domain</span>
              <span className="font-semibold text-white">NovaLogistics S.A.S.</span>
              <span className="inline-flex items-center text-emerald-400" title="Empresa Verificada">
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
              <span className="material-symbols-outlined text-[18px] text-outline">calendar_today</span>
              <span>Inicio: <strong className="text-on-surface font-semibold">10 Feb 2025</strong></span>
            </div>

            {/* Fecha Límite */}
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-outline">event_busy</span>
              <span>Límite: <strong className="text-on-surface font-semibold">15 Mar 2025</strong></span>
            </div>

            {/* Píldora Tiempo Restante */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-label-sm font-label-sm">
              <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
              <span>4 días restantes para cierre</span>
            </div>
          </div>
        </div>

        {/* Botones de Acción Rápida */}
        <div className="flex items-center gap-3 pt-2 lg:pt-0 shrink-0">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white hover:border-primary/40 hover:bg-surface-variant transition-all duration-200 text-label-md font-label-md shadow-sm">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            <span>Editar Reto</span>
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-bold hover:shadow-[0_0_24px_rgba(225,29,116,0.45)] hover:scale-[1.02] active:scale-95 transition-all duration-200 text-label-md font-label-md shadow-md">
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            <span>+ Nueva Evaluación</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChallengeHeader;