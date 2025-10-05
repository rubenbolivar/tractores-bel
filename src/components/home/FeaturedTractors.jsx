import { motion } from 'framer-motion';
import { tractores } from '../../data/tractores';
import { TractorCard } from '../catalog/TractorCard';

export const FeaturedTractors = () => {
  // Mostrar los tractores con entrega inmediata primero
  const featured = tractores
    .filter(t => t.entregaInmediata)
    .slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            MODELOS DESTACADOS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tractores con entrega inmediata y opciones de financiamiento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((tractor, index) => (
            <motion.div
              key={tractor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TractorCard tractor={tractor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
