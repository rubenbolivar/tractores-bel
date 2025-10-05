export const calcularCuotaMensual = (precio, numCuotas = 6) => {
  return precio / numCuotas;
};

export const calcularIGTF = (precio) => {
  return precio * 0.03;
};

export const calcularPrecioConIGTF = (precio) => {
  return precio + calcularIGTF(precio);
};

export const calcularFinanciamiento = (tractor, tipoFinanciamiento = 'fraccionado') => {
  if (tipoFinanciamiento === 'fraccionado') {
    return {
      tipo: 'Compra Directa Fraccionada',
      precioTotal: tractor.precio,
      cuotaMensual: tractor.cuotas,
      numCuotas: tractor.numCuotas,
      interes: 0,
      descripcion: `${tractor.numCuotas} cuotas sin interés`
    };
  } else {
    const precioContado = tractor.precioContado || tractor.precio;
    const igtf = calcularIGTF(precioContado);
    return {
      tipo: 'Pago de Contado + IGTF',
      precioBase: precioContado,
      igtf: igtf,
      precioTotal: precioContado + igtf,
      descripcion: 'Entrega inmediata'
    };
  }
};
