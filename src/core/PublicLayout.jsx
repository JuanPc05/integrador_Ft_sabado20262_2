import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToHash from './ScrollToHash';

export const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-white">
      <ScrollToHash />

      {/* Header Público Fijo */}
      <Navbar />

      {/* Contenido dinámico */}
      <main className="flex-1 w-full flex flex-col">
        {children ?? <Outlet />}
      </main>

      {/* Footer Institucional */}
      <Footer />
    </div>
  );
};

export default PublicLayout;