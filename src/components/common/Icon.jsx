import React from 'react';

/**
 * Componente Icon global utilizando Google Material Symbols.
 * @param {string} name - Nombre exacto del icono (ej. 'search', 'add', 'arrow_forward').
 * @param {string} className - Clases de Tailwind adicionales (ej. 'text-xl text-primary').
 * @param {boolean} filled - Si es true, activa el relleno sólido del icono.
 */
export const Icon = ({ 
  name, 
  className = '', 
  filled = false,
  ...props 
}) => {
  // En tu HTML original, tenías una regla CSS para font-variation-settings.
  // En React, podemos inyectar dinámicamente este comportamiento mediante el objeto style.
  const inlineStyle = filled ? { fontVariationSettings: "'FILL' 1" } : {};

  return (
    <span 
      className={`material-symbols-outlined inline-block align-middle leading-none ${className}`}
      style={inlineStyle}
      {...props}
    >
      {name}
    </span>
  );
};