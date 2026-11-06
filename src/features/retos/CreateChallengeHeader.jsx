// src/components/retos/CreateChallengeHeader.jsx

export const CreateChallengeHeader = () => {
  return (
    <div className="mb-10">
      {/* Stylized Status Badge con punto pulsante */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/10 text-[#10b981] font-label-sm text-label-sm tracking-wide mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
        </span>
        <span className="font-semibold uppercase tracking-wider">
          PUBLICACIÓN DE RETOS
        </span>
      </div>

      {/* Título Principal */}
      <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold mb-3">
        Crear Reto de Innovación
      </h1>

      {/* Subtítulo */}
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
        Define los detalles del desafío técnico para conectar con el talento
        formativo y docente de CESDE.
      </p>
    </div>
  );
};

export default CreateChallengeHeader;