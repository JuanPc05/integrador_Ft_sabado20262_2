// src/components/detalleReto/TeamFilterBar.jsx

export const TeamFilterBar = ({ searchTerm = "", onSearchChange, statusFilter = "Todos", onStatusChange }) => {
  return (
    <div className="rounded-2xl bg-surface-container-low border border-white/10 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Input de Búsqueda */}
      <div className="relative w-full md:w-80">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
          search
        </span>
        <input
          className="w-full pl-10 pr-4 py-2 bg-surface-container-high rounded-xl border border-white/10 text-white placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
          placeholder="Buscar equipo o estudiante..."
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>

      {/* Selectores de Filtro y Orden */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        
        {/* Dropdown de Estado */}
        <div className="relative flex-1 md:flex-initial">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
            className="w-full appearance-none pl-3.5 pr-8 py-2 bg-surface-container-high rounded-xl border border-white/10 text-on-surface text-body-sm font-body-sm focus:outline-none focus:border-primary-container transition-all cursor-pointer"
          >
            <option value="Todos">Estado: Todos</option>
            <option value="Entregable Enviado">Entregable Enviado</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Calificado">Calificado</option>
            <option value="En Borrador">En Borrador</option>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            expand_more
          </span>
        </div>

        {/* Dropdown de Ordenamiento */}
        <div className="relative flex-1 md:flex-initial">
          <select 
            defaultValue="recientes"
            className="w-full appearance-none pl-3.5 pr-8 py-2 bg-surface-container-high rounded-xl border border-white/10 text-on-surface text-body-sm font-body-sm focus:outline-none focus:border-primary-container transition-all cursor-pointer"
          >
            <option value="recientes">Ordenar por: Más recientes</option>
            <option value="puntaje">Mayor puntaje</option>
            <option value="az">Nombre A-Z</option>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            sort
          </span>
        </div>

      </div>
    </div>
  );
};

export default TeamFilterBar;