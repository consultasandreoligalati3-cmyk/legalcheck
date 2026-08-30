// Botón reutilizable con variantes visuales. Evita repetir estilos de botón
// en cada pantalla y centraliza el comportamiento de "disabled".
export default function PrimaryButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary'
  type = 'button',
  disabled = false,
  block = false,
}) {
  const className = ['btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', block ? 'btn-block' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
