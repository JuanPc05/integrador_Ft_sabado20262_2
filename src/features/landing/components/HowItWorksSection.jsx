import React from 'react';

// 1. Separamos los DATOS de la VISTA
const STEPS = [
  {
    id: '01',
    icon: 'domain_add',
    title: 'Regístrate',
    description: 'Crea el perfil verificado de tu empresa o startup en minutos. Define tu sector económico, ubicación y áreas de interés.',
    pillText: 'Paso 1: Validación rápida',
    pillIcon: 'check_circle'
  },
  {
    id: '02',
    icon: 'post_add',
    title: 'Publica tu necesidad (Reto)',
    description: 'Describe tu desafío técnico, de diseño, marketing o gestión con objetivos claros, alcance esperado y métricas de éxito.',
    pillText: 'Paso 2: Brief guiado',
    pillIcon: 'edit_note'
  },
  {
    id: '03',
    icon: 'groups_3',
    title: 'Conecta con estudiantes',
    description: 'Equipos de estudiantes multidisciplinarios del CESDE postulan propuestas estructuradas con la guía y supervisión de docentes expertos.',
    pillText: 'Paso 3: Asignación calificada',
    pillIcon: 'group_add'
  },
  {
    id: '04',
    icon: 'verified',
    title: 'Desarrolla tu proyecto',
    description: 'Acompaña entregas en sprints, evalúa el avance del proyecto integrador y recibe un entregable funcional, validado y listo para su uso.',
    pillText: 'Paso 4: Solución entregada',
    pillIcon: 'workspace_premium'
  }
];

// 2. Componente de Presentación (La Tarjeta)
// Nota cómo resolvemos el style en línea de font-variation-settings
const StepCard = ({ step }) => (
  <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-display-hero-mobile font-display-hero-mobile text-[#E11D74]/20 font-black group-hover:text-[#E11D74] transition-colors">
          {step.id}
        </span>
        <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#D91671] flex items-center justify-center border border-pink-100">
          <span 
            className="material-symbols-outlined" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {step.icon}
          </span>
        </div>
      </div>
      <h3 className="text-headline-sm font-headline-sm text-[#0F172A] mb-3 group-hover:text-[#D91671] transition-colors">
        {step.title}
      </h3>
      <p className="text-body-sm font-body-sm text-[#64748B] leading-relaxed">
        {step.description}
      </p>
    </div>
    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#D91671]">
      <span>{step.pillText}</span>
      <span className="material-symbols-outlined text-xs">{step.pillIcon}</span>
    </div>
  </div>
);

// 3. El Contenedor de la Sección
export const HowItWorksSection = () => {
  return (
    <section className="bg-[#F8FAFC] text-[#0F172A] py-24 px-6 md:px-12 transition-colors relative z-20" id="como-funciona">
      <div className="max-w-7xl mx-auto">
        
        {/* Header de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#D91671] font-semibold text-xs tracking-wider uppercase">
              <span className="material-symbols-outlined text-xs">sync_alt</span>
              Metodología Ágil Integrada
            </div>
            <h2 className="text-headline-xl md:text-display-hero-mobile font-headline-xl md:font-display-hero-mobile text-[#0F172A] tracking-tight">
              Un proceso simple para transformar ideas en proyectos reales
            </h2>
          </div>
          <p className="text-body-md font-body-md text-[#475569] max-w-md">
            Conectamos los requerimientos técnicos y productivos de tu empresa con las competencias prácticas de nuestros estudiantes y la mentoría docente especializada.
          </p>
        </div>

        {/* 4 Clean Steps Grid - ¡Iterado mágicamente con React! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>

        {/* Quick Action Under Process */}
        <div className="mt-14 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E11D74] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white">tips_and_updates</span>
            </div>
            <div>
              <h4 className="text-headline-sm font-headline-sm text-white">¿Tienes dudas sobre cómo estructurar el reto de tu empresa?</h4>
              <p className="text-body-sm font-body-sm text-slate-300">Nuestros coordinadores académicos te asesoran sin costo para definir el alcance ideal.</p>
            </div>
          </div>
          <a className="brand-btn-gradient text-white font-label-md px-6 py-3 rounded-xl whitespace-nowrap shadow hover:opacity-95 transition-all" href="#contacto-asesoria">
            Agendar asesoría gratuita
          </a>
        </div>
      </div>
    </section>
  );
};