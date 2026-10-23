import type { HealthSuggestion } from "@/domain/types";

export function HealthDisclaimer({ suggestion }: { suggestion: HealthSuggestion }) {
  return (
    <aside className="health-disclaimer" aria-labelledby="health-suggestion-title">
      <span className="morning-icon morning-icon--warning" aria-hidden="true">i</span>
      <div>
        <h2 id="health-suggestion-title">{suggestion.title}</h2>
        <p>{suggestion.guidance}</p>
        <p className="health-disclaimer__warning">{suggestion.medicationWarning}</p>
      </div>
    </aside>
  );
}
