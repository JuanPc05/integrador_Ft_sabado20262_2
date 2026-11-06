import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';
import InfoCard from '@/components/empresa/InfoCard';
import ContactCard from '@/components/empresa/ContactCard';
import { etiquetaSector } from '@/components/empresa/sectores';
import { obtenerEmpresa } from '@/services/empresaService';

function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon name={icon} className="text-[20px] text-primary" />
      <h2 className="text-headline-sm font-headline-sm text-white font-semibold">{children}</h2>
    </div>
  );
}

export function EmpresaDetallePage() {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setError('');
    obtenerEmpresa(id)
      .then((data) => {
        if (!cancelado) setEmpresa(data);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message);
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });
    return () => {
      cancelado = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center text-on-surface-variant py-16">
        Cargando empresa...
      </div>
    );
  }

  if (error || !empresa) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-surface-container-low rounded-2xl border border-white/10 p-8 text-center flex flex-col items-center gap-4">
        <p className="text-body-md font-body-md text-error">
          {error || 'No se encontró la empresa.'}
        </p>
        <Link className="text-primary hover:text-white transition-colors" to="/dashboard">
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  const copyNit = () => {
    navigator.clipboard?.writeText(empresa.nit);
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
          <span>Empresas Aliadas</span>
          <span>/</span>
          <span className="text-on-surface">Detalle de Organización</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-caption font-caption text-outline">ID de Registro:</span>
          <code className="px-2 py-0.5 rounded bg-surface-container-high border border-white/5 text-primary text-caption font-mono">
            EMP-{empresa.id.slice(0, 8).toUpperCase()}
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
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-surface-container-low flex items-center justify-center ${
                  empresa.activa ? 'bg-[#00C897]' : 'bg-outline'
                }`}
                title={empresa.activa ? 'Activa' : 'Inactiva'}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="text-headline-md sm:text-headline-lg font-headline-lg text-white font-bold tracking-tight">
                {empresa.nombre}
              </h1>
              <p className="text-body-md font-body-md text-outline-variant flex items-center gap-1.5">
                <Icon name="verified" className="text-[16px] text-tertiary" />
                Empresa registrada en el ecosistema CESDE
              </p>
            </div>
          </div>
          <div className="self-start sm:self-center">
            {empresa.activa ? (
              <Badge variant="success" withDot dotPulsing>
                Activa
              </Badge>
            ) : (
              <Badge variant="tertiary">Inactiva</Badge>
            )}
          </div>
        </div>

        {/* Información general */}
        <div className="pt-8 pb-6">
          <SectionTitle icon="corporate_fare">Información General</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon="badge"
              label="NIT"
              value={empresa.nit}
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
            <InfoCard icon="hub" label="Sector Económico" value={etiquetaSector(empresa.sector)} />
          </div>
        </div>

        <div className="border-t border-white/10 my-4" />

        {/* Datos de contacto */}
        <div className="pt-4 pb-6">
          <SectionTitle icon="contacts">Datos de Contacto</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactCard icon="person" label="Nombre del Contacto">
              <p className="text-body-md font-body-md text-white font-semibold">
                {empresa.contactoNombre || 'No registrado'}
              </p>
            </ContactCard>

            <ContactCard icon="mail" label="Correo Electrónico">
              {empresa.correo ? (
                <a
                  className="text-body-md font-body-md text-white font-semibold hover:text-primary transition-colors truncate block"
                  href={`mailto:${empresa.correo}`}
                >
                  {empresa.correo}
                </a>
              ) : (
                <p className="text-body-md font-body-md text-white font-semibold">No registrado</p>
              )}
            </ContactCard>

            <ContactCard icon="call" label="Teléfono de Contacto">
              {empresa.telefono ? (
                <a
                  className="text-body-md font-body-md text-white font-semibold hover:text-primary transition-colors block"
                  href={`tel:${empresa.telefono.replace(/\s/g, '')}`}
                >
                  {empresa.telefono}
                </a>
              ) : (
                <p className="text-body-md font-body-md text-white font-semibold">No registrado</p>
              )}
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