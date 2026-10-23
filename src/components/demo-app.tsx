"use client";

import { useCallback, useRef } from "react";
import { andrea, rodrigo, tickets } from "@/data/fixtures";
import { HandoffPassport } from "@/components/handoff-passport";
import { MorningScreen } from "@/components/morning-screen";
import { SimulationPanel } from "@/components/simulation-panel";
import { getCoverageSummary } from "@/domain/coverage-summary";
import { handoffSummary, getShiftPlan } from "@/domain/shifts";
import type { DemoAction, DemoState, HandoffStatus, ShiftPlan } from "@/domain/types";
import { useDemoState } from "@/hooks/use-demo-state";

type Dispatch = (action: DemoAction) => void;

function BackButton({ onClick, label = "Volver" }: { onClick: () => void; label?: string }) {
  return (
    <button className="back-button" type="button" onClick={onClick}>
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}

function ShiftScreen({ state, dispatch, shift }: { state: DemoState; dispatch: Dispatch; shift: ShiftPlan }) {
  return (
    <section className="screen screen--shift" aria-labelledby="welcome-title">
      <p className="kicker">Tu próximo turno</p>
      <h1 id="welcome-title">Buenas noches, {rodrigo.firstName}</h1>
      <div className="shift-toggle" aria-label="Selecciona tu próximo turno">
        {(["day", "night"] as const).map((kind) => {
          const item = getShiftPlan(kind);
          const selected = state.selectedShift === kind;
          return (
            <button
              aria-pressed={selected}
              className={selected ? "shift-option shift-option--selected" : "shift-option"}
              key={kind}
              onClick={() => dispatch({ type: "select_shift", shift: kind })}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <section className="work-card" aria-label={`Turno de ${shift.label}`}>
        <span className="work-card__label">Turno de {shift.label}</span>
        <strong>{shift.workHours}</strong>
      </section>
      <section className="opportunity-card">
        <p className="opportunity-card__value">+60 min</p>
        <p>Esta noche puedes proteger una hora más.</p>
      </section>
      <section className="comparison" aria-label="Comparación entre ventana habitual y propuesta">
        <div>
          <span>Habitual</span>
          <strong>{shift.usualWindow}</strong>
          <p>{shift.usualDuration}</p>
        </div>
        <div className="comparison__proposed">
          <span>Propuesta</span>
          <strong>{shift.proposedWindow}</strong>
          <p>{shift.proposedDuration}</p>
        </div>
      </section>
      <button className="button button--primary" type="button" onClick={() => dispatch({ type: "navigate", screen: "plan" })}>
        Preparar mi descanso <span aria-hidden="true">→</span>
      </button>
      <p className="measurement-note">Tiempo reservado para dormir. Sueño real no medido.</p>
    </section>
  );
}

function PlanScreen({ state, dispatch, shift }: { state: DemoState; dispatch: Dispatch; shift: ShiftPlan }) {
  const coverage = getCoverageSummary(state, shift);
  return (
    <section className="screen" aria-labelledby="plan-title">
      <BackButton onClick={() => dispatch({ type: "navigate", screen: "shift" })} />
      <p className="kicker">Plan de esta noche</p>
      <h1 id="plan-title">Un descanso que sí puedes soltar.</h1>
      <section className="plan-card">
        <p className="section-label">Objetivo</p>
        <p className="plan-card__goal">Comenzar tu descanso 60 min antes.</p>
        <div className="timeline" aria-label={`${shift.proposedWindow}, ${shift.proposedDuration} planificadas`}>
          <div className="timeline__times"><span>{shift.startsAt}</span><span>{shift.endsAt}</span></div>
          <div className="timeline__bar"><span /></div>
          <strong>{shift.proposedDuration} planificadas</strong>
        </div>
      </section>
      <section className="detail-card">
        <p className="section-label">Último café sugerido</p>
        <p className="detail-card__value">{shift.lastCoffeeAt}</p>
        {shift.coffeeContext && <p className="detail-card__context">{shift.coffeeContext}</p>}
      </section>
      <section className="detail-card relief-card">
        <p className="section-label">Relevo propuesto</p>
        <p className="detail-card__value">{andrea.name}</p>
        <p className="detail-card__context">{shift.proposedWindow}</p>
        <HandoffPassport summary={coverage} shift={shift} />
      </section>
      <button className="button button--primary" type="button" onClick={() => dispatch({ type: "navigate", screen: "handoff" })}>
        Revisar y cerrar mi guardia <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}

function Tickets() {
  return (
    <ul className="ticket-list" aria-label="Pendientes de la guardia">
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <span className={`priority priority--${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
          <div>
            <strong>{ticket.title}</strong>
            <p>{ticket.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function HandoffActions({ dispatch, status, shift }: { dispatch: Dispatch; status: HandoffStatus; shift: ShiftPlan }) {
  if (status === "not_requested") {
    return <button className="button button--primary" type="button" onClick={() => dispatch({ type: "request_handoff" })}>Solicitar relevo a Andrea <span aria-hidden="true">→</span></button>;
  }

  if (status === "pending") {
    return (
      <>
        <section className="simulator" aria-labelledby="simulator-title">
          <p className="simulator__label">Demo controlada</p>
          <h2 id="simulator-title">Responder como Andrea</h2>
          <p>Andrea recibe primero las alertas críticas entre {shift.proposedWindow}.</p>
          <div className="simulator__actions">
            <button className="button button--confirm" type="button" onClick={() => dispatch({ type: "respond_handoff", response: "accepted" })}>✓ Aceptar relevo</button>
            <button className="button button--quiet" type="button" onClick={() => dispatch({ type: "respond_handoff", response: "declined" })}>No puedo cubrir</button>
          </div>
        </section>
        <button className="button button--secondary" type="button" onClick={() => dispatch({ type: "activate_filtered" })}>Continuar con guardia filtrada</button>
      </>
    );
  }

  if (status === "accepted") {
    return <button className="button button--primary" type="button" onClick={() => dispatch({ type: "activate_protected" })}>Activar sueño protegido <span aria-hidden="true">→</span></button>;
  }

  return (
    <>
      <button className="button button--secondary" type="button" onClick={() => dispatch({ type: "activate_filtered" })}>Activar guardia filtrada</button>
      <button className="text-button" type="button" onClick={() => dispatch({ type: "request_handoff" })}>Volver a solicitar relevo</button>
    </>
  );
}

function HandoffScreen({ state, dispatch, shift }: { state: DemoState; dispatch: Dispatch; shift: ShiftPlan }) {
  const coverage = getCoverageSummary(state, shift);
  return (
    <section className="screen" aria-labelledby="handoff-title">
      <BackButton onClick={() => dispatch({ type: "navigate", screen: "plan" })} />
      <p className="kicker">Cerrar guardia</p>
      <h1 id="handoff-title">Deja los pendientes en un lugar seguro.</h1>
      <p className="count-label">3 pendientes resumidos</p>
      <Tickets />
      <section className="summary-card">
        <p className="section-label">Resumen para Andrea</p>
        <p>{handoffSummary(shift)}</p>
        <p className="summary-card__deadline">La ventana comienza a las {shift.startsAt}; esta demo no modela vencimiento de la solicitud.</p>
      </section>
      <HandoffPassport summary={coverage} shift={shift} />
      <HandoffActions dispatch={dispatch} status={state.handoffStatus} shift={shift} />
      {state.handoffStatus !== "accepted" && state.handoffStatus !== "declined" && (
        <>
          <button className="button button--primary" disabled type="button">Activar sueño protegido</button>
          <p className="disabled-note">Sueño protegido se habilita solo después de una aceptación válida.</p>
        </>
      )}
    </section>
  );
}

function ActivationScreen({ state, dispatch, shift, onReset }: { state: DemoState; dispatch: Dispatch; shift: ShiftPlan; onReset: () => void }) {
  const protectedMode = state.activationMode === "protected";
  const coverage = getCoverageSummary(state, shift);
  const activityButtonRef = useRef<HTMLButtonElement>(null);
  const closeSimulation = useCallback(() => {
    dispatch({ type: "toggle_simulation" });
    requestAnimationFrame(() => activityButtonRef.current?.focus());
  }, [dispatch]);
  const title = protectedMode ? "Sueño protegido" : "Guardia filtrada";
  return (
    <section className="screen screen--activation" aria-labelledby="activation-title">
      <div className={protectedMode ? "activation-mark activation-mark--protected" : "activation-mark activation-mark--filtered"} aria-hidden="true">
        {protectedMode ? "✓" : "◷"}
      </div>
      <p className="kicker">Ventana activa</p>
      <h1 id="activation-title">{title}</h1>
      <div className="activation-window">
        <strong>{shift.proposedWindow}</strong>
        <span>{shift.proposedDuration} reservadas</span>
      </div>
      {protectedMode ? (
        <>
          <p className="activation-copy">{andrea.firstName} está de relevo para esta ventana. Los casos agrupables esperan revisión; las rutas conservadoras pueden escalar a Andrea y, según el atajo de demo, a Rodrigo.</p>
          <section className="activation-rule activation-rule--protected" aria-label="Regla de interrupción">
            <span className="activation-rule__icon" aria-hidden="true">!</span>
            <div>
              <p className="activation-rule__label">Regla de interrupción</p>
              <p className="activation-rule__value">P1, ambiguos, de baja confianza o con impacto creciente escalan primero a Andrea; el fallback de 60 s simulados puede llegar a Rodrigo.</p>
            </div>
          </section>
          <p className="activation-gain">+60 min frente a tu ventana habitual</p>
        </>
      ) : (
        <>
          <p className="activation-copy">La guardia filtrada no tiene relevo aceptado. Los casos permitidos se agrupan y las rutas conservadoras llegan a Rodrigo.</p>
          <section className="activation-rule activation-rule--filtered" aria-label="Regla de interrupción">
            <span className="activation-rule__icon" aria-hidden="true">!</span>
            <div>
              <p className="activation-rule__label">Regla de interrupción</p>
              <p className="activation-rule__value">Un incidente crítico o ambiguo llega directamente a Rodrigo.</p>
            </div>
          </section>
        </>
      )}
      <HandoffPassport summary={coverage} shift={shift} variant="prominent" title="Pasaporte activo" />
      <p className="measurement-note">Tiempo reservado para dormir. Sueño real no medido.</p>
      <button ref={activityButtonRef} className="button button--activity" type="button" onClick={() => dispatch({ type: "toggle_simulation" })}>
        {state.simulation.isPanelOpen ? "Ocultar actividad" : "Ver actividad"} <span aria-hidden="true">↑</span>
      </button>
      <button className="button button--secondary" type="button" onClick={onReset}>Preparar otro turno</button>
      {state.simulation.isPanelOpen && (
        <SimulationPanel
          dispatch={dispatch}
          isCovered={coverage.status === "complete"}
          simulation={state.simulation}
          onClose={closeSimulation}
        />
      )}
    </section>
  );
}

export function DemoApp() {
  const { state, dispatch, isHydrated, resetDemo } = useDemoState();
  const shift = getShiftPlan(state.selectedShift);
  const step = state.screen === "shift" ? 1 : state.screen === "plan" ? 2 : state.screen === "handoff" ? 3 : state.screen === "activation" ? 4 : 5;

  return (
    <main className="app-shell">
      <div className="app-shell__topbar">
        <button className="wordmark" type="button" onClick={resetDemo} aria-label="Reiniciar demo y volver al inicio">
          Snooze<span>Ops</span>
        </button>
      </div>
      <div className="progress" aria-label={`Paso ${step} de 5`}><span style={{ width: `${step * 20}%` }} /></div>
      {!isHydrated && <p className="loading-state" role="status">Cargando demo…</p>}
      <div id="main-content" className={isHydrated ? "app-shell__content" : "app-shell__content app-shell__content--loading"}>
        {state.screen === "shift" && <ShiftScreen state={state} dispatch={dispatch} shift={shift} />}
        {state.screen === "plan" && <PlanScreen state={state} dispatch={dispatch} shift={shift} />}
        {state.screen === "handoff" && <HandoffScreen state={state} dispatch={dispatch} shift={shift} />}
        {state.screen === "activation" && <ActivationScreen state={state} dispatch={dispatch} shift={shift} onReset={resetDemo} />}
        {state.screen === "morning" && <MorningScreen state={state} shift={shift} onReset={resetDemo} />}
      </div>
      <p className="synthetic-note">Demo local · Datos sintéticos</p>
    </main>
  );
}
