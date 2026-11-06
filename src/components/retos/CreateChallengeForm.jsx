// src/components/retos/CreateChallengeForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { retoService } from "@/services/reto.service";
import { ChallengeBreadcrumb } from "./ChallengeBreadcrumb";
import { CreateChallengeHeader } from "./CreateChallengeHeader";
import { ChallengeGeneralSection } from "./ChallengeGeneralSection";
import { ChallengeClassificationSection } from "./ChallengeClassificationSection";
import { ChallengeScheduleSection } from "./ChallengeScheduleSection";

const INITIAL_FORM_STATE = {
  nombre: "",
  descripcion: "",
  empresaId: "",
  categoria: "",
  prioridad: "",
  fechaInicio: "",
  fechaFin: "",
  fechaLimite: "",
};

export const CreateChallengeForm = ({ onSubmitChallenge, onCancel }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función genérica para actualizar cualquier campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador del envío del formulario hacia el backend
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
      idEmpresa: formData.empresaId,
      idCategoria: formData.categoria,
      idPrioridad: formData.prioridad,
      estadoActual: "RADICADO",
    };

    try {
      if (onSubmitChallenge) {
        await onSubmitChallenge(payload);
        return;
      }

      const response = await retoService.crear(payload);
      const nuevoId = response.id;
      navigate("/dashboard/retos/" + nuevoId);
    } catch (err) {
      setError(
        err?.message ||
          "No fue posible publicar el reto. Verifica los datos e intenta nuevamente."
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
        <CreateChallengeHeader />

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

        {/* 4. El Formulario con sus 3 Secciones y Acciones */}
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
          />

          {/* C. Sección de Cronograma y Fechas Límite */}
          <ChallengeScheduleSection
            formData={formData}
            onChange={handleChange}
          />

          {/* D. Acciones del Formulario (Cancelar / Publicar Reto) */}
          <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 border-t border-white/5">
            <Link
              to="/dashboard"
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
              <span>{loading ? "Publicando..." : "Publicar Reto"}</span>
              <span className="material-symbols-outlined text-[20px]">
                {loading ? "hourglass_top" : "rocket_launch"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeForm;
