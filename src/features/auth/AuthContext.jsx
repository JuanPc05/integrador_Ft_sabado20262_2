// src/features/auth/AuthContext.jsx
import { createContext, useState, useCallback, useMemo } from 'react';
import { authService } from '@/features/auth/auth.service';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/core/httpClient';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      return storedToken && storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const [loading, setLoading] = useState(false);

  /**
   * Ejecuta el flujo de inicio de sesión contra el servicio de dominio,
   * almacena el accessToken en localStorage y actualiza el estado global.
   */
  const loginContext = useCallback(async (credenciales) => {
    setLoading(true);
    try {
      const response = await authService.login(credenciales);

      const token = response?.accessToken || response?.token;
      const loggedUser = response?.usuario || response?.user || {
        email: credenciales.email,
        rol: response?.rol || null,
      };

      if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
      }
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedUser));

      setUser(loggedUser);
      setIsAuthenticated(true);

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualiza los datos de la empresa vinculada al usuario en el contexto y localStorage,
   * o sincroniza el estado del usuario actual desde localStorage.
   */
  const refrescarSesion = useCallback((nuevaEmpresa = null) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = nuevaEmpresa?.id
        ? {
            ...prevUser,
            idEmpresa: nuevaEmpresa.id,
            empresaId: nuevaEmpresa.id,
            nombreEmpresa: nuevaEmpresa.nombre || prevUser.nombreEmpresa || null,
            empresa: nuevaEmpresa,
          }
        : prevUser;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  /**
   * Limpia las credenciales persistidas y reinicia el estado global de autenticación.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      loginContext,
      refrescarSesion,
      logout,
    }),
    [user, isAuthenticated, loading, loginContext, refrescarSesion, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

