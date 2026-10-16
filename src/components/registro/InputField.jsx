import { Icon } from '@/components/common';

function InputField({ id, label, icon, type = 'text', rightSlot, children, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-label-md font-label-md text-on-surface" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-4 text-outline pointer-events-none flex items-center">
          <Icon name={icon} className="text-[20px]" />
        </span>
        <input
          id={id}
          name={id}
          type={type}
          className={`w-full pl-11 ${rightSlot ? 'pr-11' : 'pr-4'} py-3 bg-[#12141C] border border-white/10 rounded-xl text-body-md font-body-md text-on-surface placeholder:text-outline/70 focus:border-primary-container focus:ring-2 focus:ring-primary-container/25 transition-all outline-none`}
          {...props}
        />
        {rightSlot}
      </div>
      {children}
    </div>
  );
}

export default InputField;