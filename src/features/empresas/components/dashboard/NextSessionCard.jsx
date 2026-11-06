// src/components/dashboard/NextSessionCard.jsx

export const NextSessionCard = () => {
  return (
    <div className="bg-surface-container-low rounded-2xl border border-white/5 p-4 flex items-center gap-3">
      {/* Ícono de Calendario */}
      <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-xl">event_available</span>
      </div>
      
      {/* Información del Evento */}
      <div>
        <div className="text-label-md font-label-md font-semibold text-on-surface">
          Próxima Sesión de Sincronización
        </div>
        <div className="text-caption font-caption text-on-surface-variant">
          Jueves, 10:00 AM • Demo Day Previo de Equipos
        </div>
      </div>
    </div>
  );
};

export default NextSessionCard;