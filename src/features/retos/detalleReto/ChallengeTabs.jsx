// src/features/retos/detalleReto/ChallengeTabs.jsx
const TABS_RETO = [
  { id: 'postulaciones', label: 'Postulaciones y Entregables', icon: 'folder_shared' },
  { id: 'descripcion', label: 'Descripción y Requisitos Técnicos', icon: 'description' },
  { id: 'rubrica', label: 'Rúbrica de Evaluación', icon: 'fact_check' },
  { id: 'historial', label: 'Historial de Cambios', icon: 'history' },
];

export const ChallengeTabs = ({ activeTab = 'postulaciones', onChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Secciones del reto"
      className="border-b border-surface-variant/40 flex items-center gap-8 overflow-x-auto pb-px custom-scrollbar"
    >
      {TABS_RETO.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange && onChange(tab.id)}
            className={`flex items-center gap-2 pb-3.5 text-label-md font-label-md whitespace-nowrap transition-colors relative cursor-pointer ${
              isActive
                ? 'text-primary font-bold border-b-2 border-primary-container'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ChallengeTabs;