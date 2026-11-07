// src/routes/AppRouter.jsx
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/core/PublicLayout';
import { AuthLayout } from '@/core/AuthLayout';
import { DashboardLayout } from '@/core/DashboardLayout';
import { RetoLayout } from '@/core/RetoLayout';

// Páginas
import { LandingPage } from '@/features/landing/LandingPage';
import { LoginPage } from '@/features/auth/LoginPage';
import { RegisterPage } from '@/features/auth/Register';
import { PerfilPage } from '@/features/auth/PerfilPage';
import { DashboardPage } from '@/features/empresas/DashboardPage';
import { CrearRetoPage } from '@/features/retos/CrearRetoPage';
import { DetalleRetoPage } from '@/features/retos/DetalleRetoPage';
import { CrearEmpresaPage } from '@/features/empresas/CrearEmpresaPage';
import { EmpresaDetallePage } from '@/features/empresas/EmpresaDetallePage';

// Guardián de Rutas
import { ProtectedRoute } from '@/core/ProtectedRoute';

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
      { path: 'perfil', element: <PerfilPage /> },
      { path: 'empresa/configuracion', element: <EmpresaDetallePage /> },
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
