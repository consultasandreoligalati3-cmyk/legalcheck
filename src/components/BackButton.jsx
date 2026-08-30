export default function BackButton({ onClick, label = 'Volver' }) {
  return (
    <button type="button" className="btn btn-back" onClick={onClick}>
      ‹ {label}
    </button>
  )
}
