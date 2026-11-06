// src/components/detalleReto/ChallengeBreadcrumb.jsx

export const ChallengeBreadcrumb = ({ 
  title = "Algoritmo de Ruteo Inteligente en Tiempo Real" 
}) => {
  return (
    <nav className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
      <a className="hover:text-white transition-colors flex items-center gap-1" href="#">
        <span className="material-symbols-outlined text-[16px]">dashboard</span>
        Dashboard
      </a>
      <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
      <a className="hover:text-white transition-colors" href="#">
        Gestión de Retos
      </a>
      <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
      <span className="text-primary font-semibold truncate max-w-xs md:max-w-md">
        {title}
      </span>
    </nav>
  );
};

export default ChallengeBreadcrumb;