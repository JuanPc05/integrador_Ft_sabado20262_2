import { useState } from 'react';
import { Button, Icon } from '@/components/common';
import InputField from './InputField';
import PasswordField from './PasswordField';
import SelectField from './SelectField';

const ROLES = [
  { value: 'empresa', label: 'Empresa / Emprendedor' },
  { value: 'estudiante', label: 'Estudiante CESDE' },
  { value: 'docente', label: 'Docente / Asesor Metodológico' },
];

function RegisterForm({ onSubmit }) {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    userRole: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <InputField
        id="fullName"
        label="Nombre completo"
        icon="person"
        placeholder="Ej. Carolina Herrera o Tech Innovators SAS"
        required
        value={values.fullName}
        onChange={handleChange}
      />

      <InputField
        id="email"
        label="Correo electrónico"
        icon="mail"
        type="email"
        placeholder="correo@empresa.com o @cesde.edu.co"
        required
        value={values.email}
        onChange={handleChange}
      />

      <PasswordField value={values.password} onChange={handleChange} />

      <SelectField
        id="userRole"
        label="Rol en la plataforma"
        icon="badge"
        placeholder="Selecciona tu rol institucional"
        options={ROLES}
        required
        value={values.userRole}
        onChange={handleChange}
      />

      <div className="pt-3">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          iconRight={<Icon name="arrow_forward" />}
        >
          Crear Cuenta
        </Button>
      </div>

      <div className="text-center pt-2">
        <p className="text-body-sm font-body-sm text-on-surface-variant">
          ¿Ya tienes cuenta?
          <a
            className="text-primary font-semibold hover:underline hover:text-white transition-colors ml-1"
            href="/login"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
