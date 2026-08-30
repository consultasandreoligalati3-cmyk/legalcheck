// Motor de reglas de LegalCheck.
//
// Reglas de negocio, ninguna llamada externa ni generación por IA: dadas las
// mismas respuestas, este módulo siempre produce el mismo informe. Esto es
// intencional (ver PRD, sección "Principios de seguridad y límites del
// producto"): la prioridad y el informe deben ser deterministas y explicables.

export const DISCLAIMER_GENERAL =
  'LegalCheck brinda orientación jurídica inicial y no reemplaza el asesoramiento de un profesional matriculado.'

const PESOS = {
  intimacion: { si: 2, no: 0 },
  activa: { si: 1, no: 0 },
  urgencia: { alta: 2, media: 1, baja: 0 },
  documentacion: { no: 1, si: 0 },
}

// Puntaje base (0 a 6) según las 4 señales comunes a las 8 categorías,
// más el punto adicional de la regla especial de "posible mala praxis"
// en Salud, si corresponde.
export function calcularPuntaje(categoria, respuestas) {
  let puntaje = 0
  puntaje += PESOS.intimacion[respuestas.intimacion] ?? 0
  puntaje += PESOS.activa[respuestas.activa] ?? 0
  puntaje += PESOS.urgencia[respuestas.urgencia] ?? 0
  puntaje += PESOS.documentacion[respuestas.documentacion] ?? 0

  const regla = categoria.reglaEspecial
  if (regla?.tipo === 'posible-mala-praxis' && respuestas.situacion === regla.valorSituacion) {
    puntaje += regla.puntosAdicionales
  }
  return puntaje
}

// Nivel orientativo de prioridad. Es un umbral fijo sobre el puntaje,
// salvo la excepción de violencia familiar, que se fuerza a "alta"
// independientemente del puntaje (ver PRD y diseño funcional, sección A.3).
export function calcularPrioridad(categoria, respuestas) {
  const regla = categoria.reglaEspecial
  if (regla?.tipo === 'violencia-familiar' && respuestas.situacion === regla.valorSituacion) {
    return 'alta'
  }

  const puntaje = calcularPuntaje(categoria, respuestas)
  if (puntaje <= 1) return 'baja'
  if (puntaje <= 3) return 'media'
  return 'alta'
}

// Checklist de documentación: la base de la categoría + el ítem de
// notificación/intimación, agregado automáticamente solo si corresponde.
export function generarChecklist(categoria, respuestas) {
  const checklist = [...categoria.checklistBase]
  if (respuestas.intimacion === 'si') {
    checklist.push('Notificación, intimación o carta documento recibida')
  }
  return checklist
}

// Próximos pasos: entre 3 y 5, según las reglas condicionales comunes.
export function generarPasos(categoria, respuestas, prioridad) {
  const regla = categoria.reglaEspecial
  const esViolenciaFamiliar =
    regla?.tipo === 'violencia-familiar' && respuestas.situacion === regla.valorSituacion

  if (esViolenciaFamiliar) {
    // Se prioriza el paso de seguridad y se acorta la lista para no diluir
    // el mensaje con pasos administrativos (ver registro de decisiones).
    return [
      regla.pasoPrioritario,
      ...categoria.pasosBase.slice(0, 2),
      'Consultar con un profesional a la brevedad.',
    ]
  }

  const pasos = [...categoria.pasosBase]
  if (respuestas.intimacion === 'si') {
    pasos.push(
      'Prestar atención a los plazos y datos mencionados en la notificación recibida, y no dejar pasar tiempo antes de la consulta profesional.'
    )
  }
  pasos.push(
    prioridad === 'alta'
      ? 'Consultar con un profesional a la brevedad.'
      : 'Consultar con un profesional cuando puedas para confirmar los próximos pasos.'
  )
  return pasos
}

// Texto de "situación identificada": para preguntas de opción única, arma
// una frase a partir de la opción elegida; para la pregunta de texto libre
// (categoría "Otro"), muestra tal cual lo que escribió la persona, sin
// interpretarlo ni clasificarlo.
export function generarSituacionTexto(categoria, respuestas) {
  if (categoria.preguntaDescriptiva.tipo === 'texto-libre') {
    const texto = (respuestas.situacion || '').trim()
    return texto
      ? `Nos contaste lo siguiente sobre tu situación: "${texto}".`
      : 'No se ingresó una descripción de la situación.'
  }

  const opcion = categoria.preguntaDescriptiva.opciones.find(
    (o) => o.id === respuestas.situacion
  )
  return opcion
    ? `Indicaste que tu situación principal es: "${opcion.texto}".`
    : 'No se identificó una situación específica dentro de esta categoría.'
}

// Arma el informe completo a partir de una categoría y sus respuestas.
export function generarInforme(categoria, respuestas) {
  const prioridad = calcularPrioridad(categoria, respuestas)
  return {
    categoriaId: categoria.id,
    categoriaNombre: categoria.nombre,
    situacion: generarSituacionTexto(categoria, respuestas),
    infoRelevante: categoria.infoRelevante,
    checklist: generarChecklist(categoria, respuestas),
    proximosPasos: generarPasos(categoria, respuestas, prioridad),
    prioridad,
    puntaje: calcularPuntaje(categoria, respuestas),
    recomendacion: categoria.recomendacion,
    disclaimers: [DISCLAIMER_GENERAL, categoria.disclaimerEspecifico].filter(Boolean),
  }
}

export const PRIORIDAD_META = {
  baja: { emoji: '🟢', etiqueta: 'Baja' },
  media: { emoji: '🟡', etiqueta: 'Media' },
  alta: { emoji: '🔴', etiqueta: 'Alta' },
}
