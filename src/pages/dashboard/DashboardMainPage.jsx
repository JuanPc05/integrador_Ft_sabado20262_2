// src/pages/dashboard/DashboardMainPage.jsx
import { SubNavigation } from '../../components/dashboard/SubNavigation';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { ChallengeTable } from '../../components/dashboard/ChallengeTable';
import { FeedbackDrawer } from '../../components/dashboard/FeedbackDrawer';
import { SupportBanner } from '../../components/dashboard/SupportBanner';
import { NextSessionCard } from '../../components/dashboard/NextSessionCard';

export const DashboardMainPage = () => {
  // Arreglo de datos para iterar los KPIs dinámicamente
  const kpiData = [
    { 
      id: 1, title: "Total Retos Activos", icon: "flag", value: "4", 
      trendIcon: "trending_up", trendText: "+1 este mes", subtitle: "Convocatorias simultáneas", 
      colorClass: "text-primary", bgClass: "bg-primary-container/10", hoverClass: "hover:border-primary-container/30" 
    },
    { 
      id: 2, title: "Equipos Postulados", icon: "group_work", value: "12", 
      trendIcon: "bolt", trendText: "48 estudiantes", subtitle: "Talento evaluando desafíos", 
      colorClass: "text-tertiary", bgClass: "bg-tertiary-container/20", hoverClass: "hover:border-tertiary/30" 
    },
    { 
      id: 3, title: "Proyectos en Desarrollo", icon: "pending_actions", value: "2", 
      trendIcon: "", trendText: "Sprint 3 en curso", subtitle: "Con acompañamiento docente", 
      colorClass: "text-secondary", bgClass: "bg-secondary-container/30", hoverClass: "hover:border-secondary/30" 
    },
    { 
      id: 4, title: "Tasa de Éxito", icon: "verified_user", value: "98%", 
      trendIcon: "check_circle", trendText: "14 completados", subtitle: "Cumplimiento metodológico", 
      colorClass: "text-primary-fixed", bgClass: "bg-surface-container-high", hoverClass: "hover:border-primary-container/30" 
    }
  ];

  return (
    <>
      <SubNavigation />
      
      {/* Renderizado dinámico de KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      {/* Estructura de columnas (8 para la tabla, 4 para el chat) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Columna Izquierda */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <ChallengeTable />
          <SupportBanner />
        </section>
        
        {/* Columna Derecha */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          <FeedbackDrawer />
          <NextSessionCard />
        </section>
        
      </div>
    </>
  );
};