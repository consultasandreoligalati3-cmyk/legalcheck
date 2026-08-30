import { useAppDispatch } from '../state/AppContext.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function Home() {
  const dispatch = useAppDispatch()

  return (
    <div className="screen screen--narrow">
      <div className="home-hero">
        <span className="home-hero__badge">Orientación jurídica inicial</span>
        <h1 className="home-hero__title">
          LEGAL<span>CHECK</span>
        </h1>
        <p className="home-hero__question">¿Tenés un problema legal y no sabés por dónde empezar?</p>
        <p className="home-hero__text">
          LegalCheck te hace algunas preguntas simples sobre tu situación y te ayuda a organizar la
          información y la documentación que conviene tener antes de una consulta profesional.
        </p>
        <div className="home-hero__cta">
          <PrimaryButton onClick={() => dispatch({ type: 'COMENZAR' })}>COMENZAR</PrimaryButton>
        </div>
      </div>

      <div className="notice-stack" style={{ margin: '0 auto' }}>
        <div className="notice notice--muted">
          <span className="notice-icon" aria-hidden="true">
            ℹ️
          </span>
          <span>
            LegalCheck brinda orientación jurídica inicial y no reemplaza el asesoramiento de un profesional
            matriculado.
          </span>
        </div>
        <div className="notice notice--privacy">
          <span className="notice-icon" aria-hidden="true">
            🔒
          </span>
          <span>Para esta versión de demostración no ingreses datos personales ni información confidencial.</span>
        </div>
      </div>
    </div>
  )
}
