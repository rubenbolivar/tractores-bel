// Planes de Financiamiento Tractores BEL
// Todos los cálculos en USD

export const COSTOS_ADICIONALES = {
  IVA: 0.16, // 16%
  IGTF: 0.03, // 3%
  PLACA: 440, // USD fijo
  SEGURO: 'incluido' // 1 año incluido
};

export const planesFinanciamiento = [
  {
    id: 'compra-directa',
    nombre: 'Compra Directa y Promociones',
    slug: 'compra-directa',
    descripcion: 'Pago de contado con entrega inmediata',
    tipo: 'contado',
    icono: 'DollarSign',
    color: 'green',
    ventajas: [
      'Entrega inmediata',
      'Sin trámites de financiamiento',
      'Precio preferencial',
      'Seguro incluido 1 año'
    ],
    desventajas: [
      'Requiere pago total inicial',
      'Aplica IGTF del 3%',
      'IVA del 16%'
    ],
    requisitos: [
      'Cédula de identidad o RIF',
      'Comprobante de domicilio'
    ],
    formula: 'P_T = P + IVA(16%) + IGTF(3%) + Placa($440)',
    calcular: (precioBase) => {
      const iva = precioBase * COSTOS_ADICIONALES.IVA;
      const igtf = precioBase * COSTOS_ADICIONALES.IGTF;
      const placa = COSTOS_ADICIONALES.PLACA;
      const total = precioBase + iva + igtf + placa;
      
      return {
        precioBase,
        iva,
        igtf,
        placa,
        total,
        totalAPagar: total,
        desglose: [
          { concepto: 'Precio Base', monto: precioBase },
          { concepto: 'IVA (16%)', monto: iva },
          { concepto: 'IGTF (3%)', monto: igtf },
          { concepto: 'Placa/INTT', monto: placa }
        ]
      };
    }
  },
  {
    id: 'fraccionada-6',
    nombre: 'Compra Directa Fraccionada',
    slug: 'fraccionada-6',
    descripcion: '6 pagos: 5 cuotas en USD + 1 cuota en Bs',
    tipo: 'fraccionado',
    icono: 'CreditCard',
    color: 'blue',
    cuotas: 6,
    ventajas: [
      'Sin intereses',
      'Entrega tras sexto pago',
      'Flexibilidad de pago',
      'Última cuota en Bolívares'
    ],
    desventajas: [
      'Entrega después del último pago',
      'Requiere compromiso de 6 meses'
    ],
    requisitos: [
      'Cédula de identidad o RIF',
      'Referencias bancarias',
      'Comprobante de domicilio'
    ],
    formula: '6 cuotas iguales sin interés',
    calcular: (precioBase) => {
      const cuotaMensual = precioBase / 6;
      const cuotasUSD = cuotaMensual * 5;
      const cuotaBs = cuotaMensual;
      
      return {
        precioBase,
        cuotas: 6,
        cuotaMensual,
        cuotasUSD: 5,
        cuotaBs: 1,
        total: precioBase,
        totalAPagar: precioBase,
        interes: 0,
        desglose: [
          { concepto: '5 Cuotas en USD', monto: cuotaMensual, cantidad: 5 },
          { concepto: '1 Cuota en Bs', monto: cuotaBs, nota: 'Al tipo de cambio del día' }
        ]
      };
    }
  },
  {
    id: 'plan-ei-12',
    nombre: 'Plan Entrega Inmediata 12',
    slug: 'entrega-inmediata-12',
    descripcion: 'Inicial 40% + 12 cuotas + 3 especiales',
    tipo: 'financiado',
    icono: 'TrendingUp',
    color: 'purple',
    inicial: 0.40,
    cuotas: 12,
    cuotasEspeciales: 3,
    ventajas: [
      'Entrega inmediata',
      'Inicial accesible del 40%',
      'IVA previo en Bolívares',
      '15 pagos en total'
    ],
    desventajas: [
      'Requiere inicial del 40%',
      'IVA debe pagarse antes de entrega',
      'Cuotas especiales adicionales'
    ],
    requisitos: [
      'Inicial del 40%',
      'IVA en Bs previo a entrega',
      'Referencias comerciales',
      'Comprobante de ingresos'
    ],
    formula: 'Inicial 40% + IVA previo + 60% en 12 cuotas + 3 especiales',
    calcular: (precioBase) => {
      const inicial = precioBase * 0.40;
      const iva = precioBase * COSTOS_ADICIONALES.IVA;
      const saldoFinanciar = precioBase * 0.60;
      const cuotaRegular = saldoFinanciar / 12;
      const cuotaEspecial = saldoFinanciar * 0.05;
      
      return {
        precioBase,
        inicial,
        iva,
        saldoFinanciar,
        cuotas: 12,
        cuotaMensual: cuotaRegular,
        cuotasEspeciales: 3,
        cuotaEspecial,
        total: precioBase + iva,
        totalAPagar: precioBase + iva,
        desglose: [
          { concepto: 'Inicial (40%)', monto: inicial },
          { concepto: 'IVA en Bs (16%)', monto: iva, nota: 'Previo a entrega' },
          { concepto: '12 Cuotas regulares', monto: cuotaRegular, cantidad: 12 },
          { concepto: '3 Cuotas especiales', monto: cuotaEspecial, cantidad: 3 }
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
      'IVA previo en Bolívares'
    ],
    desventajas: [
      'Inicial del 33.33%',
      'Compromiso de 30 meses',
      'IVA previo requerido'
    ],
    requisitos: [
      'Inicial del 33.33%',
      'IVA en Bs previo',
      'Referencias comerciales sólidas',
      'Historial crediticio'
    ],
    formula: 'Inicial 33.33% + IVA previo + 66.67% en 30 cuotas iguales',
    calcular: (precioBase) => {
      const inicial = precioBase * 0.3333;
      const iva = precioBase * COSTOS_ADICIONALES.IVA;
      const saldoFinanciar = precioBase * 0.6667;
      const cuotaMensual = saldoFinanciar / 30;
      
      return {
        precioBase,
        inicial,
        iva,
        saldoFinanciar,
        cuotas: 30,
        cuotaMensual,
        total: precioBase + iva,
        totalAPagar: precioBase + iva,
        desglose: [
          { concepto: 'Inicial (33.33%)', monto: inicial },
          { concepto: 'IVA en Bs (16%)', monto: iva, nota: 'Previo a entrega' },
          { concepto: '30 Cuotas iguales', monto: cuotaMensual, cantidad: 30 }
        ]
      };
    }
  },
  {
    id: 'credibel-35x35',
    nombre: 'Credi-BEL 35x35',
    slug: 'credibel-35x35',
    descripcion: 'Fase 1: 35% en 6 cuotas | Fase 2: 65% en 30 cuotas',
    tipo: 'financiado',
    icono: 'Layers',
    color: 'green',
    fases: 2,
    ventajas: [
      'Sin inicial, comienza con cuotas',
      'Entrega después de Fase 1',
      'Cuotas accesibles en Fase 1',
      'Plazo total de 36 meses'
    ],
    desventajas: [
      'Entrega después de 6 meses',
      'Dos fases de pago',
      'Cuotas especiales en Fase 2'
    ],
    requisitos: [
      'Referencias comerciales',
      'Comprobante de ingresos',
      'Aval o garantía',
      'Historial crediticio'
    ],
    formula: 'Fase 1: 35% en 6 cuotas (pre-entrega) | Fase 2: 65% en 30 cuotas + 3 especiales (post-entrega)',
    calcular: (precioBase) => {
      const fase1Monto = precioBase * 0.35;
      const fase1Cuota = fase1Monto / 6;
      const fase2Monto = precioBase * 0.65;
      const fase2CuotaRegular = fase2Monto / 30;
      const fase2CuotaEspecial = fase2Monto * 0.05;
      
      return {
        precioBase,
        fase1: {
          monto: fase1Monto,
          cuotas: 6,
          cuotaMensual: fase1Cuota,
          descripcion: 'Pre-entrega'
        },
        fase2: {
          monto: fase2Monto,
          cuotas: 30,
          cuotaRegular: fase2CuotaRegular,
          cuotasEspeciales: 3,
          cuotaEspecial: fase2CuotaEspecial,
          descripcion: 'Post-entrega'
        },
        cuotaMensual: fase1Cuota,
        total: precioBase,
        totalAPagar: precioBase,
        plazoTotal: 36,
        desglose: [
          { concepto: 'Fase 1: 6 cuotas (35%)', monto: fase1Cuota, cantidad: 6 },
          { concepto: 'Entrega del tractor', monto: 0, nota: 'Después de Fase 1' },
          { concepto: 'Fase 2: 30 cuotas (65%)', monto: fase2CuotaRegular, cantidad: 30 },
          { concepto: 'Fase 2: 3 especiales', monto: fase2CuotaEspecial, cantidad: 3 }
        ]
      };
    }
  },
  {
    id: 'ruta-66',
    nombre: 'BEL Ruta 66',
    slug: 'ruta-66',
    descripcion: '16 pagos pre-entrega + 50 cuotas post-entrega',
    tipo: 'financiado',
    icono: 'Route',
    color: 'orange',
    plazoTotal: 66,
    ventajas: [
      'Plazo más largo: 66 meses',
      'Cuotas muy accesibles',
      'Ideal para flujo de caja limitado',
      'Sin inicial'
    ],
    desventajas: [
      'Entrega después de 16 meses',
      'Compromiso de 5.5 años',
      'Mayor tiempo de espera'
    ],
    requisitos: [
      'Referencias comerciales sólidas',
      'Historial crediticio comprobado',
      'Aval o garantía',
      'Comprobante de ingresos estables'
    ],
    formula: '16 pagos pre-entrega + 50 cuotas post-entrega = 66 meses',
    calcular: (precioBase) => {
      const montoPreEntrega = precioBase * 0.30;
      const cuotaPreEntrega = montoPreEntrega / 16;
      const montoPostEntrega = precioBase * 0.70;
      const cuotaPostEntrega = montoPostEntrega / 50;
      
      return {
        precioBase,
        preEntrega: {
          cuotas: 16,
          monto: montoPreEntrega,
          cuotaMensual: cuotaPreEntrega
        },
        postEntrega: {
          cuotas: 50,
          monto: montoPostEntrega,
          cuotaMensual: cuotaPostEntrega
        },
        cuotaMensual: cuotaPreEntrega,
        total: precioBase,
        totalAPagar: precioBase,
        plazoTotal: 66,
        desglose: [
          { concepto: '16 Pagos pre-entrega', monto: cuotaPreEntrega, cantidad: 16 },
          { concepto: 'Entrega del tractor', monto: 0, nota: 'Mes 17' },
          { concepto: '50 Cuotas post-entrega', monto: cuotaPostEntrega, cantidad: 50 }
        ]
      };
    }
  },
  {
    id: 'llevatelo-fiao',
    nombre: 'Llévatelo FIAO',
    slug: 'llevatelo-fiao',
    descripcion: 'Inicial 40% en 6 pagos + IVA + 12 cuotas del 5%',
    tipo: 'financiado',
    icono: 'Handshake',
    color: 'teal',
    inicial: 0.40,
    cuotas: 12,
    ventajas: [
      'Inicial fraccionada en 6 pagos',
      'Entrega después de inicial',
      'Cuotas fijas del 5%',
      'Proceso simplificado'
    ],
    desventajas: [
      'Requiere 40% de inicial',
      'IVA previo en Bolívares',
      'Entrega después de 6 pagos'
    ],
    requisitos: [
      'Afiliación + 5 pagos (40%)',
      'IVA en Bs antes de entrega',
      'Referencias personales',
      'Comprobante de domicilio'
    ],
    formula: 'Inicial 40% (6 pagos) + IVA en Bs + 12 cuotas del 5% cada una',
    calcular: (precioBase) => {
      const inicial = precioBase * 0.40;
      const pagoInicial = inicial / 6;
      const iva = precioBase * COSTOS_ADICIONALES.IVA;
      const cuotaMensual = precioBase * 0.05;
      
      return {
        precioBase,
        inicial,
        pagosIniciales: 6,
        pagoInicial,
        iva,
        cuotas: 12,
        cuotaMensual,
        total: precioBase + iva,
        totalAPagar: precioBase + iva,
        desglose: [
          { concepto: 'Afiliación + 5 pagos (40%)', monto: pagoInicial, cantidad: 6 },
          { concepto: 'IVA en Bs (16%)', monto: iva, nota: 'Antes de entrega' },
          { concepto: 'Entrega del tractor', monto: 0, nota: 'Después de inicial' },
          { concepto: '12 Cuotas del 5%', monto: cuotaMensual, cantidad: 12 }
        ]
      };
    }
  },
  {
    id: 'lease-plus',
    nombre: 'BEL Lease-Plus',
    slug: 'lease-plus',
    descripcion: 'Leasing con opción de compra - Cuotas decrecientes',
    tipo: 'leasing',
    icono: 'FileText',
    color: 'violet',
    inicial: 0.25,
    financiado: 0.50,
    valorResidual: 0.25,
    plazo: 36,
    tasa: 0.12,
    ventajas: [
      'Inicial solo del 25%',
      'Cuotas decrecientes',
      'Opción de compra al final',
      'Beneficios fiscales'
    ],
    desventajas: [
      'Tasa de interés del 12% anual',
      'Valor residual del 25%',
      'Requiere análisis crediticio'
    ],
    requisitos: [
      'Inicial del 25%',
      'Estados financieros',
      'Referencias bancarias',
      'Análisis crediticio completo'
    ],
    formula: 'Inicial 25% + Financiado 50% a 36 meses (12% anual) + Valor residual 25% (Crédito Alemán)',
    calcular: (precioBase) => {
      const inicial = precioBase * 0.25;
      const montoFinanciado = precioBase * 0.50;
      const valorResidual = precioBase * 0.25;
      const tasaMensual = 0.12 / 12; // 1% mensual
      
      // Crédito Alemán: Amortización constante, intereses decrecientes
      const amortizacionMensual = montoFinanciado / 36;
      
      // Primera cuota (interés sobre monto total)
      const primeraCuota = amortizacionMensual + (montoFinanciado * tasaMensual);
      
      // Última cuota (interés solo sobre última amortización)
      const ultimaCuota = amortizacionMensual + (amortizacionMensual * tasaMensual);
      
      // Cuota promedio
      const cuotaPromedio = (primeraCuota + ultimaCuota) / 2;
      
      // Total de intereses (suma de serie aritmética decreciente)
      // Fórmula: Monto × Tasa × (n + 1) / 2
      const totalIntereses = montoFinanciado * tasaMensual * ((36 + 1) / 2);
      
      return {
        precioBase,
        inicial,
        montoFinanciado,
        valorResidual,
        plazo: 36,
        tasa: 12,
        tasaMensual: tasaMensual * 100,
        amortizacionMensual,
        primeraCuota,
        ultimaCuota,
        cuotaPromedio,
        cuotaMensual: cuotaPromedio,
        totalIntereses,
        total: inicial + montoFinanciado + totalIntereses + valorResidual,
        totalAPagar: inicial + montoFinanciado + totalIntereses + valorResidual,
        desglose: [
          { concepto: 'Inicial (25%)', monto: inicial },
          { concepto: 'Monto financiado (50%)', monto: montoFinanciado, nota: 'A 36 meses' },
          { concepto: 'Primera cuota', monto: primeraCuota, nota: 'Mes 1 - Cuota más alta' },
          { concepto: 'Cuota promedio', monto: cuotaPromedio, nota: '36 cuotas decrecientes' },
          { concepto: 'Última cuota', monto: ultimaCuota, nota: 'Mes 36 - Cuota más baja' },
          { concepto: 'Total intereses (12% anual)', monto: totalIntereses },
          { concepto: 'Valor residual (25%)', monto: valorResidual, nota: 'Opción de compra al finalizar' }
        ]
      };
    }
  }
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