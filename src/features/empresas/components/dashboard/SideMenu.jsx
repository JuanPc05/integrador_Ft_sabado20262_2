// src/features/empresas/components/dashboard/SideMenu.jsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/useAuth';
import { scrollToSection } from '@/utils/scrollToSection';

const ROL_LABEL = {
  ADMIN_UNIVERSIDAD: 'Administrador CESDE',
  REPRESENTANTE_EMPRESA: 'Representante de empresa',
  ESTUDIANTE: 'Estudiante',
};

/**
 * Cada ítem puede ser:
 *  - una ruta real -> { to }
 *  - una sección del Panel Principal -> { to: '/dashboard', section: 'id-de-la-seccion' }
 */
const buildItems = (rol) => {
  const esEmpresa = rol === 'REPRESENTANTE_EMPRESA';
  const esAdmin = rol === 'ADMIN_UNIVERSIDAD';

  return [
    { key: 'panel', label: 'Panel Principal', icon: 'dashboard', to: '/dashboard', end: true },
    {
      key: 'retos',
      label: esEmpresa ? 'Mis Retos' : rol === 'ESTUDIANTE' ? 'Retos disponibles' : 'Gestión de Retos',
      icon: 'military_tech',
      to: '/dashboard',
      section: 'mis-retos',
    },
    { key: 'equipos', label: 'Postulaciones / Equipos', icon: 'groups', to: '/dashboard', section: 'equipos' },
    { key: 'mensajes', label: 'Mensajes y Comentarios', icon: 'forum', to: '/dashboard', section: 'mensajes' },
    ...(esEmpresa
      ? [{ key: 'empresa', label: 'Configuración de Empresa', icon: 'settings', to: '/dashboard/empresa/configuracion' }]
      : []),
    ...(esAdmin
      ? [
          { key: 'catalogos', label: 'Gestión de Catálogos', icon: 'database', to: '/dashboard/catalogos' },
          { key: 'analytics', label: 'Analítica de KPIs', icon: 'monitoring', to: '/dashboard/analytics' },
        ]
      : []),
    { key: 'perfil', label: 'Mi Perfil', icon: 'person', to: '/dashboard/perfil' },
  ];
};

const baseItem =
  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-label-md font-label-md transition-all text-left cursor-pointer';
const activeItem = 'bg-primary-container text-on-primary-container font-semibold shadow-sm';
const idleItem = 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container';

export const SideMenu = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Bloquea el scroll de fondo y permite cerrar con Escape
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  const items = buildItems(user?.rol);
  const puedePublicar = user?.rol === 'ADMIN_UNIVERSIDAD' || user?.rol === 'REPRESENTANTE_EMPRESA';

  const irASeccion = (item) => {
    onClose();
    if (location.pathname !== item.to) navigate(item.to);
    setTimeout(() => scrollToSection(item.section), 120);
  };

  // Portal al <body>: el header tiene backdrop-blur y eso haría que `fixed` se limite al header.
  return createPortal(
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        className="absolute left-0 top-0 h-full w-[min(86vw,20rem)] bg-surface-container-low border-r border-white/10 shadow-2xl shadow-black/60 flex flex-col"
      >
        <div className="flex items-center justify-between px-5 h-20 border-b border-white/10 shrink-0">
          <span className="text-headline-sm font-headline-sm font-extrabold text-on-surface tracking-tight">
            CESDE <span className="text-primary-container">Conecta</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-5 py-4 border-b border-white/5">
          <p className="text-caption font-caption text-outline uppercase tracking-wider">Sesión activa</p>
          <p className="text-label-md font-label-md font-semibold text-on-surface truncate">
            {user?.nombreCompleto || user?.nombre_completo || user?.email || 'Usuario'}
          </p>
          <p className="text-caption font-caption text-secondary">{ROL_LABEL[user?.rol] || 'Usuario'}</p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-1">
          {items.map((item) =>
            item.section ? (
              <button
                key={item.key}
                type="button"
                onClick={() => irASeccion(item)}
                className={`${baseItem} ${idleItem}`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ) : (
              <NavLink
                key={item.key}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) => `${baseItem} ${isActive ? activeItem : idleItem}`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="p-3 border-t border-white/10 flex flex-col gap-2 shrink-0">
          {puedePublicar && (
            <NavLink
              to="/dashboard/retos/nuevo"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-lg shadow-primary-container/25 hover:opacity-95 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span>Publicar Nuevo Reto</span>
            </NavLink>
          )}
          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-error hover:bg-red-500/10 font-label-md text-label-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </div>,
    document.body
  );
};

export default SideMenu;
