import { useAppDispatch, useAppState, useCategoriaActual, TOTAL_PREGUNTAS } from '../state/AppContext.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import BackButton from '../components/BackButton.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import QuestionSingleSelect from '../components/QuestionSingleSelect.jsx'
import QuestionYesNo from '../components/QuestionYesNo.jsx'
import QuestionScale from '../components/QuestionScale.jsx'
import QuestionFreeText from '../components/QuestionFreeText.jsx'

// Arma, en orden, la lista de preguntas de la categoría: la descriptiva
// (opción única o texto libre) seguida de las 4 preguntas comunes.
function usarPreguntas(categoria) {
  if (!categoria) return []
  return [categoria.preguntaDescriptiva, ...categoria.preguntasComunes]
}

function respuestaValida(pregunta, valor) {
  if (pregunta.tipo === 'texto-libre') return Boolean(valor && valor.trim().length > 0)
  return Boolean(valor)
}

export default function Questionnaire() {
  const dispatch = useAppDispatch()
  const { pasoActual, respuestas } = useAppState()
  const categoria = useCategoriaActual()
  const preguntas = usarPreguntas(categoria)

  if (!categoria || preguntas.length === 0) {
    // Estado inesperado (por ejemplo, se llegó a esta pantalla sin categoría):
    // se evita romper la interfaz y se ofrece volver a elegir una categoría.
    return (
      <div className="screen screen--narrow">
        <p>No se encontró una categoría seleccionada.</p>
        <PrimaryButton onClick={() => dispatch({ type: 'NUEVA_CONSULTA' })}>Volver al inicio</PrimaryButton>
      </div>
    )
  }

  const pregunta = preguntas[pasoActual]
  const valorActual = respuestas[pregunta.id]
  const puedeAvanzar = respuestaValida(pregunta, valorActual)
  const esUltimaPregunta = pasoActual === TOTAL_PREGUNTAS - 1

  function responder(valor) {
    dispatch({ type: 'RESPONDER', preguntaId: pregunta.id, valor })
  }

  function renderPregunta() {
    switch (pregunta.tipo) {
      case 'opcion-unica':
        return <QuestionSingleSelect pregunta={pregunta} valor={valorActual} onChange={responder} />
      case 'si-no':
        return <QuestionYesNo pregunta={pregunta} valor={valorActual} onChange={responder} />
      case 'escala':
        return <QuestionScale pregunta={pregunta} valor={valorActual} onChange={responder} />
      case 'texto-libre':
        return <QuestionFreeText pregunta={pregunta} valor={valorActual} onChange={responder} />
      default:
        return null
    }
  }

  return (
    <div className="screen screen--narrow">
      <ProgressBar pasoActual={pasoActual + 1} total={TOTAL_PREGUNTAS} />
      <div className="question-card">
        <p className="question-card__text">{pregunta.texto}</p>
        {renderPregunta()}
        <div className="question-actions">
          <BackButton onClick={() => dispatch({ type: 'VOLVER' })} />
          <PrimaryButton disabled={!puedeAvanzar} onClick={() => dispatch({ type: 'SIGUIENTE' })}>
            {esUltimaPregunta ? 'Finalizar' : 'Siguiente'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
