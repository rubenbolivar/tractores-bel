import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Juan Pérez',
      location: 'Portuguesa',
      tractor: 'BEL 110',
      text: 'Excelente máquina para mi finca. El BEL 110 me ha dado un rendimiento increíble en mis 80 hectáreas de maíz.',
      avatar: 'JP'
    },
    {
      name: 'María González',
      location: 'Barinas',
      tractor: 'BEL 105 Ganadero',
      text: 'Perfecto para ganadería. El manejo de pastos es mucho más eficiente ahora. Recomiendo 100% Tractores BEL.',
      avatar: 'MG'
    },
    {
      name: 'Carlos Ramírez',
      location: 'Guárico',
      tractor: 'BEL 150',
      text: 'La mejor inversión para mi operación. Potencia, eficiencia y el respaldo técnico es excelente.',
      avatar: 'CR'
    }
  ];

  return (
    <section id="testimonios" className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            LO QUE DICEN NUESTROS CLIENTES
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Historias reales de productores venezolanos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Quote size={40} className="text-bel-green-500 mb-4" />
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-bel-green-500 text-white flex items-center justify-center font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                  <div className="text-sm text-bel-green-500 font-semibold">{testimonial.tractor}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
