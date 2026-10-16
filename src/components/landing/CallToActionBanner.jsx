import { Link } from 'react-router-dom';
import { Button, Icon } from '@/components/common';

export const CallToActionBanner = () => {
  return (
    <section className="bg-gradient-to-r from-surface-container to-surface-container-high border border-white/10 rounded-3xl p-8 md:p-14 text-center flex flex-col items-center">
      <h2 className="text-headline-xl font-headline-xl text-on-surface font-bold max-w-2xl mb-4">
        ¿Listo para llevar la innovación de tu organización al siguiente nivel?
      </h2>
      <p className="text-body-md font-body-md text-on-surface-variant max-w-xl mb-8">
        Crea tu cuenta institucional en minutos y comienza a interactuar con los retos y el talento joven del CESDE.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/registro">
          <Button variant="primary" size="lg" iconRight={<Icon name="arrow_forward" />}>
            Crear Cuenta Ahora
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outline" size="lg">
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    </section>
  );
};