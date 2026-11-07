import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';
import InfoCard from '@/features/empresas/components/empresa/InfoCard';
import ContactCard from '@/features/empresas/components/empresa/ContactCard';
import EmpresaForm from '@/features/empresas/components/empresa/EmpresaForm';
import { useAuth } from '@/features/auth/useAuth';
import { empresaService } from '@/features/empresas/empresa.service';

function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Icon name={icon} className="text-[20px] text-primary" />
      <h2 className="text-headline-sm font-headline-sm text-white font-semibold">{children}</h2>
    </div>
  );
}

export function EmpresaDetallePage() {
  const { id: paramId } = useParams();
  const { user } = useAuth();
  const [empresa, setEmpresa] = useState(null);

  const empresaId = empresa?.idRegistro || paramId || user?.idEmpresa || user?.empresaId || user?.empresa?.id;

  const [loading, setLoading] = useState(Boolean(empresaId));
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const mapearDatosEmpresa = useCallback(
    (data) => ({
      idRegistro: data.id,
      nombre: data.nombre,
      miembroDesde: 'Ecosistema Proyecta CESDE',
      nit: data.nit,
      sector: data.sector,
      etiquetaSector: data.sector,
      activa: data.activa ?? true,
      contactoNombre: data.contactoNombre || '',
      correo: data.correo || '',
      telefono: data.telefono || '',
      contacto: {
        nombre: data.contactoNombre || user?.nombreCompleto || 'Sin contacto asignado',
        cargo: 'Representante de Empresa',
        correo: data.correo || user?.email || '',
        telefono: data.telefono || 'No registrado',
        ciudad: 'Medellín, Colombia',
      },
    }),
    [user?.nombreCompleto, user?.email]
  );

  useEffect(() => {
    if (!empresaId) return;

    let isMounted = true;
    const cargarEmpresa = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await empresaService.obtenerPorId(empresaId);
        if (isMounted) {
          setEmpresa(mapearDatosEmpresa(data));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'No se pudo cargar la información de la empresa.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    cargarEmpresa();

    return () => {
      isMounted = false;
    };
  }, [empresaId, mapearDatosEmpresa]);

  const handleGuardarEmpresa = async (payload) => {
    setIsSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      if (empresaId) {
        const actualizada = await empresaService.actualizar(empresaId, payload);
        setEmpresa(mapearDatosEmpresa(actualizada));
        setSuccessMessage('La información de la empresa se actualizó correctamente.');
        setIsEditing(false);
      } else {
        const nuevaEmpresa = await empresaService.crear(payload);
        setEmpresa(mapearDatosEmpresa(nuevaEmpresa));
        setSuccessMessage('La empresa fue creada y registrada exitosamente.');
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error al guardar los datos de la empresa.');
    } finally {
      setIsSaving(false);
    }
  };

  const copyNit = () => {
    if (empresa?.nit) {
      navigator.clipboard?.writeText(empresa.nit);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center text-on-surface-variant">
        Cargando información de la empresa...
      </div>
    );
  }

  const e = empresa;

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
        {e?.idRegistro && (
          <div className="flex items-center gap-2">
            <span className="text-caption font-caption text-outline">ID de Registro:</span>
            <code className="px-2 py-0.5 rounded bg-surface-container-high border border-white/5 text-primary text-caption font-mono">
              {e.idRegistro}
            </code>
          </div>
        )}
      </div>

      {/* Mensajes de estado (Éxito / Error) */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-error-container/20 border border-error/40 text-error text-body-sm font-body-sm flex items-center gap-2.5"
        >
          <Icon name="error" className="text-[20px] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-body-sm font-body-sm flex items-center gap-2.5"
        >
          <Icon name="check_circle" className="text-[20px] shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Si existe empresa y no está en modo edición, muestra la vista de detalle */}
      {e && !isEditing && (
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
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                onClick={() => {
                  setSuccessMessage('');
                  setError('');
                  setIsEditing(true);
                }}
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon name="edit" className="text-[18px]" />
                  <span>Editar Información</span>
                </span>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Formulario de Creación o Edición */}
      {(!e || isEditing) && (
        <section className="w-full bg-surface-container-low rounded-2xl border border-white/10 shadow-2xl shadow-black/80 p-6 sm:p-8 md:p-10 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container via-secondary-container to-transparent opacity-80" />
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <Badge variant="success" withDot dotPulsing>
                {empresaId ? 'CONFIGURACIÓN CORPORATIVA' : 'VINCULACIÓN EMPRESARIAL'}
              </Badge>
              <h2 className="text-headline-md sm:text-headline-lg font-headline-lg text-white font-bold tracking-tight mt-3">
                {empresaId ? 'Editar Información de la Empresa' : 'Registrar Nueva Empresa'}
              </h2>
              <p className="text-body-md font-body-md text-on-surface/75 mt-1">
                {empresaId
                  ? 'Actualiza los datos corporativos y canales de contacto de tu organización.'
                  : 'Completa los datos para vincular tu organización en el ecosistema Proyecta CESDE.'}
              </p>
            </div>
            {e && isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Ver resumen
              </Button>
            )}
          </div>

          <EmpresaForm
            key={empresaId || 'nueva'}
            initialData={empresa}
            isSubmitting={isSaving}
            onSubmit={handleGuardarEmpresa}
          />
        </section>
      )}
    </div>
  );
}

export default EmpresaDetallePage;
