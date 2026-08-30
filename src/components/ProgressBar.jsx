export default function ProgressBar({ pasoActual, total }) {
  const porcentaje = Math.round((pasoActual / total) * 100)
  return (
    <div className="questionnaire-header">
      <span className="progress-label">
        Paso {pasoActual} de {total}
      </span>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={pasoActual}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div className="progress-fill" style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  )
}
