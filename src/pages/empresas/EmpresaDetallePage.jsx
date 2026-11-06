import { Link } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';
import InfoCard from '@/components/empresa/InfoCard';
import ContactCard from '@/components/empresa/ContactCard';

// Datos de ejemplo. TODO: reemplazar por los datos que lleguen de la API (ruta /dashboard/empresas/:id).
const EMPRESA = {
  idRegistro: 'EMP-2025-0489',
  nombre: 'NovaLogistics S.A.S.',
  miembroDesde: 'Febrero, 2024',
  nit: '900.123.456-7',
  sector: 'Tecnología y Software',
  etiquetaSector: 'B2B SaaS',
  contacto: {
    nombre: 'Carlos Arango',
    cargo: 'Director de Innovación',
    correo: 'contacto@novalogistics.com',
    telefono: '+57 300 123 4567',
    ciudad: 'Medellín, Colombia',
  },
};

function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon name={icon} className="text-[20px] text-primary" />
      <h2 className="text-headline-sm font-headline-sm text-white font-semibold">{children}</h2>
    </div>
  );
}

export function EmpresaDetallePage() {
  const e = EMPRESA;

  const copyNit = () => {
    navigator.clipboard?.writeText(e.nit);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Migas de pan e ID de registro */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-label-sm font-label-sm text-outline">
          <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/dashboard">
            <Icon name="arrow_back" className="text-[16px]" />
            Dashboard
          </Link>
          <span>/</span>
          <span className="hover:text-primary transition-colors">Empresas Aliadas</span>
          <span>/</span>
          <span className="text-on-surface">Detalle de Organización</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-caption font-caption text-outline">ID de Registro:</span>
          <code className="px-2 py-0.5 rounded bg-surface-container-high border border-white/5 text-primary text-caption font-mono">
            {e.idRegistro}
          </code>
        </div>
      </div>

      {/* Tarjeta principal */}
      <section className="w-full bg-surface-container-low rounded-2xl border border-white/10 shadow-2xl shadow-black/80 p-6 sm:p-8 md:p-10 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container via-secondary-container to-transparent opacity-80" />

        {/* Encabezado de la tarjeta */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary-container/30 to-secondary-container/40 border border-primary-container/40 flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/50 relative">
              <Icon name="domain" className="text-3xl md:text-4xl text-primary-fixed" />
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00C897] rounded-full border-2 border-surface-container-low flex items-center justify-center"
                title="Activa"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="text-headline-md sm:text-headline-lg font-headline-lg text-white font-bold tracking-tight">
                {e.nombre}
              </h1>
              <p className="text-body-md font-body-md text-outline-variant flex items-center gap-1.5">
                <Icon name="verified" className="text-[16px] text-tertiary" />
                Empresa verificada en el ecosistema CESDE
              </p>
              <span className="text-caption font-caption text-outline">
                Miembro activo desde {e.miembroDesde}
              </span>
            </div>
          </div>
          <div className="self-start sm:self-center">
            <Badge variant="success" withDot dotPulsing>
              Activa
            </Badge>
          </div>
        </div>

        {/* Información general */}
        <div className="pt-8 pb-6">
          <SectionTitle icon="corporate_fare">Información General</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon="badge"
              label="NIT"
              value={e.nit}
              right={
                <button
                  type="button"
                  className="text-outline hover:text-white p-1 rounded transition-colors"
                  title="Copiar NIT"
                  onClick={copyNit}
                >
                  <Icon name="content_copy" className="text-[18px]" />
                </button>
              }
            />
            <InfoCard
              icon="hub"
              label="Sector Económico"
              value={e.sector}
              right={
                <span className="px-2.5 py-1 rounded-md bg-secondary-container/40 border border-secondary/30 text-secondary text-caption font-caption">
                  {e.etiquetaSector}
                </span>
              }
            />
          </div>
        </div>

        <div className="border-t border-white/10 my-4" />

        {/* Datos de contacto */}
        <div className="pt-4 pb-6">
          <SectionTitle icon="contacts">Datos de Contacto</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactCard icon="person" label="Nombre del Contacto">
              <p className="text-body-md font-body-md text-white font-semibold">{e.contacto.nombre}</p>
              <p className="text-caption font-caption text-outline">{e.contacto.cargo}</p>
            </ContactCard>

            <ContactCard icon="mail" label="Correo Electrónico">
              <a
                className="text-body-md font-body-md text-white font-semibold hover:text-primary transition-colors truncate block"
                href={`mailto:${e.contacto.correo}`}
              >
                {e.contacto.correo}
              </a>
              <span className="text-caption font-caption text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Canal Principal
              </span>
            </ContactCard>

            <ContactCard icon="call" label="Teléfono de Contacto">
              <a
                className="text-body-md font-body-md text-white font-semibold hover:text-primary transition-colors block"
                href={`tel:${e.contacto.telefono.replace(/\s/g, '')}`}
              >
                {e.contacto.telefono}
              </a>
              <span className="text-caption font-caption text-outline">{e.contacto.ciudad}</span>
            </ContactCard>
          </div>
        </div>

        {/* Acciones */}
        <div className="pt-6 mt-4 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <Link
            className="inline-flex items-center gap-2 text-outline hover:text-white text-label-md font-label-md transition-colors py-2 px-3"
            to="/dashboard"
          >
            <Icon name="arrow_back" className="text-[18px]" />
            <span>Volver al Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button variant="outline" className="w-full sm:w-auto">
              <span className="inline-flex items-center gap-2">
                <Icon name="history" className="text-[18px]" />
                <span>Historial</span>
              </span>
            </Button>
            <Button variant="primary" className="w-full sm:w-auto">
              <span className="inline-flex items-center gap-2.5">
                <Icon name="edit" className="text-[18px]" />
                <span>Editar Información</span>
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmpresaDetallePage;
