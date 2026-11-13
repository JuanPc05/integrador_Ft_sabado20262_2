const TESTIMONIALS_DATA = [
  {
    name: 'NovaLogistics S.A.S.',
    role: 'Empresa Aliada • Sector Logística',
    comment:
      'CESDE Conecta nos permitió estructurar un modelo de optimización de rutas con un equipo de estudiantes excepcional y supervisión docente de alto nivel.',
    icon: 'domain',
  },
  {
    name: 'Sara Trujillo',
    role: 'Estudiante Líder • Equipo NeuralSync',
    comment:
      'Trabajar sobre datos e infraestructura reales nos brindó una experiencia profesional inigualable antes de graduarnos.',
    image: '/images/testimonio-estudiante.jpg',
    imageAlt: 'Estudiante de CESDE sonriendo frente a la sede de la institución',
  },
];

export const TestimonialsSection = () => {
  return (
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
        {TESTIMONIALS_DATA.map((t) => (
          <figure
            key={t.name}
            className="bg-surface-container-low rounded-3xl border border-white/5 overflow-hidden flex flex-col hover:border-primary-container/30 transition-colors"
          >
            {t.image ? (
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-[30%_25%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/10 to-transparent" />
              </div>
            ) : (
              <div className="relative h-72 md:h-80 flex items-center justify-center bg-gradient-to-br from-secondary-container/40 via-surface-container to-primary-container/20">
                <span className="material-symbols-outlined text-primary/80 text-[96px]">{t.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
              </div>
            )}

            <div className="p-8 pt-2 flex flex-col flex-1">
              <span className="material-symbols-outlined text-4xl text-primary/40 mb-2 block">format_quote</span>
              <blockquote className="text-body-md font-body-md text-on-surface leading-relaxed mb-6 flex-1">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
              <figcaption>
                <div className="text-label-md font-label-md text-on-surface font-semibold">{t.name}</div>
                <div className="text-caption font-caption text-outline">{t.role}</div>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
};