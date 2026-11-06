// Las clases van completas (no armadas con template strings) para que Tailwind las detecte.
const LEVELS = [
  { label: 'Seguridad básica', text: 'text-outline', bar: '' },
  { label: 'Débil', text: 'text-error', bar: 'bg-error' },
  { label: 'Media', text: 'text-amber-400', bar: 'bg-amber-500' },
  { label: 'Buena', text: 'text-primary', bar: 'bg-primary-container' },
  { label: 'Excelente', text: 'text-emerald-400', bar: 'bg-emerald-500' },
];

function getScore(value) {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

function PasswordStrength({ value }) {
  const score = getScore(value);
  const level = LEVELS[score] || LEVELS[0];

  return (
    <div className="pt-1.5">
      <div className="flex items-center justify-between text-caption font-caption mb-1">
        <span className="text-outline">Seguridad de la contraseña</span>
        <span className={`${level.text} transition-colors`}>{level.label}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 h-1.5 rounded-full overflow-hidden bg-surface-container-highest">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-full rounded-full transition-colors duration-300 ${
              i < score ? level.bar : 'bg-surface-variant'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export { PasswordStrength };
export default PasswordStrength;
