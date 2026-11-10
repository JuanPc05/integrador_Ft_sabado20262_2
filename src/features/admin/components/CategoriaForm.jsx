// src/features/admin/components/CategoriaForm.jsx
import { useState } from 'react';
import { retoService } from '@/features/retos/reto.service';

const ESCUELAS_RESPONSABLES = [
  { value: 'NUEVAS_TECNOLOGIAS', label: 'Nuevas Tecnologías (Software, Datos)' },
  { value: 'INDUSTRIAS_CREATIVAS', label: 'Industrias Creativas (Diseño, Audiovisual)' },
  { value: 'DESARROLLO_EMPRESARIAL', label: 'Desarrollo Empresarial (Negocios)' },
  { value: 'GASTRONOMIA_Y_TURISMO', label: 'Gastronomía y Turismo' },
  { value: 'SALUD', label: 'Escuela de Salud' },
  { value: 'INTERDISCIPLINARIO', label: 'Interdisciplinario' },
];

const INITIAL_STATE = {
  nombre: '',
  descripcion: '',
  areaResponsable: '',
};

export const CategoriaForm = ({ onSubmit }) => {
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
      descripcion: formData.descripcion.trim(),
      areaResponsable: formData.areaResponsable,
      activo: true,
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await retoService.crearCategoria(payload);
      }

      setSuccessMessage('Categoría académica registrada correctamente.');
      setFormData(INITIAL_STATE);
    } catch (err) {
      setError(err?.message || 'No fue posible guardar la categoría académica.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-surface-container rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden border border-white/5">
      {/* Línea superior decorativa */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80" />

      {/* Encabezado de Tarjeta */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[22px]">
            category
          </span>
        </div>
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            Nueva Categoría Académica
          </h2>
          <p className="font-caption text-caption text-on-surface-variant">
            Vincula líneas temáticas con las escuelas del CESDE
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
        {/* Nombre de la Categoría */}
        <div>
          <label
            className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="cat-nombre"
          >
            <span>
              Nombre <span className="text-primary-container font-bold">*</span>
            </span>
            <span className="font-caption text-caption text-outline">
              Máx. 100 caracteres
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                label
              </span>
            </div>
            <input
              id="cat-nombre"
              name="nombre"
              type="text"
              required
              maxLength={100}
              placeholder="Ej. Desarrollo Web & Cloud"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200"
            />
          </div>
        </div>

        {/* Área / Escuela Responsable */}
        <div>
          <label
            className="block font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="cat-area"
          >
            Área Responsable{' '}
            <span className="text-primary-container font-bold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <span className="material-symbols-outlined text-[20px]">
                school
              </span>
            </div>
            <select
              id="cat-area"
              name="areaResponsable"
              required
              value={formData.areaResponsable}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 appearance-none cursor-pointer"
            >
              <option
                className="bg-surface-container-high text-outline"
                disabled
                value=""
              >
                Selecciona la escuela responsable
              </option>
              {ESCUELAS_RESPONSABLES.map((escuela) => (
                <option
                  key={escuela.value}
                  className="bg-surface-container text-on-surface"
                  value={escuela.value}
                >
                  {escuela.label}
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

        {/* Descripción */}
        <div>
          <label
            className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-2"
            htmlFor="cat-descripcion"
          >
            <span>
              Descripción{' '}
              <span className="text-primary-container font-bold">*</span>
            </span>
            <span className="font-caption text-caption text-outline">
              Máx. 255 caracteres
            </span>
          </label>
          <textarea
            id="cat-descripcion"
            name="descripcion"
            required
            rows={4}
            maxLength={255}
            placeholder="Describe el alcance académico y tipos de proyectos que abarca esta categoría..."
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 font-body-md text-body-md transition-all duration-200 resize-y"
          />
        </div>

        {/* Botón Guardar Categoría */}
        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary-container hover:to-[#5800a0] text-white font-label-md text-label-md font-bold shadow-lg shadow-primary-container/30 hover:shadow-primary-container/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
          >
            <span>{loading ? 'Guardando...' : 'Guardar Categoría'}</span>
            <span className="material-symbols-outlined text-[20px]">
              {loading ? 'hourglass_top' : 'save'}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default CategoriaForm;

