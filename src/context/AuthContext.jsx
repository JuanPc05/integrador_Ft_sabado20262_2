// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authService } from '@/services/auth.service';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/services/httpClient';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hidratar el estado de sesión al recargar la aplicación
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (storedToken) {
        setIsAuthenticated(true);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

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
      logout,
    }),
    [user, isAuthenticated, loading, loginContext, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

