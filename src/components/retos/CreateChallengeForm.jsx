// src/components/retos/CreateChallengeForm.jsx
import { useState } from "react";
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
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Función genérica para actualizar cualquier campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitChallenge) {
      onSubmitChallenge(formData);
    } else {
      console.log("Datos del reto listos para enviar al backend:", formData);
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
            <a
              href="#"
              onClick={(e) => {
                if (onCancel) {
                  e.preventDefault();
                  onCancel();
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-center"
            >
              Cancelar
            </a>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary-container hover:to-[#5800a0] text-white font-label-md text-label-md font-bold shadow-lg shadow-primary-container/30 hover:shadow-primary-container/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Publicar Reto</span>
              <span className="material-symbols-outlined text-[20px]">
                rocket_launch
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeForm;