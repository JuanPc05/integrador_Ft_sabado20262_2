// src/components/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm({ onSuccess }) {
  const { loginContext, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await loginContext({ email: email.trim(), password });
      if (onSuccess) {
        onSuccess(response);
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      setErrorMessage(
        error?.message || 'Credenciales inválidas o error de conexión con el servidor.'
      );
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          <span className="material-symbols-outlined text-[20px] text-red-400 shrink-0">
            error
          </span>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-on-surface"
        >
          Correo electrónico institucional o corporativo
        </label>
        <div className="relative">
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@empresa.com o @cesde.edu.co"
            className="w-full rounded-xl border border-outline-variant/40 bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-outline/70 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container disabled:opacity-60 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="block text-sm font-medium text-on-surface"
          >
            Contraseña
          </label>
          <a
            href="#recuperar"
            className="text-xs font-medium text-primary hover:text-primary-container transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-outline-variant/40 bg-surface pl-4 pr-11 py-3 text-sm text-on-surface placeholder:text-outline/70 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container disabled:opacity-60 transition-all"
          />
          <button
            type="button"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-container/25 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary-container/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <span>{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

