import { describe, expect, it } from "vitest";
import { parseAnalysisPayload } from "@/adaptive-cycle/domain/analysis";

const base = {
  decision: "clarification",
  rationale: "El resultado no permite identificar por qué se mantuvo la misma duración.",
  question: "¿Qué ocupó el tiempo liberado antes de intentar dormir?",
  actionId: null,
  personSaid: ["Cerró antes y mantuvo la misma hora de intento."],
  inferred: ["El tiempo libre aún no se convirtió necesariamente en oportunidad de descanso."],
  unknown: ["Qué ocupó ese tiempo."],
  context: { restId: "rest-1", experimentId: "experiment-1", experimentVersion: 1, shiftId: "shift-1" },
};

describe("contrato de análisis adaptativo", () => {
  it("acepta una aclaración estructurada y limitada", () => {
    expect(parseAnalysisPayload(base)).toMatchObject({ decision: "clarification", question: base.question });
  });

  it("rechaza una acción libre fuera del catálogo", () => {
    expect(parseAnalysisPayload({ ...base, decision: "action", question: null, actionId: "take-medication" })).toBeNull();
  });

  it("rechaza una decisión contradictoria", () => {
    expect(parseAnalysisPayload({ ...base, decision: "action", actionId: "write-pending" })).toBeNull();
  });
});
