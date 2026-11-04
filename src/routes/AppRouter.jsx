// src/routes/AppRouter.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Páginas
import { LandingPage } from '@/pages/landing/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { CrearEmpresaPage } from '@/pages/empresas/CrearEmpresaPage';
import { EmpresaDetallePage } from '@/pages/empresas/EmpresaDetallePage';

// Guardián de Rutas
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const router = createBrowserRouter([
  // Bloque Público: Landing Page
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'landing', element: <LandingPage /> },
    ],
  },

  // Bloque Autenticación: Login y Registro
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegisterPage /> },
      { path: 'register', element: <Navigate to="/registro" replace /> },
    ],
  },

  // Bloque Privado: Dashboard protegido por sesión
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'empresas/nueva', element: <CrearEmpresaPage /> },
      { path: 'empresas/:id', element: <EmpresaDetallePage /> },
    ],
  },

  // Fallback (Ruta 404): Redirecciona al inicio
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;

