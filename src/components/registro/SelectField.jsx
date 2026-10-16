import { Icon } from '@/components/common';

function SelectField({ id, label, icon, placeholder, options, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-label-md font-label-md text-on-surface" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-4 text-outline pointer-events-none flex items-center">
          <Icon name={icon} className="text-[20px]" />
        </span>
        <select
          id={id}
          name={id}
          className="w-full appearance-none pl-11 pr-10 py-3 bg-[#12141C] border border-white/10 rounded-xl text-body-md font-body-md text-on-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/25 transition-all outline-none cursor-pointer"
          {...props}
        >
          <option className="bg-[#12141C] text-outline" value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} className="bg-[#12141C] text-on-surface" value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-4 text-outline pointer-events-none flex items-center">
          <Icon name="expand_more" className="text-[20px]" />
        </span>
      </div>
    </div>
  );
}

export default SelectField;
