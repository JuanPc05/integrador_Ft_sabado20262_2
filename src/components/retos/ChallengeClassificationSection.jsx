// src/components/retos/ChallengeClassificationSection.jsx

// Datos por defecto basados en el HTML (listos para ser reemplazados por datos del backend)
const DEFAULT_EMPRESAS = [
  { id: "1", nombre: "NovaLogistics S.A.S." },
  { id: "2", nombre: "Tech Innovators S.A.S." },
  { id: "3", nombre: "BioHealth Solutions" },
  { id: "4", nombre: "Antioquia Data Labs" },
  { id: "5", nombre: "FinTech Andina S.A." },
];

const DEFAULT_CATEGORIAS = [
  { value: "web-cloud", label: "Desarrollo Web & Cloud" },
  { value: "ai-data", label: "Inteligencia Artificial & Datos" },
  { value: "iot-auto", label: "Automatización & IoT" },
  { value: "cybersec", label: "Ciberseguridad Aplicada" },
  { value: "logistics", label: "Logística Digital & Supply" },
  { value: "ux-design", label: "Diseño UX & Producto Digital" },
];

const DEFAULT_PRIORIDADES = [
  { value: "alta", label: "Alta / Urgente", colorClass: "text-[#ffb4ab]" },
  { value: "media", label: "Media", colorClass: "text-[#ffb1c5]" },
  { value: "estandar", label: "Estándar / Baja", colorClass: "text-[#7df4ff]" },
];

export const ChallengeClassificationSection = ({
  formData = {},
  onChange,
  empresas = DEFAULT_EMPRESAS,
}) => {
  return (
    <section className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="flex items-center gap-3 pb-3">
        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[18px]">hub</span>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
          Mapeo &amp; Clasificación
        </h2>
      </div>

      {/* Grid de 3 Columnas para los Selectores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Selector de Empresa Patrocinadora */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="reto-empresa"
          >
            Empresa Patrocinadora{" "}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                corporate_fare
              </span>
            </div>
            <select
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 appearance-none cursor-pointer"
              id="reto-empresa"
              name="empresaId"
              required
              value={formData.empresaId || ""}
              onChange={onChange}
            >
              <option
                className="bg-surface-container-high text-outline"
                disabled
                value=""
              >
                Selecciona la empresa postulante
              </option>
              {empresas.map((empresa) => (
                <option
                  key={empresa.id}
                  className="bg-surface-container text-on-surface"
                  value={empresa.id}
                >
                  {empresa.nombre}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* 2. Selector de Categoría Técnica */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="reto-categoria"
          >
            Categoría Técnica{" "}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                category
              </span>
            </div>
            <select
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 appearance-none cursor-pointer"
              id="reto-categoria"
              name="categoria"
              required
              value={formData.categoria || ""}
              onChange={onChange}
            >
              <option
                className="bg-surface-container-high text-outline"
                disabled
                value=""
              >
                Selecciona la categoría
              </option>
              {DEFAULT_CATEGORIAS.map((cat) => (
                <option
                  key={cat.value}
                  className="bg-surface-container text-on-surface"
                  value={cat.value}
                >
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* 3. Selector de Prioridad / Nivel */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="reto-prioridad"
          >
            Prioridad / Nivel{" "}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                flag
              </span>
            </div>
            <select
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 appearance-none cursor-pointer"
              id="reto-prioridad"
              name="prioridad"
              required
              value={formData.prioridad || ""}
              onChange={onChange}
            >
              <option
                className="bg-surface-container-high text-outline"
                disabled
                value=""
              >
                Selecciona la prioridad
              </option>
              {DEFAULT_PRIORIDADES.map((prio) => (
                <option
                  key={prio.value}
                  className={`bg-surface-container ${prio.colorClass}`}
                  value={prio.value}
                >
                  {prio.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChallengeClassificationSection;