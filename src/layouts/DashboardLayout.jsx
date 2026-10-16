// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { Footer } from '../components/dashboard/Footer';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Cabecera global del módulo */}
      <Header />
      
      {/* Contenedor principal donde se inyectarán las vistas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 flex flex-col gap-8">
        {children ?? <Outlet />}
      </main>

      {/* Pie de página global del módulo */}
      <Footer />
      
    </div>
  );
};

export default DashboardLayout;