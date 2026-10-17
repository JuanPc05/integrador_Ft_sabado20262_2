import { useState } from 'react';
import { Button, Icon } from '@/components/common';
import LoginField from './LoginField';

function LoginForm({ onSubmit }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  const forgotLink = (
    <a
      className="text-label-sm font-label-sm text-primary hover:text-primary-container transition-colors focus:outline-none"
      href="#"
    >
      ¿Olvidaste tu contraseña?
    </a>
  );

  const toggleButton = (
    <button
      type="button"
      aria-label="Alternar visibilidad de contraseña"
      onClick={() => setShowPassword((v) => !v)}
      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
    >
      <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
    </button>
  );

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <LoginField
        id="email"
        label="Correo electrónico institucional o corporativo"
        icon="mail"
        type="email"
        placeholder="nombre@empresa.com o @cesde.edu.co"
        required
        value={values.email}
        onChange={handleChange}
      />

      <LoginField
        id="password"
        label="Contraseña"
        labelRight={forgotLink}
        icon="lock"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••••••"
        required
        value={values.password}
        onChange={handleChange}
        rightSlot={toggleButton}
      />

      <div className="flex items-center pt-1">
        <label className="relative flex items-center gap-3 cursor-pointer select-none">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={values.remember}
            onChange={handleChange}
            className="w-4 h-4 rounded-md accent-primary-container cursor-pointer"
          />
          <span className="text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
            Mantener sesión iniciada
          </span>
        </label>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          iconRight={<Icon name="arrow_forward" />}
        >
          Iniciar Sesión
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;