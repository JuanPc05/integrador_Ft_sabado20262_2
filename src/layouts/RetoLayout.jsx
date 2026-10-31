// src/layouts/RetoLayout.jsx
import React from 'react';

export const RetoLayout = ({ children, showHelpLink = true }) => {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col relative selection:bg-primary-container selection:text-white overflow-x-hidden font-body-md">
      
      {/* 1. Ambient Background Canvas Glows (Luces de fondo) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 right-10 w-[600px] h-[600px] rounded-full bg-primary-container/10 blur-[130px]" />
        <div className="absolute top-1/2 -left-40 w-[550px] h-[550px] rounded-full bg-secondary-container/10 blur-[140px]" />
        <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] rounded-full bg-tertiary-container/10 blur-[120px]" />
      </div>

      {/* 2. Shared Header / Navbar */}
      <header className="w-full bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-surface-variant/40 shadow-lg shadow-black/40">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-20">
          
          {/* Brand Logo Left */}
          <a
            href="#"
            className="flex items-center gap-3.5 group transition-transform active:scale-95 duration-150"
          >
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-primary-container to-secondary flex items-center justify-center shadow-lg shadow-primary-container/20 group-hover:shadow-primary-container/40 transition-shadow">
              <img
                alt="CESDE Isotipo"
                className="w-full h-full object-cover rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-87tuGWACKWqJAKYLGwdypDDtHiPShQ0i8z4PWQL9Kudy8N9tsgndp7qZGSVXKcSeHO0OOUmnxOEk3G7CQhCSwGUrou8EsF0MgOtvxJRH0mbZTth63RXmBy_klRdsNtZTychjTo7wgSArhS1HoMQK3JbDOssn29FWvCa175mcJJ1qJMOK_SLAcPjkSVReYIkWQivNw-S0sq8aTdBrRplEQcf2mJXrvWT6i3hqI-Kl"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-extrabold text-on-surface tracking-tight leading-none group-hover:text-primary transition-colors">
                CESDE <span className="text-primary-container">Conecta</span>
              </span>
              <span className="font-label-sm text-caption text-on-surface-variant font-medium tracking-wider uppercase mt-1">
                Ecosistema de Innovación
              </span>
            </div>
          </a>

          {/* Trailing Action Cluster Right */}
          <div className="flex items-center gap-6">
            {showHelpLink && (
              <>
                <a
                  href="#"
                  className="hidden sm:flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-[20px] text-tertiary">
                    help
                  </span>
                  <span>¿Necesitas ayuda?</span>
                </a>
                <div className="h-6 w-px bg-surface-variant/60 hidden sm:block" />
              </>
            )}

            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container border border-white/10 hover:border-primary-container/50 hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all duration-200 active:scale-95 group"
            >
              <span className="material-symbols-outlined text-[18px] text-primary group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span>Volver al Dashboard</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Main Content Dinámico (Aquí entrará Crear Reto o Detalle) */}
      <main className="flex-grow flex flex-col items-center justify-center py-10 md:py-14 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl mx-auto">
        {children}
      </main>

      {/* 4. Footer Institucional Completo */}
      <footer className="w-full bg-surface-container-lowest border-t border-surface-variant/30 pt-14 pb-10 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* Brand identity Column */}
            <div className="flex flex-col gap-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-primary-container to-secondary flex items-center justify-center">
                  <img
                    alt="CESDE Isotipo"
                    className="w-full h-full object-cover rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-87tuGWACKWqJAKYLGwdypDDtHiPShQ0i8z4PWQL9Kudy8N9tsgndp7qZGSVXKcSeHO0OOUmnxOEk3G7CQhCSwGUrou8EsF0MgOtvxJRH0mbZTth63RXmBy_klRdsNtZTychjTo7wgSArhS1HoMQK3JbDOssn29FWvCa175mcJJ1qJMOK_SLAcPjkSVReYIkWQivNw-S0sq8aTdBrRplEQcf2mJXrvWT6i3hqI-Kl"
                  />
                </div>
                <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface tracking-tight">
                  CESDE <span className="text-primary-container">Conecta</span>
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Plataforma institucional de transferencia de retos y co-creación
                de soluciones técnicas con el talento productivo y docente de CESDE.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]" />
                </span>
                <span className="font-label-sm text-label-sm font-semibold text-[#10b981]">
                  Plataforma Operativa 100%
                </span>
              </div>
            </div>

            {/* Links Column 1: Plataforma */}
            <div className="flex flex-col gap-3">
              <h4 className="font-label-md text-label-md font-bold text-on-surface tracking-wider uppercase">
                Plataforma
              </h4>
              <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">Cómo funciona</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Explorar Retos</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Directorio de Empresas</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Talento CESDE</a></li>
              </ul>
            </div>

            {/* Links Column 2: Ecosistema */}
            <div className="flex flex-col gap-3">
              <h4 className="font-label-md text-label-md font-bold text-on-surface tracking-wider uppercase">
                Ecosistema
              </h4>
              <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">Escuelas de Innovación</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Laboratorios &amp; FabLab</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Casos de Éxito</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Testimonios Empresariales</a></li>
              </ul>
            </div>

            {/* Links Column 3: Legal & Soporte */}
            <div className="flex flex-col gap-3">
              <h4 className="font-label-md text-label-md font-bold text-on-surface tracking-wider uppercase">
                Legal &amp; Soporte
              </h4>
              <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">Términos de servicio</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Política de privacidad</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Preguntas frecuentes</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Centro de Contacto</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Separator & Copyright */}
          <div className="pt-8 border-t border-surface-variant/20 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
            <p>
              © 2025 CESDE Conecta. Transformando retos en soluciones con talento
              del futuro. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 font-label-sm text-label-sm">
              <span className="flex items-center gap-1.5 text-outline">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  location_on
                </span>
                Medellín, Colombia
              </span>
              <span className="text-outline">v2.4.0-stable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RetoLayout;