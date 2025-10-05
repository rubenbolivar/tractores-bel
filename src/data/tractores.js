export const tractores = [
  {
    id: 'bel50',
    modelo: 'BEL 50',
    subtitulo: 'Chocotero',
    categoria: 'Compacto',
    potencia: 50,
    precio: 14970,
    cuotas: 2495,
    numCuotas: 6,
    precioContado: null,
    entregaInmediata: false,
    motor: {
      modelo: 'YD4100T',
      tipo: 'Diesel Euro II',
      cilindros: 4,
      aspiracion: 'Natural',
      potenciaHp: 50,
      torque: 235,
      torqueRpm: 2400,
      combustible: 'Diesel',
      capacidadTanque: 40
    },
    transmision: {
      tipo: 'Mecánica sincronizada',
      velocidades: '12+12',
      traccion: '4X4',
      embrague: 'Doble de accionamiento mecánico'
    },
    capacidades: {
      levante: 1200,
      arrastre: 5600,
      pesoNeto: 1600,
      tomaDeFuerza: {
        hp: 46,
        estrias: 6,
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 3480,
      ancho: 1465,
      alto: 1900,
      neumaticos: '7.50-16/12.4-24 R2',
      entreEjes: 1830,
      alturaMinima: 350,
      contrapesoDelantero: 80,
      contrapesoTrasero: 200
    },
    aplicaciones: ['Cacao', 'Café', 'Horticultura', 'Fincas pequeñas'],
    caracteristicas: [
      'Compresor de aire con depósito',
      'Contrapeso delantero y trasero',
      'Motor 4 cilindros aspiración natural'
    ],
    hectareasMin: 0,
    hectareasMax: 20,
    terrenos: ['plano', 'ondulado'],
    imageUrl: '/assets/tractores/bel50.jpg'
  },
  {
    id: 'bel60',
    modelo: 'BEL 60',
    subtitulo: '',
    categoria: 'Compacto',
    potencia: 60,
    precio: 21840,
    cuotas: 3640,
    numCuotas: 6,
    precioContado: 31563,
    entregaInmediata: true,
    motor: {
      modelo: 'XCA4K41T60-6C',
      tipo: 'Diesel Euro II',
      cilindros: 4,
      aspiracion: 'Natural',
      potenciaHp: 60,
      torque: 225,
      torqueRpm: 2400,
      combustible: 'Diesel',
      capacidadTanque: 60
    },
    transmision: {
      tipo: 'Mecánica',
      velocidades: '12+12',
      traccion: '4X4',
      embrague: 'Doble independiente de accionamiento mecánico'
    },
    capacidades: {
      levante: 1300,
      arrastre: 8907,
      pesoNeto: 2545,
      tomaDeFuerza: {
        hp: 50.2,
        estrias: 6,
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 4186,
      ancho: 1730,
      alto: 2854,
      neumaticos: '280-70 R20/380-70R28',
      entreEjes: 2040,
      alturaMinima: 310,
      contrapesoDelantero: 144,
      contrapesoTrasero: 270
    },
    aplicaciones: ['Agricultura general', 'Ganadería', 'Transporte', 'Uso mixto'],
    caracteristicas: [
      'Asiento Ergonómico Grammer',
      'Dirección hidráulica',
      'Compresor de aire con depósito',
      'Motor diesel bajo consumo'
    ],
    hectareasMin: 15,
    hectareasMax: 50,
    terrenos: ['plano', 'ondulado'],
    imageUrl: '/assets/tractores/bel60.jpg'
  },
  {
    id: 'bel75',
    modelo: 'BEL 75',
    subtitulo: 'Palmero',
    categoria: 'Versátil',
    potencia: 75,
    precio: 23902,
    cuotas: 3984,
    numCuotas: 6,
    precioContado: null,
    entregaInmediata: false,
    motor: {
      modelo: 'YDT4B4',
      tipo: 'Diesel Euro II',
      cilindros: 4,
      aspiracion: 'Natural',
      potenciaHp: 75,
      torque: 350,
      torqueRpm: 2400,
      combustible: 'Diesel',
      capacidadTanque: 90
    },
    transmision: {
      tipo: 'Mecánica sincronizada',
      velocidades: '12+12',
      traccion: '4X4',
      embrague: 'Doble de accionamiento mecánico'
    },
    capacidades: {
      levante: 2200,
      arrastre: 9975,
      pesoNeto: 2850,
      tomaDeFuerza: {
        hp: 68,
        estrias: 6,
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 4050,
      ancho: 860,
      alto: 2580,
      neumaticos: '9.5-24/14.9-30 R1',
      entreEjes: 2140,
      alturaMinima: 400,
      contrapesoDelantero: 80,
      contrapesoTrasero: 200
    },
    aplicaciones: ['Palma aceitera', 'Agricultura mediana', 'Cultivos especializados'],
    caracteristicas: [
      'Dos pares de salidas hidráulicas',
      'Flujo constante',
      'Compresor de aire con depósito',
      'Motor 4 cilindros aspiración natural'
    ],
    hectareasMin: 30,
    hectareasMax: 80,
    terrenos: ['plano', 'ondulado'],
    imageUrl: '/assets/tractores/bel75.jpg'
  },
  {
    id: 'bel90',
    modelo: 'BEL 90',
    subtitulo: '',
    categoria: 'Versátil',
    potencia: 90,
    precio: 33162,
    cuotas: 5527,
    numCuotas: 6,
    precioContado: 49095,
    entregaInmediata: true,
    motor: {
      modelo: 'XC4D35ZT',
      tipo: 'Diesel Turbo Euro II',
      cilindros: 4,
      aspiracion: 'Turbo inyección directa',
      potenciaHp: 90,
      torque: 420,
      torqueRpm: 2200,
      combustible: 'Diesel',
      capacidadTanque: 120
    },
    transmision: {
      tipo: 'Mecánica',
      velocidades: '12+12',
      traccion: '4X4',
      embrague: 'Doble independiente de accionamiento mecánico'
    },
    capacidades: {
      levante: 2400,
      arrastre: 10675,
      pesoNeto: 3050,
      tomaDeFuerza: {
        hp: 80.1,
        estrias: 6,
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 4795,
      ancho: 1980,
      alto: 2870,
      neumaticos: '12.4/R24-18.4/R30 R2',
      entreEjes: 1580,
      alturaMinima: 390,
      contrapesoDelantero: 0,
      contrapesoTrasero: 320
    },
    aplicaciones: ['Agricultura intensiva', 'Uso general', 'Trabajos pesados'],
    caracteristicas: [
      'Asiento Ergonómico Grammer',
      'Motor Diesel Turbo bajo consumo',
      'Dirección hidráulica',
      'Compresor de aire de servicio',
      'Válvulas: 2 pares'
    ],
    hectareasMin: 40,
    hectareasMax: 120,
    terrenos: ['plano', 'ondulado', 'montanoso'],
    imageUrl: '/assets/tractores/bel90.jpg'
  },
  {
    id: 'bel105',
    modelo: 'BEL 105',
    subtitulo: 'Ganadero',
    categoria: 'Alto Rendimiento',
    potencia: 105,
    precio: 36490,
    cuotas: 6082,
    numCuotas: 6,
    precioContado: null,
    entregaInmediata: false,
    motor: {
      modelo: 'LR4A3L-23',
      tipo: 'Diesel Euro II',
      cilindros: 4,
      aspiracion: 'Turbo intercooler',
      potenciaHp: 105,
      torque: 435,
      torqueRpm: 2400,
      combustible: 'Diesel',
      capacidadTanque: 147
    },
    transmision: {
      tipo: 'Mecánica sincronizada',
      velocidades: '12+12',
      traccion: '4X4',
      embrague: 'Húmedo'
    },
    capacidades: {
      levante: 3000,
      arrastre: 9975,
      pesoNeto: 2850,
      tomaDeFuerza: {
        hp: 68,
        estrias: 6,
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 4450,
      ancho: 1905,
      alto: 2755,
      neumaticos: '14.9-24/18.4-34 R1',
      entreEjes: 2314,
      alturaMinima: 430,
      contrapesoDelantero: 810,
      contrapesoTrasero: 360
    },
    aplicaciones: ['Ganadería', 'Manejo de pastos', 'Agricultura mediana'],
    caracteristicas: [
      'Asiento Ergonómico Grammer',
      'Motor 4 cilindros turbo intercooler',
      'Tres pares de salidas hidráulicas',
      'Flujo constante',
      'Compresor de aire con depósito'
    ],
    hectareasMin: 50,
    hectareasMax: 150,
    terrenos: ['plano', 'ondulado'],
    imageUrl: '/assets/tractores/bel105.jpg'
  },
  {
    id: 'bel110',
    modelo: 'BEL 110',
    subtitulo: '',
    categoria: 'Alto Rendimiento',
    potencia: 110,
    precio: 43080,
    cuotas: 7180,
    numCuotas: 6,
    precioContado: 55990,
    entregaInmediata: true,
    motor: {
      modelo: 'Huageng4RIZT26',
      tipo: 'Diesel Turbo Intercooler Euro II',
      cilindros: 4,
      aspiracion: 'Turbo intercooler',
      potenciaHp: 110,
      torque: 420,
      torqueRpm: 2200,
      combustible: 'Diesel',
      capacidadTanque: 150
    },
    transmision: {
      tipo: 'Mecánica',
      velocidades: '12+12',
      traccion: '4X4',
      embrague: 'Doble independiente de accionamiento mecánico'
    },
    capacidades: {
      levante: 3200,
      arrastre: 13300,
      pesoNeto: 3800,
      tomaDeFuerza: {
        hp: 100.1,
        estrias: 6,
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 4400,
      ancho: 2150,
      alto: 2750,
      neumaticos: '14.9/R24-18.4/R34',
      entreEjes: 2340,
      alturaMinima: 390,
      contrapesoDelantero: 328,
      contrapesoTrasero: 0
    },
    aplicaciones: ['Agricultura intensiva', 'Uso general pesado', 'Múltiples implementos'],
    caracteristicas: [
      'Asiento Ergonómico Grammer',
      'Barra antivuelco ROPS',
      'Motor Diesel Turbo Intercooler bajo consumo',
      'Dirección hidráulica',
      'Válvulas: 2 pares hidráulicas'
    ],
    hectareasMin: 60,
    hectareasMax: 180,
    terrenos: ['plano', 'ondulado', 'montanoso'],
    imageUrl: '/assets/tractores/bel110.jpg'
  },
  {
    id: 'bel140',
    modelo: 'BEL 140',
    subtitulo: 'Maicero',
    categoria: 'Trabajo Pesado',
    potencia: 140,
    precio: 49990,
    cuotas: 8332,
    numCuotas: 6,
    precioContado: null,
    entregaInmediata: false,
    motor: {
      modelo: 'LR4A3L-23',
      tipo: 'Diesel Euro II',
      cilindros: 6,
      aspiracion: 'Natural',
      potenciaHp: 140,
      torque: 560,
      torqueRpm: 2400,
      combustible: 'Diesel',
      capacidadTanque: 230
    },
    transmision: {
      tipo: 'Mecánica sincronizada',
      velocidades: '12+12',
      traccion: '4X4',
      embrague: 'Doble de accionamiento mecánico'
    },
    capacidades: {
      levante: 4700,
      arrastre: 18200,
      pesoNeto: 5200,
      tomaDeFuerza: {
        hp: 126,
        estrias: 6,
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 5050,
      ancho: 2380,
      alto: 3100,
      neumaticos: '14.9-26/18.4-38 R1',
      entreEjes: 2688,
      alturaMinima: 470,
      contrapesoDelantero: 500,
      contrapesoTrasero: 300
    },
    aplicaciones: ['Maíz', 'Cereales', 'Agricultura extensiva', 'Trabajo pesado'],
    caracteristicas: [
      'Motor 6 cilindros aspiración natural',
      'Tres pares de salidas hidráulicas',
      'Flujo constante',
      'Compresor de aire para neumáticos',
      'Alta capacidad de levante'
    ],
    hectareasMin: 100,
    hectareasMax: 300,
    terrenos: ['plano', 'ondulado'],
    imageUrl: '/assets/tractores/bel140.jpg'
  },
  {
    id: 'bel150',
    modelo: 'BEL 150',
    subtitulo: '',
    categoria: 'Trabajo Pesado',
    potencia: 150,
    precio: 71184,
    cuotas: 11864,
    numCuotas: 6,
    precioContado: 98500,
    entregaInmediata: true,
    motor: {
      modelo: 'Shangchai SC7H160G2',
      tipo: 'Diesel Turbo Intercooler EURO II',
      cilindros: 6,
      aspiracion: 'Turbo intercooler',
      potenciaHp: 150,
      torque: 677,
      torqueRpm: 2200,
      combustible: 'Diesel',
      capacidadTanque: 250
    },
    transmision: {
      tipo: 'Mecánica',
      velocidades: '16+16',
      traccion: '4X4',
      embrague: 'Doble independiente de accionamiento mecánico'
    },
    capacidades: {
      levante: 4500,
      arrastre: 19775,
      pesoNeto: 5650,
      tomaDeFuerza: {
        hp: 136.5,
        estrias: '6-8-21',
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 5300,
      ancho: 3550,
      alto: 3010,
      neumaticos: '480/65/R28-600/65/R38',
      entreEjes: 2727,
      alturaMinima: 450,
      contrapesoDelantero: 800,
      contrapesoTrasero: '480-960'
    },
    aplicaciones: ['Agricultura comercial', 'Trabajo pesado', 'Múltiples implementos', 'Uso intensivo'],
    caracteristicas: [
      'Asiento Ergonómico Grammer',
      'Cabina climatizada con aire acondicionado',
      'Motor Diesel Turbo Intercooler bajo consumo',
      'Válvulas: 3 pares',
      'Transmisión 16+16'
    ],
    hectareasMin: 150,
    hectareasMax: 400,
    terrenos: ['plano', 'ondulado', 'montanoso'],
    imageUrl: '/assets/tractores/bel150.jpg'
  },
  {
    id: 'bel220',
    modelo: 'BEL 220',
    subtitulo: 'El Padrote',
    categoria: 'Trabajo Pesado',
    potencia: 220,
    precio: 92226,
    cuotas: 15371,
    numCuotas: 6,
    precioContado: 136177,
    entregaInmediata: true,
    motor: {
      modelo: 'SC7H220',
      tipo: 'Diesel Turbo Intercooler Euro II',
      cilindros: 6,
      aspiracion: 'Turbo intercooler',
      potenciaHp: 220,
      torque: 860,
      torqueRpm: 2200,
      combustible: 'Diesel',
      capacidadTanque: 350
    },
    transmision: {
      tipo: 'Mecánica',
      velocidades: '16+16',
      traccion: '4X4',
      embrague: 'Doble independiente de accionamiento mecánico'
    },
    capacidades: {
      levante: 4600,
      arrastre: 26250,
      pesoNeto: 7500,
      tomaDeFuerza: {
        hp: 198,
        estrias: '6+8+21',
        rpm: '540/1000'
      }
    },
    dimensiones: {
      largo: 5300,
      ancho: 3600,
      alto: 3150,
      neumaticos: '16.9/R28-20.8/R38 R1 doble trasero',
      entreEjes: 2727,
      alturaMinima: 450,
      contrapesoDelantero: 1280,
      contrapesoTrasero: '480-960'
    },
    aplicaciones: ['Agricultura comercial masiva', 'Trabajo extremo', 'Operaciones industriales'],
    caracteristicas: [
      'Asiento Ergonómico Grammer',
      'Cabina climatizada con aire acondicionado',
      'Motor Diesel Turbo Intercooler bajo consumo',
      '4 pares de salidas hidráulicas con posición flotante',
      'Enganche de remolque y barra de tiro oscilante',
      'Neumáticos doble trasero'
    ],
    hectareasMin: 300,
    hectareasMax: 1000,
    terrenos: ['plano', 'ondulado', 'montanoso'],
    imageUrl: '/assets/tractores/bel220.jpg'
  }
];

export const opcionesFinanciamiento = {
  fraccionado: {
    nombre: 'Compra Directa Fraccionada',
    descripcion: '6 cuotas sin interés',
    cuotas: 6,
    interes: 0
  },
  contado: {
    nombre: 'Entrega Inmediata',
    descripcion: 'Pago de contado + IGTF',
    igtf: 3 // 3% de IGTF
  }
};

export const calcularIGTF = (precio) => {
  return precio * 0.03;
};

export const calcularPrecioConIGTF = (precio) => {
  return precio + calcularIGTF(precio);
};
