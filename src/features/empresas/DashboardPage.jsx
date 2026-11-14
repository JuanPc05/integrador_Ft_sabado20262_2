// src/features/empresas/DashboardPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/features/auth/useAuth';
import { springApi } from '@/services/apiClient';
import { KpiCard } from '@/features/empresas/components/dashboard/KpiCard';
import { ChallengeTable } from '@/features/empresas/components/dashboard/ChallengeTable';
import { FeedbackDrawer } from '@/features/empresas/components/dashboard/FeedbackDrawer';
import { SupportBanner } from '@/features/empresas/components/dashboard/SupportBanner';
import { NextSessionCard } from '@/features/empresas/components/dashboard/NextSessionCard';

export const DashboardMainPage = () => {
  const { user } = useAuth();
  const [retos, setRetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const cargarRetos = async () => {
      setLoading(true);
      try {
        // Petición directa con springApi (Axios con interceptor JWT) hacia GET /api/retos
        const response = await springApi.get('/api/retos');

        // Soporta arreglo directo [{ id, nombre, ... }] (y fallback defensivo si algún día se pagina)
        const payload = response.data;
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.content)
            ? payload.content
            : Array.isArray(payload?.data)
              ? payload.data
              : [];

        console.log('Usuario:', user);
        console.log('Retos crudos:', data);

        const esAdmin = user?.rol === 'ADMIN_UNIVERSIDAD';
        const retosFiltrados = data.filter((reto) => {
          if (esAdmin) return true;

          // Extraer el ID de la empresa del reto (soporta objeto anidado o campo plano)
          const retoEmpresaId =
            reto.empresa?.id || reto.empresaId || reto.idEmpresa;
          // Extraer el ID de la empresa del usuario
          const usuarioEmpresaId =
            user?.empresa?.id || user?.idEmpresa || user?.empresaId;

          // Si el perfil aún no tiene empresa asociada en sesión, mostrar los retos disponibles
          if (!usuarioEmpresaId) return true;

          return String(retoEmpresaId) === String(usuarioEmpresaId);
        });

        if (isMounted) {
          setRetos(retosFiltrados);
        }
      } catch (err) {
        console.error('[Dashboard] Error al obtener retos desde /api/retos:', err);
        if (isMounted) {
          setRetos([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    cargarRetos();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Cálculos derivados memorizados con useMemo a partir de todos los estados del enum EstadoReto
  const retosActivos = useMemo(
    () =>
      retos.filter((r) => {
        const estado = r.estadoActual || r.estado;
        return (
          estado === 'EN_CONVOCATORIA' ||
          estado === 'RADICADO' ||
          estado === 'EN_REVISION'
        );
      }).length,
    [retos]
  );

  const proyectosDesarrollo = useMemo(
    () =>
      retos.filter((r) => {
        const estado = r.estadoActual || r.estado;
        return estado === 'EN_DESARROLLO' || estado === 'ASIGNADO';
      }).length,
    [retos]
  );

  const retosFinalizados = useMemo(
    () =>
      retos.filter((r) => {
        const estado = r.estadoActual || r.estado;
        return estado === 'FINALIZADO' || estado === 'RESUELTO';
      }).length,
    [retos]
  );

  const equiposPostulados = useMemo(
    () =>
      retos.reduce(
        (acc, r) =>
          acc +
          (Array.isArray(r.equipos)
            ? r.equipos.length
            : Array.isArray(r.assignedGroups)
              ? r.assignedGroups.length
              : 1),
        0
      ),
    [retos]
  );

  const tasaExito = useMemo(
    () =>
      retos.length === 0
        ? 0
        : Math.round((retosFinalizados / retos.length) * 100),
    [retos.length, retosFinalizados]
  );

  // Arreglo de datos para iterar los KPIs dinámicamente
  const kpiData = [
    {
      id: 1,
      title: 'Total Retos Activos',
      icon: 'flag',
      value: String(retosActivos),
      trendIcon: 'trending_up',
      trendText: `${retos.length} registrados`,
      subtitle: 'Convocatorias simultáneas',
      colorClass: 'text-primary',
      bgClass: 'bg-primary-container/10',
      hoverClass: 'hover:border-primary-container/30',
    },
    {
      id: 2,
      title: 'Equipos Postulados',
      icon: 'group_work',
      value: String(equiposPostulados),
      trendIcon: 'bolt',
      trendText: `${equiposPostulados * 4} estudiantes`,
      subtitle: 'Talento evaluando desafíos',
      colorClass: 'text-tertiary',
      bgClass: 'bg-tertiary-container/20',
      hoverClass: 'hover:border-tertiary/30',
    },
    {
      id: 3,
      title: 'Proyectos en Desarrollo',
      icon: 'pending_actions',
      value: String(proyectosDesarrollo),
      trendIcon: '',
      trendText: 'En ejecución',
      subtitle: 'Con acompañamiento docente',
      colorClass: 'text-secondary',
      bgClass: 'bg-secondary-container/30',
      hoverClass: 'hover:border-secondary/30',
    },
    {
      id: 4,
      title: 'Tasa de Éxito',
      icon: 'verified_user',
      value: `${tasaExito}%`,
      trendIcon: 'check_circle',
      trendText: `${retosFinalizados} completados`,
      subtitle: 'Cumplimiento metodológico',
      colorClass: 'text-primary-fixed',
      bgClass: 'bg-surface-container-high',
      hoverClass: 'hover:border-primary-container/30',
    },
  ];

  return (
    <>
      {/* Renderizado dinámico de KPIs */}
      <section id="equipos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 scroll-mt-28">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      {/* Estructura de columnas (8 para la tabla, 4 para el chat) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div id="mis-retos" className="scroll-mt-28">
            <ChallengeTable retos={retos} loading={loading} />
          </div>
          <SupportBanner />
        </section>

        {/* Columna Derecha */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <div id="mensajes" className="scroll-mt-28">
            <FeedbackDrawer />
          </div>
          <NextSessionCard />
        </section>
      </div>
    </>
  );
};

export { DashboardMainPage as DashboardPage };
export default DashboardMainPage;