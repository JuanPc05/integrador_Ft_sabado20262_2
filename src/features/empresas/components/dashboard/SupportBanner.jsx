// src/features/empresas/components/dashboard/SupportBanner.jsx

const TELEFONO_DISPLAY = '310 255 6899';
const TELEFONO_HREF = 'tel:+573102556899';
const CORREO = 'admin.conecta@cesde.edu.co';

export const SupportBanner = () => {
  return (
    <div className="bg-gradient-to-r from-surface-container-low to-surface-container p-6 rounded-3xl border border-white/5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl">support_agent</span>
        </div>

        <div>
          <h3 className="text-headline-sm font-headline-sm text-on-surface">
            ¿Necesitas asesoría para definir un nuevo reto?
          </h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
            Si necesitas asesoría, contáctanos. El equipo docente y metodológico de CESDE te ayuda a
            estructurar desafíos con impacto de innovación.
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-2 shrink-0 text-body-sm font-body-sm">
        <li>
          <a
            href={TELEFONO_HREF}
            className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg text-tertiary">call</span>
            <span>{TELEFONO_DISPLAY}</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${CORREO}`}
            className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors break-all"
          >
            <span className="material-symbols-outlined text-lg text-tertiary">mail</span>
            <span>{CORREO}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SupportBanner;
