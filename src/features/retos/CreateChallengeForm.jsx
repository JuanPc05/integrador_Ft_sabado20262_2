// src/features/retos/CreateChallengeForm.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { retoService } from "@/features/retos/reto.service";
import { empresaService } from "@/features/empresas/empresa.service";
import { ChallengeBreadcrumb } from "./ChallengeBreadcrumb";
import { CreateChallengeHeader } from "./CreateChallengeHeader";
import { ChallengeGeneralSection } from "./ChallengeGeneralSection";
import { ChallengeClassificationSection } from "./ChallengeClassificationSection";
import { ChallengeScheduleSection } from "./ChallengeScheduleSection";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isValidUuid = (value) =>
  typeof value === "string" && UUID_REGEX.test(value.trim());

export const CreateChallengeForm = ({ onSubmitChallenge, onCancel }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  const { user } = useAuth();

  const userEmpresaUuid =
    user?.idEmpresa || user?.empresaId || user?.empresa?.id || "";

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    empresaId: isValidUuid(userEmpresaUuid) ? userEmpresaUuid : "",
    categoria: "",
    prioridad: "",
    fechaInicio: "",
    fechaFin: "",
    fechaLimite: "",
    estadoActual: "RADICADO",
  });
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(Boolean(editId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const cargarCatalogos = async () => {
      try {
        const [empresasRes, categoriasRes, prioridadesRes] = await Promise.all([
          empresaService.listar().catch(() => []),
          retoService.listarCategorias().catch(() => []),
          retoService.listarPrioridades().catch(() => []),
        ]);

        if (!isMounted) return;

        if (Array.isArray(empresasRes)) setEmpresas(empresasRes);
        if (Array.isArray(categoriasRes)) setCategorias(categoriasRes);
        if (Array.isArray(prioridadesRes)) setPrioridades(prioridadesRes);
      } catch {
        // Error silencioso al cargar catálogos iniciales
      }
    };

    cargarCatalogos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Efecto para cargar los datos del reto cuando estamos en modo Edición (editId presente)
  useEffect(() => {
    if (!editId) return;

    let isMounted = true;

    const cargarRetoParaEdicion = async () => {
      try {
        const data = await retoService.obtenerPorId(editId);
        if (!isMounted || !data) return;

        setFormData({
          nombre: data.nombre || data.titulo || "",
          descripcion: data.descripcion || "",
          empresaId: data.idEmpresa || data.empresa?.id || userEmpresaUuid || "",
          categoria: data.idCategoria || data.categoria?.id || "",
          prioridad: data.idPrioridad || data.prioridad?.id || "",
          fechaInicio: data.fechaInicio ? data.fechaInicio.slice(0, 10) : "",
          fechaFin: data.fechaFin ? data.fechaFin.slice(0, 10) : "",
          fechaLimite: data.fechaLimiteRpta
            ? data.fechaLimiteRpta.slice(0, 16)
            : "",
          estadoActual: data.estadoActual || "RADICADO",
        });
      } catch (err) {
        if (!isMounted) return;
        setError(
          err?.message || "No fue posible cargar la información del reto a editar."
        );
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };

    cargarRetoParaEdicion();

    return () => {
      isMounted = false;
    };
  }, [editId, userEmpresaUuid]);

  // Función genérica para actualizar cualquier campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador del envío del formulario hacia el backend (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Armar el payload alineado con RetoRequestDTO de Spring Boot
    const fechaLimiteNormalizada =
      formData.fechaLimite && formData.fechaLimite.length === 16
        ? `${formData.fechaLimite}:00`
        : formData.fechaLimite;

    const payload = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      fechaInicio: formData.fechaInicio,
      fechaFin: formData.fechaFin,
      fechaLimiteRpta: fechaLimiteNormalizada,
      idEmpresa: formData.empresaId || userEmpresaUuid,
      idCategoria: formData.categoria,
      idPrioridad: formData.prioridad,
      estadoActual: formData.estadoActual || "RADICADO",
    };

    try {
      if (onSubmitChallenge) {
        await onSubmitChallenge(payload);
        return;
      }

      if (isEditMode) {
        await retoService.actualizar(editId, payload);
        navigate(`/dashboard/retos/${editId}`);
      } else {
        await retoService.crear(payload);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err?.message ||
          (isEditMode
            ? "No fue posible actualizar el reto. Verifica los datos e intenta nuevamente."
            : "No fue posible publicar el reto. Verifica los datos e intenta nuevamente.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 1. Migas de pan (Fuera de la tarjeta) */}
      <ChallengeBreadcrumb />

      {/* 2. Tarjeta Principal del Formulario */}
      <div className="bg-surface-container rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden border border-white/5">
        
        {/* Línea superior de brillo decorativo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80" />

        {/* 3. Encabezado de la Tarjeta */}
        <CreateChallengeHeader isEditMode={isEditMode} />

        {/* Banner de Alerta de Error */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-8 flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm text-red-200"
          >
            <span className="material-symbols-outlined text-[20px] text-red-400 shrink-0">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        {isLoadingData ? (
          <div className="py-16 flex flex-col items-center justify-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl text-primary animate-spin">
              progress_activity
            </span>
            <p className="text-sm font-medium">
              Cargando información del reto...
            </p>
          </div>
        ) : (
          /* 4. El Formulario con sus 3 Secciones y Acciones */
          <form className="space-y-10" onSubmit={handleSubmit}>
            
            {/* A. Sección de Información General */}
            <ChallengeGeneralSection
              formData={formData}
              onChange={handleChange}
            />

            {/* B. Sección de Mapeo y Clasificación */}
            <ChallengeClassificationSection
              formData={formData}
              onChange={handleChange}
              empresas={empresas}
              categorias={categorias}
              prioridades={prioridades}
            />

            {/* C. Sección de Cronograma y Fechas Límite */}
            <ChallengeScheduleSection
              formData={formData}
              onChange={handleChange}
            />

            {/* D. Acciones del Formulario (Cancelar / Publicar o Actualizar Reto) */}
            <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 border-t border-white/5">
              <Link
                to={isEditMode ? `/dashboard/retos/${editId}` : "/dashboard"}
                onClick={(e) => {
                  if (onCancel) {
                    e.preventDefault();
                    onCancel();
                  }
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-center"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary-container hover:to-[#5800a0] text-white font-label-md text-label-md font-bold shadow-lg shadow-primary-container/30 hover:shadow-primary-container/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
              >
                <span>
                  {loading
                    ? isEditMode
                      ? "Actualizando..."
                      : "Publicando..."
                    : isEditMode
                      ? "Actualizar Reto"
                      : "Publicar Nuevo Reto"}
                </span>
                <span className="material-symbols-outlined text-[20px]">
                  {loading
                    ? "hourglass_top"
                    : isEditMode
                      ? "save"
                      : "rocket_launch"}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateChallengeForm;
