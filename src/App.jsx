import { AppProvider, useAppState } from './state/AppContext.jsx'
import Home from './screens/Home.jsx'
import CategorySelection from './screens/CategorySelection.jsx'
import Questionnaire from './screens/Questionnaire.jsx'
import Processing from './screens/Processing.jsx'
import Result from './screens/Result.jsx'

function Pantallas() {
  const { pantalla } = useAppState()

  switch (pantalla) {
    case 'seleccion':
      return <CategorySelection />
    case 'cuestionario':
      return <Questionnaire />
    case 'procesamiento':
      return <Processing />
    case 'resultado':
      return <Result />
    case 'home':
    default:
      return <Home />
  }
}

function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header no-print">
        <div className="app-header__brand">
          <span className="app-header__logo" aria-hidden="true">
            ⚖️
          </span>
          <span className="app-header__name">LegalCheck</span>
        </div>
      </header>

      <main className="app-main">
        <Pantallas />
      </main>

      <footer className="app-footer no-print">
        <p>LegalCheck — Orientación jurídica inicial. No reemplaza el asesoramiento de un profesional matriculado.</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
