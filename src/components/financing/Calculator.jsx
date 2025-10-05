import { useState } from 'react';
import { DollarSign, Calculator as CalcIcon } from 'lucide-react';
import { calcularFinanciamiento } from '../../utils/calculations';
import { formatearPrecio } from '../../utils/recommendations';

export const Calculator = ({ tractor }) => {
  const [tipoFinanciamiento, setTipoFinanciamiento] = useState('fraccionado');

  const resultado = calcularFinanciamiento(tractor, tipoFinanciamiento);

  return (
    <div>
      <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
        <CalcIcon size={24} />
        Calculadora de Financiamiento
      </h3>

      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTipoFinanciamiento('fraccionado')}
          className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
            tipoFinanciamiento === 'fraccionado'
              ? 'bg-bel-green-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Fraccionado
        </button>
        <button
          onClick={() => setTipoFinanciamiento('contado')}
          className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
            tipoFinanciamiento === 'contado'
              ? 'bg-bel-green-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          disabled={!tractor.precioContado}
        >
          Contado
        </button>
      </div>

      {/* Resultado */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-sm text-gray-600 mb-2">{resultado.tipo}</div>

        {tipoFinanciamiento === 'fraccionado' ? (
          <>
            <div className="text-4xl font-bold text-bel-green-500 mb-4">
              {formatearPrecio(resultado.cuotaMensual)}/mes
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Número de cuotas:</span>
                <span className="font-semibold">{resultado.numCuotas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interés:</span>
                <span className="font-semibold text-green-600">{resultado.interes}% (Sin interés)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Total a pagar:</span>
                <span className="font-semibold">{formatearPrecio(resultado.precioTotal)}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl font-bold text-bel-green-500 mb-4">
              {formatearPrecio(resultado.precioTotal)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Precio base:</span>
                <span className="font-semibold">{formatearPrecio(resultado.precioBase)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IGTF (3%):</span>
                <span className="font-semibold">{formatearPrecio(resultado.igtf)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">{formatearPrecio(resultado.precioTotal)}</span>
              </div>
            </div>
          </>
        )}

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">{resultado.descripcion}</p>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <p className="flex items-start gap-2">
          <DollarSign size={16} className="mt-0.5 flex-shrink-0 text-bel-green-500" />
          <span>Todos los precios están en dólares estadounidenses (USD)</span>
        </p>
        <p className="flex items-start gap-2">
          <DollarSign size={16} className="mt-0.5 flex-shrink-0 text-bel-green-500" />
          <span>Consulta con tu asesor sobre disponibilidad y condiciones específicas</span>
        </p>
      </div>
    </div>
  );
};
