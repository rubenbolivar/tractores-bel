// Planes de Financiamiento Tractores BEL
// Todos los cálculos en USD
// IMPORTANTE: IVA e IGTF NO están incluidos en los precios de financiamiento

export const COSTOS_ADICIONALES = {
  IVA: 0.16, // 16% - NO incluido en financiamiento
  IGTF: 0.03, // 3% - NO incluido en financiamiento  
  SEGURO: 'incluido' // 1 año incluido
};

export const planesFinanciamiento = [
  {
    id: 'fraccionada-6',
    nombre: 'Compra Directa Fraccionada',
    slug: 'fraccionada-6',
    descripcion: '6 pagos: 5 cuotas en USD + 1 cuota en Bs',
    tipo: 'fraccionado',
    icono: 'CreditCard',
    color: 'blue',
    destacado: true, // Plan destacado/recomendado
    cuotas: 6,
    ventajas: [
      'Sin intereses',
      'Entrega tras sexto pago',
      'Flexibilidad de pago',
      'Última cuota en Bolívares',
      'Precio especial fraccionado'
    ],
    desventajas: [
      'Entrega después del último pago',
      'Requiere compromiso de 6 meses',
      'IVA e IGTF no incluidos'
    ],
    requisitos: [
      'Cédula de identidad o RIF',
      'Referencias bancarias',
      'Comprobante de domicilio'
    ],
    formula: '6 cuotas iguales sin interés - Precio especial por modelo',
    // Precios especiales por modelo para plan fraccionado
    preciosEspeciales: {
      'bel50': 14970,
      'bel60': 21840,
      'bel75': 23902,
      'bel90': 33162,
      'bel105': 36490,
      'bel110': 43080,
      'bel140': 49990,
      'bel150': 71184,
      'bel220': 92226
    },
    calcular: function(precioBase, tractorId) {
      // Usar precio especial si está disponible, sino usar precio base
      const precioFraccionado = this.preciosEspeciales?.[tractorId] || precioBase;
      const cuotaMensual = precioFraccionado / 6;
      
      return {
        precioBase: precioFraccionado,
        cuotas: 6,
        cuotaMensual,
        cuotasUSD: 5,
        cuotaBs: 1,
        total: precioFraccionado,
        totalAPagar: precioFraccionado,
        interes: 0,
        desglose: [
          { concepto: 'Precio Total Fraccionado', monto: precioFraccionado, nota: 'Precio especial para este plan' },
          { concepto: '5 Cuotas en USD', monto: cuotaMensual, cantidad: 5 },
          { concepto: '1 Cuota en Bs', monto: cuotaMensual, nota: 'Al tipo de cambio BCV del día' },
          { concepto: 'IGTF', monto: 0, nota: 'NO incluido - Se paga aparte según normativa' }
        ]
      };
    }
  },
  {
    id: 'entrega-inmediata-contado',
    nombre: 'Entrega Inmediata - Pago de Contado',
    slug: 'entrega-inmediata-contado',
    descripcion: 'Pago único con entrega inmediata',
    tipo: 'contado',
    icono: 'DollarSign',
    color: 'green',
    ventajas: [
      'Entrega inmediata',
      'Sin trámites de financiamiento',
      'Precio preferencial de contado',
      'Seguro incluido 1 año',
      'Disponible solo en modelos seleccionados'
    ],
    desventajas: [
      'Requiere pago total inicial',
      'IGTF no incluido',
      'Solo disponible en 5 modelos'
    ],
    requisitos: [
      'Cédula de identidad o RIF',
      'Comprobante de domicilio',
      'Pago en USD o transferencia'
    ],
    formula: 'Precio de contado (IGTF no incluido)',
    // Precios de contado solo para modelos con entrega inmediata
    preciosContado: {
      'bel60': 31563,
      'bel90': 49095,
      'bel110': 55990,
      'bel150': 98500,
      'bel220': 136177
    },
    calcular: function(precioBase, tractorId) {
      const precioContado = this.preciosContado?.[tractorId];
      
      // Si el modelo no tiene precio de contado, no está disponible
      if (!precioContado) {
        return {
          precioBase,
          disponible: false,
          total: 0,
          totalAPagar: 0,
          cuotaMensual: 0,
          desglose: [
            { concepto: 'No Disponible', monto: 0, nota: 'Este modelo no está disponible en pago de contado' }
          ]
        };
      }
      
      return {
        precioBase: precioContado,
        disponible: true,
        total: precioContado,
        totalAPagar: precioContado,
        cuotaMensual: precioContado,
        desglose: [
          { concepto: 'Precio de Contado', monto: precioContado, nota: 'Entrega inmediata' },
          { concepto: 'IGTF (3%)', monto: 0, nota: 'NO incluido - Aplica según forma de pago' }
        ]
      };
    }
  },
  {
    id: 'plan-ei-12',
    nombre: 'Plan Entrega Inmediata 12',
    slug: 'entrega-inmediata-12',
    descripcion: 'Inicial 40% + 12 cuotas + 3 especiales (meses 3, 6 y 9)',
    tipo: 'financiado',
    icono: 'TrendingUp',
    color: 'purple',
    inicial: 0.40,
    cuotas: 12,
    cuotasEspeciales: 3,
    ventajas: [
      'Entrega inmediata',
      'Inicial accesible del 40%',
      '15 pagos en total',
      'Cuotas especiales en meses 3, 6 y 9'
    ],
    desventajas: [
      'Requiere inicial del 40%',
      'Cuotas especiales se suman a regulares',
      'IGTF no incluido'
    ],
    requisitos: [
      'Inicial del 40%',
      'Referencias comerciales',
      'Comprobante de ingresos'
    ],
    formula: 'Inicial 40% + 12 cuotas regulares + 3 especiales (meses 3, 6, 9)',
    // Datos específicos por modelo
    datosModelo: {
      'bel50': { precioFinal: 26125.53, inicial: 10450.21, cuotaRegular: 870.85, cuotaEspecial: 1741.70 },
      'bel60': { precioFinal: 38115.00, inicial: 15246.00, cuotaRegular: 1270.50, cuotaEspecial: 2541.00 },
      'bel75': { precioFinal: 41713.59, inicial: 16685.43, cuotaRegular: 1390.45, cuotaEspecial: 2780.91 },
      'bel90': { precioFinal: 57874.07, inicial: 23149.63, cuotaRegular: 1929.14, cuotaEspecial: 3858.27 },
      'bel105': { precioFinal: 63682.07, inicial: 25472.83, cuotaRegular: 2122.74, cuotaEspecial: 4245.47 },
      'bel110': { precioFinal: 75188.13, inicial: 30075.25, cuotaRegular: 2506.27, cuotaEspecial: 5012.54 },
      'bel140': { precioFinal: 87272.50, inicial: 34909.00, cuotaRegular: 2909.08, cuotaEspecial: 5818.17 },
      'bel150': { precioFinal: 124249.20, inicial: 49699.68, cuotaRegular: 4141.64, cuotaEspecial: 8283.28 },
      'bel220': { precioFinal: 160948.79, inicial: 64379.51, cuotaRegular: 5364.96, cuotaEspecial: 10729.92 }
    },
    calcular: function(precioBase, tractorId) {
      const datos = this.datosModelo?.[tractorId];
      
      if (!datos) {
        // Fallback si no hay datos específicos
        const inicial = precioBase * 0.40;
        const saldoFinanciar = precioBase * 0.60;
        const cuotaRegular = saldoFinanciar / 12;
        const cuotaEspecial = saldoFinanciar * 0.05;
        
        return {
          precioBase,
          inicial,
          cuotas: 12,
          cuotaMensual: cuotaRegular,
          cuotasEspeciales: 3,
          cuotaEspecial,
          totalAPagar: precioBase,
          desglose: [
            { concepto: 'Inicial (40%)', monto: inicial },
            { concepto: '12 Cuotas regulares', monto: cuotaRegular, cantidad: 12 },
            { concepto: '3 Cuotas especiales', monto: cuotaEspecial, cantidad: 3, nota: 'Meses 3, 6 y 9' }
          ]
        };
      }
      
      return {
        precioBase: datos.precioFinal,
        inicial: datos.inicial,
        cuotas: 12,
        cuotaMensual: datos.cuotaRegular,
        cuotasEspeciales: 3,
        cuotaEspecial: datos.cuotaEspecial,
        totalAPagar: datos.precioFinal,
        desglose: [
          { concepto: 'Inicial (40%)', monto: datos.inicial },
          { concepto: '12 Cuotas regulares', monto: datos.cuotaRegular, cantidad: 12 },
          { concepto: '3 Cuotas especiales', monto: datos.cuotaEspecial, cantidad: 3, nota: 'Se pagan en meses 3, 6 y 9 (se suman a cuota regular)' }
        ]
      };
    }
  },
  {
    id: 'plan-ei-30',
    nombre: 'Plan Entrega Inmediata 30',
    slug: 'entrega-inmediata-30',
    descripcion: 'Inicial 33.33% + 30 cuotas iguales',
    tipo: 'financiado',
    icono: 'Calendar',
    color: 'indigo',
    inicial: 0.3333,
    cuotas: 30,
    ventajas: [
      'Entrega inmediata',
      'Cuotas más bajas',
      'Plazo extendido de 30 meses',
      'Sin intereses'
    ],
    desventajas: [
      'Inicial del 33.33%',
      'Compromiso de 30 meses',
      'IGTF no incluido'
    ],
    requisitos: [
      'Inicial del 33.33%',
      'Referencias comerciales sólidas',
      'Historial crediticio'
    ],
    formula: 'Inicial 33.33% + 30 cuotas iguales',
    // Datos específicos por modelo
    datosModelo: {
      'bel50': { precioFinal: 34615.25, inicial: 11538.42, cuotaMensual: 769.23 },
      'bel60': { precioFinal: 50500.80, inicial: 16833.60, cuotaMensual: 1122.24 },
      'bel75': { precioFinal: 55268.78, inicial: 18422.93, cuotaMensual: 1228.20 },
      'bel90': { precioFinal: 76680.75, inicial: 25560.25, cuotaMensual: 1704.02 },
      'bel105': { precioFinal: 84376.11, inicial: 28125.37, cuotaMensual: 1875.02 },
      'bel110': { precioFinal: 99614.22, inicial: 33204.74, cuotaMensual: 2213.65 },
      'bel140': { precioFinal: 115592.26, inicial: 38530.75, cuotaMensual: 2568.72 },
      'bel150': { precioFinal: 164599.31, inicial: 54866.44, cuotaMensual: 3657.76 },
      'bel220': { precioFinal: 213254.89, inicial: 71084.96, cuotaMensual: 4738.99 }
    },
    calcular: function(precioBase, tractorId) {
      const datos = this.datosModelo?.[tractorId];
      
      if (!datos) {
        // Fallback si no hay datos específicos
        const inicial = precioBase * 0.3333;
        const saldoFinanciar = precioBase * 0.6667;
        const cuotaMensual = saldoFinanciar / 30;
        
        return {
          precioBase,
          inicial,
          cuotas: 30,
          cuotaMensual,
          totalAPagar: precioBase,
          desglose: [
            { concepto: 'Inicial (33.33%)', monto: inicial },
            { concepto: '30 Cuotas iguales', monto: cuotaMensual, cantidad: 30 }
          ]
        };
      }
      
      return {
        precioBase: datos.precioFinal,
        inicial: datos.inicial,
        cuotas: 30,
        cuotaMensual: datos.cuotaMensual,
        totalAPagar: datos.precioFinal,
        desglose: [
          { concepto: 'Inicial (33.33%)', monto: datos.inicial },
          { concepto: '30 Cuotas iguales', monto: datos.cuotaMensual, cantidad: 30 }
        ]
      };
    }
  },
  {
    id: 'credibel-35x35',
    nombre: 'Credi-BEL 35x35',
    slug: 'credibel-35x35',
    descripcion: 'Inicial 40% en 6 partes + 29 cuotas iguales',
    tipo: 'financiado',
    icono: 'Layers',
    color: 'green',
    fases: 2,
    inicial: 0.40,
    cuotas: 29,
    ventajas: [
      'Inicial fraccionada en 6 pagos',
      'Entrega después de inicial',
      'Cuotas accesibles',
      'Plazo total de 35 meses'
    ],
    desventajas: [
      'Requiere 40% de inicial',
      'Entrega después de 6 pagos',
      'IGTF no incluido'
    ],
    requisitos: [
      'Referencias comerciales',
      'Comprobante de ingresos',
      'Aval o garantía',
      'Historial crediticio'
    ],
    formula: 'Inicial 40% en 6 partes + 29 cuotas iguales',
    // Datos específicos por modelo
    datosModelo: {
      'bel50': { precioFinal: 25961.44, inicial: 10384.57, pagoInicial: 1730.76, cuotaMensual: 537.13 },
      'bel60': { precioFinal: 37875.60, inicial: 15150.24, pagoInicial: 2525.04, cuotaMensual: 783.63 },
      'bel75': { precioFinal: 41451.58, inicial: 16580.63, pagoInicial: 2763.44, cuotaMensual: 857.62 },
      'bel90': { precioFinal: 57510.56, inicial: 23004.22, pagoInicial: 3834.04, cuotaMensual: 1189.87 },
      'bel105': { precioFinal: 63282.08, inicial: 25312.83, pagoInicial: 4218.81, cuotaMensual: 1309.28 },
      'bel110': { precioFinal: 74710.66, inicial: 29884.27, pagoInicial: 4980.71, cuotaMensual: 1545.74 },
      'bel140': { precioFinal: 86694.19, inicial: 34677.68, pagoInicial: 5779.61, cuotaMensual: 1793.67 },
      'bel150': { precioFinal: 123449.48, inicial: 49379.79, pagoInicial: 8229.97, cuotaMensual: 2554.13 },
      'bel220': { precioFinal: 159941.17, inicial: 63976.47, pagoInicial: 10662.74, cuotaMensual: 3309.13 }
    },
    calcular: function(precioBase, tractorId) {
      const datos = this.datosModelo?.[tractorId];
      
      if (!datos) {
        // Fallback
        const inicial = precioBase * 0.40;
        const pagoInicial = inicial / 6;
        const saldoFinanciar = precioBase - inicial;
        const cuotaMensual = saldoFinanciar / 29;
        
        return {
          precioBase,
          inicial,
          pagoInicial,
          cuotas: 29,
          cuotaMensual,
          totalAPagar: precioBase,
          desglose: [
            { concepto: 'Inicial en 6 pagos (40%)', monto: pagoInicial, cantidad: 6 },
            { concepto: 'Entrega del tractor', monto: 0, nota: 'Después de inicial' },
            { concepto: '29 Cuotas iguales', monto: cuotaMensual, cantidad: 29 }
          ]
        };
      }
      
      return {
        precioBase: datos.precioFinal,
        inicial: datos.inicial,
        pagoInicial: datos.pagoInicial,
        cuotas: 29,
        cuotaMensual: datos.cuotaMensual,
        totalAPagar: datos.precioFinal,
        plazoTotal: 35,
        desglose: [
          { concepto: 'Inicial en 6 pagos (40%)', monto: datos.pagoInicial, cantidad: 6, nota: 'Pre-entrega' },
          { concepto: 'Entrega del tractor', monto: 0, nota: 'Después de pagar inicial' },
          { concepto: '29 Cuotas iguales', monto: datos.cuotaMensual, cantidad: 29, nota: 'Post-entrega' }
        ]
      };
    }
  },
  {
    id: 'llevatelo-fiao',
    nombre: 'Llévatelo FIAO',
    slug: 'llevatelo-fiao',
    descripcion: 'Inicial 50% en 6 pagos + 12 cuotas iguales',
    tipo: 'financiado',
    icono: 'Handshake',
    color: 'teal',
    inicial: 0.50,
    cuotas: 12,
    ventajas: [
      'Inicial fraccionada en 6 pagos',
      'Entrega después de inicial',
      'Cuotas iguales',
      'Proceso simplificado'
    ],
    desventajas: [
      'Requiere 50% de inicial',
      'Entrega después de 6 pagos',
      'IGTF no incluido'
    ],
    requisitos: [
      'Inicial 50% en 6 pagos',
      'Referencias personales',
      'Comprobante de domicilio'
    ],
    formula: 'Inicial 50% en 6 partes + 12 cuotas iguales',
    // Datos específicos por modelo
    datosModelo: {
      'bel50': { precioFinal: 21634.53, inicial: 10817.27, pagoInicial: 1802.88, cuotaMensual: 901.44 },
      'bel60': { precioFinal: 31563.00, inicial: 15781.50, pagoInicial: 2630.25, cuotaMensual: 1315.13 },
      'bel75': { precioFinal: 34542.98, inicial: 17271.49, pagoInicial: 2878.58, cuotaMensual: 1439.29 },
      'bel90': { precioFinal: 47925.47, inicial: 23962.73, pagoInicial: 3993.79, cuotaMensual: 1996.89 },
      'bel105': { precioFinal: 52735.07, inicial: 26367.53, pagoInicial: 4394.59, cuotaMensual: 2197.29 },
      'bel110': { precioFinal: 62258.88, inicial: 31129.44, pagoInicial: 5188.24, cuotaMensual: 2594.12 },
      'bel140': { precioFinal: 72248.17, inicial: 36124.08, pagoInicial: 6020.68, cuotaMensual: 3010.34 },
      'bel150': { precioFinal: 102874.57, inicial: 51437.28, pagoInicial: 8572.88, cuotaMensual: 4286.44 },
      'bel220': { precioFinal: 133284.31, inicial: 66642.15, pagoInicial: 11107.03, cuotaMensual: 5553.51 }
    },
    calcular: function(precioBase, tractorId) {
      const datos = this.datosModelo?.[tractorId];
      
      if (!datos) {
        // Fallback
        const inicial = precioBase * 0.50;
        const pagoInicial = inicial / 6;
        const cuotaMensual = inicial / 12;
        
        return {
          precioBase,
          inicial,
          pagoInicial,
          cuotas: 12,
          cuotaMensual,
          totalAPagar: precioBase,
          desglose: [
            { concepto: 'Inicial en 6 pagos (50%)', monto: pagoInicial, cantidad: 6 },
            { concepto: 'Entrega del tractor', monto: 0, nota: 'Después de inicial' },
            { concepto: '12 Cuotas iguales', monto: cuotaMensual, cantidad: 12 }
          ]
        };
      }
      
      return {
        precioBase: datos.precioFinal,
        inicial: datos.inicial,
        pagoInicial: datos.pagoInicial,
        cuotas: 12,
        cuotaMensual: datos.cuotaMensual,
        totalAPagar: datos.precioFinal,
        plazoTotal: 18,
        desglose: [
          { concepto: 'Inicial en 6 pagos (50%)', monto: datos.pagoInicial, cantidad: 6, nota: 'Pre-entrega' },
          { concepto: 'Entrega del tractor', monto: 0, nota: 'Después de pagar inicial' },
          { concepto: '12 Cuotas iguales', monto: datos.cuotaMensual, cantidad: 12, nota: 'Post-entrega' }
        ]
      };
    }
  },
  {
    id: 'en-la-romana',
    nombre: 'En La Romana',
    slug: 'en-la-romana',
    descripcion: 'Inicial 35% + 4 cuotas semestrales',
    tipo: 'financiado',
    icono: 'Calendar',
    color: 'blue',
    inicial: 0.35,
    cuotas: 4,
    cuotasSemestrales: true,
    ventajas: [
      'Solo 4 pagos semestrales',
      'Inicial accesible del 35%',
      'Plazo de 2 años',
      'Cuotas cada 6 meses'
    ],
    desventajas: [
      'Requiere 35% de inicial',
      'Cuotas semestrales grandes',
      'IGTF no incluido'
    ],
    requisitos: [
      'Inicial del 35%',
      'Referencias comerciales',
      'Comprobante de ingresos',
      'Capacidad de pago semestral'
    ],
    formula: 'Inicial 35% + 4 cuotas semestrales (cada 6 meses)',
    // Datos específicos por modelo
    datosModelo: {
      'bel50': { precioFinal: 32451.79, inicial: 11358.13, cuotaSemestral: 5273.42 },
      'bel60': { precioFinal: 47344.50, inicial: 16570.58, cuotaSemestral: 7693.48 },
      'bel75': { precioFinal: 51814.48, inicial: 18135.07, cuotaSemestral: 8419.85 },
      'bel90': { precioFinal: 71888.20, inicial: 25160.87, cuotaSemestral: 11681.83 },
      'bel105': { precioFinal: 79102.60, inicial: 27685.91, cuotaSemestral: 12854.17 },
      'bel110': { precioFinal: 93388.33, inicial: 32685.91, cuotaSemestral: 15175.60 },
      'bel140': { precioFinal: 108367.75, inicial: 37928.71, cuotaSemestral: 17609.76 },
      'bel150': { precioFinal: 154311.85, inicial: 54009.15, cuotaSemestral: 25075.68 },
      'bel220': { precioFinal: 199926.46, inicial: 69974.26, cuotaSemestral: 32488.05 }
    },
    calcular: function(precioBase, tractorId) {
      const datos = this.datosModelo?.[tractorId];
      
      if (!datos) {
        // Fallback
        const inicial = precioBase * 0.35;
        const saldoFinanciar = precioBase - inicial;
        const cuotaSemestral = saldoFinanciar / 4;
        
        return {
          precioBase,
          inicial,
          cuotas: 4,
          cuotaMensual: cuotaSemestral,
          cuotaSemestral,
          totalAPagar: precioBase,
          desglose: [
            { concepto: 'Inicial (35%)', monto: inicial },
            { concepto: '4 Cuotas semestrales', monto: cuotaSemestral, cantidad: 4, nota: 'Cada 6 meses' }
          ]
        };
      }
      
      return {
        precioBase: datos.precioFinal,
        inicial: datos.inicial,
        cuotas: 4,
        cuotaMensual: datos.cuotaSemestral,
        cuotaSemestral: datos.cuotaSemestral,
        totalAPagar: datos.precioFinal,
        plazoTotal: 24,
        desglose: [
          { concepto: 'Inicial (35%)', monto: datos.inicial },
          { concepto: '4 Cuotas semestrales', monto: datos.cuotaSemestral, cantidad: 4, nota: 'Cada 6 meses (meses 6, 12, 18, 24)' }
        ]
      };
    }
  },
];

// Función helper para obtener un plan por slug
export const getPlanBySlug = (slug) => {
  return planesFinanciamiento.find(plan => plan.slug === slug);
};

// Función helper para obtener planes por tipo
export const getPlanesByTipo = (tipo) => {
  return planesFinanciamiento.filter(plan => plan.tipo === tipo);
};

// Función para calcular todos los planes para un tractor
export const calcularTodosLosPlanes = (precioBase) => {
  return planesFinanciamiento.map(plan => ({
    ...plan,
    calculo: plan.calcular ? plan.calcular(precioBase) : null
  }));
};