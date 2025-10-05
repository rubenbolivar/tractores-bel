import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, ArrowRight } from 'lucide-react';
import { tractores } from '../data/tractores';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const Comparador = () => {
  const [selectedTractors, setSelectedTractors] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectTractor = (tractor) => {
    if (selectedTractors.find(t => t.id === tractor.id)) {
      setSelectedTractors(selectedTractors.filter(t => t.id !== tractor.id));
    } else if (selectedTractors.length < 3) {
      setSelectedTractors([...selectedTractors, tractor]);
      if (selectedTractors.length === 2) {
        setShowSelector(false);
      }
    }
  };

  const handleRemoveTractor = (tractorId) => {
    setSelectedTractors(selectedTractors.filter(t => t.id !== tractorId));
  };

  const availableTractors = tractores.filter(
    t => !selectedTractors.find(st => st.id === t.id)
  );

  const specs = [
    { key: 'potencia', label: 'Potencia', unit: 'HP' },
    { key: 'precio', label: 'Precio Contado', unit: 'USD', prefix: '$' },
    { key: 'cuotas', label: 'Precio 6 Cuotas', unit: 'USD/mes', prefix: '$' },
  ];

  const motorSpecs = [
    { key: 'motor.marca', label: 'Motor', getValue: (t) => t.motor?.marca },
    { key: 'motor.cilindros', label: 'Cilindros', getValue: (t) => t.motor?.cilindros },
    { key: 'motor.torque', label: 'Torque', getValue: (t) => t.motor?.torque, unit: 'Nm' },
  ];

  const transmisionSpecs = [
    { key: 'transmision.tipo', label: 'Tipo', getValue: (t) => t.transmision?.tipo },
    { key: 'transmision.velocidades', label: 'Velocidades', getValue: (t) => t.transmision?.velocidades },
  ];

  const capacidadesSpecs = [
    { key: 'capacidades.combustible', label: 'Combustible', getValue: (t) => t.capacidades?.combustible, unit: 'L' },
    { key: 'capacidades.aceite', label: 'Aceite Motor', getValue: (t) => t.capacidades?.aceite, unit: 'L' },
    { key: 'capacidades.hidraulico', label: 'Aceite Hidráulico', getValue: (t) => t.capacidades?.hidraulico, unit: 'L' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comparador de Tractores
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona hasta 3 modelos para comparar sus especificaciones técnicas
          </p>
        </motion.div>

        {/* Selector Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[0, 1, 2].map((index) => {
            const tractor = selectedTractors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl border-2 ${
                  tractor ? 'border-bel-green-500' : 'border-dashed border-gray-300'
                } p-6 min-h-[200px] flex flex-col items-center justify-center`}
              >
                {tractor ? (
                  <>
                    <button
                      onClick={() => handleRemoveTractor(tractor.id)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <img
                      src={tractor.imageUrl}
                      alt={tractor.modelo}
                      className="w-full h-32 object-contain mb-4"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600';
                      }}
                    />
                    <h3 className="font-bold text-xl text-gray-900">{tractor.modelo}</h3>
                    <p className="text-bel-green-500 font-semibold">{tractor.subtitulo}</p>
                    <p className="text-gray-600 mt-2">{tractor.potencia} HP</p>
                  </>
                ) : (
                  <button
                    onClick={() => setShowSelector(true)}
                    className="flex flex-col items-center gap-3 text-gray-400 hover:text-bel-green-500 transition-colors"
                  >
                    <Plus size={48} />
                    <span className="font-semibold">Seleccionar Tractor</span>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <AnimatePresence>
          {selectedTractors.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bel-green-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Especificación</th>
                      {selectedTractors.map((tractor) => (
                        <th key={tractor.id} className="px-6 py-4 text-center font-semibold">
                          {tractor.modelo}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Basic Specs */}
                    <tr className="bg-gray-50">
                      <td colSpan={selectedTractors.length + 1} className="px-6 py-3 font-bold text-gray-900">
                        Información General
                      </td>
                    </tr>
                    {specs.map((spec) => (
                      <tr key={spec.key} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-700">{spec.label}</td>
                        {selectedTractors.map((tractor) => (
                          <td key={tractor.id} className="px-6 py-4 text-center text-gray-900">
                            {spec.prefix || ''}{tractor[spec.key]?.toLocaleString()} {spec.unit || ''}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Motor */}
                    <tr className="bg-gray-50">
                      <td colSpan={selectedTractors.length + 1} className="px-6 py-3 font-bold text-gray-900">
                        Motor
                      </td>
                    </tr>
                    {motorSpecs.map((spec) => (
                      <tr key={spec.key} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-700">{spec.label}</td>
                        {selectedTractors.map((tractor) => (
                          <td key={tractor.id} className="px-6 py-4 text-center text-gray-900">
                            {spec.getValue(tractor)} {spec.unit || ''}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Transmisión */}
                    <tr className="bg-gray-50">
                      <td colSpan={selectedTractors.length + 1} className="px-6 py-3 font-bold text-gray-900">
                        Transmisión
                      </td>
                    </tr>
                    {transmisionSpecs.map((spec) => (
                      <tr key={spec.key} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-700">{spec.label}</td>
                        {selectedTractors.map((tractor) => (
                          <td key={tractor.id} className="px-6 py-4 text-center text-gray-900">
                            {spec.getValue(tractor)} {spec.unit || ''}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Capacidades */}
                    <tr className="bg-gray-50">
                      <td colSpan={selectedTractors.length + 1} className="px-6 py-3 font-bold text-gray-900">
                        Capacidades
                      </td>
                    </tr>
                    {capacidadesSpecs.map((spec) => (
                      <tr key={spec.key} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-700">{spec.label}</td>
                        {selectedTractors.map((tractor) => (
                          <td key={tractor.id} className="px-6 py-4 text-center text-gray-900">
                            {spec.getValue(tractor)} {spec.unit || ''}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Applications */}
                    <tr className="bg-gray-50">
                      <td colSpan={selectedTractors.length + 1} className="px-6 py-3 font-bold text-gray-900">
                        Aplicaciones
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">Usos Principales</td>
                      {selectedTractors.map((tractor) => (
                        <td key={tractor.id} className="px-6 py-4 text-center">
                          <ul className="text-sm text-gray-700 space-y-1">
                            {tractor.aplicaciones?.slice(0, 3).map((app, idx) => (
                              <li key={idx}>• {app}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    {/* Action Buttons */}
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-700">Acciones</td>
                      {selectedTractors.map((tractor) => (
                        <td key={tractor.id} className="px-6 py-4 text-center">
                          <Button
                            as={Link}
                            to={`/tractor/${tractor.id}`}
                            size="sm"
                            variant="outline"
                          >
                            Ver Detalles
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {selectedTractors.length < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">
              Selecciona al menos 2 tractores para comenzar la comparación
            </p>
          </motion.div>
        )}
      </div>

      {/* Tractor Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Selecciona un Tractor</h2>
                <button
                  onClick={() => setShowSelector(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableTractors.map((tractor) => (
                    <motion.button
                      key={tractor.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectTractor(tractor)}
                      className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-bel-green-500 transition-colors text-left"
                    >
                      <img
                        src={tractor.imageUrl}
                        alt={tractor.modelo}
                        className="w-full h-32 object-contain mb-3"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600';
                        }}
                      />
                      <h3 className="font-bold text-lg text-gray-900">{tractor.modelo}</h3>
                      <p className="text-bel-green-500 font-semibold text-sm">{tractor.subtitulo}</p>
                      <p className="text-gray-600 mt-2">{tractor.potencia} HP</p>
                      <p className="text-gray-900 font-bold mt-2">${tractor.precio.toLocaleString()}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
