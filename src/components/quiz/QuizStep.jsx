import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const QuizStep = ({ pregunta, respuestas, onAnswer, multipleSelection = false }) => {
  const handleSelect = (opcion) => {
    if (multipleSelection) {
      const isSelected = respuestas.some(r => r.valor === opcion.valor);
      if (isSelected) {
        onAnswer(respuestas.filter(r => r.valor !== opcion.valor));
      } else {
        onAnswer([...respuestas, opcion]);
      }
    } else {
      onAnswer([opcion]);
    }
  };

  const isSelected = (opcion) => {
    return respuestas.some(r => r.valor === opcion.valor);
  };

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8"
      >
        {pregunta.pregunta}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {pregunta.opciones.map((opcion, index) => (
          <motion.button
            key={opcion.valor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(opcion)}
            className={`relative p-4 sm:p-6 rounded-xl text-left transition-all ${
              isSelected(opcion)
                ? 'bg-bel-green-500 text-white shadow-xl scale-105'
                : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-102'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base sm:text-lg mb-1 break-words">{opcion.label}</div>
              </div>
              {isSelected(opcion) && (
                <div className="flex-shrink-0">
                  <Check size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {multipleSelection && (
        <p className="text-sm text-gray-600 text-center mt-4">
          Puedes seleccionar múltiples opciones
        </p>
      )}
    </div>
  );
};
