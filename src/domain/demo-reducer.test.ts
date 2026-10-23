import { describe, expect, it } from "vitest";
import { demoReducer, initialDemoState } from "@/domain/demo-reducer";

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
});
