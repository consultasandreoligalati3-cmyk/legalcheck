import { PRIORIDAD_META } from '../engine/rulesEngine.js'

// Muestra el nivel orientativo de prioridad. El texto aclaratorio es
// obligatorio: la prioridad nunca debe leerse como una evaluación jurídica
// (ver PRD, "Principios de seguridad y límites del producto").
export default function PriorityBadge({ prioridad }) {
  const meta = PRIORIDAD_META[prioridad]
  return (
    <div className="priority-block">
      <span className={`priority-badge priority-badge--${prioridad}`}>
        <span aria-hidden="true">{meta.emoji}</span>
        Nivel orientativo de prioridad: {meta.etiqueta}
      </span>
      <span className="priority-note">Este nivel es orientativo y no constituye una evaluación jurídica.</span>
    </div>
  )
}
