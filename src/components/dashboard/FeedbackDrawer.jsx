// src/components/dashboard/FeedbackDrawer.jsx

export const FeedbackDrawer = () => {
  return (
    <div className="bg-surface-container-low rounded-3xl border border-primary-container/20 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      
      {/* Aura sutil de acento magenta en el drawer (Decoración de UI) */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header del Panel de Comentarios */}
      <div className="flex items-start justify-between pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-1.5 text-primary text-caption font-caption font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">forum</span>
            Feedback & Retroalimentación
          </div>
          <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold mt-1 line-clamp-1">
            Optimización eCommerce IA
          </h3>
          <p className="text-caption font-caption text-outline">Hilo sincronizado con Tutores y Postulantes</p>
        </div>
        <button className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Cerrar o contraer">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Historial de Conversación / Comentarios */}
      <div className="flex flex-col gap-4 py-4 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
        
        {/* Comentario 1: Docente Tutor CESDE */}
        <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-surface-container/70 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-secondary flex items-center justify-center text-xs font-bold">
                Prof
              </div>
              <div>
                <span className="text-label-md font-label-md font-semibold text-on-surface">Mg. Carlos Arango</span>
                <span className="text-caption font-caption text-secondary block -mt-1">Docente Asesor CESDE</span>
              </div>
            </div>
            <span className="text-caption font-caption text-outline">Ayer, 4:20 PM</span>
          </div>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            Hola equipo NovaLogistics. Revisamos los requerimientos técnicos del reto de eCommerce con IA. Sugerimos liberar una muestra anonimizada del dataset de ventas para que los estudiantes validen los modelos en el Sprint 1.
          </p>
        </div>

        {/* Comentario 2: Empresa (Usuario actual) */}
        <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-primary-container/10 border border-primary-container/20 ml-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
                NL
              </div>
              <div>
                <span className="text-label-md font-label-md font-semibold text-primary">NovaLogistics (Tú)</span>
                <span className="text-caption font-caption text-on-surface-variant block -mt-1">Líder de Innovación</span>
              </div>
            </div>
            <span className="text-caption font-caption text-outline">Hoy, 9:15 AM</span>
          </div>
          <p className="text-body-sm font-body-sm text-on-surface mt-1">
            Excelente punto Carlos. Ya preparamos un CSV anonimizado con 45,000 registros y el esquema de atributos de demanda. Lo adjuntamos aquí para que el equipo preseleccionado lo descargue.
          </p>
          <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1.5 bg-surface-container-low rounded-lg text-caption font-caption text-on-surface border border-white/10 hover:border-primary-container/40 transition-colors cursor-pointer w-fit">
            <span className="material-symbols-outlined text-primary text-base">attach_file</span>
            <span>dataset_muestra_ecommerce_v1.csv (2.4 MB)</span>
          </div>
        </div>

        {/* Comentario 3: Líder de Estudiantes */}
        <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-surface-container/70 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-tertiary-container text-tertiary flex items-center justify-center text-xs font-bold">
                ST
              </div>
              <div>
                <span className="text-label-md font-label-md font-semibold text-on-surface">Sara Trujillo</span>
                <span className="text-caption font-caption text-tertiary block -mt-1">Líder Equipo 'NeuralSync' CESDE</span>
              </div>
            </div>
            <span className="text-caption font-caption text-outline">Hace 2 horas</span>
          </div>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            ¡Recibido! Nuestro equipo ya inició la exploración exploratoria (EDA). ¿La métrica objetivo principal será RMSE o prefieren optimizar F1-Score en rotación de inventario crítico?
          </p>
        </div>

      </div>

      {/* Formulario de Respuesta / Retroalimentación Rápida */}
      <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
        <label className="text-caption font-caption text-outline font-medium">Responder o dar retroalimentación:</label>
        <div className="relative">
          {/* OJO: Aquí se usa <textarea /> como etiqueta que se cierra a sí misma en React */}
          <textarea 
            className="w-full bg-surface-container rounded-xl p-3 border border-white/10 text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container resize-none transition-all" 
            placeholder="Escribe una instrucción, ajuste de requisitos o retroalimentación técnica..." 
            rows="3"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface text-caption font-caption font-semibold transition-colors" type="button">
            <span className="material-symbols-outlined text-base">attach_file</span>
            <span>Adjuntar Guía / Briefing</span>
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-md shadow-primary-container/20 hover:opacity-95 active:scale-95 transition-all" type="button">
            <span>Enviar Comentario</span>
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </div>
      </div>

    </div>
  );
};