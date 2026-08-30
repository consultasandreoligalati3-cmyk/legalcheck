import { useEffect } from 'react'
import { useAppDispatch } from '../state/AppContext.jsx'

// Duración breve e intencional (no es una espera artificial): le da tiempo
// a la persona a leer el mensaje sin sentir que la aplicación se congeló.
const DURACION_MS = 900

export default function Processing() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const temporizador = setTimeout(() => {
      dispatch({ type: 'PROCESAMIENTO_LISTO' })
    }, DURACION_MS)
    return () => clearTimeout(temporizador)
  }, [dispatch])

  return (
    <div className="screen screen--narrow">
      <div className="processing-screen" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p className="processing-screen__title">Analizando tu situación...</p>
        <p className="processing-screen__subtitle">
          Estamos organizando la información para preparar una orientación inicial.
        </p>
      </div>
    </div>
  )
}
