// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '@/features/auth/AuthContext';

/**
 * Custom Hook para consumir el contexto global de autenticación (DIP).
 * Desacopla los componentes visuales de la implementación interna del estado y servicios.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un <AuthProvider>');
  }

  return context;
}

export default useAuth;

