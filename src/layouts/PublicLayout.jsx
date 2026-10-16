import { Outlet } from 'react-router-dom';

// Asumiremos que crearemos estos componentes estructurales dentro de una carpeta 'layout'
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';

export const PublicLayout = () => {
  return (
    // 1. Contenedor principal: Ocupa mínimo toda la pantalla (min-h-screen)
    // Usamos flex-col para empujar el Footer siempre hacia abajo.
    // También inyectamos las clases de tipografía y colores globales que tenías en el <body> del HTML.
    <div className="min-h-screen flex flex-col bg-background text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-white">
      
      {/* 2. El Header Público (Fijo en la parte superior) */}
      {/* <Navbar variant="public" /> */}
      <header className="h-20 bg-surface/80 flex items-center justify-center border-b border-white/10">
         <span className="text-outline">Navbar Placeholder</span>
      </header>
      
      {/* 3. El contenido dinámico (La Página) */}
      {/* La clase flex-1 hace que este contenedor crezca y ocupe todo el espacio disponible */}
      <main className="flex-1 w-full flex flex-col">
        {/* Aquí es donde React Router inyecta mágicamente <LandingPage /> o <FaqPage /> */}
        <Outlet /> 
      </main>
      
      {/* 4. El Footer Institucional (Siempre al final) */}
      {/* <Footer variant="full" /> */}
      <footer className="py-10 bg-surface-container-lowest border-t border-white/10 flex justify-center">
         <span className="text-outline">Footer Placeholder</span>
      </footer>

    </div>
  );
};