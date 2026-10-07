import type { z } from "zod";

/** El primer mensaje de error de cada campo, que es lo que el formulario muestra debajo de cada uno. */
export function erroresPorCampo(issues: z.core.$ZodIssue[]): Record<string, string> {
  const errores: Record<string, string> = {};
  for (const issue of issues) errores[String(issue.path[0] ?? "general")] ??= issue.message;
  return errores;
}
