// src/components/retos/ChallengeBreadcrumb.jsx

export const ChallengeBreadcrumb = () => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-6 px-1"
    >
      <a className="hover:text-primary transition-colors" href="#">
        Dashboard
      </a>
      <span className="material-symbols-outlined text-[16px] text-outline">
        chevron_right
      </span>
      <a className="hover:text-primary transition-colors" href="#">
        Gestión de Retos
      </a>
      <span className="material-symbols-outlined text-[16px] text-outline">
        chevron_right
      </span>
      <span className="text-primary font-semibold">Crear Reto</span>
    </nav>
  );
};

export default ChallengeBreadcrumb;