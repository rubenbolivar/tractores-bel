import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { TractorCard } from '../catalog/TractorCard';
import { Button } from '../common/Button';

export const QuizResult = ({ recomendaciones, onRestart }) => {
  if (!recomendaciones || recomendaciones.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="font-display text-3xl font-bold mb-4">
          No encontramos resultados
        </h2>
        <p className="text-gray-600 mb-8">
          Intenta ajustar tus respuestas para obtener mejores recomendaciones
        </p>
        <Button onClick={onRestart}>
          <RotateCcw size={20} />
          Reintentar Quiz
        </Button>
      </div>
    );
  }

  const mejorRecomendacion = recomendaciones[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-bel-yellow rounded-full mb-4">
          <Trophy size={40} className="text-gray-900" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          ¡Tenemos tu Tractor Ideal!
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Basándonos en tus respuestas, estos son los tractores que mejor se ajustan a tus necesidades
        </p>
      </motion.div>

      {/* Mejor Recomendación */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-bel-yellow text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
            {mejorRecomendacion.porcentaje}% Compatible - Tu Mejor Opción
          </div>
        </div>
        <div className="bg-gradient-to-br from-bel-green-50 to-bel-green-100 p-6 rounded-2xl border-4 border-bel-green-500">
          <TractorCard tractor={mejorRecomendacion.tractor} />
        </div>
      </motion.div>

      {/* Otras Recomendaciones */}
      {recomendaciones.length > 1 && (
        <div>
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">
            Otras Opciones Recomendadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recomendaciones.slice(1).map((recomendacion, index) => (
              <motion.div
                key={recomendacion.tractor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                <div className="absolute -top-3 right-4 z-10">
                  <div className="bg-bel-green-500 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg">
                    {recomendacion.porcentaje}% Compatible
                  </div>
                </div>
                <TractorCard tractor={recomendacion.tractor} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Acciones */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
      >
        <Button as={Link} to="/catalogo" size="lg">
          Ver Todo el Catálogo
          <ArrowRight size={20} />
        </Button>
        <Button onClick={onRestart} variant="outline" size="lg">
          <RotateCcw size={20} />
          Hacer Quiz de Nuevo
        </Button>
      </motion.div>
    </div>
  );
};
