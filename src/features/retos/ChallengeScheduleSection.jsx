// src/components/retos/ChallengeScheduleSection.jsx

export const ChallengeScheduleSection = ({ formData = {}, onChange }) => {
  return (
    <section className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="flex items-center gap-3 pb-3">
        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[18px]">
            calendar_month
          </span>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
          Cronograma y Fechas Límite
        </h2>
      </div>

      {/* Grid de 3 Columnas para las Fechas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Fecha de Inicio */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="fecha-inicio"
          >
            Fecha de Inicio{" "}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 [color-scheme:dark] cursor-pointer"
              id="fecha-inicio"
              name="fechaInicio"
              required
              type="date"
              value={formData.fechaInicio || ""}
              onChange={onChange}
            />
          </div>
          <span className="block mt-1 font-caption text-caption text-outline">
            Apertura formal del reto
          </span>
        </div>

        {/* 2. Fecha de Fin */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="fecha-fin"
          >
            Fecha de Fin{" "}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 [color-scheme:dark] cursor-pointer"
              id="fecha-fin"
              name="fechaFin"
              min={formData.fechaInicio || undefined}
              required
              type="date"
              value={formData.fechaFin || ""}
              onChange={onChange}
            />
          </div>
          <span className="block mt-1 font-caption text-caption text-outline">
            Cierre de entregables finales
          </span>
        </div>

        {/* 3. Fecha Límite de Postulación */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="fecha-limite"
          >
            Límite de Postulación{" "}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 [color-scheme:dark] cursor-pointer"
              id="fecha-limite"
              name="fechaLimite"
              required
              type="datetime-local"
              value={formData.fechaLimite || ""}
              onChange={onChange}
            />
          </div>
          <span className="block mt-1 font-caption text-caption text-outline">
            Hora límite para postular equipos
          </span>
        </div>

      </div>
    </section>
  );
};

export default ChallengeScheduleSection;