// Pregunta de opción única (la "pregunta descriptiva" de cada categoría,
// salvo en "Otro", que usa QuestionFreeText).
export default function QuestionSingleSelect({ pregunta, valor, onChange }) {
  return (
    <div className="option-list" role="radiogroup" aria-label={pregunta.texto}>
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
            <span className="option-pill__dot" aria-hidden="true" />
            {opcion.texto}
          </button>
        )
      })}
    </div>
  )
}
