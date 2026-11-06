// src/routes/AppRouter.jsx
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { RetoLayout } from '@/layouts/RetoLayout';

// Páginas
import { LandingPage } from '@/pages/landing/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { CrearRetoPage } from '@/pages/dashboard/CrearRetoPage';
import { DetalleRetoPage } from '@/pages/retos/DetalleRetoPage';
import { CrearEmpresaPage } from '@/pages/empresas/CrearEmpresaPage';
import { EmpresaDetallePage } from '@/pages/empresas/EmpresaDetallePage';

// Guardián de Rutas
import { ProtectedRoute } from '@/routes/ProtectedRoute';

export const router = createBrowserRouter([
  // 1. Bloque Público
  {
    path: '/',
    element: (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    ),
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'landing', element: <LandingPage /> },
    ],
  },

  // 2. Bloque Auth
  {
    path: '/',
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegisterPage /> },
      { path: 'register', element: <Navigate to="/registro" replace /> },
    ],
  },

  // 3. Bloque Dashboard (Privado)
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'empresas/nueva', element: <CrearEmpresaPage /> },
      { path: 'empresas/:id', element: <EmpresaDetallePage /> },
    ],
  },

  // 4. Bloque Retos (Privado y Aislado de DashboardLayout)
  {
    path: '/dashboard/retos',
    element: (
      <ProtectedRoute>
        <RetoLayout>
          <Outlet />
        </RetoLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: 'nuevo', element: <CrearRetoPage /> },
      { path: ':id', element: <DetalleRetoPage /> },
    ],
  },

  // Fallback (Ruta 404)
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
