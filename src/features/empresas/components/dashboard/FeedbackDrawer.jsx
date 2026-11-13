// src/features/empresas/components/dashboard/FeedbackDrawer.jsx
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/features/auth/useAuth';

const STORAGE_KEY = 'cesde_feedback_thread_v1';
const MAX_FILE_MB = 10;
const MAX_CHARS = 1000;
const ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt,.zip,.png,.jpg,.jpeg';

const ROL_LABEL = {
  ADMIN_UNIVERSIDAD: 'Administrador CESDE',
  REPRESENTANTE_EMPRESA: 'Representante de empresa',
  ESTUDIANTE: 'Estudiante',
};

/** Conversación de ejemplo (la que ya mostraba el diseño). */
const SEED = [
  {
    id: 'seed-1',
    autor: 'Mg. Carlos Arango',
    rol: 'Docente Asesor CESDE',
    iniciales: 'Prof',
    tono: 'docente',
    mine: false,
    hora: 'Ayer, 4:20 PM',
    texto:
      'Hola equipo NovaLogistics. Revisamos los requerimientos técnicos del reto de eCommerce con IA. Sugerimos liberar una muestra anonimizada del dataset de ventas para que los estudiantes validen los modelos en el Sprint 1.',
  },
  {
    id: 'seed-2',
    autor: 'NovaLogistics (Tú)',
    rol: 'Líder de Innovación',
    iniciales: 'NL',
    tono: 'empresa',
    mine: true,
    hora: 'Hoy, 9:15 AM',
    texto:
      'Excelente punto Carlos. Ya preparamos un CSV anonimizado con 45,000 registros y el esquema de atributos de demanda. Lo adjuntamos aquí para que el equipo preseleccionado lo descargue.',
    adjunto: { name: 'dataset_muestra_ecommerce_v1.csv', size: 2516582 },
  },
  {
    id: 'seed-3',
    autor: 'Sara Trujillo',
    rol: "Líder Equipo 'NeuralSync' CESDE",
    iniciales: 'ST',
    tono: 'estudiante',
    mine: false,
    hora: 'Hace 2 horas',
    texto:
      '¡Recibido! Nuestro equipo ya inició la exploración exploratoria (EDA). ¿La métrica objetivo principal será RMSE o prefieren optimizar F1-Score en rotación de inventario crítico?',
  },
];

const AVATAR_CLASSES = {
  docente: 'bg-secondary-container text-secondary',
  empresa: 'bg-primary-container text-on-primary-container',
  estudiante: 'bg-tertiary-container text-tertiary',
};

const cargarHilo = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const guardado = raw ? JSON.parse(raw) : null;
    return Array.isArray(guardado) && guardado.length > 0 ? guardado : SEED;
  } catch {
    return SEED;
  }
};

const formatearTamano = (bytes = 0) => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

const nuevoId = () => `c-${Date.now()}`;

const horaActual = () =>
  `Hoy, ${new Date().toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' })}`;

const iniciales = (nombre = '') =>
  nombre
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('') || 'US';

