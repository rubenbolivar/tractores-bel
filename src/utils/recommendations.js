export const calcularRecomendaciones = (respuestas, tractores) => {
  const scores = tractores.map(tractor => {
    let score = 0;

    // Pregunta 1: Actividad (35%)
    if (respuestas[1] && respuestas[1].length > 0) {
      const opcion = respuestas[1][0];
      if (opcion.peso && opcion.peso[tractor.id]) {
        score += (opcion.peso[tractor.id] / 10) * 35;
      }
    }

    // Pregunta 2: Hectáreas (30%)
    if (respuestas[2] && respuestas[2].length > 0) {
      const opcion = respuestas[2][0];
      if (opcion.min !== undefined && opcion.max !== undefined) {
        const overlap = !(opcion.max < tractor.hectareasMin || opcion.min > tractor.hectareasMax);
        if (overlap) {
          // Calcular qué tan bien encaja
          const rangoUsuario = opcion.max - opcion.min;
          const rangoTractor = tractor.hectareasMax - tractor.hectareasMin;
          const interseccionMin = Math.max(opcion.min, tractor.hectareasMin);
          const interseccionMax = Math.min(opcion.max, tractor.hectareasMax);
          const interseccion = Math.max(0, interseccionMax - interseccionMin);
          const porcentajeMatch = interseccion / Math.max(rangoUsuario, rangoTractor);
          score += porcentajeMatch * 30;
        }
      }
    }

    // Pregunta 3: Terreno (10%)
    if (respuestas[3] && respuestas[3].length > 0) {
      const opcion = respuestas[3][0];
      if (opcion.minPotencia) {
        if (tractor.potencia >= opcion.minPotencia) {
          score += 10;
        }
      } else {
        score += 10; // Terreno plano es compatible con todos
      }
    }

    // Pregunta 4: Implementos (10%)
    if (respuestas[4] && respuestas[4].length > 0) {
      const maxPotenciaRequerida = Math.max(
        ...respuestas[4].map(i => i.minPotencia || 0)
      );
      if (tractor.potencia >= maxPotenciaRequerida) {
        score += 10;
      } else if (tractor.potencia >= maxPotenciaRequerida * 0.8) {
        score += 5; // Puntos parciales si está cerca
      }
    }

    // Pregunta 5: Presupuesto (20%)
    if (respuestas[5] && respuestas[5].length > 0) {
      const opcion = respuestas[5][0];
      if (opcion.max) {
        if (tractor.precio <= opcion.max) {
          score += 20;
        } else if (tractor.precioContado && tractor.precioContado <= opcion.max) {
          score += 15;
        } else if (tractor.precio <= opcion.max * 1.2) {
          score += 10; // Puntos parciales si está 20% por encima
        }
      }
    }

    // Pregunta 6: Preferencias adicionales (15%)
    if (respuestas[6] && respuestas[6].length > 0) {
      respuestas[6].forEach(pref => {
        if (pref.valor === 'cabina') {
          const tieneCabina = tractor.caracteristicas?.some(c =>
            c.toLowerCase().includes('cabina')
          );
          if (tieneCabina) score += 5;
        }
        if (pref.valor === 'entrega_inmediata') {
          if (tractor.entregaInmediata) score += 5;
        }
        if (pref.valor === 'mayor_levante') {
          if (tractor.capacidades.levante >= 3000) score += 5;
        }
      });
    }

    return {
      tractor,
      score,
      porcentaje: Math.min(100, Math.round(score))
    };
  });

  return scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};

export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(precio);
};

export const generarMensajeWhatsApp = (tractor, actividad = null, estado = null) => {
  let mensaje = `Hola, me interesa el Tractor BEL ${tractor.modelo}`;

  if (tractor.subtitulo) {
    mensaje += ` (${tractor.subtitulo})`;
  }

  if (actividad) {
    mensaje += `\nMi actividad es: ${actividad}`;
  }

  if (estado) {
    mensaje += `\nUbicación: ${estado}`;
  }

  mensaje += '\n¿Podrían darme más información sobre disponibilidad y financiamiento?';

  return encodeURIComponent(mensaje);
};
