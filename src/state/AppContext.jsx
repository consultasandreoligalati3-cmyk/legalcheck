import { createContext, useContext, useMemo, useReducer } from 'react'
import { obtenerCategoriaPorId } from '../data/categories.js'
import { generarInforme } from '../engine/rulesEngine.js'

// Cantidad fija de preguntas por consulta: 1 descriptiva + 4 comunes.
// Es igual para las 8 categorías (ver diseño funcional, Etapa 2, sección A.1).
export const TOTAL_PREGUNTAS = 5

const estadoInicial = {
  pantalla: 'home', // 'home' | 'seleccion' | 'cuestionario' | 'procesamiento' | 'resultado'
  categoriaId: null,
  pasoActual: 0,
  respuestas: {},
  informe: null,
}

function reducer(estado, accion) {
  switch (accion.type) {
    case 'COMENZAR':
      return { ...estadoInicial, pantalla: 'seleccion' }

    case 'ELEGIR_CATEGORIA':
      // Elegir una categoría siempre arranca un cuestionario limpio:
      // si había respuestas de una categoría distinta, se descartan.
      return {
        ...estadoInicial,
        pantalla: 'cuestionario',
        categoriaId: accion.categoriaId,
      }

    case 'RESPONDER':
      return {
        ...estado,
        respuestas: { ...estado.respuestas, [accion.preguntaId]: accion.valor },
      }

    case 'SIGUIENTE':
      if (estado.pasoActual < TOTAL_PREGUNTAS - 1) {
        return { ...estado, pasoActual: estado.pasoActual + 1 }
      }
      return { ...estado, pantalla: 'procesamiento' }

    case 'VOLVER':
      if (estado.pasoActual === 0) {
        // Volver desde la primera pregunta regresa a selección de categoría.
        // No hay pérdida real porque el cuestionario que se abandona no se
        // vuelve a usar (si se elige otra vez una categoría, arranca de cero).
        return { ...estadoInicial, pantalla: 'seleccion' }
      }
      return { ...estado, pasoActual: estado.pasoActual - 1 }

    case 'PROCESAMIENTO_LISTO': {
      const categoria = obtenerCategoriaPorId(estado.categoriaId)
      if (!categoria) return { ...estadoInicial }
      const informe = generarInforme(categoria, estado.respuestas)
      return { ...estado, pantalla: 'resultado', informe }
    }

    case 'NUEVA_CONSULTA':
      return { ...estadoInicial }

    default:
      return estado
  }
}

const AppStateContext = createContext(null)
const AppDispatchContext = createContext(null)

export function AppProvider({ children }) {
  const [estado, dispatch] = useReducer(reducer, estadoInicial)
  return (
    <AppStateContext.Provider value={estado}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const contexto = useContext(AppStateContext)
  if (contexto === null) throw new Error('useAppState debe usarse dentro de <AppProvider>')
  return contexto
}

export function useAppDispatch() {
  const contexto = useContext(AppDispatchContext)
  if (contexto === null) throw new Error('useAppDispatch debe usarse dentro de <AppProvider>')
  return contexto
}

// Categoría completa (con preguntas, checklist, etc.) según el estado actual.
export function useCategoriaActual() {
  const { categoriaId } = useAppState()
  return useMemo(() => (categoriaId ? obtenerCategoriaPorId(categoriaId) : null), [categoriaId])
}
