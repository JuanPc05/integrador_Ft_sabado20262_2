import { useState } from 'react';
import { Icon } from '@/components/common';
import InputField from './InputField';
import PasswordStrength from './PasswordStrength';

function PasswordField({ value, onChange }) {
  const [visible, setVisible] = useState(false);

  const toggleButton = (
    <button
      type="button"
      aria-label="Alternar visibilidad de contraseña"
      onClick={() => setVisible((v) => !v)}
      className="absolute right-3.5 text-outline hover:text-on-surface transition-colors p-1"
    >
      <Icon name={visible ? 'visibility_off' : 'visibility'} className="text-[20px]" />
    </button>
  );

  return (
    <InputField
      id="password"
      label="Contraseña"
      icon="lock"
      type={visible ? 'text' : 'password'}
      placeholder="Crea una contraseña segura"
      required
      value={value}
      onChange={onChange}
      rightSlot={toggleButton}
    >
      <PasswordStrength value={value} />
    </InputField>
  );
}

export default PasswordField;
