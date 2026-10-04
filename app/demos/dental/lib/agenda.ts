export type Turno = { hora: string; libre: boolean };

const HORARIO: Record<number, [number, number] | null> = {
  0: null, // domingo cerrado
  1: [9, 20],
  2: [9, 20],
  3: [9, 20],
  4: [9, 20],
  5: [9, 20],
  6: [9, 14],
};

export const aISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Días hábiles desde mañana (sin domingos). */
export function proximosDias(cantidad: number, desde = new Date()): Date[] {
  const dias: Date[] = [];
  const d = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate());
  while (dias.length < cantidad) {
    d.setDate(d.getDate() + 1);
    if (HORARIO[d.getDay()]) dias.push(new Date(d));
  }
  return dias;
}

// Hash simple y estable: la misma fecha, doctor y hora siempre dan el mismo resultado.
function hash(texto: string) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) h = Math.imul(h ^ texto.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967295;
}

/** Turnos cada 30 minutos en los que entra el tratamiento antes del cierre. */
export function turnosDel(fecha: Date, minutos: number, doctorId: string): Turno[] {
  const rango = HORARIO[fecha.getDay()];
  if (!rango) return [];
  const [abre, cierra] = rango;
  const turnos: Turno[] = [];
  for (let m = abre * 60; m + minutos <= cierra * 60; m += 30) {
    const hora = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    turnos.push({ hora, libre: hash(`${aISO(fecha)}|${doctorId}|${hora}`) > 0.38 });
  }
  return turnos;
}

/** Archivo .ics para que el paciente guarde la cita en su calendario. */
export function crearICS({ titulo, inicio, minutos, lugar, detalle }: { titulo: string; inicio: Date; minutos: number; lugar: string; detalle: string }) {
  const fin = new Date(inicio.getTime() + minutos * 60000);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const escapar = (t: string) => t.replace(/[,;\\]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Clinica Dental Alba//Demo NEXA//ES",
    "BEGIN:VEVENT",
    `UID:${f(inicio)}-${Math.round(inicio.getTime() / 1000)}@alba.demo`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(inicio)}`,
    `DTEND:${f(fin)}`,
    `SUMMARY:${escapar(titulo)}`,
    `LOCATION:${escapar(lugar)}`,
    `DESCRIPTION:${escapar(detalle)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Recordatorio de tu cita",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
