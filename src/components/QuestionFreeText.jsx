// Pregunta de texto libre, usada solo por la categoría "Otro". El texto se
// muestra tal cual en el informe (ver engine/rulesEngine.js), sin clasificarlo.
const LIMITE_CARACTERES = 300

export default function QuestionFreeText({ pregunta, valor, onChange }) {
  return (
    <div>
      <textarea
        className="free-text-field"
        placeholder={pregunta.placeholder}
        value={valor || ''}
        maxLength={LIMITE_CARACTERES}
        onChange={(evento) => onChange(evento.target.value)}
        aria-label={pregunta.texto}
      />
      <p className="free-text-hint">
        No incluyas datos personales ni información confidencial ({(valor || '').length}/{LIMITE_CARACTERES}).
      </p>
    </div>
  )
}
