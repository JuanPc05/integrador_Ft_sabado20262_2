import { Link } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';

const CHALLENGES_DATA = [
  {
    id: 1,
    title: 'Optimización de eCommerce con Inteligencia Artificial',
    area: 'Data Science & ML',
    status: 'En Convocatoria',
    statusColor: 'primary',
    description: 'Modelos predictivos para la demanda y personalización de inventario crítico en retail digital.',
    deadline: '28 Mar 2026',
  },
  {
    id: 2,
    title: 'Rediseño de App Móvil FinTech & Billetera Digital',
    area: 'UX/UI & Flutter',
    status: 'En Desarrollo',
    statusColor: 'tertiary',
    description: 'Arquitectura de experiencia de usuario enfocada en microfinanzas e inclusión financiera.',
    deadline: '14 Abr 2026',
  },
  {
    id: 3,
    title: 'Plataforma IoT de Trazabilidad en Bodega & Cloud AWS',
    area: 'IoT & Cloud AWS',
    status: 'En Revisión',
    statusColor: 'neutral',
    description: 'Monitoreo en tiempo real de condiciones térmicas y trazabilidad logística para supply chain.',
    deadline: '05 May 2026',
  },
];

export const ActiveChallengesSection = () => {
  return (
    <section id="retos" className="scroll-mt-28">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <span className="text-caption font-caption text-tertiary uppercase font-bold tracking-widest">
            Convocatorias Vigentes
          </span>
          <h2 className="text-headline-xl font-headline-xl text-on-surface font-bold mt-2">
            Retos Destacados en la Plataforma
          </h2>
        </div>
        <Link to="/registro">
          <Button variant="outline" size="sm" iconRight={<Icon name="arrow_forward" />}>
            Ver todos los retos
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHALLENGES_DATA.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-surface-container-low rounded-3xl border border-white/5 p-6 flex flex-col justify-between hover:border-primary-container/40 transition-all shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant={challenge.statusColor} withDot size="sm">
                  {challenge.status}
                </Badge>
                <span className="text-caption font-caption text-outline">
                  Cierre: {challenge.deadline}
                </span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold mb-2">
                {challenge.title}
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded text-caption font-caption bg-surface-container-high text-tertiary mb-3">
                {challenge.area}
              </span>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                {challenge.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-caption text-outline">CESDE Conecta 2026-2</span>
              <Link to="/registro">
                <Button variant="solid" size="sm" iconRight={<Icon name="arrow_forward" />}>
                  Postular
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};