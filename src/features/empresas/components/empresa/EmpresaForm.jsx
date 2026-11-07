import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@/components/common';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      nit: nit.trim(),
      nombre: nombre.trim(),
      sector,
      contactoNombre: contactoNombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
    };
    onSubmit?.(payload);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            <span className="inline-flex items-center gap-2.5">
              <Icon name="check_circle" className="text-[20px]" />
              <span>{isSubmitting ? 'Guardando...' : 'Guardar Empresa'}</span>
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EmpresaForm;
