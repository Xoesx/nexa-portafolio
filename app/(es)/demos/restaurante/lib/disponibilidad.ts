import { HORARIO, type Horario } from "./horario";

export type Turno = { hora: string; libre: boolean };

export const aISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Hash estable: misma fecha, hora y tamaño de grupo dan siempre la misma disponibilidad.
function hash(texto: string) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) h = Math.imul(h ^ texto.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

/**
 * Turnos de reserva cada 30 minutos. La última mesa se da una hora antes del cierre y, si la fecha es hoy,
 * solo se ofrecen horarios con al menos media hora de anticipación.
 */
export function turnosDelDia(fecha: Date, personas: number, ahora: Date, horario: Horario = HORARIO): Turno[] {
  const rango = horario[fecha.getDay()];
  if (!rango) return [];
  const [abre, cierra] = rango;
  const esHoy = aISO(fecha) === aISO(ahora);
  const turnos: Turno[] = [];
  for (let m = abre * 60; m <= (cierra - 1) * 60; m += 30) {
    if (esHoy && m <= ahora.getHours() * 60 + ahora.getMinutes() + 30) continue;
    const hora = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    // Los grupos grandes encuentran menos mesas libres.
    turnos.push({ hora, libre: hash(`${aISO(fecha)}|${hora}|${personas > 4 ? "g" : "p"}`) > (personas > 4 ? 0.55 : 0.3) });
  }
  return turnos;
}
