import type { NightSummary, RoutingDecision } from "@/domain/types";

export function getNightSummary(decisions: RoutingDecision[]): NightSummary {
  const groupedIncidents = decisions.filter(
    (decision) =>
      decision.incident.scenario === "night_simulation" &&
      decision.status === "grouped_pending_review",
  );

  return {
    groupedIncidents,
    reviewAt: groupedIncidents[0]?.reviewAt ?? null,
  };
}
