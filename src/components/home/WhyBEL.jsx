import { motion } from 'framer-motion';
import { Award, Shield, Wrench, DollarSign, Truck, Users } from 'lucide-react';

export const WhyBEL = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Respaldo JAC/BEL',
      description: 'Tecnología y calidad probada internacionalmente'
    },
    {
      icon: Shield,
      title: 'Garantía Completa',
      description: 'Protección total en tu inversión'
    },
    {
      icon: Wrench,
      title: 'Servicio Técnico',
      description: 'Repuestos y mantenimiento disponible'
    },
    {
      icon: DollarSign,
      title: 'Financiamiento',
      description: '6 cuotas sin interés o pago de contado'
    },
    {
      icon: Truck,
      title: 'Entrega Inmediata',
      description: 'Modelos disponibles en stock'
    },
    {
      icon: Users,
      title: 'Asesores Regionales',
      description: 'Atención personalizada en todo el país'
    }
  ];

  return (
    <section id="nosotros" className="py-20 bg-gradient-to-br from-bel-green-500 to-bel-green-700 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            ¿POR QUÉ ELEGIR TRACTORES BEL?
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Más que tractores, somos tu socio para el éxito del campo venezolano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all"
              >
                <Icon size={48} className="mb-4 text-bel-yellow" />
                <h3 className="font-display text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="opacity-90">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
