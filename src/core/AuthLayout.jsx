import { Outlet } from 'react-router-dom';

/**
 * Layout estructural para el bloque de autenticación (Login, Registro).
 * Provee la salida de rutas secundarias sin duplicar la barra de navegación o pie de página.
 */
export const AuthLayout = ({ children }) => {
  return children ?? <Outlet />;
};

export default AuthLayout;
