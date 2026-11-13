// Contenido basado en el README del proyecto (roles y ciclo de vida de los retos)
const ROLES = [
  {
    icon: 'domain',
    title: 'Empresas aliadas',
    badge: 'Representante de empresa',
    color: 'text-primary bg-primary-container/15',
    points: [
      'Publican retos con su empresa preseleccionada.',
      'Ven y gestionan únicamente los retos de su organización.',
      'Dan retroalimentación a los equipos durante el desarrollo.',
    ],
  },
  {
    icon: 'school',
    title: 'Estudiantes CESDE',
    badge: 'Talento en formación',
    color: 'text-tertiary bg-tertiary-container/25',
    points: [
      'Exploran las convocatorias abiertas (En convocatoria).',
      'Se postulan en equipos con acompañamiento docente.',
      'Entregan avances por sprints sobre retos reales.',
    ],
  },
  {
    icon: 'admin_panel_settings',
    title: 'Universidad',
    badge: 'Administración CESDE',
    color: 'text-secondary bg-secondary-container/30',
    points: [
      'Supervisa los retos de todas las empresas.',
      'Gestiona categorías y prioridades del catálogo.',
      'Consulta el dashboard de analítica y KPIs.',
    ],
  },
];

const CICLO = ['Radicado', 'En convocatoria', 'En desarrollo', 'Finalizado'];

export const RolesSection = () => {
  return (
    <section id="roles" className="scroll-mt-28">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-caption font-caption text-secondary uppercase font-bold tracking-widest">
          Una plataforma, tres perfiles
        </span>
        <h2 className="text-headline-xl font-headline-xl text-on-surface font-bold mt-2">
          Cada actor sabe qué hacer y qué ver
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant mt-3">
          CESDE Conecta organiza el trabajo entre empresas, estudiantes y la universidad con permisos
          claros para cada rol.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROLES.map((rol) => (
          <div
            key={rol.title}
            className="bg-surface-container-low rounded-3xl border border-white/5 p-7 flex flex-col gap-4 hover:border-primary-container/30 transition-colors"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${rol.color}`}>
              <span className="material-symbols-outlined">{rol.icon}</span>
            </div>
            <div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface">{rol.title}</h3>
              <p className="text-caption font-caption text-outline uppercase tracking-wider">{rol.badge}</p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {rol.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-body-sm font-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5">check_circle</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Ciclo de vida de un reto */}
      <div className="mt-8 rounded-3xl border border-white/5 bg-surface-container-lowest/60 p-6 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-label-md font-label-md text-on-surface font-semibold shrink-0">
          Ciclo de vida de un reto
        </p>
        <ol className="flex flex-wrap items-center gap-2">
          {CICLO.map((estado, i) => (
            <li key={estado} className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary-container/15 text-primary border border-primary-container/30 text-caption font-caption font-semibold">
                {estado}
              </span>
              {i < CICLO.length - 1 && (
                <span className="material-symbols-outlined text-outline text-base">arrow_forward</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};