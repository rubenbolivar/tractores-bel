import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bel-green-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Tractores */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Tractores</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo?categoria=Compacto" className="hover:text-bel-yellow transition-colors">
                  Compactos (50-60 HP)
                </Link>
              </li>
              <li>
                <Link to="/catalogo?categoria=Versátil" className="hover:text-bel-yellow transition-colors">
                  Versátiles (75-90 HP)
                </Link>
              </li>
              <li>
                <Link to="/catalogo?categoria=Alto Rendimiento" className="hover:text-bel-yellow transition-colors">
                  Alto Rendimiento (105-110 HP)
                </Link>
              </li>
              <li>
                <Link to="/catalogo?categoria=Trabajo Pesado" className="hover:text-bel-yellow transition-colors">
                  Trabajo Pesado (140-220 HP)
                </Link>
              </li>
              <li>
                <Link to="/comparador" className="hover:text-bel-yellow transition-colors">
                  Comparador
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Empresa */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#nosotros" className="hover:text-bel-yellow transition-colors">
                  ¿Por qué BEL?
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-bel-yellow transition-colors">
                  Encuentra tu Tractor
                </Link>
              </li>
              <li>
                <Link to="/#testimonios" className="hover:text-bel-yellow transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Respaldo JAC/BEL</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicio */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Servicio</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo#financiamiento" className="hover:text-bel-yellow transition-colors">
                  Financiamiento
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Repuestos</span>
              </li>
              <li>
                <span className="text-gray-300">Mantenimiento</span>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-bel-yellow transition-colors">
                  Asesores Regionales
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+584145041522" className="hover:text-bel-yellow transition-colors">
                    0414-504-1522
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:info@tractoresbel.com" className="hover:text-bel-yellow transition-colors">
                    info@tractoresbel.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <div>Venezuela</div>
              </li>
            </ul>

            {/* Redes Sociales */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bel-yellow transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bel-yellow transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-bel-green-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white text-bel-green-500 px-4 py-2 rounded-lg font-display font-bold text-xl">
                BEL
              </div>
              <div className="text-sm text-gray-300">
                Respaldado por JAC/BEL
              </div>
            </div>
            <div className="text-sm text-gray-300 text-center md:text-right">
              © {currentYear} Tractores BEL Venezuela. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
