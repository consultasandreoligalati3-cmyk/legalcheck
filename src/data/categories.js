// Configuración de datos de las 8 categorías de LegalCheck.
//
// Este archivo NO contiene lógica de cálculo (eso vive en engine/rulesEngine.js):
// acá solo se describen las preguntas, el checklist base, los pasos base,
// la recomendación profesional y el disclaimer específico de cada categoría,
// tal como quedaron definidos y aprobados en el diseño funcional de la Etapa 2.

// Las 4 preguntas "comunes" (intimación, conflicto activo, urgencia, documentación)
// son iguales en su estructura y en su peso de puntaje para las 8 categorías.
// Solo cambia el texto de "intimación" y "documentación" para adaptarse al
// vocabulario de cada dominio (por ejemplo, "notificación judicial" en Sucesiones).
function crearPreguntasComunes({ intimacion, documentacion } = {}) {
  return [
    {
      id: 'intimacion',
      tipo: 'si-no',
      texto: intimacion || '¿Recibiste alguna intimación, carta documento o notificación formal relacionada?',
      opciones: [
        { id: 'si', texto: 'Sí' },
        { id: 'no', texto: 'No' },
      ],
    },
    {
      id: 'activa',
      tipo: 'si-no',
      texto: '¿La situación sigue activa o sin resolver?',
      opciones: [
        { id: 'si', texto: 'Sí, sigue activa' },
        { id: 'no', texto: 'No, ya se resolvió o es una consulta preventiva' },
      ],
    },
    {
      id: 'urgencia',
      tipo: 'escala',
      texto: '¿Cómo describirías la urgencia de tu situación?',
      opciones: [
        { id: 'baja', texto: 'Baja' },
        { id: 'media', texto: 'Media' },
        { id: 'alta', texto: 'Alta' },
      ],
    },
    {
      id: 'documentacion',
      tipo: 'si-no',
      texto: documentacion || '¿Tenés disponible la documentación relacionada con tu situación?',
      opciones: [
        { id: 'si', texto: 'Sí' },
        { id: 'no', texto: 'No' },
      ],
    },
  ]
}

