const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJbHjXOTu1nj0mpdPrX9kG4UheDAYzeieAyfHS-gDCwnofSt6TOgHgkPAcXbSoYSzqaTrI_d8U7OOlCnSZOpp48lR6CnWNJVSDM3t0JPIJgPWuI9urf5pIoFaOQZH6fTri722ETuS2KaCc_Vj2cr2yGrBno4ZXw_d72QTAebVFohv7zxiYKg-PeHNVDTDm49MApVLXOmKaMr3uUw1EXNY2i-W06wwq5Dd0EYTXkfiqkDUaRIwDNyHbGApViNuHXi1M9tY';

const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#' },
  { label: 'Retos', href: '#' },
  { label: 'Testimonios', href: '#' },
  { label: 'Contáctanos', href: '#' },
];

function Navbar() {
  return (
    <header className="w-full top-0 sticky z-50 bg-surface/80 backdrop-blur-md border-b border-surface-variant/40 shadow-lg shadow-black/40">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-20">
        {/* Logo */}
        <a className="flex items-center gap-3 group" href="/">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary-container/40 p-0.5 bg-surface-container-high transition-transform duration-200 group-hover:scale-105">
            <img
              alt="CESDE Logo"
              className="w-full h-full object-cover rounded-full"
              src={LOGO_URL}
            />
          </div>
          <span className="text-headline-md font-headline-md font-extrabold text-on-surface tracking-tight">
            CESDE Conecta
          </span>
        </a>

        {/* Links (escritorio) */}
        <nav className="hidden md:flex items-center gap-8 text-label-md font-label-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              className="text-on-surface-variant hover:text-primary transition-all duration-200"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex px-4 py-2 text-label-md font-label-md text-on-surface-variant hover:text-primary transition-all duration-200 active:scale-95"
            href="/login"
          >
            Iniciar Sesión
          </a>
          <a
            className="px-5 py-2.5 rounded-full bg-primary-container text-white text-label-md font-label-md font-semibold shadow-md shadow-primary-container/30 hover:brightness-110 active:scale-95 transition-all duration-150"
            href="/register"
          >
            Crear Cuenta
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;