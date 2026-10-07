import { describe, expect, it } from "vitest";
import { ahoraEnPucallpa, estadoDelLocal, horaLegible, HORARIO, horarioPorTramos, type Horario } from "./horario";

const a = (dia: number, hh: number, mm = 0) => ({ dia, minutos: hh * 60 + mm });

describe("estadoDelLocal", () => {
  it("abierto en horario normal", () => {
    expect(estadoDelLocal(a(2, 13))).toEqual({ abierto: true, texto: "Abierto ahora · cierra a las 22:00" });
  });

  it("avisa la última hora antes de cerrar", () => {
    expect(estadoDelLocal(a(2, 21, 15)).texto).toBe("Cierra pronto · a las 22:00");
    expect(estadoDelLocal(a(5, 22, 45)).texto).toBe("Cierra pronto · a las 23:30");
  });

  it("antes de abrir dice a qué hora abre hoy", () => {
    expect(estadoDelLocal(a(3, 9))).toEqual({ abierto: false, texto: "Cerrado · abre hoy a las 12:00" });
  });

  it("después del cierre dice cuándo abre al día siguiente", () => {
    expect(estadoDelLocal(a(2, 22))).toEqual({ abierto: false, texto: "Cerrado · abre mañana a las 12:00" });
    // El domingo cierra a las 17:00
    expect(estadoDelLocal(a(0, 18)).texto).toBe("Cerrado · abre mañana a las 12:00");
  });

  it("si mañana no abre, nombra el día", () => {
    const conLunesCerrado: Horario = { ...HORARIO, 1: null };
    expect(estadoDelLocal(a(0, 18), conLunesCerrado).texto).toBe("Cerrado · abre el martes a las 12:00");
  });

  it("si nunca abre, solo dice cerrado", () => {
    const cerrado: Horario = { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
    expect(estadoDelLocal(a(3, 12), cerrado)).toEqual({ abierto: false, texto: "Cerrado" });
  });
});

describe("ahoraEnPucallpa", () => {
  it("usa la hora del Perú (UTC-5) aunque el visitante esté en otra zona", () => {
    // 2026-10-07 02:30 UTC es martes 6 a las 21:30 en Pucallpa
    expect(ahoraEnPucallpa(new Date(Date.UTC(2026, 9, 7, 2, 30)))).toEqual({ dia: 2, minutos: 21 * 60 + 30 });
    // 2026-10-07 17:00 UTC es miércoles 7 al mediodía
    expect(ahoraEnPucallpa(new Date(Date.UTC(2026, 9, 7, 17, 0)))).toEqual({ dia: 3, minutos: 12 * 60 });
  });
});

describe("horarioPorTramos", () => {
  it("agrupa los días con el mismo horario, empezando el lunes", () => {
    expect(horarioPorTramos()).toEqual([
      { dias: "Lunes a jueves", horas: "12:00 a 22:00" },
      { dias: "Viernes y sábado", horas: "12:00 a 23:30" },
      { dias: "Domingo", horas: "12:00 a 17:00" },
    ]);
  });

  it("muestra los días cerrados", () => {
    expect(horarioPorTramos({ ...HORARIO, 0: null }).at(-1)).toEqual({ dias: "Domingo", horas: "Cerrado" });
  });

  it("escribe las horas con minutos", () => {
    expect(horaLegible(23.5)).toBe("23:30");
    expect(horaLegible(9)).toBe("9:00");
  });
});
