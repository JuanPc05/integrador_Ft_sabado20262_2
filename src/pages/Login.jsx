import { Badge, Icon } from '@/components/common';
import LoginForm from '@/components/login/LoginForm';
import Navbar from '@/layouts/Navbar';
import Footer from '@/layouts/Footer';

function Login() {
  const handleLogin = (values) => {
    // TODO: conectar con la API de inicio de sesión
    console.log('Login:', values);
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-white">
      <Navbar />

      <main className="relative flex-1 flex items-center justify-center px-4 sm:px-6 py-12 md:py-16 min-h-[calc(100vh-160px)] bg-[image:radial-gradient(circle_at_50%_30%,rgba(225,29,116,0.12)_0%,rgba(121,40,202,0.05)_45%,transparent_75%)]">
        {/* Brillos de fondo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none" />

        {/* Tarjeta de login */}
        <div className="relative w-full max-w-md mx-auto bg-surface-container-low border border-surface-variant/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="success" withDot dotPulsing>
              Plataforma Operativa
            </Badge>
            <div className="inline-flex items-center gap-1 text-on-surface-variant/70 text-caption font-caption">
              <Icon name="lock" className="text-[15px] text-tertiary" />
              <span>SSL 256-bit</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight mb-2">
              Bienvenido de nuevo
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Ingresa a tu cuenta para continuar impulsando retos y talento.
            </p>
          </div>

          <LoginForm onSubmit={handleLogin} />

          <div className="mt-8 pt-6 border-t border-surface-variant/50 text-center">
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              ¿No tienes cuenta?
              <a
                className="ml-1 text-primary hover:text-primary-container font-semibold transition-colors underline underline-offset-4 decoration-primary-container/40 hover:decoration-primary-container"
                href="/register"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;