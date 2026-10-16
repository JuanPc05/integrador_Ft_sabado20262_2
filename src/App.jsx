// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// 1. Importación de Layouts (Los "Moldes")
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// 2. Importación de Páginas (El contenido interno)
// Nota: Asume que estos componentes ya existen en sus respectivas carpetas
import { LandingPage } from '@/pages/landing/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

// 3. Cascarón del Guardián de Rutas (ProtectedRoute)
const ProtectedRoute = ({ children }) => {
  // TODO: Reemplazar esta variable hardcodeada con tu estado global de autenticación (Context o Redux)
  // ej: const { isAuthenticated } = useAuth();
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    // Si no está logueado, lo pateamos al login y borramos el historial para que no pueda volver atrás
    return <Navigate to="/login" replace />;
  }

  // Si pasa la validación, renderizamos el layout/página que solicitó
  return children;
};

// 4. Configuración del Enrutador Moderno (Data API)
const router = createBrowserRouter([
  // Bloque Público: Landing Page
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> }, // Responde a '/'
      { path: "landing", element: <LandingPage /> } // Responde a '/landing'
    ]
  },
  
  // Bloque Autenticación: Login y Registro
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "registro", element: <RegisterPage /> }
    ]
  },

  // Bloque Privado: Dashboard
  {
    path: "/dashboard",
    // Protegemos TODO el bloque envolviendo el Layout en el ProtectedRoute
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      // Mañana, cuando el equipo cree nuevas vistas, solo deben agregarlas aquí:
      // { path: "retos", element: <RetosPage /> },
      // { path: "configuracion", element: <ConfiguracionPage /> }
    ]
  },

  // Fallback (Ruta 404): Cualquier URL no definida redirecciona al inicio
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

// 5. Componente Raíz
function App() {
  return <RouterProvider router={router} />;
}

export default App;