import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Categories = () => {
  const categories = [
    {
      title: 'Compactos',
      subtitle: '50-60 HP',
      description: 'Ideales para cacao, café y fincas pequeñas',
      image: '/assets/tractores/bel50.jpg',
      fallback: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600',
      link: '/catalogo?categoria=Compacto',
      color: 'from-green-600 to-green-800'
    },
    {
      title: 'Versátiles',
      subtitle: '75-90 HP',
      description: 'Para agricultura general y uso mixto',
      image: '/assets/tractores/bel75.jpg',
      fallback: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600',
      link: '/catalogo?categoria=Versátil',
      color: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Alto Rendimiento',
      subtitle: '105-110 HP',
      description: 'Ganadería y trabajos pesados',
      image: '/assets/tractores/bel105.jpg',
      fallback: 'https://images.unsplash.com/photo-1574268602876-3fbbe8e6c3c9?w=600',
      link: '/catalogo?categoria=Alto Rendimiento',
      color: 'from-orange-600 to-orange-800'
    },
    {
      title: 'Trabajo Pesado',
      subtitle: '140-220 HP',
      description: 'Agricultura comercial masiva',
      image: '/assets/tractores/bel140.jpg',
      fallback: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600',
      link: '/catalogo?categoria=Trabajo Pesado',
      color: 'from-red-600 to-red-800'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            EXPLORA NUESTRA LÍNEA
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tractores para cada necesidad, desde fincas pequeñas hasta operaciones comerciales masivas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={category.link} className="group block">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                  {/* Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = category.fallback;
                    }}
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-75 transition-opacity`} />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="font-display text-2xl font-bold mb-1">{category.title}</h3>
                    <p className="text-lg font-semibold mb-2">{category.subtitle}</p>
                    <p className="text-sm mb-4 opacity-90">{category.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                      Ver modelos
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
