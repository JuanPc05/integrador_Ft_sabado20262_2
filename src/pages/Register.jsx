import { Badge } from '@/components/common';
import RegisterForm from '@/components/registro/RegisterForm';
import Navbar from '@/layouts/Navbar';
import Footer from '@/layouts/Footer';

function Register() {
  const handleRegister = (values) => {
    // TODO: conectar con la API de registro
    console.log('Registro:', values);
  };

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-white min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      {/* Brillos de fondo */}
      <div className="fixed inset-0 pointer-events-none bg-[image:radial-gradient(circle_at_50%_15%,rgba(225,29,116,0.15)_0%,rgba(104,7,186,0.08)_35%,transparent_70%)] -z-10" />
      <div className="fixed top-1/3 -right-32 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 -left-32 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-12 md:py-16">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-surface-container-low/95 backdrop-blur-xl rounded-3xl border border-[#2a2b33] p-8 md:p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_35px_-5px_rgba(225,29,116,0.15)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-container/50 to-transparent" />

            <div className="text-center mb-8 flex flex-col items-center">
              <Badge variant="success" withDot dotPulsing>
                Registro de Usuarios
              </Badge>
              <h1 className="text-headline-lg font-headline-lg text-on-surface mt-3 mb-2 tracking-tight">
                Crea tu cuenta
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                Únete al ecosistema donde empresas y estudiantes conectan a través de proyectos reales.
              </p>
            </div>

            <RegisterForm onSubmit={handleRegister} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { Register, Register as RegisterPage };
export default Register;