export const FeedbackDrawer = () => {
  const { user } = useAuth();
  const [comentarios, setComentarios] = useState(cargarHilo);
  const [texto, setTexto] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState('');
  const [abierto, setAbierto] = useState(true);
  // ids de comentarios cuyo archivo sigue disponible en memoria (para poder descargarlo)
  const [descargables, setDescargables] = useState([]);

  const inputArchivoRef = useRef(null);
  const listaRef = useRef(null);
  // Los File reales viven solo en memoria (localStorage no guarda archivos): id -> File
  const archivosRef = useRef({});

  // Persistir el hilo (solo texto + metadatos del adjunto)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comentarios));
    } catch {
      /* almacenamiento lleno o bloqueado: se ignora */
    }
  }, [comentarios]);

  // Bajar al último mensaje cuando llega uno nuevo
  useEffect(() => {
    if (listaRef.current) listaRef.current.scrollTop = listaRef.current.scrollHeight;
  }, [comentarios, abierto]);

  const nombreAutor =
    user?.empresa?.nombre || user?.nombreCompleto || user?.nombre_completo || user?.email || 'Tú';

  const elegirArchivo = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // permite volver a elegir el mismo archivo
    if (!file) return;

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`El archivo supera el máximo de ${MAX_FILE_MB} MB.`);
      return;
    }
    setError('');
    setArchivo(file);
  };

  const enviar = () => {
    const limpio = texto.trim();
    if (!limpio && !archivo) {
      setError('Escribe un comentario o adjunta un archivo antes de enviar.');
      return;
    }

    const id = nuevoId();
    if (archivo) {
      archivosRef.current[id] = archivo;
      setDescargables((prev) => [...prev, id]);
    }

    const nuevo = {
      id,
      autor: `${nombreAutor} (Tú)`,
      rol: ROL_LABEL[user?.rol] || 'Usuario',
      iniciales: iniciales(nombreAutor),
      tono: 'empresa',
      mine: true,
      hora: horaActual(),
      texto: limpio,
      ...(archivo ? { adjunto: { name: archivo.name, size: archivo.size } } : {}),
    };

    setComentarios((prev) => [...prev, nuevo]);
    setTexto('');
    setArchivo(null);
    setError('');
  };

  const descargar = (comentario) => {
    const file = archivosRef.current[comentario.id];
    if (!file) return; // adjuntos de ejemplo o de sesiones anteriores
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      enviar();
    }
  };

  return (
    <div className="bg-surface-container-low rounded-3xl border border-primary-container/20 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className={`flex items-start justify-between ${abierto ? 'pb-4 border-b border-white/10' : ''}`}>
        <div>
          <div className="flex items-center gap-1.5 text-primary text-caption font-caption font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">forum</span>
            Feedback & Retroalimentación
          </div>
          <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold mt-1 line-clamp-1">
            Optimización eCommerce IA
          </h3>
          <p className="text-caption font-caption text-outline">Hilo sincronizado con Tutores y Postulantes</p>
        </div>
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          title={abierto ? 'Contraer' : 'Expandir'}
        >
          <span className="material-symbols-outlined text-lg">{abierto ? 'close' : 'open_in_full'}</span>
        </button>
      </div>

      {abierto && (
        <>
          {/* Historial */}
          <div
            ref={listaRef}
            aria-live="polite"
            className="flex flex-col gap-4 py-4 max-h-[380px] overflow-y-auto custom-scrollbar pr-1"
          >
            {comentarios.map((c) => (
              <div
                key={c.id}
                className={`flex flex-col gap-1.5 p-3.5 rounded-2xl border ${
                  c.mine
                    ? 'bg-primary-container/10 border-primary-container/20 ml-2'
                    : 'bg-surface-container/70 border-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        AVATAR_CLASSES[c.tono] || AVATAR_CLASSES.docente
                      }`}
                    >
                      {c.iniciales}
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`text-label-md font-label-md font-semibold block truncate ${
                          c.mine ? 'text-primary' : 'text-on-surface'
                        }`}
                      >
                        {c.autor}
                      </span>
                      <span className="text-caption font-caption text-on-surface-variant block -mt-1 truncate">
                        {c.rol}
                      </span>
                    </div>
                  </div>
                  <span className="text-caption font-caption text-outline shrink-0">{c.hora}</span>
                </div>

                {c.texto && (
                  <p
                    className={`text-body-sm font-body-sm mt-1 whitespace-pre-wrap break-words ${
                      c.mine ? 'text-on-surface' : 'text-on-surface-variant'
                    }`}
                  >
                    {c.texto}
                  </p>
                )}

                {c.adjunto && (
                  <button
                    type="button"
                    onClick={() => descargar(c)}
                    title={
                      descargables.includes(c.id)
                        ? 'Descargar archivo'
                        : 'Archivo de ejemplo (no disponible para descarga)'
                    }
                    className="mt-2 inline-flex items-center gap-2 px-2.5 py-1.5 bg-surface-container-low rounded-lg text-caption font-caption text-on-surface border border-white/10 hover:border-primary-container/40 transition-colors cursor-pointer w-fit max-w-full"
                  >
                    <span className="material-symbols-outlined text-primary text-base">attach_file</span>
                    <span className="truncate">
                      {c.adjunto.name} ({formatearTamano(c.adjunto.size)})
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Formulario */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <label htmlFor="feedback-texto" className="text-caption font-caption text-outline font-medium">
              Responder o dar retroalimentación:
            </label>
            <textarea
              id="feedback-texto"
              value={texto}
              onChange={(e) => {
                setTexto(e.target.value.slice(0, MAX_CHARS));
                if (error) setError('');
              }}
              onKeyDown={onKeyDown}
              className="w-full bg-surface-container rounded-xl p-3 border border-white/10 text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container resize-none transition-all"
              placeholder="Escribe una instrucción, ajuste de requisitos o retroalimentación técnica..."
              rows={3}
            />

            {archivo && (
              <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-surface-container rounded-lg text-caption font-caption text-on-surface border border-primary-container/30 w-fit max-w-full">
                <span className="material-symbols-outlined text-primary text-base">description</span>
                <span className="truncate">
                  {archivo.name} ({formatearTamano(archivo.size)})
                </span>
                <button
                  type="button"
                  onClick={() => setArchivo(null)}
                  aria-label="Quitar archivo adjunto"
                  className="text-outline hover:text-error transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            )}

            {error && (
              <p role="alert" className="text-caption font-caption text-error">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between gap-2">
              <input
                ref={inputArchivoRef}
                type="file"
                accept={ACCEPT}
                onChange={elegirArchivo}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => inputArchivoRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface-variant hover:text-on-surface text-caption font-caption font-semibold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">attach_file</span>
                <span>Adjuntar Guía / Briefing</span>
              </button>
              <button
                type="button"
                onClick={enviar}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-md shadow-primary-container/20 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              >
                <span>Enviar Comentario</span>
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
            <p className="text-caption font-caption text-outline">
              Máx. {MAX_FILE_MB} MB por archivo · Ctrl + Enter para enviar
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackDrawer;
