// Constantes de costos adicionales
export const COSTOS = {
  IVA: 0.16,
  IGTF: 0.03,
  PLACA: 440
};

// Cálculos básicos
export const calcularCuotaMensual = (precio, numCuotas = 6) => {
  return precio / numCuotas;
};

export const calcularIGTF = (precio) => {
  return precio * COSTOS.IGTF;
};

export const calcularIVA = (precio) => {
  return precio * COSTOS.IVA;
};

export const calcularPrecioConIGTF = (precio) => {
  return precio + calcularIGTF(precio);
};

export const calcularPrecioConIVA = (precio) => {
  return precio + calcularIVA(precio);
};

// Plan 1: Compra Directa
export const calcularCompraDirecta = (precioBase) => {
  const iva = calcularIVA(precioBase);
  const igtf = calcularIGTF(precioBase);
  const placa = COSTOS.PLACA;
  const total = precioBase + iva + igtf + placa;
  
  return {
    precioBase,
    iva,
    igtf,
    placa,
    total,
    tipo: 'Compra Directa',
    descripcion: 'Pago de contado con entrega inmediata'
  };
};

// Plan 2: Compra Directa Fraccionada (6 pagos)
export const calcularFraccionado = (precioBase, numCuotas = 6) => {
  const cuotaMensual = precioBase / numCuotas;
  
  return {
    precioBase,
    cuotas: numCuotas,
    cuotaMensual,
    total: precioBase,
    interes: 0,
    tipo: 'Compra Directa Fraccionada',
    descripcion: `${numCuotas} cuotas sin interés`
  };
};

// Plan 3: Entrega Inmediata 12
export const calcularEntregaInmediata12 = (precioBase) => {
  const inicial = precioBase * 0.40;
  const iva = calcularIVA(precioBase);
  const saldoFinanciar = precioBase * 0.60;
  const cuotaRegular = saldoFinanciar / 12;
  const cuotaEspecial = saldoFinanciar * 0.05;
  
  return {
    precioBase,
    inicial,
    iva,
    saldoFinanciar,
    cuotas: 12,
    cuotaRegular,
    cuotasEspeciales: 3,
    cuotaEspecial,
    total: precioBase + iva,
    tipo: 'Entrega Inmediata 12',
    descripcion: 'Inicial 40% + 12 cuotas + 3 especiales'
  };
};

// Plan 4: Entrega Inmediata 30
export const calcularEntregaInmediata30 = (precioBase) => {
  const inicial = precioBase * 0.3333;
  const iva = calcularIVA(precioBase);
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
    tipo: 'Entrega Inmediata 30',
    descripcion: 'Inicial 33.33% + 30 cuotas iguales'
  };
};

// Plan 5: Credi-BEL 35x35
export const calcularCrediBel35x35 = (precioBase) => {
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
      cuotaMensual: fase1Cuota
    },
    fase2: {
      monto: fase2Monto,
      cuotas: 30,
      cuotaRegular: fase2CuotaRegular,
      cuotasEspeciales: 3,
      cuotaEspecial: fase2CuotaEspecial
    },
    total: precioBase,
    plazoTotal: 36,
    tipo: 'Credi-BEL 35x35',
    descripcion: 'Fase 1: 35% en 6 cuotas | Fase 2: 65% en 30 cuotas'
  };
};

// Plan 6: BEL Ruta 66
export const calcularRuta66 = (precioBase) => {
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
    total: precioBase,
    plazoTotal: 66,
    tipo: 'BEL Ruta 66',
    descripcion: '16 pagos pre-entrega + 50 cuotas post-entrega'
  };
};

// Plan 7: Llévatelo FIAO
export const calcularLlevateloFiao = (precioBase) => {
  const inicial = precioBase * 0.40;
  const pagoInicial = inicial / 6;
  const iva = calcularIVA(precioBase);
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
    tipo: 'Llévatelo FIAO',
    descripcion: 'Inicial 40% en 6 pagos + IVA + 12 cuotas del 5%'
  };
};

// Plan 8: BEL Lease-Plus (Crédito Alemán - cuotas decrecientes)
export const calcularLeasePlus = (precioBase) => {
  const inicial = precioBase * 0.25;
  const montoFinanciado = precioBase * 0.50;
  const valorResidual = precioBase * 0.25;
  const tasaMensual = 0.12 / 12; // 1% mensual
  const plazo = 36;
  
  // Crédito Alemán: amortización constante + intereses decrecientes
  const amortizacionMensual = montoFinanciado / plazo;
  const primeraCuota = amortizacionMensual + (montoFinanciado * tasaMensual);
  const ultimaCuota = amortizacionMensual + (amortizacionMensual * tasaMensual);
  const cuotaPromedio = (primeraCuota + ultimaCuota) / 2;
  
  // Suma de intereses (serie aritmética decreciente)
  const totalIntereses = (montoFinanciado * tasaMensual * (plazo + 1) * plazo) / 2;
  
  return {
    precioBase,
    inicial,
    montoFinanciado,
    valorResidual,
    plazo,
    tasa: 12,
    tasaMensual: tasaMensual * 100,
    primeraCuota,
    ultimaCuota,
    cuotaPromedio,
    totalIntereses,
    total: inicial + montoFinanciado + totalIntereses + valorResidual,
    tipo: 'BEL Lease-Plus',
    descripcion: 'Leasing con cuotas decrecientes y opción de compra'
  };
};

// Función principal de cálculo de financiamiento (mantener compatibilidad)
export const calcularFinanciamiento = (tractor, tipoFinanciamiento = 'fraccionado') => {
  const precioBase = tractor.precio;
  
  switch (tipoFinanciamiento) {
    case 'fraccionado':
      return calcularFraccionado(precioBase, tractor.numCuotas || 6);
    case 'contado':
      return calcularCompraDirecta(precioBase);
    case 'entrega12':
      return calcularEntregaInmediata12(precioBase);
    case 'entrega30':
      return calcularEntregaInmediata30(precioBase);
    case 'credibel':
      return calcularCrediBel35x35(precioBase);
    case 'ruta66':
      return calcularRuta66(precioBase);
    case 'fiao':
      return calcularLlevateloFiao(precioBase);
    case 'lease':
      return calcularLeasePlus(precioBase);
    default:
      return calcularFraccionado(precioBase, tractor.numCuotas || 6);
  }
};

// Función para calcular todos los planes para un tractor
export const calcularTodosLosPlanes = (precioBase) => {
  return {
    compraDirecta: calcularCompraDirecta(precioBase),
    fraccionado: calcularFraccionado(precioBase),
    entrega12: calcularEntregaInmediata12(precioBase),
    entrega30: calcularEntregaInmediata30(precioBase),
    credibel: calcularCrediBel35x35(precioBase),
    ruta66: calcularRuta66(precioBase),
    fiao: calcularLlevateloFiao(precioBase),
    lease: calcularLeasePlus(precioBase)
  };
};

// Función helper para formatear moneda
export const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor);
};
