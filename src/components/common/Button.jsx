/**
 * Componente Button global.
 * @param {string} variant - 'primary' (degradado), 'solid' (color plano), 'outline' (bordes), 'ghost' (transparente)
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {ReactNode} iconLeft - Icono opcional a la izquierda
 * @param {ReactNode} iconRight - Icono opcional a la derecha
 */
export const Button = ({
  children,
  variant = 'solid',
  size = 'md',
  iconLeft,
  iconRight,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  // 1. Clases base que comparten TODOS los botones (transiciones, centrado, fuente)
  const baseClasses = "inline-flex items-center justify-center gap-2 font-label-md transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  // 2. Diccionario de variantes (Extraído de tu propio HTML)
  const variants = {
    primary: "brand-btn-gradient brand-btn-glow text-white shadow-xl shadow-primary-container/25",
    solid: "bg-primary-container text-on-primary-container shadow-lg shadow-primary-container/25 hover:opacity-95",
    outline: "bg-surface-container-high hover:bg-surface-bright text-on-surface border border-outline-variant/50 hover:border-primary-container/50",
    ghost: "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
  };

  // 3. Diccionario de tamaños
  const sizes = {
    sm: "px-3 py-1.5 text-label-sm rounded-lg",
    md: "px-5 py-2.5 text-label-md rounded-xl",
    lg: "px-8 py-4 text-headline-sm rounded-2xl"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {iconLeft && <span>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
};