// src/features/retos/ChallengeClassificationSection.jsx
import { useAuth } from "@/features/auth/useAuth";

const ESTADOS_RETO_OPTIONS = [
  { value: "EN_CONVOCATORIA", label: "En Convocatoria (Por defecto)" },
  { value: "EN_DESARROLLO", label: "En Desarrollo" },
  { value: "FINALIZADO", label: "Finalizado (Cumplido)" },
  { value: "APLAZADO", label: "Aplazado" },
  { value: "CANCELADO", label: "Cancelado" },
  { value: "RADICADO", label: "Radicado" },
  { value: "EN_REVISION", label: "En Revisión" },
  { value: "BORRADOR", label: "Borrador" },
];

export const ChallengeClassificationSection = ({
  formData = {},
  onChange,
  empresas = [],
  categorias = [],
  prioridades = [],
  user: userProp,
}) => {
  const { user: authUser } = useAuth();
  const currentUser = userProp || authUser;

  const esRepresentanteEmpresa =
    currentUser?.rol === "REPRESENTANTE_EMPRESA";
  const userEmpresaId =
    currentUser?.idEmpresa ||
    currentUser?.empresaId ||
    currentUser?.empresa?.id ||
    "";

  // Si es REPRESENTANTE_EMPRESA, solo se muestra la empresa asociada a su cuenta;
  // si es ADMIN_UNIVERSIDAD o COORDINADOR_ESCUELA, se muestra el listado completo.
  const empresasDisponibles = esRepresentanteEmpresa
    ? empresas.filter((emp) => String(emp.id) === String(userEmpresaId))
    : empresas;

  const valorEmpresaSeleccionada = esRepresentanteEmpresa
    ? String(userEmpresaId || formData.empresaId || "")
    : formData.empresaId || "";

  return (
    <section className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="flex items-center gap-3 pb-3">
        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[18px]">hub</span>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
          Mapeo, Clasificación &amp; Estado
        </h2>
      </div>

      {/* Grid de 2x2 Columnas para los Selectores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Selector de Empresa Patrocinadora (UUID con bloqueo RBAC para REPRESENTANTE_EMPRESA) */}
        <div>
          <label
            className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="reto-empresa"
          >
            <span>
              Empresa Patrocinadora{" "}
              <span className="text-primary-container font-bold">*</span>
            </span>
            {esRepresentanteEmpresa && (
              <span className="inline-flex items-center gap-1 text-caption font-caption text-outline">
                <span className="material-symbols-outlined text-[14px]">
                  lock
                </span>
                Vinculada a tu cuenta
              </span>
            )}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                corporate_fare
              </span>
            </div>
            <select
              className={`w-full pl-11 pr-10 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 appearance-none ${
                esRepresentanteEmpresa
                  ? "opacity-75 cursor-not-allowed border border-white/10"
                  : "cursor-pointer"
              }`}
              id="reto-empresa"
              name="empresaId"
              required
              disabled={esRepresentanteEmpresa}
              value={valorEmpresaSeleccionada}
              onChange={onChange}
            >
              {!esRepresentanteEmpresa && (
                <option
                  className="bg-surface-container-high text-outline"
                  disabled
                  value=""
                >
                  Selecciona la empresa postulante
                </option>
              )}
              {empresasDisponibles.length === 0 ? (
                <option
                  className="bg-surface-container text-outline"
                  disabled
                  value={esRepresentanteEmpresa ? String(userEmpresaId) : ""}
                >
                  {esRepresentanteEmpresa
                    ? "Tu empresa asignada"
                    : "No hay empresas disponibles"}
                </option>
              ) : (
                empresasDisponibles.map((empresa) => (
                  <option
                    key={empresa.id}
                    className="bg-surface-container text-on-surface"
                    value={String(empresa.id)}
                  >
                    {empresa.nombre}
                  </option>
                ))
              )}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[18px]">
                {esRepresentanteEmpresa ? "lock" : "expand_more"}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Selector de Categoría Técnica (UUID) */}
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
              {categorias.length === 0 ? (
                <option className="bg-surface-container text-outline" disabled value="">
                  No hay categorías disponibles
                </option>
              ) : (
                categorias.map((cat) => (
                  <option
                    key={cat.id}
                    className="bg-surface-container text-on-surface"
                    value={String(cat.id)}
                  >
                    {cat.nombre}
                  </option>
                ))
              )}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* 3. Selector de Prioridad / Nivel (UUID) */}
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
              {prioridades.length === 0 ? (
                <option className="bg-surface-container text-outline" disabled value="">
                  No hay prioridades disponibles
                </option>
              ) : (
                prioridades.map((prio) => (
                  <option
                    key={prio.id}
                    className="bg-surface-container text-on-surface"
                    value={String(prio.id)}
                  >
                    {prio.nombre}
                  </option>
                ))
              )}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* 4. Selector de Estado Inicial del Reto (Enum EstadoReto en Java) */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="reto-estado"
          >
            Estado del Reto{" "}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                sync_saved_locally
              </span>
            </div>
            <select
              className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 appearance-none cursor-pointer"
              id="reto-estado"
              name="estadoActual"
              required
              value={formData.estadoActual || "EN_CONVOCATORIA"}
              onChange={onChange}
            >
              {ESTADOS_RETO_OPTIONS.map((estado) => (
                <option
                  key={estado.value}
                  className="bg-surface-container text-on-surface"
                  value={estado.value}
                >
                  {estado.label}
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
