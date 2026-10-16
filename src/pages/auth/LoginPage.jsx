import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';
import InputField from '@/components/registro/InputField';
import Navbar from '@/layouts/Navbar';
import Footer from '@/layouts/Footer';

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular autenticación exitosa y redirigir al Dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-white min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      {/* Brillos de fondo ambientales */}
      <div className="fixed inset-0 pointer-events-none bg-[image:radial-gradient(circle_at_50%_15%,rgba(225,29,116,0.15)_0%,rgba(104,7,186,0.08)_35%,transparent_70%)] -z-10" />
      <div className="fixed top-1/3 -left-32 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 -right-32 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-12 md:py-16">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-surface-container-low/95 backdrop-blur-xl rounded-3xl border border-[#2a2b33] p-8 md:p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_35px_-5px_rgba(225,29,116,0.15)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-container/50 to-transparent" />

            <div className="text-center mb-8 flex flex-col items-center">
              <Badge variant="primary" withDot dotPulsing>
                Acceso Seguro
              </Badge>
              <h1 className="text-headline-lg font-headline-lg text-on-surface mt-3 mb-2 tracking-tight">
                Iniciar Sesión
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                Ingresa tus credenciales para acceder a tus retos, postulaciones y panel de gestión.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputField
                id="email"
                label="Correo electrónico"
                icon="mail"
                type="email"
                placeholder="correo@empresa.com o @cesde.edu.co"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                id="password"
                label="Contraseña"
                icon="lock"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña registrada"
                required
                value={formData.password}
                onChange={handleChange}
                rightSlot={
                  <button
                    type="button"
                    aria-label="Alternar visibilidad"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 text-outline hover:text-on-surface transition-colors p-1"
                  >
                    <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
                  </button>
                }
              />

              <div className="flex items-center justify-between text-caption font-caption">
                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-on-surface">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded bg-[#12141C] border border-white/20 text-primary-container focus:ring-primary-container"
                  />
                  <span>Recordarme en este equipo</span>
                </label>
                <a href="#" className="text-primary hover:underline hover:text-white transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                  iconRight={<Icon name="login" />}
                >
                  {isLoading ? 'Accediendo...' : 'Ingresar a la Plataforma'}
                </Button>
              </div>

              <div className="text-center pt-2">
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  ¿No tienes una cuenta aún?
                  <Link
                    className="text-primary font-semibold hover:underline hover:text-white transition-colors ml-1"
                    to="/registro"
                  >
                    Crea tu cuenta
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
