import { Icon } from '@/components/common';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJbHjXOTu1nj0mpdPrX9kG4UheDAYzeieAyfHS-gDCwnofSt6TOgHgkPAcXbSoYSzqaTrI_d8U7OOlCnSZOpp48lR6CnWNJVSDM3t0JPIJgPWuI9urf5pIoFaOQZH6fTri722ETuS2KaCc_Vj2cr2yGrBno4ZXw_d72QTAebVFohv7zxiYKg-PeHNVDTDm49MApVLXOmKaMr3uUw1EXNY2i-W06wwq5Dd0EYTXkfiqkDUaRIwDNyHbGApViNuHXi1M9tY';

const COLUMNS = [
  {
    title: 'Plataforma',
    links: ['Cómo funciona', 'Explorar Retos', 'Para Empresas', 'Para Estudiantes'],
  },
  {
    title: 'Ecosistema',
    links: ['Casos de Éxito', 'Mentores & Docentes', 'Alianzas CESDE', 'Comunidad Digital'],
  },
  {
    title: 'Legal & Soporte',
    links: ['Términos de servicio', 'Política de privacidad', 'Preguntas frecuentes', 'Contacto'],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', icon: 'work' },
  { label: 'Comunidad', icon: 'groups' },
  { label: 'Soporte y Preguntas', icon: 'help_center' },
];

function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-surface-variant/30 w-full mt-auto">
      <div className="w-full py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Marca y estado */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20 p-0.5 bg-surface-container flex-shrink-0">
                <img
                  alt="CESDE Logo"
                  className="w-full h-full object-cover rounded-full"
                  src={LOGO_URL}
                />
              </div>
              <span className="text-headline-sm font-headline-sm font-extrabold text-on-surface tracking-tight">
                CESDE Conecta
              </span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant max-w-sm leading-relaxed">
              Transformando retos empresariales en soluciones efectivas con el talento joven e innovador del futuro.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-caption font-caption text-on-surface-variant">
                Sistemas 100% operativos
              </span>
            </div>
          </div>

          {/* Columnas de enlaces */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-label-md font-label-md text-on-surface font-semibold tracking-wide uppercase">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2 text-body-sm font-body-sm text-on-surface-variant">
                {col.links.map((link) => (
                  <li key={link}>
                    <a className="hover:text-primary transition-colors duration-200" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Derechos y redes */}
        <div className="pt-8 border-t border-surface-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption font-caption text-on-surface-variant text-center sm:text-left">
            © {new Date().getFullYear()} CESDE Conecta. Transformando retos en soluciones con talento del futuro. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-on-surface-variant">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center hover:text-primary hover:bg-surface-bright transition-all"
                href="#"
              >
                <Icon name={social.icon} className="text-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;