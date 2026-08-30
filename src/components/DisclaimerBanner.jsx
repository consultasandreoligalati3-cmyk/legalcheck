export default function DisclaimerBanner({ texto }) {
  return (
    <div className="disclaimer-banner">
      <span className="notice-icon" aria-hidden="true">
        ⚠️
      </span>
      <span>{texto}</span>
    </div>
  )
}
