import React from 'react';
import { Icon } from './Icon'; // Importamos el icono que ya creamos

/**
 * Componente Badge/Pill global para etiquetas y estados.
 * @param {string} variant - 'primary', 'success', 'tertiary', 'neutral', 'solidPrimary'
 * @param {string} size - 'sm' (muy pequeño), 'md' (estándar)
 * @param {string} rounded - 'full' (píldora), 'lg' (bordes un poco más rectos)
 * @param {boolean} withDot - Si es true, muestra un punto de color al inicio
 * @param {boolean} dotPulsing - Si es true, el punto tendrá una animación de parpadeo
 * @param {string} icon - Nombre del icono opcional (Material Symbols)
 */
export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  withDot = false,
  dotPulsing = false,
  icon,
  className = '',
  ...props
}) => {
  // Clases estructurales (alineación y prevención de saltos de línea)
  const baseClasses = "inline-flex items-center gap-1.5 font-semibold border whitespace-nowrap";

  // Diccionario de variantes visuales basadas en tu diseño de CESDE Conecta
  const variants = {
    primary: "bg-primary-container/15 text-primary border-primary-container/30",
    solidPrimary: "bg-primary-container text-on-primary-container border-transparent",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    tertiary: "bg-tertiary-container/20 text-tertiary border-tertiary-container/40",
    neutral: "bg-surface-container-high text-on-surface-variant border-surface-variant",
  };

  // Diccionario de tamaños tipográficos y de padding
  const sizes = {
    sm: "px-2 py-0.5 text-caption font-caption",
    md: "px-3 py-1 text-label-sm font-label-sm",
  };

  // Nivel de redondez
  const radiuses = {
    lg: "rounded-lg",
    full: "rounded-full"
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${radiuses[rounded]} ${className}`}
      {...props}
    >
      {/* Lógica condicional: Si piden un punto, lo dibujamos */}
      {withDot && (
        <span 
          className={`w-1.5 h-1.5 rounded-full bg-current ${dotPulsing ? 'animate-pulse' : ''}`}
        ></span>
      )}
      
      {/* Lógica condicional: Si pasan un string en 'icon', renderizamos tu componente Icon */}
      {icon && <Icon name={icon} className="text-[14px]" />}
      
      {children}
    </span>
  );
};