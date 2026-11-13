// src/hooks/useNotifications.js
import { useCallback, useEffect, useMemo, useState } from 'react';
import { springApi } from '@/services/apiClient';
import { useAuth } from '@/features/auth/useAuth';

const READ_KEY = 'cesde_notif_read';
const LOGIN_KEY = 'cesde_notif_login';

const ESTADO_INFO = {
  RADICADO: { icon: 'upload_file', title: 'Reto radicado', tone: 'primary' },
  EN_REVISION: { icon: 'manage_search', title: 'Reto en revisión', tone: 'secondary' },
  EN_CONVOCATORIA: { icon: 'campaign', title: 'Reto en convocatoria', tone: 'primary' },
  ASIGNADO: { icon: 'assignment_ind', title: 'Reto asignado a un equipo', tone: 'tertiary' },
  EN_DESARROLLO: { icon: 'rocket_launch', title: 'Reto en desarrollo', tone: 'tertiary' },
  FINALIZADO: { icon: 'task_alt', title: 'Reto finalizado', tone: 'success' },
  RESUELTO: { icon: 'task_alt', title: 'Reto resuelto', tone: 'success' },
  APLAZADO: { icon: 'schedule', title: 'Reto aplazado', tone: 'warning' },
  CANCELADO: { icon: 'cancel', title: 'Reto cancelado', tone: 'danger' },
  RECHAZADO: { icon: 'block', title: 'Reto rechazado', tone: 'danger' },
};

const ROL_LABEL = {
  ADMIN_UNIVERSIDAD: 'Administrador CESDE',
  REPRESENTANTE_EMPRESA: 'Representante de empresa',
  ESTUDIANTE: 'Estudiante',
};

const leerLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const escribirLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* almacenamiento lleno o bloqueado: se ignora */
  }
};

// Registra la hora de inicio de sesión una sola vez por token (no toca AuthContext)
const obtenerInicioSesion = () => {
  const token = localStorage.getItem('accessToken') || '';
  const firma = token.slice(-16);
  const guardado = leerLS(LOGIN_KEY, null);
  if (guardado && guardado.firma === firma) return guardado.fecha;

  const fecha = new Date().toISOString();
  escribirLS(LOGIN_KEY, { firma, fecha });
  return fecha;
};

const extraerLista = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export function useNotifications() {
  const { user } = useAuth();
  const [retos, setRetos] = useState([]);
  const [leidas, setLeidas] = useState(() => leerLS(READ_KEY, []));
  const [inicioSesion] = useState(() => obtenerInicioSesion());
  const [recarga, setRecarga] = useState(0);

  // Carga inicial y cada vez que se pide recargar (al abrir la campana)
  useEffect(() => {
    let activo = true;
    springApi
      .get('/api/retos')
      .then((response) => {
        if (activo) setRetos(extraerLista(response.data));
      })
      .catch((err) => {
        console.error('[Notificaciones] No se pudieron cargar los retos:', err);
      });
    return () => {
      activo = false;
    };
  }, [recarga]);

  const cargar = useCallback(() => setRecarga((n) => n + 1), []);

  const notificaciones = useMemo(() => {
    const lista = [];

    // 1) Inicio de sesión
    lista.push({
      id: `login-${inicioSesion}`,
      icon: 'login',
      tone: 'success',
      title: 'Inicio de sesión exitoso',
      text: `Ingresaste como ${ROL_LABEL[user?.rol] || 'usuario'}${user?.email ? ` (${user.email})` : ''}.`,
      fecha: inicioSesion,
      to: null,
    });

    // 2) Estado de los retos (el id incluye el estado: si cambia, vuelve a aparecer como nueva)
    retos.slice(0, 15).forEach((r) => {
      const estado = r.estadoActual || r.estado;
      const info = ESTADO_INFO[estado];
      if (!info) return;
      lista.push({
        id: `reto-${r.id}-${estado}`,
        icon: info.icon,
        tone: info.tone,
        title: info.title,
        text: r.nombre || 'Reto sin nombre',
        fecha: r.fechaActualizacion || r.fechaCreacion || r.createdAt || r.fechaInicio || null,
        to: r.id ? `/dashboard/retos/${r.id}` : null,
      });
    });

    // 3) Aviso para el admin
    const pendientes = retos.filter((r) => {
      const estado = r.estadoActual || r.estado;
      return estado === 'RADICADO' || estado === 'EN_REVISION';
    }).length;
    if (pendientes > 0 && user?.rol === 'ADMIN_UNIVERSIDAD') {
      lista.push({
        id: `pendientes-${pendientes}`,
        icon: 'pending_actions',
        tone: 'warning',
        title: 'Retos pendientes de revisión',
        text: `Hay ${pendientes} reto${pendientes === 1 ? '' : 's'} esperando revisión.`,
        fecha: null,
        to: '/dashboard',
      });
    }

    return lista.sort((a, b) => {
      const ta = a.fecha ? new Date(a.fecha).getTime() : 0;
      const tb = b.fecha ? new Date(b.fecha).getTime() : 0;
      return tb - ta;
    });
  }, [retos, inicioSesion, user]);

  const items = useMemo(
    () => notificaciones.map((n) => ({ ...n, leida: leidas.includes(n.id) })),
    [notificaciones, leidas]
  );

  const noLeidas = items.filter((n) => !n.leida).length;

  const marcarLeida = useCallback((id) => {
    setLeidas((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id].slice(-200);
      escribirLS(READ_KEY, next);
      return next;
    });
  }, []);

  const marcarTodasLeidas = useCallback(() => {
    setLeidas((prev) => {
      const next = Array.from(new Set([...prev, ...notificaciones.map((n) => n.id)])).slice(-200);
      escribirLS(READ_KEY, next);
      return next;
    });
  }, [notificaciones]);

  return { items, noLeidas, marcarLeida, marcarTodasLeidas, recargar: cargar };
}

export default useNotifications;
