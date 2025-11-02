import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Share2
} from 'lucide-react';
import { tractores } from '../../data/tractores';
import { planesFinanciamiento } from '../../data/planesFinanciamiento';
import { asesores } from '../../data/asesores';
import { Button } from '../common/Button';
import { WhatsAppCTA } from '../contact/WhatsAppCTA';
import { downloadFinancingPDF, shareViaWhatsApp } from '../../utils/pdfGenerator';
import { useGeolocation } from '../../hooks/useGeolocation';

export const AdvancedCalculator = ({ preSelectedTractorId = null, preSelectedPlanId = null }) => {
  const [selectedTractor, setSelectedTractor] = useState(
    preSelectedTractorId ? tractores.find(t => t.id === preSelectedTractorId) : tractores[0]
  );
  const [selectedPlan, setSelectedPlan] = useState(
    preSelectedPlanId
      ? planesFinanciamiento.find(p => p.id === preSelectedPlanId)
      : planesFinanciamiento[0]
  );
  const [customInicial, setCustomInicial] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [calculation, setCalculation] = useState(null);
  
  // Obtener asesor regional
  const { estado } = useGeolocation();
  const asesor = asesores.find(a => a.estado === estado) || asesores[0];

  // Recalcular cuando cambian tractor o plan
  useEffect(() => {
    if (selectedTractor && selectedPlan && selectedPlan.calcular) {
      const precioBase = selectedTractor.precio;
      const result = selectedPlan.calcular(precioBase);
      setCalculation(result);
    }
  }, [selectedTractor, selectedPlan, customInicial]);

  const handleInicialChange = (value) => {
    setCustomInicial(value);
    // Aquí podrías recalcular con inicial personalizada si el plan lo permite
  };

  const formatCurrency = (value) => {
    return `$${value?.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const generatePaymentSchedule = () => {
    if (!calculation) return [];
    
    const schedule = [];
    
    if (selectedPlan.tipo === 'fraccionado' && calculation.cuotas) {
      for (let i = 1; i <= calculation.cuotas; i++) {
        schedule.push({
          numero: i,
          monto: calculation.cuotaMensual,
          tipo: i === calculation.cuotas ? 'Bs' : 'USD',
          concepto: `Cuota ${i}`
        });
      }
    } else if (selectedPlan.tipo === 'financiado' && calculation.cuotas) {
      if (calculation.inicial) {
        schedule.push({
          numero: 0,
          monto: calculation.inicial,
          tipo: 'USD',
          concepto: 'Inicial'
        });
      }
      for (let i = 1; i <= calculation.cuotas; i++) {
        schedule.push({
          numero: i,
          monto: calculation.cuotaMensual || calculation.cuotaRegular,
          tipo: 'USD',
          concepto: `Cuota ${i}`
        });
      }
      if (calculation.cuotasEspeciales) {
        for (let i = 1; i <= calculation.cuotasEspeciales; i++) {
          schedule.push({
            numero: calculation.cuotas + i,
            monto: calculation.cuotaEspecial,
            tipo: 'USD',
            concepto: `Cuota Especial ${i}`
          });
        }
      }
    }
    
    return schedule;
  };

  const paymentSchedule = generatePaymentSchedule();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-bel-green-100 rounded-xl">
          <Calculator className="text-bel-green-500" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calculadora Interactiva</h2>
          <p className="text-sm text-gray-600">Personaliza tu plan de financiamiento</p>
        </div>
      </div>

      {/* Selección de Tractor */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Selecciona tu Tractor
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tractores.map((tractor) => (
            <button
              key={tractor.id}
              onClick={() => setSelectedTractor(tractor)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedTractor?.id === tractor.id
                  ? 'border-bel-green-500 bg-bel-green-50'
                  : 'border-gray-200 hover:border-bel-green-300'
              }`}
            >
              <div className="font-bold text-gray-900">{tractor.modelo}</div>
              <div className="text-sm text-gray-600">{tractor.potencia} HP</div>
              <div className="text-lg font-bold text-bel-green-500 mt-1">
                {formatCurrency(tractor.precio)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selección de Plan */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Selecciona tu Plan de Financiamiento
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {planesFinanciamiento.filter(p => p.tipo !== 'informacion').map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedPlan?.id === plan.id
                  ? 'border-bel-green-500 bg-bel-green-50'
                  : 'border-gray-200 hover:border-bel-green-300'
              }`}
            >
              <div className="font-bold text-gray-900 text-sm">{plan.nombre}</div>
              <div className="text-xs text-gray-600 mt-1">{plan.descripcion}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Ajuste de Inicial (si aplica) */}
      {selectedPlan?.inicial && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Ajustar Inicial (Opcional)
          </label>
          <input
            type="range"
            min={selectedPlan.inicial * 100}
            max="50"
            step="5"
            value={customInicial || (selectedPlan.inicial * 100)}
            onChange={(e) => handleInicialChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bel-green-500"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-600">Mínimo: {(selectedPlan.inicial * 100).toFixed(0)}%</span>
            <span className="font-bold text-bel-green-500">
              {(customInicial || (selectedPlan.inicial * 100)).toFixed(0)}%
            </span>
            <span className="text-gray-600">Máximo: 50%</span>
          </div>
        </div>
      )}

      {/* Resultado Principal */}
      {calculation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-bel-green-500 to-bel-green-600 rounded-2xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cuota/Pago Principal */}
              <div>
                <div className="text-sm opacity-90 mb-1">
                  {selectedPlan.tipo === 'contado' ? 'Total a Pagar' : 'Cuota Mensual'}
                </div>
                <div className="text-3xl md:text-4xl font-bold">
                  {selectedPlan.tipo === 'contado' 
                    ? formatCurrency(calculation.total)
                    : formatCurrency(calculation.cuotaMensual || calculation.cuotaRegular || calculation.cuotaPromedio)
                  }
                  {selectedPlan.tipo !== 'contado' && <span className="text-lg">/mes</span>}
                </div>
                {selectedPlan.tipo === 'leasing' && (
                  <div className="text-xs opacity-75 mt-1">Cuota promedio (decreciente)</div>
                )}
              </div>

              {/* Inicial */}
              {calculation.inicial && (
                <div>
                  <div className="text-sm opacity-90 mb-1">Inicial</div>
                  <div className="text-3xl font-bold">{formatCurrency(calculation.inicial)}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {((calculation.inicial / selectedTractor.precio) * 100).toFixed(0)}% del precio
                  </div>
                </div>
              )}

              {/* Plazo */}
              {(calculation.cuotas || calculation.plazoTotal) && (
                <div>
                  <div className="text-sm opacity-90 mb-1">Plazo</div>
                  <div className="text-3xl font-bold">
                    {calculation.plazoTotal || calculation.cuotas}
                  </div>
                  <div className="text-xs opacity-75 mt-1">meses</div>
                </div>
              )}

              {/* Total (para planes financiados) */}
              {selectedPlan.tipo !== 'contado' && calculation.total && (
                <div>
                  <div className="text-sm opacity-90 mb-1">Total a Pagar</div>
                  <div className="text-3xl font-bold">{formatCurrency(calculation.total)}</div>
                  {calculation.totalIntereses && (
                    <div className="text-xs opacity-75 mt-1">
                      Incluye {formatCurrency(calculation.totalIntereses)} en intereses
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Desglose Detallado */}
      {calculation?.desglose && (
        <div className="mb-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-900">Ver Desglose Detallado</span>
            {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  {calculation.desglose.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{item.concepto}</div>
                        {item.nota && (
                          <div className="text-xs text-gray-500 mt-1">{item.nota}</div>
                        )}
                        {item.cantidad && (
                          <div className="text-xs text-gray-500 mt-1">
                            {item.cantidad} x {formatCurrency(item.monto)}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {formatCurrency(item.monto * (item.cantidad || 1))}
                        </div>
                        {item.porcentaje && (
                          <div className="text-xs text-gray-500">{item.porcentaje}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Cronograma de Pagos */}
      {paymentSchedule.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Calendar size={20} className="text-bel-green-500" />
            Cronograma de Pagos
          </h3>
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">#</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Concepto</th>
                  <th className="px-4 py-2 text-right font-semibold text-gray-700">Monto</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Moneda</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((pago, idx) => (
                  <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-600">{pago.numero}</td>
                    <td className="px-4 py-2 text-gray-900">{pago.concepto}</td>
                    <td className="px-4 py-2 text-right font-semibold text-gray-900">
                      {formatCurrency(pago.monto)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pago.tipo === 'USD' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {pago.tipo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Información Adicional */}
      <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-blue-900">
          <strong>Nota:</strong> Todos los cálculos son referenciales. Los montos finales pueden variar según 
          condiciones específicas, tipo de cambio y análisis crediticio. Contacta a un asesor para una 
          cotización personalizada.
        </p>
      </div>

      {/* Acciones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          onClick={() => calculation && downloadFinancingPDF(selectedTractor, selectedPlan, calculation, asesor)}
          variant="outline"
          className="flex items-center justify-center gap-2"
          disabled={!calculation}
        >
          <Download size={18} />
          Descargar PDF
        </Button>
        
        <Button
          onClick={() => calculation && shareViaWhatsApp(selectedTractor, selectedPlan, calculation, asesor)}
          variant="outline"
          className="flex items-center justify-center gap-2"
          disabled={!calculation}
        >
          <Share2 size={18} />
          Compartir por WhatsApp
        </Button>
        
        <WhatsAppCTA
          message={`Hola, me interesa el ${selectedTractor?.modelo} con el plan ${selectedPlan?.nombre}. ¿Pueden darme más información?`}
          className="w-full"
        />
      </div>
    </div>
  );
};