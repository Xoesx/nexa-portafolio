/** Horario de atención por día de la semana (0 = domingo): [apertura, cierre] en horas; 23.5 son las 23:30. */
export type Horario = Record<number, readonly [number, number] | null>;

export const HORARIO: Horario = {
  0: [12, 17],
  1: [12, 22],
  2: [12, 22],
  3: [12, 22],
  4: [12, 22],
  5: [12, 23.5],
  6: [12, 23.5],
};

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const conMayuscula = (t: string) => t[0].toUpperCase() + t.slice(1);

/** 23.5 → "23:30". */
export const horaLegible = (h: number) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

/** El horario agrupado como se escribe en una puerta: "Lunes a jueves · 12:00 a 22:00". Empieza el lunes. */
export function horarioPorTramos(horario: Horario = HORARIO): { dias: string; horas: string }[] {
  const semana = [1, 2, 3, 4, 5, 6, 0];
  const texto = (d: number) => {
    const r = horario[d];
    return r ? `${horaLegible(r[0])} a ${horaLegible(r[1])}` : "Cerrado";
  };
  const tramos: { desde: number; hasta: number; horas: string }[] = [];
  for (const d of semana) {
    const ultimo = tramos.at(-1);
    if (ultimo && ultimo.horas === texto(d)) ultimo.hasta = d;
    else tramos.push({ desde: d, hasta: d, horas: texto(d) });
  }
  return tramos.map(({ desde, hasta, horas }) => {
    const juntos = semana.indexOf(hasta) - semana.indexOf(desde);
    const dias = juntos === 0 ? DIAS[desde] : `${DIAS[desde]} ${juntos === 1 ? "y" : "a"} ${DIAS[hasta]}`;
    return { dias: conMayuscula(dias), horas };
  });
}

/**
 * Día de la semana y minutos desde la medianoche en Pucallpa, para que un visitante de otro país vea si el
 * local está abierto allá y no en su propia hora. El Perú está en UTC-5 todo el año (no cambia de hora).
 */
export function ahoraEnPucallpa(fecha = new Date()): { dia: number; minutos: number } {
  const local = new Date(fecha.getTime() - 5 * 60 * 60 * 1000);
  return { dia: local.getUTCDay(), minutos: local.getUTCHours() * 60 + local.getUTCMinutes() };
}

export type EstadoLocal = { abierto: boolean; texto: string };

/** "Abierto ahora · cierra a las 22:00", "Cerrado · abre mañana a las 12:00" y variantes. */
export function estadoDelLocal({ dia, minutos }: { dia: number; minutos: number }, horario: Horario = HORARIO): EstadoLocal {
  const hoy = horario[dia];
  if (hoy && minutos >= hoy[0] * 60 && minutos < hoy[1] * 60) {
    const cierre = horaLegible(hoy[1]);
    return { abierto: true, texto: hoy[1] * 60 - minutos <= 60 ? `Cierra pronto · a las ${cierre}` : `Abierto ahora · cierra a las ${cierre}` };
  }
  if (hoy && minutos < hoy[0] * 60) return { abierto: false, texto: `Cerrado · abre hoy a las ${horaLegible(hoy[0])}` };
  for (let i = 1; i <= 7; i++) {
    const otro = horario[(dia + i) % 7];
    if (!otro) continue;
    const cuando = i === 1 ? "mañana" : `el ${DIAS[(dia + i) % 7]}`;
    return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${horaLegible(otro[0])}` };
  }
  return { abierto: false, texto: "Cerrado" };
}
