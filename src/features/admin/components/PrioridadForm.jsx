// src/features/admin/components/PrioridadForm.jsx
import { useState } from 'react';
import { retoService } from '@/features/retos/reto.service';

const INITIAL_STATE = {
  nombre: '',
  nivel: '',
  diasMaxRespuesta: '',
};

export const PrioridadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError('');

    const payload = {
      nombre: formData.nombre.trim(),
      nivel: Number(formData.nivel),
      diasMaxRespuesta: Number(formData.diasMaxRespuesta),
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await retoService.crearPrioridad(payload);
      }

      setSuccessMessage('Prioridad registrada correctamente.');
      setFormData(INITIAL_STATE);
    } catch (err) {
      setError(err?.message || 'No fue posible guardar la prioridad.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-surface-container rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden border border-white/5">
      {/* Línea superior decorativa */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary-container to-transparent opacity-80" />

      {/* Encabezado de Tarjeta */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary">
          <span className="material-symbols-outlined text-[22px]">
            flag
          </span>
        </div>
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            Nueva Prioridad
          </h2>
          <p className="font-caption text-caption text-on-surface-variant">
            Define acuerdos de nivel de servicio (SLA) y tiempos de respuesta
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          <span className="material-symbols-outlined text-[20px] text-red-400 shrink-0">
            error
          </span>
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
        >
          <span className="material-symbols-outlined text-[20px] text-emerald-400 shrink-0">
            check_circle
          </span>
          <span>{successMessage}</span>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Nombre de la Prioridad */}
        <div>
          <label
            className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="prio-nombre"
          >
            <span>
              Nombre <span className="text-primary-container font-bold">*</span>
            </span>
            <span className="font-caption text-caption text-outline">
              Ej. Alta, Media, Baja
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                priority_high
              </span>
            </div>
            <input
              id="prio-nombre"
              name="nombre"
              type="text"
              required
              maxLength={50}
              placeholder="Ej. Alta / Urgente"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200"
            />
          </div>
        </div>

        {/* Nivel y Días Máx Respuesta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              className="block font-label-md text-label-md text-on-surface-variant mb-2"
              htmlFor="prio-nivel"
            >
              Nivel (Jerarquía){' '}
              <span className="text-primary-container font-bold">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">
                  format_list_numbered
                </span>
              </div>
              <input
                id="prio-nivel"
                name="nivel"
                type="number"
                min={1}
                max={10}
                required
                placeholder="Ej. 1"
                value={formData.nivel}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              className="block font-label-md text-label-md text-on-surface-variant mb-2"
              htmlFor="prio-dias"
            >
              Días Máx. Respuesta{' '}
              <span className="text-primary-container font-bold">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <span className="material-symbols-outlined text-[20px]">
                  schedule
                </span>
              </div>
              <input
                id="prio-dias"
                name="diasMaxRespuesta"
                type="number"
                min={1}
                max={365}
                required
                placeholder="Ej. 5"
                value={formData.diasMaxRespuesta}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <p className="font-caption text-caption text-outline flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-tertiary">
            info
          </span>
          El nivel 1 representa la prioridad más alta con menor tiempo máximo de respuesta (SLA).
        </p>

        {/* Botón Guardar Prioridad */}
        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary-container hover:to-[#5800a0] text-white font-label-md text-label-md font-bold shadow-lg shadow-primary-container/30 hover:shadow-primary-container/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
          >
            <span>{loading ? 'Guardando...' : 'Guardar Prioridad'}</span>
            <span className="material-symbols-outlined text-[20px]">
              {loading ? 'hourglass_top' : 'save'}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default PrioridadForm;

