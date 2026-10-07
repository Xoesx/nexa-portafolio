import type { z as Z } from "zod";

type Resultado<T> = { ok: true; datos: T } | { ok: false; errores: Record<string, string> };

/**
 * Valida un formulario con Zod. La librería se descarga recién al enviar,
 * así la página carga más liviana.
 */
export async function validar<T>(crearEsquema: (z: typeof Z) => Z.ZodType<T>, form: HTMLFormElement): Promise<Resultado<T>> {
  const { z } = await import("zod");
  const resultado = crearEsquema(z).safeParse(Object.fromEntries(new FormData(form)));
  if (resultado.success) return { ok: true, datos: resultado.data };

  const errores: Record<string, string> = {};
  for (const issue of resultado.error.issues) errores[String(issue.path[0])] ??= issue.message;
  // Llevamos el foco al primer campo con error.
  form.querySelector<HTMLElement>(`[name="${Object.keys(errores)[0]}"]`)?.focus();
  return { ok: false, errores };
}

export const TELEFONO = /^9\d{8}$/;
export const limpiarTelefono = (v: string) => v.replace(/[\s-]/g, "");
