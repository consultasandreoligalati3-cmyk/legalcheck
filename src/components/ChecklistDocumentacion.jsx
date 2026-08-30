// Checklist visual de documentación sugerida. Se muestra como casilleros
// vacíos (pensados para completarse a mano sobre el informe impreso), no
// como checkboxes interactivos: no hay nada que "guardar" en el MVP.
export default function ChecklistDocumentacion({ items }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <span className="checklist-box" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}
