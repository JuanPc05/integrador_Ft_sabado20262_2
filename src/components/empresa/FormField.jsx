import { Icon } from '@/components/common';

const BASE =
  'w-full pl-10 py-3 rounded-xl bg-surface border border-white/10 text-on-surface text-body-md font-body-md focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 focus:outline-none transition-all duration-200';

// Campo con etiqueta, icono y asterisco si es obligatorio.
// Si recibe "options", se dibuja como selector; si no, como input.
function FormField({ id, label, icon, required, options, placeholder, ...props }) {
  return (
    <div className="space-y-2">
      <label
        className="block text-label-md font-label-md text-on-surface font-medium flex items-center gap-1.5"
        htmlFor={id}
      >
        <span>{label}</span>
        {required && <span className="text-primary-container">*</span>}
      </label>
      <div className="relative rounded-xl">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
          <Icon name={icon} className="text-[20px]" />
        </div>

        {options ? (
          <>
            <select
              id={id}
              name={id}
              required={required}
              className={`${BASE} pr-10 appearance-none cursor-pointer`}
              {...props}
            >
              <option className="bg-surface text-outline" value="" disabled>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={opt.value} className="bg-surface text-on-surface" value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-outline">
              <Icon name="expand_more" className="text-[20px]" />
            </div>
          </>
        ) : (
          <input
            id={id}
            name={id}
            required={required}
            placeholder={placeholder}
            className={`${BASE} pr-4 placeholder:text-outline/60`}
            {...props}
          />
        )}
      </div>
    </div>
  );
}

export default FormField;
