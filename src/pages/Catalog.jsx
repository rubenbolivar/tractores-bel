import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { tractores } from '../data/tractores';
import { TractorCard } from '../components/catalog/TractorCard';
import { Button } from '../components/common/Button';

export const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [filtros, setFiltros] = useState({
    categoria: '',
    potenciaMin: 0,
    potenciaMax: 250,
    precioMax: 150000,
    entregaInmediata: false
  });

  // Leer parámetros URL al cargar
  useEffect(() => {
    const categoriaParam = searchParams.get('categoria');
    if (categoriaParam) {
      setFiltros(prev => ({ ...prev, categoria: categoriaParam }));
    }
  }, [searchParams]);

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const tractoresFiltrados = useMemo(() => {
    return tractores.filter(tractor => {
      if (filtros.categoria && tractor.categoria !== filtros.categoria) return false;
      if (tractor.potencia < filtros.potenciaMin) return false;
      if (tractor.potencia > filtros.potenciaMax) return false;
      if (tractor.precio > filtros.precioMax) return false;
      if (filtros.entregaInmediata && !tractor.entregaInmediata) return false;
      return true;
    });
  }, [filtros]);

  const categorias = [...new Set(tractores.map(t => t.categoria))];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Catálogo de Tractores
          </h1>
          <p className="text-xl text-gray-600">
            {tractoresFiltrados.length} tractores disponibles
          </p>
        </motion.div>

        {/* Filtros Mobile Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="w-full"
          >
            <Filter size={20} />
            {mostrarFiltros ? 'Ocultar' : 'Mostrar'} Filtros
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtros */}
          <div className={`lg:block ${mostrarFiltros ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
              <div className="flex justify-center mb-6">
                <img
                  src="/assets/mundo-bel-logo.png"
                  alt="Mundo Bel"
                  className="h-16 w-auto"
                />
              </div>
              <h3 className="font-display text-xl font-bold mb-6">Filtros</h3>

              {/* Categoría */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={filtros.categoria}
                  onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bel-green-500"
                >
                  <option value="">Todas</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Potencia */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Potencia (HP)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filtros.potenciaMin}
                    onChange={(e) => setFiltros({ ...filtros, potenciaMin: Number(e.target.value) })}
                    className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bel-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filtros.potenciaMax}
                    onChange={(e) => setFiltros({ ...filtros, potenciaMax: Number(e.target.value) })}
                    className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bel-green-500"
                  />
                </div>
              </div>

              {/* Precio Máximo */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio máximo: ${filtros.precioMax.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="150000"
                  step="5000"
                  value={filtros.precioMax}
                  onChange={(e) => setFiltros({ ...filtros, precioMax: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Entrega Inmediata */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filtros.entregaInmediata}
                    onChange={(e) => setFiltros({ ...filtros, entregaInmediata: e.target.checked })}
                    className="w-4 h-4 text-bel-green-500 focus:ring-bel-green-500 rounded"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Solo entrega inmediata
                  </span>
                </label>
              </div>

              {/* Reset */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setFiltros({
                  categoria: '',
                  potenciaMin: 0,
                  potenciaMax: 250,
                  precioMax: 150000,
                  entregaInmediata: false
                })}
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Grid de Tractores */}
          <div className="lg:col-span-3">
            {tractoresFiltrados.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">
                  No se encontraron tractores con los filtros seleccionados
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tractoresFiltrados.map((tractor, index) => (
                  <motion.div
                    key={tractor.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TractorCard tractor={tractor} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
