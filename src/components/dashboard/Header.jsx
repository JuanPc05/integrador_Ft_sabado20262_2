// src/components/dashboard/Header.jsx

export const Header = () => {
  return (
    <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/40">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-20">
        
        {/* Logo Branding */}
        <div className="flex items-center gap-4">
          <a className="flex items-center gap-3 group" href="#">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shadow-lg shadow-primary-container/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-headline-md font-extrabold text-on-primary-container tracking-tighter text-sm">CESDE</span>
            </div>
            <span className="text-headline-sm font-headline-sm font-extrabold text-on-surface tracking-tight group-hover:text-primary transition-colors">
              CESDE <span className="text-primary-container">Conecta</span>
            </span>
          </a>
          <span className="hidden lg:inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-caption bg-surface-container-high text-primary border border-outline-variant/30">
            Portal Empresas
          </span>
        </div>

        {/* Buscador Global */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-lg">search</span>
            </span>
            {/* OJO: El input debe estar cerrado con /> */}
            <input 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-xl border border-white/10 text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" 
              placeholder="Buscar retos, talentos, entregables..." 
              type="text"
            />
          </div>
        </div>

        {/* Acciones de Cabecera y Perfil Empresa */}
        <div className="flex items-center gap-4">
          
          {/* Botón Notificaciones */}
          <button className="relative p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all duration-150">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface"></span>
          </button>
          
          {/* CTA Principal */}
          <button className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-lg shadow-primary-container/25 hover:opacity-95 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Publicar Nuevo Reto</span>
          </button>
          
          <div className="h-8 w-px bg-surface-variant/40 hidden sm:block"></div>
          
          {/* Perfil Empresa */}
          <div className="flex items-center gap-3 pl-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container to-secondary-container p-0.5 shadow-md">
              <div className="w-full h-full bg-surface-container-low rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary text-xl">domain</span>
              </div>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-sm text-on-surface font-semibold tracking-tight">NovaLogistics S.A.S.</span>
                <span className="material-symbols-outlined text-tertiary text-sm" title="Empresa Verificada">verified</span>
              </div>
              <span className="text-caption font-caption text-on-surface-variant">Plan Enterprise • Alianza CESDE</span>
            </div>
            <span className="material-symbols-outlined text-outline text-lg cursor-pointer hover:text-on-surface hidden sm:inline-block">expand_more</span>
          </div>
          
        </div>
      </div>
    </header>
  );
};