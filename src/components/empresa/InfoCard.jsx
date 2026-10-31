import { Icon } from '@/components/common';

// Tarjeta de un dato con icono (NIT, sector). "right" es un elemento opcional a la derecha.
function InfoCard({ icon, label, value, right }) {
  return (
    <div className="bg-surface-container/60 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-white/15 transition-colors">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-outline">
          <Icon name={icon} className="text-[20px]" />
        </div>
        <div className="flex flex-col">
          <span className="text-label-sm font-label-sm text-outline">{label}</span>
          <span className="text-headline-sm font-headline-sm text-white font-semibold tracking-wide">
            {value}
          </span>
        </div>
      </div>
      {right}
    </div>
  );
}

export default InfoCard;
