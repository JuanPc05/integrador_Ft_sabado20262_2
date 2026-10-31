import { Badge } from '@/components/common';
import EmpresaForm from '@/components/empresa/EmpresaForm';

export function CrearEmpresaPage() {
  const handleSave = (values) => {
    // TODO: conectar con la API para guardar la empresa
    console.log('Empresa:', values);
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

      <EmpresaForm onSubmit={handleSave} />
    </div>
  );
}

export default CrearEmpresaPage;
