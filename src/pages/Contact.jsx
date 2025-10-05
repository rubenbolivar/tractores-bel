import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Clock, Award } from 'lucide-react';
import { ContactForm } from '../components/contact/ContactForm';
import { LocationMap } from '../components/contact/LocationMap';
import { WhatsAppCTA } from '../components/contact/WhatsAppCTA';

export const Contact = () => {
  const infoCards = [
    {
      icon: Phone,
      title: 'Llámanos',
      content: '0414-504-1522',
      link: 'tel:+584145041522'
    },
    {
      icon: Mail,
      title: 'Escríbenos',
      content: 'info@tractoresbel.com',
      link: 'mailto:info@tractoresbel.com'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Venezuela',
      link: null
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun - Vie: 8:00 AM - 5:00 PM',
      link: null
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-bel-green-500 to-bel-green-600 text-white py-12">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
          >
            <MessageCircle size={32} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            Contáctanos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            Estamos aquí para ayudarte a encontrar el tractor perfecto para tu operación
          </motion.p>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            const content = card.link ? (
              <a
                href={card.link}
                className="text-bel-green-500 hover:text-bel-green-600 transition-colors"
              >
                {card.content}
              </a>
            ) : (
              <span className="text-gray-600">{card.content}</span>
            );

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-bel-green-100 rounded-full mb-4">
                  <Icon className="text-bel-green-500" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <div className="font-semibold">{content}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
                Envíanos un Mensaje
              </h2>
              <ContactForm />
            </div>

            {/* Asesores por Estado */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <LocationMap />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* WhatsApp CTA */}
            <WhatsAppCTA />

            {/* Por qué contactarnos */}
            <div className="bg-gradient-to-br from-bel-green-500 to-bel-green-600 rounded-xl p-6 text-white">
              <h3 className="font-display text-xl font-bold mb-4">
                ¿Por qué contactarnos?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Award className="flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Asesoría Personalizada</div>
                    <div className="text-sm opacity-90">
                      Te ayudamos a elegir el tractor ideal
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Mejores Precios</div>
                    <div className="text-sm opacity-90">
                      Financiamiento sin interés disponible
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Entrega Rápida</div>
                    <div className="text-sm opacity-90">
                      Modelos con disponibilidad inmediata
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold">Soporte Técnico</div>
                    <div className="text-sm opacity-90">
                      Servicio post-venta garantizado
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                Horario de Atención
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Lunes - Viernes</span>
                  <span className="font-semibold text-gray-900">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-semibold text-gray-900">8:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Domingo</span>
                  <span className="font-semibold text-red-500">Cerrado</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * WhatsApp disponible 24/7 para consultas urgentes
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
