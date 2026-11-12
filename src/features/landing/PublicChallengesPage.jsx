import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Icon } from '@/components/common';
import { springApi } from '@/services/apiClient';

const STATUS_MAP = {
  EN_CONVOCATORIA: { label: 'En Convocatoria', color: 'primary' },
  RADICADO: { label: 'En Convocatoria', color: 'primary' },
  EN_DESARROLLO: { label: 'En Desarrollo', color: 'tertiary' },
  ASIGNADO: { label: 'En Desarrollo', color: 'tertiary' },
  FINALIZADO: { label: 'Finalizado', color: 'primary' },
  APLAZADO: { label: 'Aplazado', color: 'neutral' },
  CANCELADO: { label: 'Cancelado', color: 'neutral' },
};

export const PublicChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODAS');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    springApi
      .get('/api/retos')
      .then((response) => {
        if (!isMounted) return;
        const data = Array.isArray(response.data) ? response.data : [];
        setChallenges(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('[PublicChallengesPage] Error al cargar retos públicos:', err);
        setError('No se pudo cargar el catálogo público de retos en este momento.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(
      challenges
        .map((c) => c.nombreCategoria)
        .filter((cat) => typeof cat === 'string' && cat.trim().length > 0)
    );
    return ['TODAS', ...Array.from(unique)];
  }, [challenges]);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((c) => {
      const matchesCategory =
        selectedCategory === 'TODAS' || c.nombreCategoria === selectedCategory;
      const query = searchTerm.trim().toLowerCase();
      if (!query) return matchesCategory;
      const matchesSearch =
        (c.nombre && c.nombre.toLowerCase().includes(query)) ||
        (c.descripcion && c.descripcion.toLowerCase().includes(query)) ||
        (c.nombreEmpresa && c.nombreEmpresa.toLowerCase().includes(query)) ||
        (c.nombreCategoria && c.nombreCategoria.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [challenges, selectedCategory, searchTerm]);

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-14 space-y-10">
      {/* Encabezado de Vitrina Pública */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-caption font-bold uppercase tracking-widest text-tertiary hover:underline mb-3"
          >
            <Icon name="arrow_back" size="sm" />
            Volver al inicio
          </Link>
          <h1 className="text-headline-xl font-headline-xl text-on-surface font-bold">
            Vitrina Pública de Retos
          </h1>
          <p className="text-body-md text-on-surface-variant mt-2 max-w-2xl">
            Explora los desafíos de innovación abierta publicados por empresas aliadas.
            Vista de solo lectura; inicia sesión en la plataforma para postular tu solución.
          </p>
        </div>

        <Link to="/login">
          <Button variant="solid" size="md" iconRight={<Icon name="login" />}>
            Iniciar sesión para postular
          </Button>
        </Link>
      </div>

      {/* Controles de Búsqueda y Filtro por Categoría */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-surface-container-low p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título, empresa o categoría..."
            className="w-full h-11 pl-4 pr-10 rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline text-body-sm border border-white/10 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="category-filter"
            className="text-caption font-bold uppercase tracking-wider text-on-surface-variant whitespace-nowrap"
          >
            Categoría:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-11 px-4 rounded-xl bg-surface-container-high text-on-surface text-body-sm border border-white/10 focus:outline-none focus:border-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'TODAS' ? 'Todas las categorías' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Estado de Carga */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div
              key={skeleton}
              className="h-72 rounded-3xl bg-surface-container-low border border-white/5 p-6 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-6 w-1/3 bg-white/10 rounded" />
                <div className="h-7 w-3/4 bg-white/10 rounded" />
                <div className="h-16 w-full bg-white/5 rounded" />
              </div>
              <div className="h-10 w-full bg-white/10 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Estado de Error */}
      {!loading && error && (
        <div className="bg-surface-container-low rounded-3xl border border-red-500/30 p-8 text-center space-y-4">
          <p className="text-body-md text-red-400 font-medium">{error}</p>
          <p className="text-body-sm text-on-surface-variant">
            Verifica que el servidor backend en el puerto 8080 esté activo.
          </p>
        </div>
      )}

      {/* Listado de Tarjetas (Solo Lectura) */}
      {!loading && !error && filteredChallenges.length === 0 && (
        <div className="bg-surface-container-low rounded-3xl border border-white/5 p-12 text-center space-y-3">
          <h3 className="text-headline-sm font-bold text-on-surface">
            No se encontraron retos disponibles
          </h3>
          <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
            No hay convocatorias activas que coincidan con los criterios seleccionados.
          </p>
        </div>
      )}

      {!loading && !error && filteredChallenges.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((reto) => {
            const st = STATUS_MAP[reto.estadoActual] || STATUS_MAP.EN_CONVOCATORIA;
            return (
              <article
                key={reto.id}
                className="bg-surface-container-low rounded-3xl border border-white/5 p-6 flex flex-col justify-between hover:border-primary-container/40 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant={st.color} withDot size="sm">
                      {st.label}
                    </Badge>
                    <span className="text-caption font-caption text-outline">
                      Cierre: {reto.fechaFin || 'Por definir'}
                    </span>
                  </div>

                  <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold mb-2">
                    {reto.nombre}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded text-caption font-caption bg-surface-container-high text-tertiary">
                      {reto.nombreCategoria || 'Innovación Abierta'}
                    </span>
                    {reto.nombreEmpresa && (
                      <span className="inline-block px-2.5 py-0.5 rounded text-caption font-caption bg-white/5 text-on-surface-variant">
                        {reto.nombreEmpresa}
                      </span>
                    )}
                  </div>

                  <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed line-clamp-4">
                    {reto.descripcion}
                  </p>
                </div>

                {/* Acción única de Solo Lectura -> Postularse redirige a /login */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-caption text-outline">
                    Prioridad: {reto.nombrePrioridad || 'Estándar'}
                  </span>
                  <Link to="/login">
                    <Button
                      variant="solid"
                      size="sm"
                      iconRight={<Icon name="arrow_forward" />}
                    >
                      Postularse
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default PublicChallengesPage;

