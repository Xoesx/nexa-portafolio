import { ANIO_ESCOLAR } from "../data";

/**
 * Grado que corresponde según la edad cumplida al 31 de marzo del año escolar,
 * que es la regla del Ministerio de Educación del Perú.
 */
export function gradoSegunNacimiento(fechaNacimiento: string): { grado: string; nivel: "inicial" | "primaria" | "secundaria" } | null {
  const [a, m, d] = fechaNacimiento.split("-").map(Number);
  if (!a || !m || !d) return null;
  const corte = new Date(ANIO_ESCOLAR, 2, 31);
  let edad = corte.getFullYear() - a;
  if (corte.getMonth() + 1 < m || (corte.getMonth() + 1 === m && corte.getDate() < d)) edad--;

  if (edad >= 3 && edad <= 5) return { grado: `Inicial ${edad} años`, nivel: "inicial" };
  if (edad >= 6 && edad <= 11) return { grado: `${edad - 5}.° de primaria`, nivel: "primaria" };
  if (edad >= 12 && edad <= 16) return { grado: `${edad - 11}.° de secundaria`, nivel: "secundaria" };
  return null;
}
