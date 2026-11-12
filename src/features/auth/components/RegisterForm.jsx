// src/features/auth/components/RegisterForm.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@/components/common';
import { authService } from '@/features/auth/auth.service';
import { springApi } from '@/services/apiClient';
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
    fullName:
      initialData?.nombreCompleto ||
      initialData?.nombre_completo ||
      initialData?.fullName ||
      '',
    email: initialData?.email || '',
    password: '',
    userRole:
      ROLE_MAP[initialData?.rol] ||
      initialData?.rol ||
      initialData?.userRole ||
      '',
    idEmpresa: initialData?.idEmpresa || initialData?.empresaId || '',
  });

  const [empresas, setEmpresas] = useState([]);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const esRolEmpresa =
    (ROLE_MAP[values.userRole] || values.userRole) === 'REPRESENTANTE_EMPRESA';

  // Cargar las empresas desde GET /api/empresas cuando el usuario selecciona el rol REPRESENTANTE_EMPRESA
  useEffect(() => {
    if (!esRolEmpresa || empresas.length > 0) return;

    let isMounted = true;
    setLoadingEmpresas(true);

    springApi
      .get('/api/empresas')
      .then((response) => {
        if (!isMounted) return;
        const lista = Array.isArray(response.data) ? response.data : [];
        setEmpresas(lista);
      })
      .catch(() => {
        if (isMounted) setEmpresas([]);
      })
      .finally(() => {
        if (isMounted) setLoadingEmpresas(false);
      });

    return () => {
      isMounted = false;
    };
  }, [esRolEmpresa, empresas.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      // Si cambia a otro rol distinto de REPRESENTANTE_EMPRESA, limpiar idEmpresa
      if (name === 'userRole') {
        const normalizedRole = ROLE_MAP[value] || value;
        if (normalizedRole !== 'REPRESENTANTE_EMPRESA') {
          next.idEmpresa = '';
        }
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const rolNormalizado = ROLE_MAP[values.userRole] || values.userRole;

    if (rolNormalizado === 'REPRESENTANTE_EMPRESA' && !values.idEmpresa) {
      setError('Por favor selecciona la empresa a la que representas.');
      setLoading(false);
      return;
    }

    const payload = {
      nombreCompleto: values.fullName.trim(),
      email: values.email.trim(),
      password: values.password,
      rol: rolNormalizado,
      idEmpresa:
        rolNormalizado === 'REPRESENTANTE_EMPRESA' && values.idEmpresa
          ? values.idEmpresa
          : null,
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

      {/* Bloque condicional exclusivo para el rol REPRESENTANTE_EMPRESA */}
      {esRolEmpresa && (
        <div className="space-y-2 rounded-2xl border border-primary-container/30 bg-surface-container/40 p-4 transition-all duration-200">
          <label
            className="block text-label-md font-label-md text-on-surface"
            htmlFor="idEmpresa"
          >
            Organización / Empresa aliada{' '}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-outline pointer-events-none flex items-center">
              <Icon name="corporate_fare" className="text-[20px]" />
            </span>
            <select
              id="idEmpresa"
              name="idEmpresa"
              required={esRolEmpresa}
              disabled={loading || loadingEmpresas}
              value={values.idEmpresa}
              onChange={handleChange}
              className="w-full appearance-none pl-11 pr-10 py-3 bg-[#12141C] border border-white/10 rounded-xl text-body-md font-body-md text-on-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/25 transition-all outline-none cursor-pointer"
            >
              <option className="bg-[#12141C] text-outline" value="" disabled>
                {loadingEmpresas
                  ? 'Cargando directorio de empresas...'
                  : 'Selecciona tu empresa registrada'}
              </option>
              {empresas.map((emp) => (
                <option
                  key={emp.id}
                  className="bg-[#12141C] text-on-surface"
                  value={String(emp.id)}
                >
                  {emp.nombre} {emp.nit ? `— NIT: ${emp.nit}` : ''}
                </option>
              ))}
            </select>
            <span className="absolute right-4 text-outline pointer-events-none flex items-center">
              <Icon name="expand_more" className="text-[20px]" />
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              to="/dashboard/empresas/nueva"
              className="inline-flex items-center gap-1.5 text-caption font-caption text-primary hover:text-white hover:underline transition-colors"
            >
              <Icon name="add_business" className="text-[15px]" />
              <span>¿No encuentras tu empresa? Solicita registrar una nueva</span>
            </Link>
          </div>
        </div>
      )}

      <div className="pt-3">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
          iconRight={
            <Icon
              name={
                loading ? 'hourglass_top' : isEditMode ? 'save' : 'arrow_forward'
              }
            />
          }
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
