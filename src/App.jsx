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
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App


  return <RouterProvider router={router} />;
}

export default App;