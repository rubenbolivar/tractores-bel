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
import { planesFinanciamiento, COSTOS_ADICIONALES } from '../../data/planesFinanciamiento';
import { asesores } from '../../data/asesores';
import { Button } from '../common/Button';
import { WhatsAppCTA } from '../contact/WhatsAppCTA';
import { downloadFinancingPDF, shareViaWhatsApp } from '../../utils/pdfGenerator';
import { useGeolocation } from '../../hooks/useGeolocation';

export const AdvancedCalculator = ({ preSelectedTractorId = null, preSelectedPlanId = null }) => {
  // Debug
  console.log('AdvancedCalculator - tractores:', tractores);
  console.log('AdvancedCalculator - tractores es array?:', Array.isArray(tractores));
  console.log('AdvancedCalculator - planesFinanciamiento:', planesFinanciamiento);
  console.log('AdvancedCalculator - planesFinanciamiento es array?:', Array.isArray(planesFinanciamiento));
  
  const [selectedTractor, setSelectedTractor] = useState(() => {
    if (!Array.isArray(tractores)) return null;
    return preSelectedTractorId
      ? tractores.find(t => t.id === preSelectedTractorId) || tractores[0]
      : tractores[0];
  });
  
  const [selectedPlan, setSelectedPlan] = useState(() => {
    if (!Array.isArray(planesFinanciamiento)) return null;
    return preSelectedPlanId
      ? planesFinanciamiento.find(p => p.id === preSelectedPlanId) || planesFinanciamiento[0]
      : planesFinanciamiento[0];
  });
  const [customInicial, setCustomInicial] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [calculation, setCalculation] = useState(null);
  
  // Reset customInicial cuando cambia el plan
  useEffect(() => {
    setCustomInicial(null);
  }, [selectedPlan]);
  
  // Obtener asesor regional
  const { estado } = useGeolocation();
  const asesor = estado && asesores[estado]
    ? { ...asesores[estado], estado, telefono: asesores[estado].whatsapp }
    : { ...asesores['Distrito Capital'], estado: 'Distrito Capital', telefono: asesores['Distrito Capital'].whatsapp };

  // Recalcular cuando cambian tractor, plan o inicial personalizada
  useEffect(() => {
    try {
      if (selectedTractor && selectedPlan && selectedPlan.calcular) {
        const precioBase = selectedTractor.precio;
        const tractorId = selectedTractor.id;
        
        // Si hay inicial personalizada y el plan lo soporta, recalcular con nueva inicial
        if (customInicial && selectedPlan.inicial) {
          const inicialPersonalizada = customInicial / 100;
          const result = calcularConInicialPersonalizada(precioBase, inicialPersonalizada, selectedPlan);
          setCalculation(result);
        } else {
          // Pasar tractorId para planes que usan precios especiales (como fraccionada-6)
          const result = selectedPlan.calcular(precioBase, tractorId);
          setCalculation(result);
        }
      }
    } catch (error) {
      console.error('Error al calcular:', error);
      setCalculation(null);
    }
  }, [selectedTractor, selectedPlan, customInicial]);

  const handleInicialChange = (value) => {
    setCustomInicial(value);
  };
  
  // Función para recalcular con inicial personalizada
  const calcularConInicialPersonalizada = (precioBase, inicialDecimal, plan) => {
    try {
      const inicial = precioBase * inicialDecimal;
      const iva = precioBase * COSTOS_ADICIONALES.IVA;
      const saldoFinanciar = precioBase - inicial;
    
    if (plan.id === 'plan-ei-12') {
      const cuotaRegular = saldoFinanciar / 12;
      const cuotaEspecial = saldoFinanciar * 0.05;
      return {
        precioBase,
        inicial,
        iva,
        saldoFinanciar,
        cuotas: 12,
        cuotaMensual: cuotaRegular,
        cuotasEspeciales: 3,
        cuotaEspecial,
        totalAPagar: precioBase + iva,
        desglose: [
          { concepto: `Inicial (${(inicialDecimal * 100).toFixed(1)}%)`, monto: inicial },
          { concepto: 'IVA en Bs (16%)', monto: iva, nota: 'Previo a entrega' },
          { concepto: '12 Cuotas regulares', monto: cuotaRegular, cantidad: 12 },
          { concepto: '3 Cuotas especiales', monto: cuotaEspecial, cantidad: 3 }
        ]
      };
    } else if (plan.id === 'plan-ei-30') {
      const cuotaMensual = saldoFinanciar / 30;
      return {
        precioBase,
        inicial,
        iva,
        saldoFinanciar,
        cuotas: 30,
        cuotaMensual,
        totalAPagar: precioBase + iva,
        desglose: [
          { concepto: `Inicial (${(inicialDecimal * 100).toFixed(1)}%)`, monto: inicial },
          { concepto: 'IVA en Bs (16%)', monto: iva, nota: 'Previo a entrega' },
          { concepto: '30 Cuotas iguales', monto: cuotaMensual, cantidad: 30 }
        ]
      };
    } else if (plan.id === 'llevatelo-fiao') {
      const pagoInicial = inicial / 6;
      const cuotaMensual = precioBase * 0.05;
      return {
        precioBase,
        inicial,
        pagosIniciales: 6,
        pagoInicial,
        iva,
        cuotas: 12,
        cuotaMensual,
        totalAPagar: precioBase + iva,
        desglose: [
          { concepto: `Afiliación + 5 pagos (${(inicialDecimal * 100).toFixed(1)}%)`, monto: pagoInicial, cantidad: 6 },
          { concepto: 'IVA en Bs (16%)', monto: iva, nota: 'Antes de entrega' },
          { concepto: 'Entrega del tractor', monto: 0, nota: 'Después de inicial' },
          { concepto: '12 Cuotas del 5%', monto: cuotaMensual, cantidad: 12 }
        ]
      };
    } else if (plan.id === 'lease-plus') {
      const montoFinanciado = precioBase * 0.50;
      const valorResidual = precioBase * 0.25;
      const tasaMensual = 0.12 / 12;
      const amortizacionMensual = montoFinanciado / 36;
      const primeraCuota = amortizacionMensual + (montoFinanciado * tasaMensual);
      const ultimaCuota = amortizacionMensual + (amortizacionMensual * tasaMensual);
      const cuotaPromedio = (primeraCuota + ultimaCuota) / 2;
      const totalIntereses = (montoFinanciado * tasaMensual * 37 * 36) / 2;
      
      return {
        precioBase,
        inicial,
        montoFinanciado,
        valorResidual,
        plazo: 36,
        cuotaPromedio,
        cuotaMensual: cuotaPromedio,
        totalIntereses,
        totalAPagar: inicial + montoFinanciado + totalIntereses + valorResidual,
        desglose: [
          { concepto: `Inicial (${(inicialDecimal * 100).toFixed(1)}%)`, monto: inicial },
          { concepto: 'Primera cuota', monto: primeraCuota, nota: 'Cuota más alta' },
          { concepto: 'Cuota promedio', monto: cuotaPromedio, nota: '36 cuotas decrecientes' },
          { concepto: 'Última cuota', monto: ultimaCuota, nota: 'Cuota más baja' },
          { concepto: 'Total intereses', monto: totalIntereses },
          { concepto: 'Valor residual (25%)', monto: valorResidual, nota: 'Opción de compra final' }
        ]
      };
    }
    
      // Fallback al cálculo original
      return plan.calcular(precioBase);
    } catch (error) {
      console.error('Error en cálculo personalizado:', error);
      return plan.calcular(precioBase);
    }
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
          {(Array.isArray(tractores) ? tractores : []).map((tractor) => (
            <button
              key={tractor.id}
              onClick={() => setSelectedTractor(tractor)}
              className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                selectedTractor?.id === tractor.id
                  ? 'border-bel-green-500 bg-bel-green-50'
                  : 'border-gray-200 hover:border-bel-green-300 hover:shadow-md'
              }`}
            >
              {/* Imagen del tractor */}
              <div className="relative h-32 overflow-hidden bg-gray-50">
                <img
                  src={tractor.imageUrl}
                  alt={tractor.modelo}
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                {tractor.entregaInmediata && (
                  <div className="absolute top-1 right-1 bg-bel-yellow text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Disponible
                  </div>
                )}
                {/* Indicador de selección */}
                {selectedTractor?.id === tractor.id && (
                  <div className="absolute top-1 left-1 w-5 h-5 bg-bel-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Información del tractor */}
              <div className="p-3 text-left">
                <div className="font-bold text-gray-900 text-sm">{tractor.modelo}</div>
                {tractor.subtitulo && (
                  <div className="text-xs text-gray-500">{tractor.subtitulo}</div>
                )}
                <div className="text-xs text-gray-600 mt-1">{tractor.potencia} HP</div>
                <div className="text-base font-bold text-bel-green-500 mt-1">
                  {formatCurrency(tractor.precio)}
                </div>
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
          {(Array.isArray(planesFinanciamiento) ? planesFinanciamiento : []).filter(p => p.tipo !== 'informacion').map((plan) => (
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
                {selectedPlan.tipo === 'contado' && (
                  <div className="text-xs opacity-75 mt-1">+ IGTF</div>
                )}
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
                  <div className="text-xs opacity-75 mt-1">+ IGTF</div>
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