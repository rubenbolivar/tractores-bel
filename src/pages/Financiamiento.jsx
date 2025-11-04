import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  CreditCard, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { planesFinanciamiento, COSTOS_ADICIONALES } from '../data/planesFinanciamiento';
import { FinancingPlanCard } from '../components/financing/FinancingPlanCard';
import { AdvancedCalculator } from '../components/financing/AdvancedCalculator';

export const Financiamiento = () => {
  const [searchParams] = useSearchParams();
  const preSelectedTractorId = searchParams.get('tractor');
  const preSelectedPlanId = searchParams.get('plan');
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCalculator, setShowCalculator] = useState(true);

  // Debug: Verificar que planesFinanciamiento es un array
  console.log('planesFinanciamiento:', planesFinanciamiento);
  console.log('Es array?:', Array.isArray(planesFinanciamiento));
  
  // Filtrar planes (excluir el informativo) - con validación
  const planesActivos = Array.isArray(planesFinanciamiento)
    ? planesFinanciamiento.filter(p => p.tipo !== 'informacion')
    : [];
  const planCostosAdicionales = Array.isArray(planesFinanciamiento)
    ? planesFinanciamiento.find(p => p.tipo === 'informacion')
    : null;

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
            Planes de Financiamiento
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Facilitamos la compra de tu tractor con 7 planes flexibles diseñados para cada necesidad.
            Desde pagos de contado hasta financiamientos a largo plazo.
          </p>
        </motion.div>

        {/* Calculadora Interactiva */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Calculadora Interactiva</h2>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-bel-green-500 hover:text-bel-green-600 font-semibold"
            >
              {showCalculator ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          
          {showCalculator && (
            <AdvancedCalculator 
              preSelectedTractorId={preSelectedTractorId}
              preSelectedPlanId={preSelectedPlanId}
            />
          )}
        </motion.div>

        {/* Todos los Planes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nuestros 7 Planes de Financiamiento
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planesActivos.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <FinancingPlanCard
                  plan={plan}
                  onSelect={setSelectedPlan}
                  isSelected={selectedPlan?.id === plan.id}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Costos Adicionales */}
        {planCostosAdicionales && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="text-bel-yellow" size={28} />
                Costos Adicionales a Considerar
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">IVA</div>
                  <div className="text-3xl font-bold text-gray-900">16%</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Impuesto al Valor Agregado
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">IGTF</div>
                  <div className="text-3xl font-bold text-gray-900">3%</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Solo en pagos de contado en divisas
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Placa/INTT</div>
                  <div className="text-3xl font-bold text-gray-900">$440</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Costo fijo de emplacamiento
                  </div>
                </div>
                
                <div className="p-4 bg-bel-green-50 rounded-xl border-2 border-bel-green-200">
                  <div className="text-sm text-bel-green-700 mb-1">Seguro</div>
                  <div className="text-3xl font-bold text-bel-green-600">Incluido</div>
                  <div className="text-xs text-bel-green-600 mt-2">
                    1 año de cobertura
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-bel-yellow rounded">
                <p className="text-sm text-gray-700">
                  <strong>Importante:</strong> El IVA se aplica a todos los planes. El IGTF solo aplica 
                  en pagos de contado en divisas según normativa SENIAT. La placa es un costo único de 
                  emplacamiento. El seguro está incluido por 1 año en todos los planes.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Beneficios de Financiar con BEL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ¿Por qué Financiar con Tractores BEL?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-bel-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-bel-green-500" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Aprobación Rápida</h3>
              <p className="text-sm text-gray-600">
                Respuesta en 48-72 horas con documentación completa
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-blue-500" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Planes Flexibles</h3>
              <p className="text-sm text-gray-600">
                7 opciones diferentes para adaptarse a tu flujo de caja
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-500" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Seguro Incluido</h3>
              <p className="text-sm text-gray-600">
                Cobertura completa por 1 año sin costo adicional
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-orange-500" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sin Complicaciones</h3>
              <p className="text-sm text-gray-600">
                Proceso simple con asesoría personalizada
              </p>
            </div>
          </div>
        </motion.div>

        {/* Requisitos Generales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Requisitos Generales</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-bel-green-500" />
                  Personas Naturales
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>Cédula de identidad vigente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>Comprobante de domicilio (recibo de servicios)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>Referencias personales y bancarias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>Comprobante de ingresos</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-bel-green-500" />
                  Personas Jurídicas
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>RIF y Registro Mercantil actualizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>Acta constitutiva y estatutos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>Estados financieros recientes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-bel-green-500 mt-1">•</span>
                    <span>Referencias comerciales y bancarias</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-900">
                <strong>Nota:</strong> Los requisitos específicos pueden variar según el plan seleccionado 
                y el monto del financiamiento. Nuestros asesores te guiarán en todo el proceso.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Proceso de Financiamiento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Proceso Simple en 4 Pasos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                numero: '1',
                titulo: 'Solicita',
                descripcion: 'Completa el formulario o contacta a un asesor',
                color: 'bg-bel-green-500'
              },
              {
                numero: '2',
                titulo: 'Evalúa',
                descripcion: 'Revisamos tu solicitud y documentos',
                color: 'bg-blue-500'
              },
              {
                numero: '3',
                titulo: 'Aprueba',
                descripcion: 'Recibe respuesta en 48-72 horas',
                color: 'bg-purple-500'
              },
              {
                numero: '4',
                titulo: 'Disfruta',
                descripcion: 'Recibe tu tractor y comienza a trabajar',
                color: 'bg-orange-500'
              }
            ].map((paso, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className={`w-16 h-16 ${paso.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}>
                    {paso.numero}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{paso.titulo}</h3>
                  <p className="text-sm text-gray-600">{paso.descripcion}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center bg-gradient-to-br from-bel-green-500 to-bel-green-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            ¿Listo para Adquirir tu Tractor?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Nuestros asesores están listos para ayudarte a encontrar el plan perfecto 
            para tu negocio. Contáctanos ahora y obtén una cotización personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              to="/contacto" 
              size="lg"
              className="bg-white text-bel-green-500 hover:bg-gray-100"
            >
              <Phone size={20} />
              Hablar con un Asesor
            </Button>
            <Button 
              as={Link} 
              to="/catalogo" 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Ver Catálogo de Tractores
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
