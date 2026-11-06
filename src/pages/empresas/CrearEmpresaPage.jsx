import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/common';
import EmpresaForm from '@/components/empresa/EmpresaForm';
import { crearEmpresa } from '@/services/empresaService';

export function CrearEmpresaPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (values) => {
    setLoading(true);
    setError('');
    try {
      // Los nombres de la izquierda son los que espera el backend (EmpresaRequestDTO)
      const creada = await crearEmpresa({
        nit: values.nit,
        nombre: values.companyName,
        sector: values.economicSector,
        contactoNombre: values.contactName || null,
        correo: values.contactEmail || null,
        telefono: values.contactPhone || null,
      });
      navigate(`/dashboard/empresas/${creada.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-surface-container-low rounded-2xl border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] p-6 sm:p-10">
      <div className="mb-8 text-left flex flex-col items-start">
        <Badge variant="success" withDot dotPulsing>
          VINCULACIÓN EMPRESARIAL
        </Badge>
        <h1 className="text-headline-lg font-headline-lg text-white tracking-tight mt-4 mb-2.5">
          Crear Empresa
        </h1>
        <p className="text-body-md font-body-md text-on-surface/75 leading-relaxed">
          Ingresa los datos corporativos para registrar la empresa en el ecosistema CESDE.
        </p>
      </div>

      <EmpresaForm onSubmit={handleSave} loading={loading} error={error} />
    </div>
  );
}

export default CrearEmpresaPage;