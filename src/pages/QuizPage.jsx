import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { QuizFlow } from '../components/quiz/QuizFlow';

export const QuizPage = () => {
  return (
    <div className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-bel-green-500 to-bel-green-600 text-white py-8 sm:py-12">
        <div className="container-custom text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
          >
            <Compass size={32} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            Encuentra tu Tractor Ideal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl opacity-90 max-w-2xl mx-auto px-4"
          >
            Responde estas 6 preguntas y te recomendaremos el tractor perfecto para tu operación
          </motion.p>
        </div>
      </div>

      {/* Quiz Flow */}
      <QuizFlow />
    </div>
  );
};
