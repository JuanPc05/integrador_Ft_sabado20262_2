// src/components/dashboard/Footer.jsx

export const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-surface-variant/30 mt-auto">
      <div className="w-full py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-headline-md font-headline-md font-extrabold text-on-surface tracking-tight">
              CESDE <span className="text-primary-container">Conecta</span>
            </span>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-2 max-w-md">
              Transformando retos en soluciones con talento del futuro. Plataforma de vinculación empresarial y académica de alto impacto.
            </p>
          </div>
          
          {/* Enlaces Footer */}
          <nav className="flex flex-wrap gap-6 text-label-sm font-label-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Términos de servicio</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Política de privacidad</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Preguntas frecuentes</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">Contacto</a>
          </nav>
        </div>
        
        <div className="border-t border-surface-variant/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-caption font-caption text-outline">
          <div>
            © 2026 CESDE Conecta. Transformando retos en soluciones con talento del futuro. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              Plataforma Operativa
            </span>
            <span>Soporte Empresa: conecta@cesde.edu.co</span>
          </div>
        </div>
      </div>
    </footer>
  );
};