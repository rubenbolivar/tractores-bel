import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuizStep } from './QuizStep';
import { QuizResult } from './QuizResult';
import { Button } from '../common/Button';
import { preguntasQuiz } from '../../data/quizData';
import { tractores } from '../../data/tractores';
import { calcularRecomendaciones } from '../../utils/recommendations';

export const QuizFlow = () => {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState([]);

  const preguntaActual = preguntasQuiz[pasoActual];
  const esUltimaPregunta = pasoActual === preguntasQuiz.length - 1;
  const esPrimeraPregunta = pasoActual === 0;

  const handleAnswer = (opciones) => {
    setRespuestas({
      ...respuestas,
      [preguntaActual.id]: opciones
    });
  };

  const handleNext = () => {
    if (esUltimaPregunta) {
      // Calcular recomendaciones
      const resultados = calcularRecomendaciones(respuestas, tractores);
      setRecomendaciones(resultados);
      setMostrarResultados(true);
    } else {
      setPasoActual(pasoActual + 1);
    }
  };

  const handlePrevious = () => {
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  const handleRestart = () => {
    setPasoActual(0);
    setRespuestas({});
    setMostrarResultados(false);
    setRecomendaciones([]);
  };

  const respuestaActual = respuestas[preguntaActual?.id] || [];
  const puedeAvanzar = respuestaActual.length > 0 || preguntaActual?.opcional;
  const progreso = ((pasoActual + 1) / preguntasQuiz.length) * 100;

  if (mostrarResultados) {
    return (
      <div className="container-custom py-12">
        <QuizResult recomendaciones={recomendaciones} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="container-custom py-6 sm:py-12 px-4">
      {/* Barra de Progreso */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Pregunta {pasoActual + 1} de {preguntasQuiz.length}
          </span>
          <span className="text-sm font-semibold text-bel-green-500">
            {Math.round(progreso)}% Completado
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progreso}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-bel-green-500 to-bel-green-600"
          />
        </div>
      </div>

      {/* Pregunta Actual */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-12 mb-6 sm:mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={pasoActual}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuizStep
              pregunta={preguntaActual}
              respuestas={respuestaActual}
              onAnswer={handleAnswer}
              multipleSelection={preguntaActual.tipo === 'multiple'}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botones de Navegación */}
      <div className="flex flex-col gap-4">
        {/* Indicadores de progreso - ocultos en móvil */}
        <div className="hidden sm:flex gap-2 justify-center">
          {preguntasQuiz.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === pasoActual
                  ? 'bg-bel-green-500 w-8'
                  : index < pasoActual
                  ? 'bg-bel-green-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Botones */}
        <div className="flex justify-between items-center gap-3">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={esPrimeraPregunta}
            className={`flex-1 sm:flex-none ${esPrimeraPregunta ? 'invisible' : ''}`}
            size="sm"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={!puedeAvanzar}
            className="flex-1 sm:flex-none"
            size="sm"
          >
            <span className="truncate">{esUltimaPregunta ? 'Ver Resultados' : 'Siguiente'}</span>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
