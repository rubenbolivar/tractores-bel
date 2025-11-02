import { Link } from 'react-router-dom';
import { Zap, DollarSign, ArrowRight, Calculator } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatearPrecio } from '../../utils/recommendations';

export const TractorCard = ({ tractor }) => {
  return (
    <Card className="h-full flex flex-col">
      {/* Image */}
      <div className="relative h-64 bg-gray-100">
        <img
          src={tractor.imageUrl}
          alt={`Tractor ${tractor.modelo}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600';
          }}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tractor.entregaInmediata && (
            <Badge variant="yellow">Entrega Inmediata</Badge>
          )}
          {tractor.categoria && (
            <Badge variant="primary">{tractor.categoria}</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">
          {tractor.modelo}
        </h3>
        {tractor.subtitulo && (
          <p className="text-sm text-bel-green-500 font-semibold mb-3">
            {tractor.subtitulo}
          </p>
        )}

        {/* Potencia */}
        <div className="flex items-center gap-2 mb-4">
          <Zap size={20} className="text-bel-yellow" />
          <span className="text-lg font-bold text-gray-900">{tractor.potencia} HP</span>
        </div>

        {/* Precio */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={18} className="text-bel-green-500" />
            <span className="text-sm text-gray-600">Desde</span>
          </div>
          <div className="text-2xl font-bold text-bel-green-500">
            {formatearPrecio(tractor.cuotas)}/mes
          </div>
          <div className="text-sm text-gray-600">
            {tractor.numCuotas} cuotas sin interés
          </div>
          {tractor.precioContado && (
            <div className="text-sm text-gray-600 mt-1">
              o {formatearPrecio(tractor.precioContado)} de contado
            </div>
          )}
        </div>

        {/* Aplicaciones */}
        {tractor.aplicaciones && tractor.aplicaciones.length > 0 && (
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-2">Ideal para:</div>
            <div className="flex flex-wrap gap-1">
              {tractor.aplicaciones.slice(0, 3).map((app, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto space-y-2">
          <Button
            as={Link}
            to={`/tractor/${tractor.id}`}
            className="w-full"
          >
            Ver Detalles
            <ArrowRight size={18} />
          </Button>
          <Button
            as={Link}
            to={`/financiamiento?tractor=${tractor.id}`}
            variant="secondary"
            className="w-full"
          >
            <Calculator size={18} />
            Calcular Financiamiento
          </Button>
          <Button
            as={Link}
            to={`/contacto?modelo=${tractor.id}`}
            variant="outline"
            className="w-full"
          >
            Consultar Asesor
          </Button>
        </div>
      </div>
    </Card>
  );
};
