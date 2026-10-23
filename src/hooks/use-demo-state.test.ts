import { describe, expect, it } from "vitest";
import { initialDemoState } from "@/domain/demo-reducer";
import { hydrateDemoState } from "@/hooks/use-demo-state";

describe("hydrateDemoState", () => {
  it("hidrata snapshots previos sin modo de red como conexión disponible", () => {
    const legacyState = {
      ...initialDemoState,
      simulation: {
        isPanelOpen: true,
        nightHistory: [],
        securityTest: null,
      },
    };

    const hydrated = hydrateDemoState(legacyState);

    expect(hydrated?.simulation.isPanelOpen).toBe(true);
    expect(hydrated?.simulation.isNetworkMocked).toBe(false);
  });

  it("preserva el modo offline persistido", () => {
    const persistedState = {
      ...initialDemoState,
      simulation: {
        ...initialDemoState.simulation,
        isNetworkMocked: true,
      },
    };

    expect(hydrateDemoState(persistedState)?.simulation.isNetworkMocked).toBe(true);
  });
});
