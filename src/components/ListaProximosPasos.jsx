export default function ListaProximosPasos({ pasos }) {
  return (
    <ol className="steps-list">
      {pasos.map((paso) => (
        <li key={paso}>{paso}</li>
      ))}
    </ol>
  )
}
