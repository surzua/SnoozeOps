import { describe, expect, it } from "vitest";
import { durationInMinutes, getMorningMetrics } from "@/domain/metrics";

describe("durationInMinutes", () => {
  it("calcula una ventana que cruza medianoche", () => {
    expect(durationInMinutes("23:30–06:30")).toBe(7 * 60);
  });

  it("considera que una hora final igual termina al día siguiente", () => {
    expect(durationInMinutes("06:30–06:30")).toBe(24 * 60);
  });
});

describe("getMorningMetrics", () => {
  it("calcula 60 minutos reservados para el turno de día", () => {
    expect(getMorningMetrics({ usualWindow: "00:30–06:30", proposedWindow: "23:30–06:30" })).toMatchObject({
      usualDurationMinutes: 6 * 60,
      proposedDurationMinutes: 7 * 60,
      minutesReserved: 60,
    });
  });

  it("calcula 60 minutos reservados para el turno de noche", () => {
    expect(getMorningMetrics({ usualWindow: "09:00–14:00", proposedWindow: "08:30–14:30" })).toMatchObject({
      usualDurationMinutes: 5 * 60,
      proposedDurationMinutes: 6 * 60,
      minutesReserved: 60,
    });
  });
});
