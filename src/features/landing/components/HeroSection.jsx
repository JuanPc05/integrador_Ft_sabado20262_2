import { Link } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center max-w-4xl mx-auto relative pt-8">
      <Badge variant="primary" withDot dotPulsing className="mb-6">
        Convocatoria de Retos 2026-2 Abierta
      </Badge>

      <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero text-on-surface tracking-tight font-extrabold mb-6">
        Transformando retos en soluciones con{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-[#ff70a6] to-secondary-container">
          talento del futuro
        </span>
      </h1>

      <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
        La plataforma oficial donde organizaciones líderes y la comunidad académica de CESDE colaboran para resolver desafíos reales con alto impacto de innovación.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link to="/registro" className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            iconRight={<Icon name="arrow_forward" />}
          >
            Publicar o Resolver un Reto
          </Button>
        </Link>
        <Link to="/dashboard" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            iconLeft={<Icon name="dashboard" />}
          >
            Explorar Dashboard
          </Button>
        </Link>
      </div>

      {/* Floating KPI Cards Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-16 p-6 rounded-3xl bg-surface-container-low/80 border border-white/5 backdrop-blur-md">
        <div className="text-center p-3">
          <div className="text-headline-xl font-headline-xl text-primary font-bold">+120</div>
          <div className="text-body-sm text-outline mt-1">Retos Resueltos</div>
        </div>
        <div className="text-center p-3">
          <div className="text-headline-xl font-headline-xl text-tertiary font-bold">48</div>
          <div className="text-body-sm text-outline mt-1">Empresas Aliadas</div>
        </div>
        <div className="text-center p-3">
          <div className="text-headline-xl font-headline-xl text-secondary font-bold">98%</div>
          <div className="text-body-sm text-outline mt-1">Tasa de Éxito</div>
        </div>
        <div className="text-center p-3">
          <div className="text-headline-xl font-headline-xl text-white font-bold">+500</div>
          <div className="text-body-sm text-outline mt-1">Estudiantes Vinculados</div>
        </div>
      </div>
    </section>
  );
};