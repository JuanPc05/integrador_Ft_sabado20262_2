// src/features/auth/components/RegisterForm.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@/components/common';
import { authService } from '@/features/auth/auth.service';
import InputField from './InputField';
import PasswordField from './PasswordField';
import SelectField from './SelectField';

const ROLES = [
  { value: 'REPRESENTANTE_EMPRESA', label: 'Empresa / Emprendedor' },
  { value: 'ESTUDIANTE', label: 'Estudiante CESDE' },
  { value: 'DOCENTE', label: 'Docente / Asesor Metodológico' },
  { value: 'COORDINADOR_ESCUELA', label: 'Coordinador de Escuela' },
  { value: 'ADMIN_UNIVERSIDAD', label: 'Administrador Institucional' },
];

const ROLE_MAP = {
  empresa: 'REPRESENTANTE_EMPRESA',
  estudiante: 'ESTUDIANTE',
  docente: 'DOCENTE',
};

function RegisterForm({ initialData = null, onSubmit }) {
  const navigate = useNavigate();
  const isEditMode = Boolean(initialData);

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    userRole: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-llenar estados locales cuando initialData viene con datos (Modo Edición)
  useEffect(() => {
    if (initialData) {
      setValues({
        fullName:
          initialData.nombreCompleto ||
          initialData.nombre_completo ||
          initialData.fullName ||
          '',
        email: initialData.email || '',
        password: '',
        userRole:
          ROLE_MAP[initialData.rol] ||
          initialData.rol ||
          initialData.userRole ||
          '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      nombreCompleto: values.fullName.trim(),
      email: values.email.trim(),
      password: values.password,
      rol: ROLE_MAP[values.userRole] || values.userRole,
      idEmpresa: initialData?.idEmpresa ?? null,
      activo: initialData?.activo ?? true,
    };

    // En modo edición, si el password está vacío se elimina para no sobreescribir el original
    if (isEditMode && !values.password.trim()) {
      delete payload.password;
    }

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await authService.register(payload);
        navigate('/login');
      }
    } catch (err) {
      setError(
        err?.message ||
          (isEditMode
            ? 'No fue posible actualizar el perfil.'
            : 'No fue posible completar el registro. Verifica los datos e intenta nuevamente.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          <Icon name="error" className="text-[20px] text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <InputField
        id="fullName"
        label="Nombre completo"
        icon="person"
        placeholder="Ej. Carolina Herrera o Tech Innovators SAS"
        required
        disabled={loading}
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
        disabled={loading}
        value={values.email}
        onChange={handleChange}
      />

      <PasswordField
        value={values.password}
        onChange={handleChange}
        required={!isEditMode}
        disabled={loading}
        label={isEditMode ? 'Nueva contraseña (opcional)' : 'Contraseña'}
        placeholder={
          isEditMode
            ? 'Dejar en blanco para conservar la contraseña actual'
            : 'Crea una contraseña segura'
        }
      />

      <SelectField
        id="userRole"
        label="Rol en la plataforma"
        icon="badge"
        placeholder="Selecciona tu rol institucional"
        options={ROLES}
        required
        disabled={loading}
        value={values.userRole}
        onChange={handleChange}
      />

      <div className="pt-3">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
          iconRight={<Icon name={loading ? 'hourglass_top' : isEditMode ? 'save' : 'arrow_forward'} />}
        >
          {loading
            ? isEditMode
              ? 'Guardando cambios...'
              : 'Registrando...'
            : isEditMode
              ? 'Guardar Cambios'
              : 'Crear Cuenta'}
        </Button>
      </div>

      {!isEditMode && (
        <div className="text-center pt-2">
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            ¿Ya tienes cuenta?
            <Link
              className="text-primary font-semibold hover:underline hover:text-white transition-colors ml-1"
              to="/login"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      )}
    </form>
  );
}

export { RegisterForm };
export default RegisterForm;
