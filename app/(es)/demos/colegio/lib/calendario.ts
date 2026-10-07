/** Una etapa de la admisión. Las fechas van en AAAA-MM-DD; `hasta` solo si la etapa dura varios días. */
export type Etapa = { fecha: string; hasta?: string; titulo: string; detalle: string };

export type EstadoEtapa = "pasada" | "en-curso" | "siguiente" | "pendiente";

/**
 * Estado de cada etapa para el día de hoy. Las etapas tienen que venir ordenadas por fecha de inicio:
 * la primera que todavía no empieza es la "siguiente", aunque haya otra en curso al mismo tiempo.
 */
export function estadosDelCalendario(etapas: Etapa[], hoy: string): EstadoEtapa[] {
  const siguiente = etapas.findIndex((e) => e.fecha > hoy);
  return etapas.map((e, i) => {
    if ((e.hasta ?? e.fecha) < hoy) return "pasada";
    if (e.fecha <= hoy) return "en-curso";
    return i === siguiente ? "siguiente" : "pendiente";
  });
}

const aUTC = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return Date.UTC(a, m - 1, d);
};

/** Días de calendario entre dos fechas AAAA-MM-DD (negativo si `hasta` es anterior). */
export const diasEntre = (desde: string, hasta: string) => Math.round((aUTC(hasta) - aUTC(desde)) / 86_400_000);

/** Lo que se le dice a la familia sobre una etapa según cuánto falta, o null si no hace falta decir nada. */
export function avisoDeEtapa(etapa: Etapa, estado: EstadoEtapa, hoy: string): string | null {
  if (estado === "en-curso") {
    if (!etapa.hasta) return "Es hoy";
    const quedan = diasEntre(hoy, etapa.hasta);
    if (quedan === 0) return "Hoy es el último día";
    return quedan === 1 ? "En curso, cierra mañana" : `En curso, quedan ${quedan} días`;
  }
  if (estado === "siguiente") {
    const faltan = diasEntre(hoy, etapa.fecha);
    return faltan === 1 ? "Es mañana" : `Faltan ${faltan} días`;
  }
  return estado === "pasada" ? "Ya pasó" : null;
}

/** Fecha local en AAAA-MM-DD (toISOString daría el día en UTC, que en Perú cambia a las 7 de la noche). */
export const aISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Los próximos días de visita a partir de mañana. `dias` usa la numeración de getDay: 0 es domingo. */
export function proximasVisitas(desde: Date, dias: readonly number[], cantidad = 4): string[] {
  const visitas: string[] = [];
  if (!dias.some((n) => n >= 0 && n <= 6)) return visitas;
  const d = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate());
  while (visitas.length < cantidad) {
    d.setDate(d.getDate() + 1);
    if (dias.includes(d.getDay())) visitas.push(aISO(d));
  }
  return visitas;
}

// Abreviaturas fijas en vez de toLocaleDateString: el servidor y el navegador pueden traer versiones distintas
// de los datos de idioma ("sep" o "set") y el texto no coincidiría al hidratar.
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"];
const corta = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MESES[m - 1]}`;
};

/** "24 oct" o "14 set al 7 nov", según si la etapa dura un día o varios. */
export const rangoLegible = (etapa: Etapa) => (etapa.hasta ? `${corta(etapa.fecha)} al ${corta(etapa.hasta)}` : corta(etapa.fecha));
