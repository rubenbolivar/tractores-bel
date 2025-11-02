import { motion } from 'framer-motion';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  Layers, 
  Route, 
  Handshake, 
  FileText, 
  Info,
  Check,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from '../common/Button';

const iconMap = {
  DollarSign,
  CreditCard,
  TrendingUp,
  Calendar,
  Layers,
  Route,
  Handshake,
  FileText,
  Info
};

const colorMap = {
  green: 'bg-green-100 text-green-600 border-green-200',
  blue: 'bg-blue-100 text-blue-600 border-blue-200',
  purple: 'bg-purple-100 text-purple-600 border-purple-200',
  indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  orange: 'bg-orange-100 text-orange-600 border-orange-200',
  teal: 'bg-teal-100 text-teal-600 border-teal-200',
  violet: 'bg-violet-100 text-violet-600 border-violet-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200'
};

const hoverColorMap = {
  green: 'hover:border-green-500',
  blue: 'hover:border-blue-500',
  purple: 'hover:border-purple-500',
  indigo: 'hover:border-indigo-500',
  orange: 'hover:border-orange-500',
  teal: 'hover:border-teal-500',
  violet: 'hover:border-violet-500',
  gray: 'hover:border-gray-500'
};

export const FinancingPlanCard = ({ plan, onSelect, isSelected, showCalculation = false, precioBase = 0 }) => {
  const Icon = iconMap[plan.icono] || Info;
  const colorClass = colorMap[plan.color] || colorMap.gray;
  const hoverClass = hoverColorMap[plan.color] || hoverColorMap.gray;
  
  const calculo = showCalculation && precioBase > 0 ? plan.calcular(precioBase) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all cursor-pointer ${
        isSelected ? 'border-bel-green-500 ring-2 ring-bel-green-200' : `border-gray-200 ${hoverClass}`
      }`}
      onClick={() => onSelect && onSelect(plan)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${colorClass} border-2`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{plan.nombre}</h3>
            <p className="text-sm text-gray-600">{plan.descripcion}</p>
          </div>
        </div>
        {isSelected && (
          <div className="flex-shrink-0 w-6 h-6 bg-bel-green-500 rounded-full flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        )}
      </div>

      {/* Calculation Preview */}
      {calculo && (
        <div className="mb-4 p-4 bg-gray-50 rounded-xl">
          {plan.tipo === 'fraccionado' && (
            <div>
              <div className="text-sm text-gray-600 mb-1">Cuota mensual</div>
              <div className="text-2xl font-bold text-bel-green-500">
                ${calculo.cuotaMensual?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-gray-500 mt-1">{calculo.cuotas} cuotas sin interés</div>
            </div>
          )}
          {plan.tipo === 'contado' && (
            <div>
              <div className="text-sm text-gray-600 mb-1">Total a pagar</div>
              <div className="text-2xl font-bold text-bel-green-500">
                ${calculo.total?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs text-gray-500 mt-1">Incluye IVA, IGTF y placa</div>
            </div>
          )}
          {plan.tipo === 'financiado' && calculo.cuotaMensual && (
            <div>
              <div className="text-sm text-gray-600 mb-1">Desde</div>
              <div className="text-2xl font-bold text-bel-green-500">
                ${calculo.cuotaMensual?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mes
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Inicial: ${calculo.inicial?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          )}
          {plan.tipo === 'leasing' && calculo.cuotaPromedio && (
            <div>
              <div className="text-sm text-gray-600 mb-1">Cuota promedio</div>
              <div className="text-2xl font-bold text-bel-green-500">
                ${calculo.cuotaPromedio?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mes
              </div>
              <div className="text-xs text-gray-500 mt-1">Cuotas decrecientes</div>
            </div>
          )}
        </div>
      )}

      {/* Ventajas */}
      {plan.ventajas && plan.ventajas.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">Ventajas:</div>
          <div className="space-y-2">
            {plan.ventajas.slice(0, 3).map((ventaja, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{ventaja}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desventajas */}
      {plan.desventajas && plan.desventajas.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">Consideraciones:</div>
          <div className="space-y-2">
            {plan.desventajas.slice(0, 2).map((desventaja, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <X size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{desventaja}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Info */}
      <div className="pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {plan.cuotas && (
            <div>
              <div className="text-gray-500">Cuotas</div>
              <div className="font-semibold text-gray-900">{plan.cuotas}</div>
            </div>
          )}
          {plan.inicial && (
            <div>
              <div className="text-gray-500">Inicial</div>
              <div className="font-semibold text-gray-900">{(plan.inicial * 100).toFixed(0)}%</div>
            </div>
          )}
          {plan.plazoTotal && (
            <div>
              <div className="text-gray-500">Plazo</div>
              <div className="font-semibold text-gray-900">{plan.plazoTotal} meses</div>
            </div>
          )}
          {plan.tipo && (
            <div>
              <div className="text-gray-500">Tipo</div>
              <div className="font-semibold text-gray-900 capitalize">{plan.tipo}</div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {onSelect && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(plan);
          }}
          className="w-full mt-4"
          variant={isSelected ? 'primary' : 'outline'}
        >
          {isSelected ? 'Seleccionado' : 'Ver detalles'}
          <ChevronRight size={16} />
        </Button>
      )}
    </motion.div>
  );
};