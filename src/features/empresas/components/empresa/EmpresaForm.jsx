import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@/components/common';
import { useAuth } from '@/features/auth/useAuth';
import { springApi } from '@/services/apiClient';
import FormField from './FormField';

const SECTORS = [
  { value: 'TECNOLOGIA_Y_SOFTWARE', label: 'Tecnología y Software' },
  { value: 'GASTRONOMIA_Y_TURISMO', label: 'Gastronomía y Turismo' },
  { value: 'MANUFACTURA_E_INDUSTRIA', label: 'Manufactura e Industria' },
  { value: 'COMERCIO_Y_RETAIL', label: 'Comercio y Retail' },
  { value: 'SERVICIOS_FINANCIEROS', label: 'Servicios Financieros' },
  { value: 'SALUD_Y_BIENESTAR', label: 'Salud y Bienestar' },
  { value: 'EDUCACION', label: 'Educación' },
  { value: 'LOGISTICA_Y_TRANSPORTE', label: 'Logística y Transporte' },
  { value: 'OTRO', label: 'Otro' },
];

function EmpresaForm({ initialData = null, onSubmit, isSubmitting = false }) {
  const navigate = useNavigate();
  const { refrescarSesion, logout } = useAuth();

  const [nit, setNit] = useState(initialData?.nit || '');
  const [nombre, setNombre] = useState(initialData?.nombre || initialData?.companyName || '');
  const [sector, setSector] = useState(initialData?.sector || initialData?.economicSector || '');
  const [contactoNombre, setContactoNombre] = useState(
    initialData?.contactoNombre ||
      initialData?.contacto?.nombre ||
      initialData?.contactName ||
      ''
  );
  const [correo, setCorreo] = useState(
    initialData?.correo ||
      initialData?.contacto?.correo ||
      initialData?.contactEmail ||
      ''
  );
  const [telefono, setTelefono] = useState(
    initialData?.telefono ||
      initialData?.contacto?.telefono ||
      initialData?.contactPhone ||
      ''
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    const payload = {
      nit: nit.trim(),
      nombre: nombre.trim(),
      sector,
      contactoNombre: contactoNombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        const response = await springApi.post('/api/empresas', payload);
        const nuevaEmpresa = response.data;

        refrescarSesion?.(nuevaEmpresa);
        setSuccessMessage(
          'Empresa registrada con éxito. Por favor inicia sesión nuevamente para aplicar los cambios.'
        );

        setTimeout(() => {
          logout?.();
          navigate('/login');
        }, 1800);
      }
    } catch (err) {
      let mensajeError = 'Error desconocido al guardar la empresa.';
      if (typeof err?.response?.data === 'string' && err.response.data.trim()) {
        mensajeError = err.response.data;
      } else {
        mensajeError =
          err?.response?.data?.message ||
          err?.response?.data?.mensaje ||
          err?.response?.data?.error ||
          err?.message ||
          mensajeError;
      }
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  const guardando = isSubmitting || loading;

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-body-sm font-body-sm flex items-start gap-2.5"
        >
          <Icon name="error" className="text-[20px] text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-body-sm font-body-sm flex items-start gap-2.5"
        >
          <Icon name="check_circle" className="text-[20px] text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="nit"
          label="NIT"
          icon="badge"
          required
          placeholder="Ej. 900.123.456-7"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
        />
        <FormField
          id="nombre"
          label="Nombre de la Empresa"
          icon="corporate_fare"
          required
          placeholder="Ej. NovaLogistics S.A.S."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <FormField
        id="sector"
        label="Sector Económico"
        icon="domain"
        required
        placeholder="Selecciona el sector de tu organización"
        options={SECTORS}
        value={sector}
        onChange={(e) => setSector(e.target.value)}
      />

      <FormField
        id="contactoNombre"
        label="Nombre del Contacto"
        icon="person"
        placeholder="Ej. Carlos Arango o Persona de Enlace"
        value={contactoNombre}
        onChange={(e) => setContactoNombre(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="correo"
          label="Correo de Contacto"
          icon="mail"
          type="email"
          required
          placeholder="contacto@empresa.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <FormField
          id="telefono"
          label="Teléfono de Contacto"
          icon="call"
          type="tel"
          placeholder="+57 300 123 4567"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          className="w-full sm:w-auto text-center order-2 sm:order-1 px-5 py-3 rounded-xl text-on-surface-variant hover:text-white text-label-md font-label-md border border-transparent hover:border-white/10 transition-all duration-200"
          to="/dashboard"
        >
          Cancelar
        </Link>
        <div className="w-full sm:w-auto order-1 sm:order-2">
          <Button
            type="submit"
            variant="primary"
            disabled={guardando}
            className="w-full sm:w-auto"
          >
            <span className="inline-flex items-center gap-2.5">
              <Icon name="check_circle" className="text-[20px]" />
              <span>{guardando ? 'Guardando...' : 'Guardar Empresa'}</span>
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EmpresaForm;
