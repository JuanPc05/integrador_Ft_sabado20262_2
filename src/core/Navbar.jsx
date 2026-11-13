import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJbHjXOTu1nj0mpdPrX9kG4UheDAYzeieAyfHS-gDCwnofSt6TOgHgkPAcXbSoYSzqaTrI_d8U7OOlCnSZOpp48lR6CnWNJVSDM3t0JPIJgPWuI9urf5pIoFaOQZH6fTri722ETuS2KaCc_Vj2cr2yGrBno4ZXw_d72QTAebVFohv7zxiYKg-PeHNVDTDm49MApVLXOmKaMr3uUw1EXNY2i-W06wwq5Dd0EYTXkfiqkDUaRIwDNyHbGApViNuHXi1M9tY';

const NAV_LINKS = [
  { label: 'Cómo funciona', to: '/#como-funciona' },
  { label: 'Retos', to: '/retos' },
  { label: 'Testimonios', to: '/#testimonios' },
];

const linkClass = 'text-on-surface-variant hover:text-primary transition-all duration-200';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="w-full top-0 sticky z-50 bg-surface/80 backdrop-blur-md border-b border-surface-variant/40 shadow-lg shadow-black/40">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-20">
        {/* Logo */}
        <Link className="flex items-center gap-3 group" to="/" onClick={() => setMobileOpen(false)}>
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary-container/40 p-0.5 bg-surface-container-high transition-transform duration-200 group-hover:scale-105">
            <img alt="CESDE Logo" className="w-full h-full object-cover rounded-full" src={LOGO_URL} />
          </div>
          <span className="text-headline-md font-headline-md font-extrabold text-on-surface tracking-tight">
            CESDE Conecta
          </span>
        </Link>

        {/* Links (escritorio) */}
        <nav className="hidden md:flex items-center gap-8 text-label-md font-label-md">
          {NAV_LINKS.map((link) =>
            link.to.includes('#') ? (
              <Link key={link.label} className={linkClass} to={link.to}>
                {link.label}
              </Link>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) => `${linkClass} ${isActive ? 'text-primary' : ''}`}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <Link
            className="hidden sm:inline-flex px-4 py-2 text-label-md font-label-md text-on-surface-variant hover:text-primary transition-all duration-200 active:scale-95"
            to="/login"
          >
            Iniciar Sesión
          </Link>
          <Link
            className="px-5 py-2.5 rounded-full bg-primary-container text-white text-label-md font-label-md font-semibold shadow-md shadow-primary-container/30 hover:brightness-110 active:scale-95 transition-all duration-150"
            to="/registro"
          >
            Crear Cuenta
          </Link>

          {/* Botón menú móvil */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <nav
          key={pathname}
          className="md:hidden border-t border-surface-variant/40 bg-surface/95 px-6 py-4 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-3 rounded-xl text-label-md font-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="sm:hidden px-3 py-3 rounded-xl text-label-md font-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            Iniciar Sesión
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;