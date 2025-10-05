export const preguntasQuiz = [
  {
    id: 1,
    pregunta: '¿Cuál es tu actividad principal?',
    tipo: 'single',
    opciones: [
      { valor: 'cacao_cafe', label: 'Cacao / Café / Cítricos', peso: { bel50: 10, bel60: 8 } },
      { valor: 'palma', label: 'Palma Aceitera', peso: { bel75: 10, bel90: 7 } },
      { valor: 'ganaderia', label: 'Ganadería / Manejo de Pastos', peso: { bel105: 10, bel90: 8, bel110: 7 } },
      { valor: 'maiz', label: 'Maíz / Cereales', peso: { bel140: 10, bel110: 8, bel150: 7 } },
      { valor: 'cana', label: 'Caña de Azúcar', peso: { bel150: 10, bel140: 8, bel220: 7 } },
      { valor: 'mixto', label: 'Uso Mixto / General', peso: { bel60: 9, bel90: 9, bel110: 8 } }
    ]
  },
  {
    id: 2,
    pregunta: '¿Cuántas hectáreas trabajas?',
    tipo: 'single',
    opciones: [
      { valor: '0-10', label: 'Menos de 10 hectáreas', min: 0, max: 10 },
      { valor: '10-30', label: '10 a 30 hectáreas', min: 10, max: 30 },
      { valor: '30-80', label: '30 a 80 hectáreas', min: 30, max: 80 },
      { valor: '80-200', label: '80 a 200 hectáreas', min: 80, max: 200 },
      { valor: '200+', label: 'Más de 200 hectáreas', min: 200, max: 1000 }
    ]
  },
  {
    id: 3,
    pregunta: '¿Qué tipo de terreno tienes?',
    tipo: 'single',
    opciones: [
      { valor: 'plano', label: 'Mayormente plano', peso: 'todos' },
      { valor: 'ondulado', label: 'Ondulado (lomas)', minPotencia: 60 },
      { valor: 'montanoso', label: 'Montañoso', minPotencia: 90 },
      { valor: 'mixto', label: 'Mixto', minPotencia: 75 }
    ]
  },
  {
    id: 4,
    pregunta: '¿Qué implementos planeas usar?',
    tipo: 'multiple',
    opciones: [
      { valor: 'arado', label: 'Arado / Rastra', minPotencia: 50 },
      { valor: 'sembradora', label: 'Sembradora', minPotencia: 60 },
      { valor: 'fumigadora', label: 'Fumigadora', minPotencia: 60 },
      { valor: 'segadora', label: 'Segadora / Cortadora', minPotencia: 75 },
      { valor: 'remolque', label: 'Remolque / Transporte', minPotencia: 60 },
      { valor: 'cosechadora', label: 'Cosechadora', minPotencia: 110 },
      { valor: 'empacadora', label: 'Empacadora', minPotencia: 90 },
      { valor: 'rotativa', label: 'Rotativa', minPotencia: 75 }
    ]
  },
  {
    id: 5,
    pregunta: '¿Cuál es tu presupuesto disponible?',
    tipo: 'single',
    opciones: [
      { valor: '0-20k', label: 'Hasta $20,000', max: 20000 },
      { valor: '20k-35k', label: '$20,000 - $35,000', min: 20000, max: 35000 },
      { valor: '35k-55k', label: '$35,000 - $55,000', min: 35000, max: 55000 },
      { valor: '55k-100k', label: '$55,000 - $100,000', min: 55000, max: 100000 },
      { valor: '100k+', label: 'Más de $100,000', min: 100000 }
    ]
  },
  {
    id: 6,
    pregunta: 'Preferencias adicionales',
    tipo: 'multiple',
    opcional: true,
    opciones: [
      { valor: 'cabina', label: '¿Necesitas cabina climatizada?', modelos: ['bel150', 'bel220'] },
      { valor: 'entrega_inmediata', label: '¿Prefieres entrega inmediata?', filtro: 'entregaInmediata' },
      { valor: 'mayor_levante', label: '¿Necesitas mayor capacidad de levante?', minLevante: 3000 }
    ]
  }
];
