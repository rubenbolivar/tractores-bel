import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { obtenerAsesorPorEstado, estadosDisponibles } from '../../data/asesores';
import { generarMensajeWhatsApp } from '../../utils/recommendations';

export const WhatsAppCTA = ({ tractor = null, className = '' }) => {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Distrito Capital');

  const asesor = obtenerAsesorPorEstado(estadoSeleccionado);

  const handleWhatsAppClick = () => {
    const mensaje = tractor
      ? generarMensajeWhatsApp(tractor, null, estadoSeleccionado)
      : encodeURIComponent(`Hola, quisiera información sobre los Tractores BEL.\nEstoy ubicado en: ${estadoSeleccionado}`);

    const url = `https://wa.me/${asesor.whatsapp.replace(/[^0-9]/g, '')}?text=${mensaje}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <div className="flex justify-center mb-4">
        <img
          src="/assets/mundo-bel-logo.png"
          alt="Mundo Bel"
          className="h-16 w-auto"
        />
      </div>
      <h3 className="font-display text-xl font-bold mb-4">Habla con un Asesor</h3>

      {/* Selector de Estado */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Selecciona tu estado:
        </label>
        <select
          value={estadoSeleccionado}
          onChange={(e) => setEstadoSeleccionado(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bel-green-500"
        >
          {estadosDisponibles.map(estado => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>

      {/* Info del Asesor */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-600 mb-1">Tu asesor:</div>
        <div className="font-bold text-gray-900">{asesor.nombre}</div>
        <div className="text-sm text-gray-600">{asesor.whatsapp}</div>
      </div>

      {/* Botón WhatsApp */}
      <Button
        onClick={handleWhatsAppClick}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        <MessageCircle size={20} />
        Contactar por WhatsApp
      </Button>
    </div>
  );
};
