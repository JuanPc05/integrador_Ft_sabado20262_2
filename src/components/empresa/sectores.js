// Sectores económicos. El "value" es el que espera el backend (enum SectorEconomico).
export const SECTORES = [
  { value: 'TECNOLOGIA_Y_SOFTWARE', label: 'Tecnología y Software' },
  { value: 'GASTRONOMIA_Y_TURISMO', label: 'Gastronomía y Turismo' },
  { value: 'MANUFACTURA_E_INDUSTRIA', label: 'Manufactura e Industria' },
  { value: 'COMERCIO_Y_RETAIL', label: 'Comercio y Retail' },
  { value: 'SERVICIOS_FINANCIEROS', label: 'Servicios Financieros' },
  { value: 'SALUD_Y_BIENESTAR', label: 'Salud y Bienestar' },
  { value: 'EDUCACION', label: 'Educación' },
  { value: 'LOGISTICA_Y_TRANSPORTE', label: 'Logística y Transporte' },
  { value: 'OTRO', label: 'Otro' },
];

export const etiquetaSector = (valor) =>
  SECTORES.find((s) => s.value === valor)?.label ?? valor;
