import { describe, expect, it } from "vitest";
import { demoReducer, initialDemoState } from "@/domain/demo-reducer";

const passwordIncident = {
  id: "password-change",
  title: "Cambio de contraseña",
  severity: "P3" as const,
  confidence: "high" as const,
  impact: "stable" as const,
  scenario: "night_simulation" as const,
};

const databaseIncident = {
  id: "database-down",
  title: "Base de datos caída",
  severity: "P1" as const,
  confidence: "high" as const,
  impact: "growing" as const,
  scenario: "security_test" as const,
};

describe("demoReducer", () => {
  it("no permite activar sueño protegido sin aceptación", () => {
    const result = demoReducer(initialDemoState, { type: "activate_protected" });

    expect(result).toEqual(initialDemoState);
  });

  it("habilita el modo protegido solo tras una aceptación", () => {
    const pending = demoReducer(initialDemoState, { type: "request_handoff" });
    const accepted = demoReducer(pending, { type: "respond_handoff", response: "accepted" });
    const active = demoReducer(accepted, { type: "activate_protected" });

    expect(active.handoffStatus).toBe("accepted");
    expect(active.activationMode).toBe("protected");
    expect(active.screen).toBe("activation");
  });

  it("ofrece guardia filtrada cuando Andrea rechaza", () => {
    const pending = demoReducer(initialDemoState, { type: "request_handoff" });
    const declined = demoReducer(pending, { type: "respond_handoff", response: "declined" });
    const active = demoReducer(declined, { type: "activate_filtered" });

    expect(active.handoffStatus).toBe("declined");
    expect(active.activationMode).toBe("filtered");
  });

  it("invalida una aceptación si cambia el turno", () => {
    const pending = demoReducer(initialDemoState, { type: "request_handoff" });
    const accepted = demoReducer(pending, { type: "respond_handoff", response: "accepted" });
    const changed = demoReducer(accepted, { type: "select_shift", shift: "night" });

    expect(changed.selectedShift).toBe("night");
    expect(changed.handoffStatus).toBe("not_requested");
    expect(changed.activationMode).toBe("none");
  });

  it("mantiene el incidente habitual separado de la prueba de seguridad", () => {
    const pending = demoReducer(initialDemoState, { type: "request_handoff" });
    const accepted = demoReducer(pending, { type: "respond_handoff", response: "accepted" });
    const active = demoReducer(accepted, { type: "activate_protected" });
    const withNightIncident = demoReducer(active, { type: "inject_incident", incident: passwordIncident });
    const withSecurityTest = demoReducer(withNightIncident, { type: "inject_incident", incident: databaseIncident });

    expect(withSecurityTest.simulation.nightHistory).toHaveLength(1);
    expect(withSecurityTest.simulation.nightHistory[0]?.status).toBe("grouped_pending_review");
    expect(withSecurityTest.simulation.securityTest?.status).toBe("escalated_waiting_for_ack");
  });

  it("solo permite resolver la prueba P1 cuando está esperando a Andrea", () => {
    const pending = demoReducer(initialDemoState, { type: "request_handoff" });
    const accepted = demoReducer(pending, { type: "respond_handoff", response: "accepted" });
    const active = demoReducer(accepted, { type: "activate_protected" });
    const waiting = demoReducer(active, { type: "inject_incident", incident: databaseIncident });
    const acknowledged = demoReducer(waiting, { type: "resolve_security_test", outcome: "acknowledged" });
    const unchanged = demoReducer(acknowledged, { type: "resolve_security_test", outcome: "timed_out" });

    expect(acknowledged.simulation.securityTest?.status).toBe("acknowledged_by_backup");
    expect(unchanged).toEqual(acknowledged);
  });
});
