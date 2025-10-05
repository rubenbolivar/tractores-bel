import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, CreditCard, Percent, TrendingDown } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const Financiamiento = () => {
  const [monto, setMonto] = useState(20000);
  const [modalidad, setModalidad] = useState('cuotas');

  // Cálculos
  const igtf = 0.03; // 3%
  const montoConIGTF = monto * (1 + igtf);
  const cuotaMensual = monto / 6;

  const planes = [
    {
      titulo: '6 Cuotas Sin Interés',
      descripcion: 'Paga tu tractor en 6 meses sin intereses',
      icono: CreditCard,
      monto: cuotaMensual,
      total: monto,
      ventajas: [
        'Sin intereses',
        'Sin comisiones',
        'Aprobación rápida',
        'Sin requisitos complejos'
      ]
    },
    {
      titulo: 'Pago de Contado + IGTF',
      descripcion: 'Paga en una sola exhibición y ahorra',
      icono: DollarSign,
      monto: montoConIGTF,
      total: montoConIGTF,
      ventajas: [
        'Precio preferencial',
        'Entrega inmediata',
        'Sin trámites de financiamiento',
        'IGTF del 3% incluido'
      ]
    }
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
            Opciones de Financiamiento
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Facilitamos la compra de tu tractor con planes flexibles de pago
          </p>
        </motion.div>

        {/* Calculadora */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-bel-green-500" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Calcula tu Financiamiento</h2>
          </div>

          {/* Monto Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monto del Tractor (USD)
            </label>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bel-green-500"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">$10,000</span>
              <span className="text-2xl font-bold text-bel-green-500">
                ${monto.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">$100,000</span>
            </div>
          </div>

          {/* Modalidad */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Modalidad de Pago
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setModalidad('cuotas')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  modalidad === 'cuotas'
                    ? 'border-bel-green-500 bg-bel-green-50'
                    : 'border-gray-200 hover:border-bel-green-300'
                }`}
              >
                <CreditCard className={`mb-2 ${modalidad === 'cuotas' ? 'text-bel-green-500' : 'text-gray-400'}`} size={24} />
                <div className="font-semibold text-gray-900">6 Cuotas</div>
                <div className="text-sm text-gray-600">Sin interés</div>
              </button>
              <button
                onClick={() => setModalidad('contado')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  modalidad === 'contado'
                    ? 'border-bel-green-500 bg-bel-green-50'
                    : 'border-gray-200 hover:border-bel-green-300'
                }`}
              >
                <DollarSign className={`mb-2 ${modalidad === 'contado' ? 'text-bel-green-500' : 'text-gray-400'}`} size={24} />
                <div className="font-semibold text-gray-900">Contado</div>
                <div className="text-sm text-gray-600">+ IGTF 3%</div>
              </button>
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-bel-green-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modalidad === 'cuotas' ? (
                <>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Cuota Mensual</div>
                    <div className="text-3xl font-bold text-bel-green-500">
                      ${cuotaMensual.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">6 cuotas sin interés</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total a Pagar</div>
                    <div className="text-3xl font-bold text-gray-900">
                      ${monto.toLocaleString()}
                    </div>
                    <div className="text-sm text-bel-green-500 mt-1">Sin intereses</div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Monto Base</div>
                    <div className="text-3xl font-bold text-gray-900">
                      ${monto.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total con IGTF (3%)</div>
                    <div className="text-3xl font-bold text-bel-green-500">
                      ${montoConIGTF.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      + ${(monto * igtf).toLocaleString()} IGTF
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {planes.map((plan, index) => {
            const Icon = plan.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-bel-green-500 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-bel-green-100 rounded-xl">
                    <Icon className="text-bel-green-500" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.titulo}</h3>
                    <p className="text-sm text-gray-600">{plan.descripcion}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-1">
                    {index === 0 ? 'Cuota Mensual' : 'Pago Único'}
                  </div>
                  <div className="text-4xl font-bold text-bel-green-500">
                    ${plan.monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-sm font-semibold text-gray-700">Ventajas:</div>
                  {plan.ventajas.map((ventaja, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-bel-green-500 rounded-full" />
                      <span className="text-sm text-gray-600">{ventaja}</span>
                    </div>
                  ))}
                </div>

                <Button as={Link} to="/quiz" className="w-full">
                  Solicitar Cotización
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Información Adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Requisitos para Financiamiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Documentos Necesarios:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">•</span>
                  <span>Cédula de identidad o RIF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">•</span>
                  <span>Registro mercantil (persona jurídica)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">•</span>
                  <span>Comprobante de domicilio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">•</span>
                  <span>Referencias bancarias</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Proceso Rápido:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">1.</span>
                  <span>Solicita tu cotización en línea</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">2.</span>
                  <span>Nuestro asesor te contacta en 24h</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">3.</span>
                  <span>Aprobación en 48-72 horas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bel-green-500 mt-1">4.</span>
                  <span>Entrega programada del tractor</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-bel-yellow/10 border-l-4 border-bel-yellow rounded">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> El IGTF (Impuesto a las Grandes Transacciones Financieras) del 3%
              aplica únicamente a pagos de contado en divisas según normativa vigente del SENIAT.
            </p>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Tienes dudas sobre el financiamiento?
          </h3>
          <p className="text-gray-600 mb-6">
            Contacta a nuestro equipo de asesores para una cotización personalizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} to="/contacto" size="lg">
              Hablar con un Asesor
            </Button>
            <Button as={Link} to="/catalogo" variant="outline" size="lg">
              Ver Tractores
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
