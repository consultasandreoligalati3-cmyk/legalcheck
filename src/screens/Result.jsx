import { useMemo } from 'react'
import { useAppDispatch, useAppState } from '../state/AppContext.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import ChecklistDocumentacion from '../components/ChecklistDocumentacion.jsx'
import ListaProximosPasos from '../components/ListaProximosPasos.jsx'
import PriorityBadge from '../components/PriorityBadge.jsx'
import DisclaimerBanner from '../components/DisclaimerBanner.jsx'

export default function Result() {
  const dispatch = useAppDispatch()
  const { informe } = useAppState()

  const fecha = useMemo(
    () => new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    []
  )

  if (!informe) {
    return (
      <div className="screen screen--narrow">
        <p>No hay un informe generado todavía.</p>
        <PrimaryButton onClick={() => dispatch({ type: 'NUEVA_CONSULTA' })}>Volver al inicio</PrimaryButton>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="report-card">
        <div className="report-brand">
          <span className="report-brand__name">LegalCheck</span>
          <span className="report-brand__date">Informe generado el {fecha}</span>
        </div>

        <h1 className="report-title">Orientación inicial</h1>

        <div className="report-section">
          <span className="report-section__label">Situación identificada</span>
          <p className="report-section__body">{informe.situacion}</p>
        </div>

        <div className="report-section">
          <span className="report-section__label">Información relevante</span>
          <p className="report-section__body">{informe.infoRelevante}</p>
        </div>

        <div className="report-section">
          <span className="report-section__label">Documentación sugerida</span>
          <ChecklistDocumentacion items={informe.checklist} />
        </div>

        <div className="report-section">
          <span className="report-section__label">Próximos pasos sugeridos</span>
          <ListaProximosPasos pasos={informe.proximosPasos} />
        </div>

        <div className="report-section">
          <span className="report-section__label">Prioridad</span>
          <PriorityBadge prioridad={informe.prioridad} />
        </div>

        <div className="report-section">
          <span className="report-section__label">Recomendación</span>
          <p className="report-section__body">{informe.recomendacion}</p>
        </div>

        <div className="report-section disclaimer-list">
          {informe.disclaimers.map((texto) => (
            <DisclaimerBanner key={texto} texto={texto} />
          ))}
        </div>

        <div className="report-actions no-print">
          <PrimaryButton variant="secondary" onClick={() => window.print()}>
            🖨️ Imprimir informe
          </PrimaryButton>
          <PrimaryButton onClick={() => dispatch({ type: 'NUEVA_CONSULTA' })}>Realizar otra consulta</PrimaryButton>
        </div>
      </div>
    </div>
  )
}
