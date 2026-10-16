const TESTIMONIALS_DATA = [
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
  );
};