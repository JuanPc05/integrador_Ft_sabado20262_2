import { Icon } from '@/components/common';

// Tarjeta de contacto: icono + etiqueta arriba, y el contenido (children) debajo.
function ContactCard({ icon, label, children }) {
  return (
    <div className="bg-surface-container/60 rounded-xl p-4 border border-white/5 flex flex-col gap-2 hover:border-white/15 transition-colors">
      <div className="flex items-center gap-2 text-outline">
        <Icon name={icon} className="text-[18px]" />
        <span className="text-label-sm font-label-sm">{label}</span>
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default ContactCard;
