import { ANIO_ESCOLAR, type Nivel } from "../data";

export type Grado = { grado: string; nivel: Nivel["id"] };

/**
 * Edad cumplida al 31 de marzo del año escolar, que es la fecha de corte del Ministerio de Educación del Perú
 * para la matrícula. Devuelve null si la fecha no tiene el formato AAAA-MM-DD o no existe (por ejemplo, 30 de febrero).
 */
export function edadAlCorte(fechaNacimiento: string, anio = ANIO_ESCOLAR): number | null {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaNacimiento);
  if (!partes) return null;
  const [a, m, d] = partes.slice(1).map(Number);
  const fecha = new Date(Date.UTC(a, m - 1, d));
  if (fecha.getUTCMonth() !== m - 1 || fecha.getUTCDate() !== d) return null;
  // Quien nació de abril en adelante todavía no cumple años al 31 de marzo.
  return anio - a - (m > 3 ? 1 : 0);
}

/** Grado que le corresponde en el año escolar según su fecha de nacimiento (AAAA-MM-DD). */
export function gradoSegunNacimiento(fechaNacimiento: string, anio = ANIO_ESCOLAR): Grado | null {
  const edad = edadAlCorte(fechaNacimiento, anio);
  if (edad === null) return null;
  if (edad >= 3 && edad <= 5) return { grado: `Inicial ${edad} años`, nivel: "inicial" };
  if (edad >= 6 && edad <= 11) return { grado: `${edad - 5}.° de primaria`, nivel: "primaria" };
  if (edad >= 12 && edad <= 16) return { grado: `${edad - 11}.° de secundaria`, nivel: "secundaria" };
  return null;
}

/** Fechas de nacimiento que entran en algún grado: de 5.° de secundaria (16 años) a inicial de 3 años. */
export const rangoNacimiento = (anio = ANIO_ESCOLAR) => ({ min: `${anio - 17}-04-01`, max: `${anio - 3}-03-31` });

/** Por qué una fecha no corresponde a ningún grado, dicho como se lo explicaríamos a la familia. */
export function motivoSinGrado(fechaNacimiento: string, anio = ANIO_ESCOLAR): string {
  const edad = edadAlCorte(fechaNacimiento, anio);
  if (edad === null) return "Revisa la fecha de nacimiento.";
  if (edad < 3) return `En ${anio} todavía no le toca empezar. Inicial recibe a niños con 3 años cumplidos al 31 de marzo.`;
  return `Con esa fecha ya no le corresponde un grado escolar en ${anio}.`;
}
