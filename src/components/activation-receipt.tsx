import { HandoffPassport } from "@/components/handoff-passport";
import type { CoverageSummary, ShiftPlan } from "@/domain/types";

export function ActivationReceipt({ summary, shift }: { summary: CoverageSummary; shift: ShiftPlan }) {
  return (
    <HandoffPassport
      summary={summary}
      shift={shift}
      title="Recibo factual de activación"
      variant="historical"
    />
  );
}
