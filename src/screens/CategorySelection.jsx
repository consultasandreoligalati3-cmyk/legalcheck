import { categorias } from '../data/categories.js'
import { useAppDispatch } from '../state/AppContext.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import BackButton from '../components/BackButton.jsx'

export default function CategorySelection() {
  const dispatch = useAppDispatch()

  return (
    <div className="screen">
      <div>
        <BackButton label="Volver al inicio" onClick={() => dispatch({ type: 'NUEVA_CONSULTA' })} />
      </div>
      <h1 className="screen-title">¿Qué situación estás atravesando?</h1>
      <p className="screen-subtitle">Elegí la categoría que más se parece a tu caso.</p>
      <div className="category-grid">
        {categorias.map((categoria) => (
          <CategoryCard
            key={categoria.id}
            categoria={categoria}
            onSelect={(categoriaId) => dispatch({ type: 'ELEGIR_CATEGORIA', categoriaId })}
          />
        ))}
      </div>
    </div>
  )
}
