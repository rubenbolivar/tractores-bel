import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { asesores } from '../../data/asesores';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
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
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true
};

export const LocationMap = () => {
  const [selectedAsesor, setSelectedAsesor] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Crear SVG del icono de tractor como data URL
  const tractorIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill="#367C2B" stroke="white" stroke-width="3"/>
      <g transform="translate(12, 12)" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
    scaledSize: { width: 48, height: 48 },
    anchor: { x: 24, y: 48 }
  };

  return (
    <div>
      <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">
        Asesores por Estado
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(asesores).map(([estado, asesor]) => (
          <div
            key={estado}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-bel-green-500"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <img
                  src="/assets/mundo-bel-logo.png"
                  alt="Mundo Bel"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900 mb-1">{estado}</h4>
                <p className="text-gray-600 font-semibold mb-3">{asesor.nombre}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-bel-green-500" />
                    <a
                      href={`tel:${asesor.whatsapp}`}
                      className="hover:text-bel-green-500 transition-colors"
                    >
                      {asesor.whatsapp}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-bel-green-500" />
                    <a
                      href={`mailto:${asesor.email}`}
                      className="hover:text-bel-green-500 transition-colors"
                    >
                      {asesor.email}
                    </a>
                  </div>
                </div>

                {asesor.ciudades && asesor.ciudades.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Ciudades:</p>
                    <div className="flex flex-wrap gap-1">
                      {asesor.ciudades.slice(0, 3).map((ciudad) => (
                        <span
                          key={ciudad}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {ciudad}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mapa de Google Maps */}
      <div className="rounded-xl overflow-hidden shadow-lg border-4 border-bel-green-500">
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
                animation={window.google?.maps?.Animation?.DROP}
              />
            ))}

            {selectedAsesor && (
              <InfoWindow
                position={selectedAsesor.coordenadas}
                onCloseClick={() => setSelectedAsesor(null)}
              >
                <div className="p-2 max-w-xs">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/assets/mundo-bel-logo.png"
                      alt="Mundo Bel"
                      className="h-12 w-auto"
                    />
                  </div>
                  <h4 className="font-bold text-bel-green-500 text-lg mb-1">
                    {selectedAsesor.estado}
                  </h4>
                  <p className="font-semibold text-gray-900 mb-2">
                    {selectedAsesor.nombre}
                  </p>
                  <div className="space-y-1 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-bel-green-500" />
                      <a
                        href={`tel:${selectedAsesor.whatsapp}`}
                        className="text-bel-green-500 hover:underline"
                      >
                        {selectedAsesor.whatsapp}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-bel-green-500" />
                      <a
                        href={`mailto:${selectedAsesor.email}`}
                        className="text-bel-green-500 hover:underline"
                      >
                        {selectedAsesor.email}
                      </a>
                    </div>
                  </div>
                  {selectedAsesor.ciudades && selectedAsesor.ciudades.length > 0 && (
                    <div className="mb-3 pb-2 border-t border-gray-200 pt-2">
                      <p className="text-xs text-gray-600 font-semibold mb-1">
                        Ciudades principales:
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedAsesor.ciudades.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  )}
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

      <div className="mt-4 bg-bel-green-50 border border-bel-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-bel-green-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-bel-green-500">Cobertura Nacional:</span>{' '}
              Haz clic en los iconos de tractor 🚜 en el mapa para ver los detalles de cada asesor regional
              y contactarlos directamente por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
