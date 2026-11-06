// src/components/dashboard/ChallengeTable.jsx

export const ChallengeTable = () => {
  return (
    <div className="bg-surface-container-low rounded-3xl border border-white/5 p-6 shadow-xl">
      
      {/* Encabezado de Sección y Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-surface font-bold">Gestión de Retos Publicados</h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">Supervisa convocatorias, equipos asignados y avances técnicos.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <input 
              className="w-full pl-8 pr-3 py-1.5 bg-surface-container rounded-lg border border-white/10 text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container" 
              placeholder="Filtrar retos..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-base text-outline">filter_alt</span>
          </div>
        </div>
      </div>

      {/* Píldoras de Filtro Rápido */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto custom-scrollbar">
        <button className="px-3 py-1 rounded-full text-caption font-caption font-semibold bg-primary-container text-on-primary-container">Todos (5)</button>
        <button className="px-3 py-1 rounded-full text-caption font-caption font-medium bg-surface-container text-on-surface-variant hover:text-on-surface">En Convocatoria (2)</button>
        <button className="px-3 py-1 rounded-full text-caption font-caption font-medium bg-surface-container text-on-surface-variant hover:text-on-surface">En Desarrollo (2)</button>
        <button className="px-3 py-1 rounded-full text-caption font-caption font-medium bg-surface-container text-on-surface-variant hover:text-on-surface">Finalizados (1)</button>
        <button className="px-3 py-1 rounded-full text-caption font-caption font-medium bg-surface-container text-on-surface-variant hover:text-on-surface">Borradores (0)</button>
      </div>

      {/* TABLA DE RETOS INTERACTIVA */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-surface-variant/40 text-outline text-caption font-caption uppercase tracking-wider">
              <th className="py-3 px-4">Reto & Área</th>
              <th className="py-3 px-4">Cronograma</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Equipos</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-body-sm font-body-sm">
            
            {/* Fila 1 */}
            <tr className="bg-surface-container/60 hover:bg-surface-container transition-colors rounded-xl group border-l-4 border-l-primary-container">
              <td className="py-4 px-4">
                <div className="font-semibold text-on-surface group-hover:text-primary transition-colors">Optimización de eCommerce con IA</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-tertiary">Data Science & ML</span>
                  <span className="text-caption font-caption text-outline">Nivel Avanzado</span>
                </div>
              </td>
              <td className="py-4 px-4 text-on-surface-variant">
                <div className="text-body-sm font-medium text-on-surface">Cierre: 28 Mar</div>
                <div className="text-caption text-outline">Publicado hace 6 días</div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-caption font-semibold bg-primary-container/15 text-primary border border-primary-container/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                  En Convocatoria
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center -space-x-2 overflow-hidden">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container bg-primary-container/40 text-center leading-7 text-xs font-bold text-white">DS</div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container bg-secondary-container/40 text-center leading-7 text-xs font-bold text-white">AI</div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container bg-surface-bright text-center leading-7 text-xs font-bold text-on-surface">+3</div>
                </div>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button className="px-2.5 py-1.5 rounded-lg bg-primary-container/20 text-primary border border-primary-container/40 hover:bg-primary-container hover:text-white transition-all flex items-center gap-1 text-caption font-caption font-semibold" title="Ver feedback">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>3</span>
                  </button>
                  <button className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-surface-bright text-outline hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>

            {/* Fila 2 */}
            <tr className="hover:bg-surface-container/40 transition-colors">
              <td className="py-4 px-4">
                <div className="font-semibold text-on-surface">Rediseño de App Móvil FinTech</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-secondary">UX/UI & Flutter</span>
                  <span className="text-caption font-caption text-outline">Sprint 2 de 4</span>
                </div>
              </td>
              <td className="py-4 px-4 text-on-surface-variant">
                <div className="text-body-sm font-medium text-on-surface">Entrega: 14 Abr</div>
                <div className="text-caption text-outline">Sprint activo</div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-caption font-semibold bg-tertiary-container/20 text-tertiary border border-tertiary-container/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  En Desarrollo
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center -space-x-2">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container bg-tertiary-container/40 text-center leading-7 text-xs font-bold text-white">UX</div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container bg-secondary-container/40 text-center leading-7 text-xs font-bold text-white">FL</div>
                </div>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button className="px-2.5 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1 text-caption font-caption font-medium">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>1</span>
                  </button>
                  <button className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-surface-bright text-outline hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>

            {/* Fila 3 */}
            <tr className="hover:bg-surface-container/40 transition-colors">
              <td className="py-4 px-4">
                <div className="font-semibold text-on-surface">Plataforma IoT de Trazabilidad en Bodega</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-primary-fixed">IoT & Cloud AWS</span>
                  <span className="text-caption font-caption text-outline">Fase Validación</span>
                </div>
              </td>
              <td className="py-4 px-4 text-on-surface-variant">
                <div className="text-body-sm font-medium text-on-surface">Cierre: 05 May</div>
                <div className="text-caption text-outline">Revisando postulantes</div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-caption font-semibold bg-surface-variant/60 text-on-surface-variant border border-outline-variant/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                  En Revisión
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center -space-x-2">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container bg-surface-bright text-center leading-7 text-xs font-bold text-white">4 Eq</div>
                </div>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button className="px-2.5 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1 text-caption font-caption font-medium">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>0</span>
                  </button>
                  <button className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-surface-bright text-outline hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>

            {/* Fila 4 */}
            <tr className="hover:bg-surface-container/40 transition-colors">
              <td className="py-4 px-4">
                <div className="font-semibold text-on-surface">Dashboard de Huella de Carbono Logística</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-caption font-caption bg-surface-container-high text-tertiary">Fullstack & APIs</span>
                  <span className="text-caption font-caption text-outline">Entregable Aprobado</span>
                </div>
              </td>
              <td className="py-4 px-4 text-on-surface-variant">
                <div className="text-body-sm font-medium text-on-surface">Completado 10 Feb</div>
                <div className="text-caption text-outline">Calificación: 4.9/5.0</div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-caption font-semibold bg-tertiary-container/10 text-tertiary border border-tertiary/20">
                  <span className="material-symbols-outlined text-xs">done_all</span>
                  Finalizado
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center -space-x-2">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-container bg-surface-variant text-center leading-7 text-xs font-bold text-on-surface">DevX</div>
                </div>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button className="px-2.5 py-1.5 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1 text-caption font-caption font-medium">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span>Ver</span>
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-surface-bright text-outline hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-sm">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-caption font-caption text-outline">
        <div>Mostrando 4 de 5 retos registrados</div>
        <div className="flex items-center gap-2">
          {/* Los atributos 'disabled' en React no llevan string vacío, solo el nombre booleano o {true} */}
          <button className="p-1 rounded bg-surface-container hover:bg-surface-container-high disabled:opacity-30" disabled>
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <span className="px-2 text-on-surface">Página 1 de 1</span>
          <button className="p-1 rounded bg-surface-container hover:bg-surface-container-high disabled:opacity-30" disabled>
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChallengeTable;