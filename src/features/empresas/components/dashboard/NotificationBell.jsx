// src/features/empresas/components/dashboard/NotificationBell.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/hooks/useNotifications';

const TONE_CLASSES = {
  primary: 'bg-primary-container/15 text-primary',
  secondary: 'bg-secondary-container/30 text-secondary',
  tertiary: 'bg-tertiary-container/25 text-tertiary',
  success: 'bg-emerald-500/15 text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-400',
  danger: 'bg-rose-500/15 text-rose-400',
};

const formatearFecha = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const NotificationBell = () => {
  const { items, noLeidas, marcarLeida, marcarTodasLeidas, recargar } = useNotifications();
  const [open, setOpen] = useState(false);
  const contenedorRef = useRef(null);
  const navigate = useNavigate();

  // Cierra al hacer clic fuera o al presionar Escape
  useEffect(() => {
    if (!open) return undefined;
    const onClickFuera = (e) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClickFuera);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickFuera);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const toggle = () => {
    if (!open) recargar();
    setOpen((v) => !v);
  };

  const onItemClick = (n) => {
    marcarLeida(n.id);
    if (n.to) {
      setOpen(false);
      navigate(n.to);
    }
  };

  return (
    <div className="relative" ref={contenedorRef}>
      <button
        type="button"
        onClick={toggle}
        aria-label={`Notificaciones${noLeidas ? `, ${noLeidas} sin leer` : ''}`}
        aria-expanded={open}
        className="relative p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all duration-150 cursor-pointer"
      >
        <span className="material-symbols-outlined text-xl">notifications</span>
        {noLeidas > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
            {noLeidas > 9 ? '9+' : noLeidas}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-[min(92vw,24rem)] bg-surface-container-low border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div>
              <h3 className="text-label-md font-label-md font-bold text-on-surface">Notificaciones</h3>
              <p className="text-caption font-caption text-outline">
                {noLeidas > 0 ? `${noLeidas} sin leer` : 'Estás al día'}
              </p>
            </div>
            <button
              type="button"
              onClick={marcarTodasLeidas}
              disabled={noLeidas === 0}
              className="text-caption font-caption font-semibold text-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Marcar todas como leídas
            </button>
          </div>

          <ul className="max-h-[22rem] overflow-y-auto custom-scrollbar divide-y divide-white/5">
            {items.length === 0 && (
              <li className="px-4 py-8 text-center text-body-sm font-body-sm text-on-surface-variant">
                No tienes notificaciones por ahora.
              </li>
            )}
            {items.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => onItemClick(n)}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors cursor-pointer hover:bg-surface-container ${
                    n.leida ? 'opacity-70' : 'bg-primary-container/5'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      TONE_CLASSES[n.tone] || TONE_CLASSES.primary
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{n.icon}</span>
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-label-md font-label-md font-semibold text-on-surface truncate">
                        {n.title}
                      </span>
                      {!n.leida && (
                        <span className="w-2 h-2 rounded-full bg-primary-container shrink-0" aria-hidden="true" />
                      )}
                    </span>
                    <span className="block text-body-sm font-body-sm text-on-surface-variant line-clamp-2">
                      {n.text}
                    </span>
                    {n.fecha && (
                      <span className="block text-caption font-caption text-outline mt-0.5">
                        {formatearFecha(n.fecha)}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
