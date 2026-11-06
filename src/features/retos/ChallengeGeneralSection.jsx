// src/components/retos/ChallengeGeneralSection.jsx

export const ChallengeGeneralSection = ({ formData = {}, onChange }) => {
  return (
    <section className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="flex items-center gap-3 pb-3">
        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[18px]">
            description
          </span>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
          Información General del Reto
        </h2>
      </div>

      {/* Campo 1: Nombre del Reto */}
      <div>
        <label
          className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-2"
          htmlFor="reto-nombre"
        >
          <span>
            Nombre del Reto{" "}
            <span className="text-primary-container font-bold">*</span>
          </span>
          <span className="font-caption text-caption text-outline">
            Máx. 120 caracteres
          </span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-[20px]">
              lightbulb
            </span>
          </div>
          <input
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200"
            id="reto-nombre"
            name="nombre"
            maxLength={120}
            placeholder="Ej. Desarrollo de Algoritmo de Ruteo Inteligente en Tiempo Real"
            required
            type="text"
            value={formData.nombre || ""}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Campo 2: Descripción Detallada */}
      <div>
        <label
          className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-2"
          htmlFor="reto-descripcion"
        >
          <span>
            Descripción Detallada{" "}
            <span className="text-primary-container font-bold">*</span>
          </span>
          <span className="font-caption text-caption text-outline">
            Describe antecedentes, problema y meta
          </span>
        </label>
        <div className="relative">
          <textarea
            className="w-full p-4 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 resize-y"
            id="reto-descripcion"
            name="descripcion"
            placeholder="Detalla la necesidad técnica, contexto operativo y los resultados tangibles esperados. Incluye especificaciones de impacto, tecnologías deseadas o restricciones metodológicas que deban considerar los equipos estudiantiles..."
            required
            rows={5}
            value={formData.descripcion || ""}
            onChange={onChange}
          />
        </div>
        <p className="mt-2 font-caption text-caption text-outline flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-tertiary">
            info
          </span>
          Una descripción clara y concisa asegura una mejor asignación de
          talento y soluciones más viables.
        </p>
      </div>
    </section>
  );
};

export default ChallengeGeneralSection;