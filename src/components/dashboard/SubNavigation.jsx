// src/components/dashboard/SubNavigation.jsx

export const SubNavigation = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-low/80 p-2 md:p-3 rounded-2xl border border-white/5 backdrop-blur-md">
      
      {/* Contenedor con scroll horizontal para móviles (custom-scrollbar) */}
      <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto custom-scrollbar pb-1 md:pb-0">
        
        {/* Pestaña Activa (Ejemplo con color primary-container) */}
        <a className="px-4 py-2 rounded-xl text-label-md font-label-md font-semibold bg-primary-container text-on-primary-container flex items-center gap-2 shadow-sm transition-all whitespace-nowrap" href="#">
          <span className="material-symbols-outlined text-base">dashboard</span>
          <span>Panel Principal</span>
        </a>
        
        {/* Pestañas Inactivas */}
        <a className="px-4 py-2 rounded-xl text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 whitespace-nowrap" href="#">
          <span className="material-symbols-outlined text-base">military_tech</span>
          <span>Mis Retos</span>
        </a>
        
        <a className="px-4 py-2 rounded-xl text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 whitespace-nowrap" href="#">
          <span className="material-symbols-outlined text-base">groups</span>
          <span>Postulaciones / Equipos</span>
          {/* Badge de notificaciones en la pestaña */}
          <span className="px-1.5 py-0.5 rounded-full text-caption font-caption bg-secondary-container text-secondary text-xs">
            12
          </span>
        </a>
        
        <a className="px-4 py-2 rounded-xl text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 whitespace-nowrap" href="#">
          <span className="material-symbols-outlined text-base">forum</span>
          <span>Mensajes y Comentarios</span>
        </a>
        
        <a className="px-4 py-2 rounded-xl text-label-md font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-2 whitespace-nowrap" href="#">
          <span className="material-symbols-outlined text-base">settings</span>
          <span>Configuración de Empresa</span>
        </a>
      </nav>

      {/* Botón versión móvil para crear reto (Se oculta en Desktop) */}
      <div className="sm:hidden w-full pt-2">
        <button className="w-full flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-md">
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Publicar Nuevo Reto</span>
        </button>
      </div>
      
    </div>
  );
};