import { motion } from 'framer-motion';
import { Wrench, Package, HeadphonesIcon, Shield, CheckCircle, Users } from 'lucide-react';

export const PostVenta = () => {
  const servicios = [
    {
      icon: HeadphonesIcon,
      titulo: 'Asesoría Continua',
      descripcion: 'Nuestros asesores especializados te acompañan en cada etapa, desde la selección hasta el mantenimiento de tu tractor.'
    },
    {
      icon: Wrench,
      titulo: 'Servicio Técnico',
      descripcion: 'Equipo técnico capacitado para mantener tu tractor en óptimas condiciones y maximizar su vida útil.'
    },
    {
      icon: Package,
      titulo: 'Repuestos Originales',
      descripcion: 'Disponibilidad inmediata de repuestos genuinos para garantizar el rendimiento y durabilidad de tu equipo.'
    },
    {
      icon: Shield,
      titulo: 'Garantía Respaldada',
      descripcion: 'Respaldo JAC/BEL con garantía de fábrica y soporte técnico en todo el territorio nacional.'
    }
  ];

  const compromisos = [
    'Atención personalizada 24/7 vía WhatsApp',
    'Red de servicio técnico en 11 estados',
    'Repuestos originales con entrega rápida',
    'Capacitación en uso y mantenimiento',
    'Financiamiento flexible sin complicaciones',
    'Seguimiento post-venta permanente'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <img
              src="/assets/mundo-bel-logo-transparent.png"
              alt="Mundo Bel"
              className="h-24 md:h-28 w-auto"
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            MÁS QUE VENDER TRACTORES,
            <br />
            <span className="text-bel-green-500">TE ACOMPAÑAMOS EN TU ÉXITO</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            En <strong>Mundo Bel</strong>, entendemos que un tractor es una inversión en el futuro de tu producción.
            Por eso, nuestro compromiso va más allá de la venta: te brindamos acompañamiento integral
            en cada etapa de tu operación agrícola.
          </p>
        </motion.div>

        {/* Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {servicios.map((servicio, index) => {
            const Icon = servicio.icon;
            return (
              <motion.div
                key={servicio.titulo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-bel-green-500 to-bel-green-600 text-white rounded-xl p-6 hover:shadow-xl transition-all"
              >
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">{servicio.titulo}</h3>
                <p className="text-white/95 leading-relaxed">{servicio.descripcion}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Compromisos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users size={40} className="text-bel-green-500" />
                <h3 className="font-display text-3xl font-bold text-gray-900">
                  Nuestro Compromiso con el Campo Venezolano
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Sabemos que el éxito de tu cosecha depende de que tu equipo funcione perfectamente.
                Por eso, en Mundo Bel no solo vendemos tractores: construimos relaciones de confianza
                y ofrecemos un soporte integral que garantiza tu tranquilidad y productividad.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Con presencia en <strong>11 estados</strong> y un equipo de expertos apasionados por
                la agricultura venezolana, estamos comprometidos con impulsar la productividad del campo nacional.
              </p>
            </div>

            <div className="space-y-3">
              {compromisos.map((compromiso, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                >
                  <CheckCircle className="text-bel-green-500 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-800 font-medium">{compromiso}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            🚜 En Mundo Bel, tu éxito es nuestro éxito
          </p>
          <p className="text-xl text-gray-600">
            Juntos, hacemos crecer el campo venezolano
          </p>
        </motion.div>
      </div>
    </section>
  );
};