export const categorias = [
  {
    id: 'alquiler',
    nombre: 'Alquiler / vivienda',
    icono: '🏠',
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'opcion-unica',
      texto: '¿Cuál es el principal problema que estás atravesando?',
      opciones: [
        { id: 'deuda', texto: 'Reclamo por presunta deuda o intimación de pago' },
        { id: 'deposito', texto: 'Diferencias sobre el estado del inmueble o el depósito en garantía' },
        { id: 'reparaciones', texto: 'Falta de reparaciones o mantenimiento por parte del propietario' },
        { id: 'rescision', texto: 'Quiero rescindir o no renovar el contrato' },
        { id: 'otro', texto: 'Otro problema relacionado con el alquiler' },
      ],
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste alguna intimación, carta documento o notificación formal del propietario o la inmobiliaria?',
      documentacion: '¿Tenés disponible el contrato y la documentación relacionada?',
    }),
    checklistBase: [
      'Contrato de alquiler',
      'Recibos de pago de alquiler y expensas',
      'Comunicaciones con el propietario o la inmobiliaria',
      'Fotos o inventario del estado del inmueble',
    ],
    infoRelevante: 'Conviene tener a mano el contrato firmado, el historial de pagos y cualquier comunicación relacionada con el reclamo: son los documentos que más se solicitan en una consulta sobre alquileres.',
    pasosBase: [
      'Reunir el contrato y los últimos recibos de pago',
      'Ordenar cronológicamente las comunicaciones con el propietario o la inmobiliaria',
      'Anotar fechas y montos relacionados con el reclamo',
    ],
    recomendacion: 'Te recomendamos consultar con un abogado especializado en alquileres/locaciones para revisar tu contrato y definir los próximos pasos según tu situación particular.',
    disclaimerEspecifico: 'Los montos y plazos mencionados en tu contrato deben verificarse directamente en el documento original.',
  },
  {
    id: 'trabajo',
    nombre: 'Trabajo',
    icono: '💼',
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'opcion-unica',
      texto: '¿Cuál es el principal problema que estás atravesando?',
      opciones: [
        { id: 'despido', texto: 'Despido (con o sin causa)' },
        { id: 'liquidacion', texto: 'Diferencias en la liquidación final o el pago de haberes' },
        { id: 'renuncia', texto: 'Renuncia y dudas sobre la liquidación correspondiente' },
        { id: 'maltrato', texto: 'Situación de maltrato, discriminación o acoso laboral' },
        { id: 'otro', texto: 'Otro problema relacionado con el empleo' },
      ],
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste un telegrama, carta documento o notificación formal de la empresa?',
      documentacion: '¿Tenés disponibles tus recibos de sueldo y otra documentación laboral?',
    }),
    checklistBase: [
      'Recibos de sueldo',
      'Contrato de trabajo',
      'Telegrama o comunicación de despido/renuncia',
      'Comunicaciones con la empresa (mails, mensajes)',
      'Certificado de trabajo, si lo tenés',
    ],
    infoRelevante: 'Los recibos de sueldo y la comunicación de desvinculación (telegrama, carta, mail) son los documentos centrales para cualquier consulta laboral.',
    pasosBase: [
      'Reunir los últimos recibos de sueldo y la comunicación de desvinculación',
      'Solicitar o calcular el detalle de la liquidación final',
      'Ordenar cualquier comunicación relacionada con la desvinculación',
    ],
    recomendacion: 'Te recomendamos consultar con un abogado laboralista para revisar la documentación de tu relación laboral y evaluar tu situación.',
    disclaimerEspecifico: 'Esta herramienta no calcula montos de indemnización ni liquidación; esos cálculos deben ser verificados por un profesional.',
  },
  {
    id: 'familia',
    nombre: 'Familia',
    icono: '👨‍👩‍👧',
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'opcion-unica',
      texto: '¿Cuál es el principal problema que estás atravesando?',
      opciones: [
        { id: 'divorcio', texto: 'Divorcio o separación' },
        { id: 'cuidado', texto: 'Régimen de cuidado o comunicación con hijos e hijas' },
        { id: 'alimentos', texto: 'Cuota alimentaria' },
        { id: 'violencia', texto: 'Violencia familiar o situación de riesgo' },
        { id: 'otro', texto: 'Otro tema de familia' },
      ],
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste alguna notificación judicial o intimación relacionada?',
      documentacion: '¿Tenés disponible documentación relacionada (DNI, partidas, acuerdos previos)?',
    }),
    checklistBase: [
      'Documentación de identidad y vínculo familiar (partidas, si corresponde)',
      'Documentación de ingresos, si aplica a cuota alimentaria',
      'Comunicaciones relevantes',
      'Acuerdos o sentencias previas, si existieran',
    ],
    infoRelevante: 'Conviene tener identificada a la otra parte, la documentación de vínculo familiar y cualquier acuerdo previo (aunque sea informal) antes de una consulta.',
    pasosBase: [
      'Reunir la documentación de identidad y vínculo familiar disponible',
      'Ordenar cualquier acuerdo o comunicación previa relacionada',
      'Anotar los puntos concretos que te gustaría resolver',
    ],
    recomendacion: 'Te recomendamos consultar con un abogado especializado en derecho de familia.',
    disclaimerEspecifico: 'Si te encontrás en una situación de violencia o riesgo, priorizá tu seguridad y buscá asistencia profesional o institucional de inmediato; esta herramienta no reemplaza esa asistencia.',
    // Regla especial (ver engine/rulesEngine.js): si la situación elegida es "violencia",
    // la prioridad se fuerza a "alta" sin importar el puntaje, y el primer paso cambia.
    reglaEspecial: {
      tipo: 'violencia-familiar',
      valorSituacion: 'violencia',
      pasoPrioritario: 'Priorizar tu seguridad y la de las personas a cargo, y considerar contactar a un profesional o a un servicio de asistencia cuanto antes.',
    },
  },
  {
    id: 'consorcio',
    nombre: 'Consorcio',
    icono: '🏢',
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'opcion-unica',
      texto: '¿Cuál es el principal problema que estás atravesando?',
      opciones: [
        { id: 'humedad', texto: 'Humedad, filtraciones o daños en la unidad' },
        { id: 'expensas', texto: 'Diferencias sobre expensas o gastos comunes' },
        { id: 'convivencia', texto: 'Reclamos por incumplimiento del reglamento de convivencia' },
        { id: 'administracion', texto: 'Problemas con la administración del consorcio' },
        { id: 'otro', texto: 'Otro problema de consorcio' },
      ],
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste alguna intimación o notificación formal relacionada?',
      documentacion: '¿Tenés disponible el reglamento de copropiedad u otra documentación relacionada?',
    }),
    checklistBase: [
      'Reglamento de copropiedad',
      'Actas de asamblea relacionadas',
      'Recibos de expensas',
      'Fotos o informes técnicos sobre el problema, si aplica',
      'Comunicaciones con la administración',
    ],
    infoRelevante: 'El reglamento de copropiedad y las actas de asamblea suelen ser los documentos clave para entender responsabilidades dentro de un consorcio.',
    pasosBase: [
      'Reunir el reglamento de copropiedad y las actas relevantes',
      'Documentar el problema con fotos o notas fechadas',
      'Solicitar por escrito una respuesta formal a la administración, si aún no lo hiciste',
    ],
    recomendacion: 'Te recomendamos consultar con un abogado especializado en derecho de propiedad horizontal / consorcios.',
    disclaimerEspecifico: 'La evaluación de responsabilidad sobre daños entre unidades o partes comunes suele requerir un informe técnico específico, además de la consulta legal.',
  },
  {
    id: 'salud',
    nombre: 'Salud',
    icono: '❤️',
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'opcion-unica',
      texto: '¿Cuál es el principal problema que estás atravesando?',
      opciones: [
        { id: 'cobertura', texto: 'Problemas con la cobertura de tu obra social o prepaga' },
        { id: 'autorizacion', texto: 'Demora o negativa en la autorización de un tratamiento' },
        { id: 'malapraxis', texto: 'Posible situación de mala praxis' },
        { id: 'otro', texto: 'Otro problema relacionado con la atención de salud' },
      ],
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste alguna respuesta formal por escrito (o notificación) sobre tu reclamo?',
      documentacion: '¿Tenés disponible la indicación médica y otra documentación relacionada?',
    }),
    checklistBase: [
      'Carnet o comprobante de afiliación a la obra social/prepaga',
      'Indicación médica o pedido de autorización',
      'Comunicaciones con la obra social/prepaga',
      'Comprobantes de pagos o gastos relacionados, si los hay',
    ],
    infoRelevante: 'Conviene conservar por escrito cualquier respuesta (o falta de respuesta) de la obra social o prepaga, ya que suele ser central en este tipo de reclamos.',
    pasosBase: [
      'Reunir la indicación médica y el comprobante de afiliación',
      'Solicitar por escrito la respuesta formal de la obra social o prepaga, si no la tenés',
      'Ordenar cualquier comunicación previa sobre el reclamo',
    ],
    recomendacion: 'Te recomendamos consultar con un profesional especializado en derecho de la salud o defensa del consumidor, según corresponda a tu situación.',
    disclaimerEspecifico: 'Esta herramienta no evalúa cuestiones médicas ni de mala praxis: se limita a ayudarte a organizar la información y la documentación disponible. No se te pedirá que describas tu diagnóstico ni datos médicos.',
    // Regla especial (ver engine/rulesEngine.js): si la situación elegida es "malapraxis",
    // se suma 1 punto adicional al puntaje antes de aplicar los umbrales.
    reglaEspecial: {
      tipo: 'posible-mala-praxis',
      valorSituacion: 'malapraxis',
      puntosAdicionales: 1,
    },
  },
  {
    id: 'automotor',
    nombre: 'Automotor',
    icono: '🚗',
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'opcion-unica',
      texto: '¿Cuál es el principal problema que estás atravesando?',
      opciones: [
        { id: 'compraventa', texto: 'Conflicto por la compra o venta de un vehículo' },
        { id: 'siniestro', texto: 'Choque o siniestro vial con daños o desacuerdos' },
        { id: 'seguro', texto: 'Problemas con el seguro (rechazo o demora de cobertura)' },
        { id: 'multas', texto: 'Multas o infracciones en disputa' },
        { id: 'otro', texto: 'Otro problema relacionado con un vehículo' },
      ],
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste alguna intimación o notificación formal relacionada?',
      documentacion: '¿Tenés disponible la documentación del vehículo y del hecho?',
    }),
    checklistBase: [
      'Título/cédula del vehículo y documentación de dominio',
      'Contrato de compraventa, si aplica',
      'Denuncia o acta policial, si hubo siniestro',
      'Póliza de seguro y comunicaciones con la aseguradora',
      'Fotos del vehículo o del hecho, si las tenés',
    ],
    infoRelevante: 'La documentación del vehículo y cualquier acta o denuncia relacionada con el hecho son los elementos que más se solicitan en este tipo de consultas.',
    pasosBase: [
      'Reunir la documentación del vehículo y del hecho (fotos, actas, denuncias)',
      'Ordenar las comunicaciones con la otra parte o con la aseguradora',
      'Verificar los plazos indicados por tu aseguradora o por la notificación recibida',
    ],
    recomendacion: 'Te recomendamos consultar con un abogado especializado en derecho del consumidor o accidentes de tránsito, según corresponda a tu caso.',
    disclaimerEspecifico: 'La determinación de responsabilidad en un siniestro vial requiere un análisis específico que esta herramienta no realiza.',
  },
  {
    id: 'sucesiones',
    nombre: 'Sucesiones',
    icono: '📄',
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'opcion-unica',
      texto: '¿Cuál es el principal problema que estás atravesando?',
      opciones: [
        { id: 'iniciar', texto: 'Necesito iniciar una sucesión y no sé por dónde empezar' },
        { id: 'desacuerdos', texto: 'Hay desacuerdos entre herederos' },
        { id: 'bienes', texto: 'Hay bienes o deudas del fallecido que no están claros' },
        { id: 'otro', texto: 'Otro tema relacionado con una sucesión' },
      ],
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste alguna notificación judicial o reclamo formal relacionado con la sucesión?',
      documentacion: '¿Tenés disponible la partida de defunción u otra documentación relacionada?',
    }),
    checklistBase: [
      'Partida de defunción',
      'Documento de identidad de la persona fallecida (si se dispone) y de los herederos',
      'Testamento, si existiera',
      'Documentación de bienes (inmuebles, cuentas, vehículos)',
      'Documentación de deudas, si las hubiera',
    ],
    infoRelevante: 'Contar con la partida de defunción y un listado preliminar de bienes y deudas agiliza considerablemente cualquier consulta sobre una sucesión.',
    pasosBase: [
      'Reunir la partida de defunción y la documentación de identidad disponible',
      'Hacer un listado preliminar de bienes y deudas conocidos',
      'Identificar a los demás herederos y sus datos de contacto',
    ],
    recomendacion: 'Te recomendamos consultar con un abogado especializado en sucesiones para definir los pasos según la composición del patrimonio y la situación familiar.',
    disclaimerEspecifico: 'Los plazos y requisitos para iniciar o continuar una sucesión varían según cada caso; te recomendamos confirmarlos con un profesional.',
  },
  {
    id: 'otro',
    nombre: 'Otro',
    icono: '❓',
    // A diferencia del resto, la pregunta "descriptiva" es de texto libre:
    // se muestra tal cual en el informe, sin clasificarla ni interpretarla.
    preguntaDescriptiva: {
      id: 'situacion',
      tipo: 'texto-libre',
      texto: 'Contanos brevemente cuál es tu problema, sin incluir datos personales.',
      placeholder: 'Ejemplo: tengo un desacuerdo con un proveedor de servicios y no sé cómo seguir.',
    },
    preguntasComunes: crearPreguntasComunes({
      intimacion: '¿Recibiste alguna notificación formal, intimación o carta documento relacionada?',
      documentacion: '¿Tenés disponible alguna documentación o comunicación relacionada?',
    }),
    checklistBase: [
      'Identificación del reclamo o problema (por escrito, breve)',
      'Comunicaciones recibidas relacionadas',
      'Comprobantes o contratos relacionados, si existen',
    ],
    infoRelevante: 'Como tu situación no corresponde a una categoría predefinida, ordenar una descripción breve del problema y la documentación que tengas disponible es el primer paso para una consulta más precisa.',
    pasosBase: [
      'Escribir con más detalle el problema para la consulta profesional',
      'Reunir cualquier comunicación o comprobante relacionado',
      'Identificar con ayuda profesional el área del derecho involucrada',
    ],
    recomendacion: 'Como tu situación no encuadra en una categoría específica, te recomendamos consultar con un profesional para identificar correctamente el área legal de tu caso y definir los próximos pasos.',
    disclaimerEspecifico: 'Esta orientación es más general porque tu situación no corresponde a una categoría predefinida. Evitá incluir datos personales o confidenciales en la descripción.',
  },
]

export function obtenerCategoriaPorId(id) {
  return categorias.find((categoria) => categoria.id === id) || null
}
