// Pregunta de escala (Baja/Media/Alta) usada para la urgencia percibida.
export default function QuestionScale({ pregunta, valor, onChange }) {
  return (
    <div className="option-row" role="radiogroup" aria-label={pregunta.texto}>
      {pregunta.opciones.map((opcion) => {
        const seleccionada = valor === opcion.id
        return (
          <button
            key={opcion.id}
            type="button"
            role="radio"
            aria-checked={seleccionada}
            className={`option-pill${seleccionada ? ' is-selected' : ''}`}
            onClick={() => onChange(opcion.id)}
          >
            {opcion.texto}
          </button>
        )
      })}
    </div>
  )
}
