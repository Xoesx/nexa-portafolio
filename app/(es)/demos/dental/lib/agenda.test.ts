import { describe, expect, it } from "vitest";
import { buscarTratamiento, doctoresPara, TRATAMIENTOS } from "../data";
import { aISO, crearICS, horarioDisponible, primerHorarioLibre, proximosDias, turnosDel } from "./agenda";

// Martes 6 de octubre de 2026
const HOY = new Date(2026, 9, 6, 10, 30);

describe("proximosDias", () => {
  it("empieza mañana y salta los domingos", () => {
    const dias = proximosDias(6, HOY).map(aISO);
    expect(dias).toEqual(["2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10", "2026-10-12", "2026-10-13"]);
  });
});

describe("turnosDel", () => {
  const lunes = new Date(2026, 9, 12);
  const sabado = new Date(2026, 9, 10);
  const domingo = new Date(2026, 9, 11);

  it("ofrece turnos cada media hora y el último termina antes del cierre", () => {
    const turnos = turnosDel(lunes, 90, "valeria-rios");
    expect(turnos[0].hora).toBe("09:00");
    expect(turnos.at(-1)?.hora).toBe("18:30");
    expect(turnos.every((t, i) => i === 0 || t.hora > turnos[i - 1].hora)).toBe(true);
  });

  it("el sábado cierra a las 14:00 y el domingo no atiende", () => {
    expect(turnosDel(sabado, 30, "valeria-rios").at(-1)?.hora).toBe("13:30");
    expect(turnosDel(domingo, 30, "valeria-rios")).toEqual([]);
  });

  it("es estable: el mismo día y especialista dan siempre la misma disponibilidad", () => {
    expect(turnosDel(lunes, 45, "andres-salazar")).toEqual(turnosDel(new Date(2026, 9, 12), 45, "andres-salazar"));
  });
});

describe("primerHorarioLibre y horarioDisponible", () => {
  const evaluacion = buscarTratamiento("evaluacion")!;
  const doctores = doctoresPara(evaluacion.especialidad).map((d) => d.id);
  const dias = proximosDias(12, HOY);

  it("encuentra el primer turno libre y la agenda lo acepta por enlace", () => {
    const turno = primerHorarioLibre(dias, evaluacion.minutos, doctores);
    expect(turno).not.toBeNull();
    expect(horarioDisponible(dias, aISO(turno!.fecha), turno!.hora, evaluacion.minutos, turno!.doctorId)).toBe(true);
  });

  it("no hay un turno libre más temprano ese mismo día con ningún especialista", () => {
    const turno = primerHorarioLibre(dias, evaluacion.minutos, doctores)!;
    for (const id of doctores) {
      const antes = turnosDel(turno.fecha, evaluacion.minutos, id).filter((t) => t.hora < turno.hora);
      expect(antes.some((t) => t.libre)).toBe(false);
    }
  });

  it("rechaza enlaces con fecha fuera de la agenda, hora inexistente u ocupada", () => {
    const id = doctores[0];
    expect(horarioDisponible(dias, "2020-01-01", "09:00", 45, id)).toBe(false);
    expect(horarioDisponible(dias, aISO(dias[0]), "09:10", 45, id)).toBe(false);
    const ocupado = dias.flatMap((d) => turnosDel(d, 45, id).map((t) => ({ d, t }))).find(({ t }) => !t.libre);
    expect(ocupado).toBeDefined();
    expect(horarioDisponible(dias, aISO(ocupado!.d), ocupado!.t.hora, 45, id)).toBe(false);
  });

  it("sin especialistas no hay horario", () => {
    expect(primerHorarioLibre(dias, 45, [])).toBeNull();
  });
});

describe("crearICS", () => {
  const ics = crearICS({
    titulo: "Evaluación; control",
    inicio: new Date(Date.UTC(2026, 9, 7, 14, 0)),
    minutos: 45,
    lugar: "Jr. Tarapacá 123, Pucallpa",
    detalle: "Primera línea\nSegunda línea",
  });

  it("usa saltos de línea CRLF como pide el estándar", () => {
    expect(ics.split("\r\n")[0]).toBe("BEGIN:VCALENDAR");
    expect(ics.replace(/\r\n/g, "")).not.toContain("\n");
  });

  it("calcula inicio y fin en UTC", () => {
    expect(ics).toContain("DTSTART:20261007T140000Z");
    expect(ics).toContain("DTEND:20261007T144500Z");
  });

  it("escapa comas, punto y coma y saltos de línea del texto", () => {
    expect(ics).toContain("SUMMARY:Evaluación\\; control");
    expect(ics).toContain("LOCATION:Jr. Tarapacá 123\\, Pucallpa");
    expect(ics).toContain("DESCRIPTION:Primera línea\\nSegunda línea");
  });
});

describe("datos de la clínica", () => {
  it("cada tratamiento tiene al menos un especialista que lo atiende", () => {
    for (const t of TRATAMIENTOS) expect(doctoresPara(t.especialidad).length).toBeGreaterThan(0);
  });
});
