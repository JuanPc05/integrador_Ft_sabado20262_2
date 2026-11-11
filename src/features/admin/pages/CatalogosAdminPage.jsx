// src/features/admin/pages/CatalogosAdminPage.jsx
import { Link } from 'react-router-dom';
import { retoService } from '@/features/retos/reto.service';
import { CategoriaForm } from '@/features/admin/components/CategoriaForm';
import { PrioridadForm } from '@/features/admin/components/PrioridadForm';

export const CatalogosAdminPage = () => {
  const handleCrearCategoria = async (payload) => {
    return await retoService.crearCategoria(payload);
  };

  const handleCrearPrioridad = async (payload) => {
    return await retoService.crearPrioridad(payload);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Encabezado de la Vista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/15 border border-primary-container/30 text-primary text-caption font-caption font-semibold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[15px]">
              admin_panel_settings
            </span>
            <span>Administración de Catálogos</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
            Gestión de Categorías y Prioridades
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Configura las áreas académicas y niveles de prioridad SLA disponibles para la radicación de retos.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container border border-white/10 hover:border-primary-container/50 hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">
            arrow_back
          </span>
          <span>Volver al Dashboard</span>
        </Link>
      </div>

      {/* Grid de 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <CategoriaForm onSubmit={handleCrearCategoria} />
        <PrioridadForm onSubmit={handleCrearPrioridad} />
      </div>
    </div>
  );
};

export default CatalogosAdminPage;

