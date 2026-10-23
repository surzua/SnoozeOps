import { IncidentCard } from "@/components/incident-card";
import type { DemoAction, SimulationState } from "@/domain/types";

type Dispatch = (action: DemoAction) => void;

const passwordIncident = {
  id: "night-password-change",
  title: "Solicitud de cambio de contraseña de un usuario",
  severity: "P3",
  confidence: "high",
  impact: "stable",
  scenario: "night_simulation",
} as const;

const databaseIncident = {
  id: "security-production-database",
  title: "Base de datos de producción sin responder",
  severity: "P1",
  confidence: "high",
  impact: "growing",
  scenario: "security_test",
} as const;

export function SimulationPanel({
  dispatch,
  simulation,
  isCovered,
}: {
  dispatch: Dispatch;
  simulation: SimulationState;
  isCovered: boolean;
}) {
  const securityTest = simulation.securityTest;
  const waitingForAck = securityTest?.status === "escalated_waiting_for_ack";
  const passwordAlreadySimulated = simulation.nightHistory.some((decision) => decision.incident.id === passwordIncident.id);

  return (
    <section aria-labelledby="simulation-title" className="simulation-panel" role="dialog" aria-modal="true">
      <div className="simulation-panel__handle" aria-hidden="true" />
      <div className="simulation-panel__header">
        <div>
          <p className="kicker">Actividad de la ventana</p>
          <h2 id="simulation-title">Simulador de incidentes</h2>
        </div>
        <button aria-label="Cerrar simulador" className="icon-button" onClick={() => dispatch({ type: "toggle_simulation" })} type="button">×</button>
      </div>
      <p className="simulation-panel__intro">
        Rutas determinísticas y offline. {isCovered ? "Andrea es el relevo confirmado." : "No hay relevo confirmado: lo crítico llega a Rodrigo."}
      </p>

      <section className={simulation.isNetworkMocked ? "network-status network-status--offline" : "network-status"} aria-label="Estado de conectividad simulada">
        <div className="network-status__message" aria-live="polite">
          <span aria-hidden="true" className="network-status__icon">{simulation.isNetworkMocked ? "!" : "✓"}</span>
          <div>
            <strong>{simulation.isNetworkMocked ? "Conexión simulada no disponible · Motor local activo" : "Conexión simulada disponible · Motor local listo"}</strong>
            <p>Rutas determinísticas y offline.</p>
          </div>
        </div>
        <label className="network-switch">
          <input
            checked={simulation.isNetworkMocked}
            onChange={() => dispatch({ type: "toggle_network_mock" })}
            type="checkbox"
          />
          <span>Simular caída de internet</span>
        </label>
      </section>

      <section className="simulation-section" aria-labelledby="night-scenario-title">
        <div className="simulation-section__title">
          <div>
            <p className="section-label">Escenario habitual</p>
            <h3 id="night-scenario-title">Actividad de esta noche</h3>
          </div>
          <span className="scenario-label">No modifica la prueba P1</span>
        </div>
        <button
          className="button button--secondary"
          disabled={passwordAlreadySimulated}
          onClick={() => dispatch({ type: "inject_incident", incident: passwordIncident })}
          type="button"
        >
          {passwordAlreadySimulated ? "Cambio de contraseña ya simulado" : "Simular cambio de contraseña · P3"}
        </button>
        {simulation.nightHistory.length > 0 && (
          <div className="incident-stack">
            {simulation.nightHistory.map((decision, index) => <IncidentCard decision={decision} key={`${decision.incident.id}-${index}`} />)}
          </div>
        )}
      </section>

      <section className="simulation-section simulation-section--security" aria-labelledby="security-scenario-title">
        <div className="simulation-section__title">
          <div>
            <p className="section-label">Prueba de seguridad · escenario sintético</p>
            <h3 id="security-scenario-title">Incidente crítico P1</h3>
          </div>
          <span className="scenario-label">Separada de la noche habitual</span>
        </div>
        <button className="button button--primary" onClick={() => dispatch({ type: "inject_incident", incident: databaseIncident })} type="button">
          Simular base de datos caída · P1
        </button>
        {securityTest && <IncidentCard decision={securityTest} />}
        {waitingForAck && (
          <div className="simulation-outcomes" aria-label="Resultados posibles de la confirmación">
            <p>Atajos de demo: ambos representan el plazo de 60 segundos.</p>
            <button className="button button--confirm" onClick={() => dispatch({ type: "resolve_security_test", outcome: "acknowledged" })} type="button">✓ Simular que Andrea confirma</button>
            <button className="button button--danger" onClick={() => dispatch({ type: "resolve_security_test", outcome: "timed_out" })} type="button">! Simular que Andrea no responde</button>
          </div>
        )}
      </section>
      <button className="button button--primary" onClick={() => dispatch({ type: "simulate_morning" })} type="button">
        Simular la mañana <span aria-hidden="true">→</span>
      </button>
      <button className="button button--quiet simulation-panel__close" onClick={() => dispatch({ type: "toggle_simulation" })} type="button">
        Cerrar simulador
      </button>
    </section>
  );
}
