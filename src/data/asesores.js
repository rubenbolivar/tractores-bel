export const asesores = {
  'Distrito Capital': {
    nombre: 'Mundo Bel Caracas',
    whatsapp: '+584145656595',
    email: 'caracas@tractoresbel.com',
    ciudades: ['Caracas', 'Los Teques', 'Guarenas', 'Guatire'],
    coordenadas: { lat: 10.4806, lng: -66.9036 }
  },
  'Anzoátegui': {
    nombre: 'Mundo Bel Puerto La Cruz',
    whatsapp: '+584145656595',
    email: 'anzoategui@tractoresbel.com',
    ciudades: ['Puerto La Cruz', 'Barcelona', 'El Tigre'],
    coordenadas: { lat: 10.2131, lng: -64.6326 }
  },
  'Miranda': {
    nombre: 'Mundo Bel Los Teques',
    whatsapp: '+584145041522',
    email: 'miranda@tractoresbel.com',
    ciudades: ['Los Teques', 'Guarenas', 'Guatire', 'Charallave'],
    coordenadas: { lat: 10.3333, lng: -66.8167 }
  },
  'Zulia': {
    nombre: 'Mundo Bel Maracaibo',
    whatsapp: '+584241234567',
    email: 'zulia@tractoresbel.com',
    ciudades: ['Maracaibo', 'Cabimas', 'Ciudad Ojeda', 'Machiques'],
    coordenadas: { lat: 10.6316, lng: -71.6411 }
  },
  'Lara': {
    nombre: 'Mundo Bel Barquisimeto',
    whatsapp: '+584145656595',
    email: 'lara@tractoresbel.com',
    ciudades: ['Barquisimeto', 'Carora', 'El Tocuyo'],
    coordenadas: { lat: 10.0647, lng: -69.3570 }
  },
  'Portuguesa': {
    nombre: 'Mundo Bel Acarigua',
    whatsapp: '+584167890123',
    email: 'portuguesa@tractoresbel.com',
    ciudades: ['Acarigua', 'Guanare', 'Araure'],
    coordenadas: { lat: 9.0333, lng: -69.2000 }
  },
  'Guárico': {
    nombre: 'Mundo Bel Calabozo',
    whatsapp: '+584120123456',
    email: 'guarico@tractoresbel.com',
    ciudades: ['Calabozo', 'Valle de la Pascua', 'San Juan de los Morros', 'Zaraza'],
    coordenadas: { lat: 8.9167, lng: -67.4167 }
  },
  'Aragua': {
    nombre: 'Mundo Bel Maracay',
    whatsapp: '+584243456789',
    email: 'aragua@tractoresbel.com',
    ciudades: ['Maracay', 'La Victoria', 'Cagua', 'Turmero'],
    coordenadas: { lat: 10.2469, lng: -67.5958 }
  },
  'Carabobo': {
    nombre: 'Mundo Bel Valencia',
    whatsapp: '+584129876543',
    email: 'carabobo@tractoresbel.com',
    ciudades: ['Valencia', 'Puerto Cabello', 'Guacara'],
    coordenadas: { lat: 10.1620, lng: -68.0077 }
  },
  'Barinas': {
    nombre: 'Mundo Bel Barinas',
    whatsapp: '+584265432109',
    email: 'barinas@tractoresbel.com',
    ciudades: ['Barinas', 'Socopó', 'Barinitas'],
    coordenadas: { lat: 8.6226, lng: -70.2065 }
  },
  'Apure': {
    nombre: 'Mundo Bel San Fernando',
    whatsapp: '+584148765432',
    email: 'apure@tractoresbel.com',
    ciudades: ['San Fernando de Apure', 'Guasdualito', 'Elorza'],
    coordenadas: { lat: 7.8889, lng: -67.4708 }
  },
  'Bolívar': {
    nombre: 'Mundo Bel Puerto Ordaz',
    whatsapp: '+584145656595',
    email: 'bolivar@tractoresbel.com',
    ciudades: ['Puerto Ordaz', 'Ciudad Bolívar', 'Upata'],
    coordenadas: { lat: 8.3739, lng: -62.6490 }
  }
};

export const obtenerAsesorPorEstado = (estado) => {
  return asesores[estado] || asesores['Distrito Capital'];
};

export const estadosDisponibles = Object.keys(asesores);
