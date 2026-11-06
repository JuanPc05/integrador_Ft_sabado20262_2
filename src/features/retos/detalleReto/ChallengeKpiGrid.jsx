// src/components/detalleReto/ChallengeKpiGrid.jsx

export const ChallengeKpiGrid = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* Card 1: Total Postulaciones */}
      <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-primary-container/40 transition-all duration-200 group">
        <div className="flex justify-between items-start">
          <span className="text-label-sm font-label-sm text-on-surface-variant">Total Postulaciones</span>
          <span className="p-2 rounded-xl bg-primary-container/10 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">groups</span>
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-headline-lg font-headline-lg text-white">8</span>
          <span className="text-body-sm font-body-sm text-on-surface-variant">Equipos Activos</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
          <span className="text-emerald-400 font-semibold">+2</span> frente a la cohorte anterior
        </div>
      </div>

      {/* Card 2: Entregables Recibidos */}
      <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-200 group">
        <div className="flex justify-between items-start">
          <span className="text-label-sm font-label-sm text-on-surface-variant">Entregables Recibidos</span>
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-headline-lg font-headline-lg text-white">6</span>
            <span className="text-body-sm font-body-sm text-on-surface-variant">de 8 equipos</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-caption font-caption bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-bold">
            75% Listo
          </span>
        </div>
        {/* Barra de progreso */}
        <div className="mt-3 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-tertiary h-1.5 rounded-full" 
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>

      {/* Card 3: Calificación Promedio */}
      <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-secondary/40 transition-all duration-200 group">
        <div className="flex justify-between items-start">
          <span className="text-label-sm font-label-sm text-on-surface-variant">Calificación Promedio</span>
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
          <span className="text-headline-lg font-headline-lg text-white">4.8</span>
          <span className="text-body-sm font-body-sm text-on-surface-variant">/ 5.0</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-amber-400">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
          <span className="text-caption font-caption text-on-surface-variant ml-1">(2 ya calificados)</span>
        </div>
      </div>

      {/* Card 4: Tiempo Restante */}
      <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 backdrop-blur-md hover:border-amber-400/40 transition-all duration-200 group">
        <div className="flex justify-between items-start">
          <span className="text-label-sm font-label-sm text-on-surface-variant">Tiempo Restante</span>
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-headline-lg font-headline-lg text-white">4 Días</span>
          <span className="text-body-sm font-body-sm text-on-surface-variant">hábiles</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-caption font-caption text-amber-300">
          <span className="material-symbols-outlined text-[14px]">notifications_active</span>
          Cierre de fase el 15 de marzo
        </div>
      </div>

    </section>
  );
};

export default ChallengeKpiGrid;