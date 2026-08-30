export default function CategoryCard({ categoria, onSelect }) {
  return (
    <button
      type="button"
      className="category-card"
      onClick={() => onSelect(categoria.id)}
      aria-label={`Seleccionar categoría: ${categoria.nombre}`}
    >
      <span className="category-card__icon" aria-hidden="true">
        {categoria.icono}
      </span>
      <span className="category-card__label">{categoria.nombre}</span>
    </button>
  )
}
