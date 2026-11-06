// src/components/detalleReto/ChallengeTabs.jsx
import { useState } from "react";

export const ChallengeTabs = () => {
  const [activeTab, setActiveTab] = useState("postulaciones");

  const tabs = [
    { id: "postulaciones", label: "Postulaciones y Entregables (8)", icon: "folder_shared" },
    { id: "descripcion", label: "Descripción y Requisitos Técnicos", icon: "description" },
    { id: "rubrica", label: "Rúbrica de Evaluación", icon: "fact_check" },
    { id: "historial", label: "Historial de Cambios", icon: "history" },
  ];

  return (
    <div className="border-b border-surface-variant/40 flex items-center gap-8 overflow-x-auto pb-px">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-3.5 text-label-md font-label-md whitespace-nowrap transition-colors relative ${
              isActive
                ? "text-primary font-bold border-b-2 border-primary-container"
                : "text-on-surface-variant hover:text-white"
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