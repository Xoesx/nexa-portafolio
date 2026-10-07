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

export type HorarioLibre = { fecha: Date; hora: string; doctorId: string };

/**
 * El primer horario libre entre varios especialistas: recorre los días en orden y, dentro de cada día,
 * se queda con la hora más temprana que tenga libre cualquiera de ellos.
 */
export function primerHorarioLibre(dias: Date[], minutos: number, doctorIds: string[]): HorarioLibre | null {
  for (const fecha of dias) {
    let mejor: HorarioLibre | null = null;
    for (const doctorId of doctorIds) {
      const libre = turnosDel(fecha, minutos, doctorId).find((t) => t.libre);
      if (libre && (!mejor || libre.hora < mejor.hora)) mejor = { fecha, hora: libre.hora, doctorId };
    }
    if (mejor) return mejor;
  }
  return null;
}

/**
 * Valida un horario que llega por enlace (?fecha=AAAA-MM-DD&hora=HH:MM): la fecha tiene que estar entre
 * los días que ofrece la agenda y la hora tiene que estar libre para ese especialista y esa duración.
 */
export function horarioDisponible(dias: Date[], fechaISO: string, hora: string, minutos: number, doctorId: string): boolean {
  const fecha = dias.find((d) => aISO(d) === fechaISO);
  if (!fecha) return false;
  return turnosDel(fecha, minutos, doctorId).some((t) => t.hora === hora && t.libre);
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
