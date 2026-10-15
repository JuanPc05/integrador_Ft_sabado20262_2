// src/components/dashboard/KpiCard.jsx

export const KpiCard = ({ 
  title, 
  icon, 
  value, 
  trendIcon, 
  trendText, 
  subtitle, 
  colorClass, 
  bgClass,
  hoverClass 
}) => {
  return (
    <div className={`bg-surface-container-low p-5 rounded-2xl border border-white/5 shadow-md flex flex-col justify-between transition-all duration-200 ${hoverClass}`}>
      
      {/* Título e Ícono */}
      <div className="flex items-center justify-between">
        <span className="text-caption font-caption uppercase tracking-wider text-outline">
          {title}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bgClass} ${colorClass}`}>
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>
      
      {/* Valor Principal y Tendencia */}
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-headline-lg font-headline-lg text-on-surface font-extrabold">
          {value}
        </span>
        
        <span className={`text-caption font-caption flex items-center gap-0.5 ${colorClass}`}>
          {/* Solo renderizamos el ícono si trendIcon tiene un valor (Renderizado Condicional) */}
          {trendIcon && (
            <span className="material-symbols-outlined text-xs">{trendIcon}</span>
          )} 
          {trendText}
        </span>
      </div>
      
      {/* Subtítulo Inferior */}
      <div className="mt-2 text-body-sm font-body-sm text-on-surface-variant">
        {subtitle}
      </div>
      
    </div>
  );
};