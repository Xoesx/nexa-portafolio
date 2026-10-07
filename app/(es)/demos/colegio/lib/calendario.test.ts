import { describe, expect, it } from "vitest";
import { FECHAS_ADMISION, VISITAS } from "../data";
import { aISO, avisoDeEtapa, diasEntre, estadosDelCalendario, proximasVisitas, rangoLegible, type Etapa } from "./calendario";

const ETAPAS: Etapa[] = [
  { fecha: "2026-09-14", hasta: "2026-11-07", titulo: "Preinscripción", detalle: "" },
  { fecha: "2026-10-24", titulo: "Puertas abiertas", detalle: "" },
  { fecha: "2026-11-14", titulo: "Evaluación", detalle: "" },
];

describe("estadosDelCalendario", () => {
  it("antes de empezar, la primera etapa es la siguiente", () => {
    expect(estadosDelCalendario(ETAPAS, "2026-09-01")).toEqual(["siguiente", "pendiente", "pendiente"]);
  });

  it("marca la etapa en curso y la siguiente a la vez", () => {
    expect(estadosDelCalendario(ETAPAS, "2026-10-06")).toEqual(["en-curso", "siguiente", "pendiente"]);
  });

  it("un evento de un día está en curso solo ese día", () => {
    expect(estadosDelCalendario(ETAPAS, "2026-10-24")).toEqual(["en-curso", "en-curso", "siguiente"]);
    expect(estadosDelCalendario(ETAPAS, "2026-10-25")).toEqual(["en-curso", "pasada", "siguiente"]);
  });

  it("al final todo queda como pasado", () => {
    expect(estadosDelCalendario(ETAPAS, "2026-12-31")).toEqual(["pasada", "pasada", "pasada"]);
  });
});

describe("diasEntre", () => {
  it("cuenta días de calendario, también entre meses y años", () => {
    expect(diasEntre("2026-10-06", "2026-10-24")).toBe(18);
    expect(diasEntre("2026-12-30", "2027-01-02")).toBe(3);
    expect(diasEntre("2028-02-28", "2028-03-01")).toBe(2);
    expect(diasEntre("2026-10-24", "2026-10-06")).toBe(-18);
  });
});

describe("avisoDeEtapa", () => {
  it("dice cuánto falta o cuánto queda", () => {
    expect(avisoDeEtapa(ETAPAS[1], "siguiente", "2026-10-06")).toBe("Faltan 18 días");
    expect(avisoDeEtapa(ETAPAS[1], "siguiente", "2026-10-23")).toBe("Es mañana");
    expect(avisoDeEtapa(ETAPAS[1], "en-curso", "2026-10-24")).toBe("Es hoy");
    expect(avisoDeEtapa(ETAPAS[0], "en-curso", "2026-10-06")).toBe("En curso, quedan 32 días");
    expect(avisoDeEtapa(ETAPAS[0], "en-curso", "2026-11-06")).toBe("En curso, cierra mañana");
    expect(avisoDeEtapa(ETAPAS[0], "en-curso", "2026-11-07")).toBe("Hoy es el último día");
    expect(avisoDeEtapa(ETAPAS[2], "pendiente", "2026-10-06")).toBeNull();
  });
});

describe("proximasVisitas", () => {
  it("da los próximos miércoles y sábados desde mañana", () => {
    // Martes 6 de octubre de 2026
    expect(proximasVisitas(new Date(2026, 9, 6), [3, 6])).toEqual(["2026-10-07", "2026-10-10", "2026-10-14", "2026-10-17"]);
  });

  it("no incluye el día de hoy aunque sea día de visita", () => {
    // Miércoles 7 de octubre de 2026
    expect(proximasVisitas(new Date(2026, 9, 7), [3], 2)).toEqual(["2026-10-14", "2026-10-21"]);
  });

  it("sin días válidos devuelve una lista vacía en vez de quedarse buscando", () => {
    expect(proximasVisitas(new Date(2026, 9, 6), [])).toEqual([]);
    expect(proximasVisitas(new Date(2026, 9, 6), [9])).toEqual([]);
  });
});

describe("rangoLegible y aISO", () => {
  it("escribe las fechas igual en el servidor y en el navegador", () => {
    expect(rangoLegible({ fecha: "2026-10-24", titulo: "", detalle: "" })).toBe("24 oct");
    expect(rangoLegible({ fecha: "2026-09-14", hasta: "2026-11-07", titulo: "", detalle: "" })).toBe("14 set al 7 nov");
    expect(aISO(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("datos de admisión", () => {
  it("las etapas están ordenadas y cada rango termina después de empezar", () => {
    const inicios = FECHAS_ADMISION.map((e) => e.fecha);
    expect([...inicios].sort()).toEqual(inicios);
    for (const e of FECHAS_ADMISION) if (e.hasta) expect(e.hasta > e.fecha).toBe(true);
  });

  it("las visitas usan días y horas válidos", () => {
    for (const d of VISITAS.dias) expect(d).toBeGreaterThanOrEqual(0);
    for (const t of VISITAS.turnos) expect(t).toMatch(/^\d{1,2}:\d{2}$/);
  });
});
