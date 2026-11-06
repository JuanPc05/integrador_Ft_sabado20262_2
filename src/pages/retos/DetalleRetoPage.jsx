// src/pages/retos/DetalleRetoPage.jsx
import { useParams } from 'react-router-dom';
import {
  ChallengeBreadcrumb,
  ChallengeHeader,
  ChallengeKpiGrid,
  ChallengeTabs,
  TeamSubmissionsList,
  ChallengeSidebar,
} from '@/components/detalleReto';

const MOCK_CHALLENGE_DATA = {
  title: 'Algoritmo de Ruteo Inteligente en Tiempo Real',
  company: 'NovaLogistics S.A.S.',
  category: 'Tecnología & IA',
  priority: 'Alta Prioridad',
  status: 'En Evaluación / Recepción de Entregables',
  startDate: '10 Feb 2025',
  deadline: '15 Mar 2025',
};

export function DetalleRetoPage() {
  const { id } = useParams();

  const challengeData = {
    ...MOCK_CHALLENGE_DATA,
    id,
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Migas de pan */}
      <ChallengeBreadcrumb title={challengeData.title} />

      {/* 2. Cabecera principal del reto */}
      <ChallengeHeader challenge={challengeData} />

      {/* 3. Resumen de KPIs del reto */}
      <ChallengeKpiGrid challenge={challengeData} />

      {/* 4. Navegación por pestañas del reto */}
      <ChallengeTabs challenge={challengeData} />

      {/* 5. Contenedor de dos columnas: Contenido Principal (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <TeamSubmissionsList challengeId={id} />
        <ChallengeSidebar challenge={challengeData} />
      </div>
    </div>
  );
}

export default DetalleRetoPage;

