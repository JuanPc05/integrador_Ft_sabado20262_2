import { Icon } from '@/components/common';

// Campo con etiqueta + icono a la izquierda.
// labelRight: elemento opcional a la derecha de la etiqueta (ej. "¿Olvidaste tu contraseña?").
// rightSlot: elemento opcional dentro del input, a la derecha (ej. el ojito).
function LoginField({ id, label, labelRight, icon, rightSlot, ...props }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-label-md font-label-md text-on-surface" htmlFor={id}>
          {label}
        </label>
        {labelRight}
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary-container transition-colors">
          <Icon name={icon} className="text-[20px]" />
        </div>

        <input
          id={id}
          name={id}
          className={`w-full pl-11 ${rightSlot ? 'pr-11' : 'pr-4'} py-3 bg-surface border border-outline-variant/40 rounded-xl text-body-md font-body-md text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all`}
          {...props}
        />

        {rightSlot}
      </div>
    </div>
  );
}

export default LoginField;