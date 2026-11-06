// src/components/detalleReto/TeamSubmissionsList.jsx
import { useState } from "react";
import TeamFilterBar from "./TeamFilterBar";

export const TeamSubmissionsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      
      {/* Barra de Búsqueda y Filtros */}
      <TeamFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Lista de Tarjetas de Equipos */}
      <div className="flex flex-col gap-5">
        
        {/* TEAM 1: Innovatech CESDE (Entregable cargado pendiente de calificar) */}
        <article className="rounded-3xl bg-surface-container-low border border-white/10 p-6 backdrop-blur-md relative hover:border-primary-container/40 transition-all duration-300 shadow-lg hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
          {/* Cabecera de la Tarjeta */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-4 border-b border-white/5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-white font-bold text-headline-sm font-headline-sm shadow-md">
                IC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-headline-sm font-headline-sm text-white font-bold">Innovatech CESDE</h3>
                  <span className="px-2 py-0.5 rounded-full text-caption font-caption bg-surface-container-highest text-on-surface-variant font-medium">
                    4 integrantes
                  </span>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                  Líder: <strong className="text-white">Valentina Montoya</strong> • Escuela de Software &amp; IA
                </p>
              </div>
            </div>

            {/* Badge de Estado */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 self-start font-semibold">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              Entregable Final Cargado (v1.2)
            </span>
          </div>

          {/* Detalles del Entregable */}
          <div className="py-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between text-body-sm font-body-sm text-on-surface-variant gap-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>
                Entregado: <strong className="text-white">Ayer, 18:40 hrs</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-container/10 text-primary text-label-sm font-label-sm border border-primary-container/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                Pendiente Calificación Jurado
              </span>
            </div>

            {/* Píldoras de Archivos Adjuntos */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 hover:border-primary-container/50 hover:bg-surface-variant transition-colors text-label-sm font-label-sm text-on-surface group" href="#">
                <span className="material-symbols-outlined text-[16px] text-primary">code</span>
                <span>Repositorio GitHub</span>
                <span className="material-symbols-outlined text-[14px] text-outline group-hover:translate-x-0.5 transition-transform">open_in_new</span>
              </a>
              <a className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 hover:border-primary-container/50 hover:bg-surface-variant transition-colors text-label-sm font-label-sm text-on-surface group" href="#">
                <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                <span>Documento Técnico PDF (4.2 MB)</span>
                <span className="material-symbols-outlined text-[14px] text-outline group-hover:translate-y-0.5 transition-transform">download</span>
              </a>
              <a className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 hover:border-primary-container/50 hover:bg-surface-variant transition-colors text-label-sm font-label-sm text-on-surface group" href="#">
                <span className="material-symbols-outlined text-[16px] text-tertiary">rocket_launch</span>
                <span>Demo URL interactiva</span>
                <span className="material-symbols-outlined text-[14px] text-outline group-hover:translate-x-0.5 transition-transform">open_in_new</span>
              </a>
            </div>
          </div>

          {/* Acciones Inferiores */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container border border-white/5 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors text-body-sm font-body-sm">
                <span className="material-symbols-outlined text-[16px]">download</span>
                Descargar Todo (.zip)
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container border border-white/5 text-on-surface-variant hover:text-white hover:bg-surface-container-high transition-colors text-body-sm font-body-sm">
                <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                Dejar Feedback
              </button>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-bold hover:shadow-[0_0_18px_rgba(225,29,116,0.35)] transition-all text-label-md font-label-md">
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
              <span>Evaluar Entregable</span>
            </button>
          </div>
        </article>

        {/* TEAM 2: LogiRoute Devs (Ya Calificado) */}
        <article className="rounded-3xl bg-surface-container-low border border-white/10 p-6 backdrop-blur-md relative hover:border-secondary/40 transition-all duration-300 shadow-lg">
          {/* Cabecera de la Tarjeta */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-4 border-b border-white/5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-white/10 flex items-center justify-center text-secondary font-bold text-headline-sm font-headline-sm">
                LR
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-headline-sm font-headline-sm text-white font-bold">LogiRoute Devs</h3>
                  <span className="px-2 py-0.5 rounded-full text-caption font-caption bg-surface-container-highest text-on-surface-variant font-medium">
                    3 integrantes
                  </span>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                  Líder: <strong className="text-white">Mateo Restrepo</strong> • Desarrollo Web &amp; Analítica
                </p>
              </div>
            </div>

            {/* Badge de Estado */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-secondary-container/30 border border-secondary-container text-secondary self-start font-bold">
              <span 
                className="material-symbols-outlined text-[16px] text-amber-400" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              Calificado - 4.9 / 5.0
            </span>
          </div>

          {/* Detalles del Entregable */}
          <div className="py-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <a className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 hover:border-secondary/50 hover:bg-surface-variant transition-colors text-label-sm font-label-sm text-on-surface" href="#">
                <span className="material-symbols-outlined text-[16px] text-amber-400">terminal</span>
                <span>Notebook Jupyter (.ipynb)</span>
              </a>
              <a className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 hover:border-secondary/50 hover:bg-surface-variant transition-colors text-label-sm font-label-sm text-on-surface" href="#">
                <span className="material-symbols-outlined text-[16px] text-tertiary">play_circle</span>
                <span>Video Pitch (3 min)</span>
              </a>
            </div>

            {/* Caja de Feedback */}
            <div className="p-3.5 rounded-xl bg-surface-container/70 border border-white/5 text-body-sm font-body-sm text-on-surface-variant flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">format_quote</span>
              <p>
                <strong className="text-white">Feedback registrado:</strong> "Excelente modelado heurístico de rutas urbanas en el Valle de Aburrá. Reducción estimada del 22% en tiempos de congestión."
              </p>
            </div>
          </div>

          {/* Acciones Inferiores */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-caption font-caption text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-emerald-400">verified_user</span>
              Evaluación completada por Ing. Roberto Saldarriaga
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white transition-colors text-label-md font-label-md">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                Descargar Archivos
              </button>
              <button className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-secondary-container/40 border border-secondary text-white font-semibold hover:bg-secondary-container transition-colors text-label-md font-label-md">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Ver Calificación
              </button>
            </div>
          </div>
        </article>

        {/* TEAM 3: CodeNexus Lab (En Borrador) */}
        <article className="rounded-3xl bg-surface-container-low border border-white/10 p-6 backdrop-blur-md relative hover:border-amber-400/40 transition-all duration-300 shadow-lg">
          {/* Cabecera de la Tarjeta */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-4 border-b border-white/5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-white/10 flex items-center justify-center text-amber-400 font-bold text-headline-sm font-headline-sm">
                CN
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-headline-sm font-headline-sm text-white font-bold">CodeNexus Lab</h3>
                  <span className="px-2 py-0.5 rounded-full text-caption font-caption bg-surface-container-highest text-on-surface-variant font-medium">
                    3 integrantes
                  </span>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                  Líder: <strong className="text-white">Andrés Felipe Gómez</strong> • Ingeniería de Software
                </p>
              </div>
            </div>

            {/* Badge de Estado */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm bg-amber-500/10 border border-amber-500/30 text-amber-300 self-start font-semibold">
              <span className="material-symbols-outlined text-[15px]">edit_note</span>
              Entregable en Borrador
            </span>
          </div>

          {/* Detalles del Entregable */}
          <div className="py-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="material-symbols-outlined text-[16px]">alarm</span>
                Vence en 48 hrs (Plazo de gracia técnico)
              </span>
              <span className="text-caption font-caption text-outline">Última actividad: Hoy, 11:20 hrs</span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              El equipo ha subido el esquema preliminar de base de datos Postgres y el boceto de la API de integración con mapas abiertos.
            </p>
          </div>

          {/* Acciones Inferiores */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container border border-white/5 text-on-surface-variant hover:text-white transition-colors text-body-sm font-body-sm">
              <span className="material-symbols-outlined text-[16px]">history</span>
              Ver Historial de Commits
            </button>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-high border border-white/10 text-on-surface hover:text-white transition-colors text-label-md font-label-md">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Ver Avance
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold hover:bg-amber-500/30 transition-colors text-label-md font-label-md">
                <span className="material-symbols-outlined text-[18px]">send</span>
                Enviar Recordatorio
              </button>
            </div>
          </div>
        </article>

      </div>
    </div>
  );
};

export default TeamSubmissionsList;