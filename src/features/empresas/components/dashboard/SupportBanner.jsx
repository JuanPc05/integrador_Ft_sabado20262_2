// src/components/dashboard/SupportBanner.jsx

export const SupportBanner = () => {
  return (
    <div className="bg-gradient-to-r from-surface-container-low to-surface-container p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        
        {/* Ícono Decorativo */}
        <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl">school</span>
        </div>
        
        {/* Textos */}
        <div>
          <h3 className="text-headline-sm font-headline-sm text-on-surface">
            ¿Necesitas asesoría para definir un nuevo reto?
          </h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
            El equipo docente y metodológico de CESDE te ayuda a estructurar desafíos con impacto de innovación.
          </p>
        </div>
      </div>
      
      {/* Botón de Acción */}
      <button className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright border border-white/10 text-on-surface font-label-md text-label-md transition-all shrink-0">
        Agendar con Tutor CESDE
      </button>
    </div>
  );
};

export default SupportBanner;