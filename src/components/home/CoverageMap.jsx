import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { asesores } from '../../data/asesores';
import { Button } from '../common/Button';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const centerOfVenezuela = {
  lat: 9.0,
  lng: -68.0
};

const mapOptions = {
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ],
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: 'cooperative'
};

export const CoverageMap = () => {
  const [selectedAsesor, setSelectedAsesor] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Crear SVG del icono de tractor más pequeño
  const tractorIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="#367C2B" stroke="white" stroke-width="2.5"/>
      <g transform="translate(10, 10)" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="7" cy="17" r="2"/>
        <circle cx="17" cy="17" r="2"/>
        <path d="M5 17H3v-5l2-3h10l2 3v5h-2"/>
        <path d="M9 17h6"/>
        <path d="M14 5h2v7h-2z"/>
        <path d="M6 9h8"/>
      </g>
    </svg>
  `;

  const tractorIcon = {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(tractorIconSvg),
    scaledSize: { width: 40, height: 40 },
    anchor: { x: 20, y: 40 }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <img
              src="/assets/mundo-bel-logo.png"
              alt="Mundo Bel"
              className="h-20 md:h-24 w-auto"
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PRESENCIA NACIONAL
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Contamos con asesores especializados en los principales estados de Venezuela
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-bel-green-100 p-4 rounded-full">
                  <MapPin className="text-bel-green-500" size={32} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-bel-green-500">11</div>
                  <div className="text-gray-600 font-semibold">Estados Cubiertos</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-bel-yellow/20 p-4 rounded-full">
                  <Phone className="text-bel-yellow-dark" size={32} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-bel-yellow-dark">24/7</div>
                  <div className="text-gray-600 font-semibold">Atención WhatsApp</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-bel-green-500 to-bel-green-600 rounded-xl p-6 text-white">
              <h3 className="font-display text-xl font-bold mb-2">
                ¿Necesitas Asesoría?
              </h3>
              <p className="text-sm opacity-90 mb-4">
                Contacta al asesor de tu región para una atención personalizada
              </p>
              <Button
                as={Link}
                to="/contacto"
                variant="outline-white"
                className="w-full"
              >
                <MessageCircle size={18} />
                Ver Asesores
              </Button>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl overflow-hidden shadow-xl border-4 border-bel-green-500">
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={centerOfVenezuela}
                  zoom={6}
                  options={mapOptions}
                >
                  {Object.entries(asesores).map(([estado, asesor]) => (
                    <Marker
                      key={estado}
                      position={asesor.coordenadas}
                      icon={tractorIcon}
                      onClick={() => setSelectedAsesor({ estado, ...asesor })}
                    />
                  ))}

                  {selectedAsesor && (
                    <InfoWindow
                      position={selectedAsesor.coordenadas}
                      onCloseClick={() => setSelectedAsesor(null)}
                    >
                      <div className="p-2">
                        <div className="flex justify-center mb-2">
                          <img
                            src="/assets/mundo-bel-logo.png"
                            alt="Mundo Bel"
                            className="h-10 w-auto"
                          />
                        </div>
                        <h4 className="font-bold text-bel-green-500 text-base mb-1">
                          {selectedAsesor.estado}
                        </h4>
                        <p className="font-semibold text-gray-900 text-sm mb-2">
                          {selectedAsesor.nombre}
                        </p>
                        <a
                          href={`https://wa.me/${selectedAsesor.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded font-semibold text-sm transition-colors"
                        >
                          Contactar por WhatsApp
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                🚜 Haz clic en los iconos de tractor para ver el asesor de cada región
              </p>
            </div>
          </motion.div>
        </div>

        {/* Estados cubiertos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 mb-3">Estados con cobertura:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(asesores).map((estado) => (
              <span
                key={estado}
                className="bg-bel-green-100 text-bel-green-700 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {estado}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
