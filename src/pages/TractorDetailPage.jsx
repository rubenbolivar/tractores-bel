import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Settings, TrendingUp, Ruler } from 'lucide-react';
import { tractores } from '../data/tractores';
import { formatearPrecio } from '../utils/recommendations';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { WhatsAppCTA } from '../components/contact/WhatsAppCTA';
import { Calculator } from '../components/financing/Calculator';

export const TractorDetailPage = () => {
  const { id } = useParams();
  const tractor = tractores.find(t => t.id === id);
  const [tabActiva, setTabActiva] = useState('resumen');

  if (!tractor) {
    return (
      <div className="pt-24 pb-20 container-custom text-center">
        <h1 className="text-3xl font-bold">Tractor no encontrado</h1>
        <Link to="/catalogo" className="text-bel-green-500 hover:underline mt-4 inline-block">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'especificaciones', label: 'Especificaciones' },
    { id: 'financiamiento', label: 'Financiamiento' }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-bel-green-500">Inicio</Link>
          <ChevronRight size={16} />
          <Link to="/catalogo" className="hover:text-bel-green-500">Catálogo</Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-semibold">{tractor.modelo}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal */}
          <div className="lg:col-span-2">
            {/* Imagen Principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg mb-6"
            >
              <div className="relative h-96">
                <img
                  src={tractor.imageUrl}
                  alt={`Tractor ${tractor.modelo}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800';
                  }}
                />
                {tractor.entregaInmediata && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="yellow">Entrega Inmediata</Badge>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Título y Specs Básicas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg mb-6"
            >
              <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
                {tractor.modelo}
              </h1>
              {tractor.subtitulo && (
                <p className="text-xl text-bel-green-500 font-semibold mb-4">
                  {tractor.subtitulo}
                </p>
              )}
              <Badge variant="primary">{tractor.categoria}</Badge>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Zap className="mx-auto mb-2 text-bel-yellow" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{tractor.potencia}</div>
                  <div className="text-sm text-gray-600">HP</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Settings className="mx-auto mb-2 text-bel-green-500" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{tractor.transmision.velocidades}</div>
                  <div className="text-sm text-gray-600">Velocidades</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="mx-auto mb-2 text-blue-500" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{tractor.capacidades.levante}</div>
                  <div className="text-sm text-gray-600">Kg levante</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Ruler className="mx-auto mb-2 text-orange-500" size={32} />
                  <div className="text-2xl font-bold text-gray-900">{tractor.hectareasMin}-{tractor.hectareasMax}</div>
                  <div className="text-sm text-gray-600">Hectáreas</div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex border-b border-gray-200">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTabActiva(tab.id)}
                    className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                      tabActiva === tab.id
                        ? 'bg-bel-green-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {tabActiva === 'resumen' && (
                  <div>
                    <h3 className="font-display text-xl font-bold mb-4">Aplicaciones</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tractor.aplicaciones.map((app, idx) => (
                        <Badge key={idx} variant="outline">{app}</Badge>
                      ))}
                    </div>

                    <h3 className="font-display text-xl font-bold mb-4">Características Destacadas</h3>
                    <ul className="space-y-2">
                      {tractor.caracteristicas.map((car, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-bel-green-500 mt-1">✓</span>
                          <span className="text-gray-700">{car}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tabActiva === 'especificaciones' && (
                  <div className="space-y-6">
                    {/* Motor */}
                    <div>
                      <h3 className="font-display text-xl font-bold mb-3">Motor</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Modelo</div>
                          <div className="font-semibold">{tractor.motor.modelo}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tipo</div>
                          <div className="font-semibold">{tractor.motor.tipo}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Cilindros</div>
                          <div className="font-semibold">{tractor.motor.cilindros}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Aspiración</div>
                          <div className="font-semibold">{tractor.motor.aspiracion}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Torque</div>
                          <div className="font-semibold">{tractor.motor.torque} Nm @ {tractor.motor.torqueRpm} RPM</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tanque</div>
                          <div className="font-semibold">{tractor.motor.capacidadTanque}L</div>
                        </div>
                      </div>
                    </div>

                    {/* Transmisión */}
                    <div>
                      <h3 className="font-display text-xl font-bold mb-3">Transmisión</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Tipo</div>
                          <div className="font-semibold">{tractor.transmision.tipo}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Velocidades</div>
                          <div className="font-semibold">{tractor.transmision.velocidades}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Tracción</div>
                          <div className="font-semibold">{tractor.transmision.traccion}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Embrague</div>
                          <div className="font-semibold">{tractor.transmision.embrague}</div>
                        </div>
                      </div>
                    </div>

                    {/* Capacidades */}
                    <div>
                      <h3 className="font-display text-xl font-bold mb-3">Capacidades</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Levante</div>
                          <div className="font-semibold">{tractor.capacidades.levante} kg</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Arrastre</div>
                          <div className="font-semibold">{tractor.capacidades.arrastre} kg</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Peso Neto</div>
                          <div className="font-semibold">{tractor.capacidades.pesoNeto} kg</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">TDF</div>
                          <div className="font-semibold">{tractor.capacidades.tomaDeFuerza.hp} HP @ {tractor.capacidades.tomaDeFuerza.rpm} RPM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {tabActiva === 'financiamiento' && (
                  <Calculator tractor={tractor} />
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Precio */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="font-display text-xl font-bold mb-4">Precio</h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-bel-green-500 mb-1">
                    {formatearPrecio(tractor.cuotas)}/mes
                  </div>
                  <div className="text-sm text-gray-600">
                    {tractor.numCuotas} cuotas sin interés
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Total: {formatearPrecio(tractor.precio)}
                  </div>
                </div>
                {tractor.precioContado && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {formatearPrecio(tractor.precioContado)}
                    </div>
                    <div className="text-sm text-gray-600">Pago de contado + IGTF</div>
                  </div>
                )}
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <WhatsAppCTA tractor={tractor} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
