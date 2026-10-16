import { Link } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';

export function LandingPage() {
  const features = [
    {
      step: '01',
      title: 'Publica tu reto empresarial',
      description: 'Define la problemática u oportunidad de tu empresa. Nuestro equipo docente te asiste en la formulación de objetivos y entregables clave.',
      icon: 'add_task',
    },
    {
      step: '02',
      title: 'Equipos multidisciplinarios',
      description: 'Estudiantes talentosos de CESDE analizan los requerimientos y postulan propuestas innovadoras con soluciones técnicas modernas.',
      icon: 'groups',
    },
    {
      step: '03',
      title: 'Acompañamiento docente',
      description: 'Cada reto cuenta con supervisión metodológica y académica constante para asegurar entregas rigurosas en cada Sprint.',
      icon: 'school',
    },
    {
      step: '04',
      title: 'Soluciones aplicables',
      description: 'Recibe prototipos funcionales, código probado, documentación y modelos listos para implementar en tu organización.',
      icon: 'verified',
    },
  ];

  const featuredChallenges = [
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

  const testimonials = [
    {
      name: 'NovaLogistics S.A.S.',
      role: 'Empresa Aliada • Sector Logística',
      comment: 'CESDE Conecta nos permitió estructurar un modelo de optimización de rutas con un equipo de estudiantes excepcional y supervisión docente de alto nivel.',
    },
    {
      name: 'Sara Trujillo',
      role: 'Estudiante Líder • Equipo NeuralSync',
      comment: 'Trabajar sobre datos e infraestructura reales nos brindó una experiencia profesional inigualable antes de graduarnos.',
    },
  ];

  return (
    <div className="flex flex-col gap-24 py-12 md:py-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
      {/* Hero Section */}
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

      {/* Sección Cómo Funciona */}
      <section id="como-funciona" className="scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-caption font-caption text-primary uppercase font-bold tracking-widest">
            Flujo de Trabajo
          </span>
          <h2 className="text-headline-xl font-headline-xl text-on-surface font-bold mt-2">
            ¿Cómo funciona CESDE Conecta?
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-3">
            Un proceso ágil, transparente y con rigor metodológico diseñado para maximizar el valor entre empresa y academia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.step}
              className="bg-surface-container-low p-6 rounded-2xl border border-white/5 hover:border-primary-container/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-headline-lg font-headline-lg font-extrabold text-white/20 group-hover:text-primary transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon name={item.icon} className="text-xl" />
                  </div>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Retos Destacados */}
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
          {featuredChallenges.map((challenge) => (
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

      {/* Sección Testimonios */}
      <section id="testimonios" className="scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-caption font-caption text-secondary uppercase font-bold tracking-widest">
            Casos de Éxito
          </span>
          <h2 className="text-headline-xl font-headline-xl text-on-surface font-bold mt-2">
            Lo que dicen nuestras empresas y talentos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface-container-low p-8 rounded-3xl border border-white/5 relative"
            >
              <span className="material-symbols-outlined text-4xl text-primary/30 mb-4 block">
                format_quote
              </span>
              <p className="text-body-md font-body-md text-on-surface leading-relaxed mb-6">
                "{t.comment}"
              </p>
              <div>
                <div className="text-label-md font-label-md text-on-surface font-semibold">{t.name}</div>
                <div className="text-caption font-caption text-outline">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
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
    </div>
  );
}

export default LandingPage;
