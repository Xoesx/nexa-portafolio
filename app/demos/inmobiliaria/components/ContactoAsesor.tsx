"use client";

import { useState } from "react";
import { limpiarTelefono, TELEFONO, validar } from "../lib/validar";
import { Campo, estiloCampo } from "./Campo";

export function ContactoAsesor({ titulo }: { titulo: string }) {
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [listo, setListo] = useState<{ nombre: string; visita: boolean } | null>(null);

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = await validar(
      (z) =>
        z.object({
          nombre: z.string().trim().min(3, "Escribe tu nombre."),
          telefono: z.string().transform(limpiarTelefono).pipe(z.string().regex(TELEFONO, "Escribe un celular de 9 dígitos.")),
          mensaje: z.string().max(500).optional(),
          visita: z.string().optional(),
        }),
      e.currentTarget,
    );
    if (!r.ok) return setErrores(r.errores);
    setErrores({});
    setListo({ nombre: r.datos.nombre.split(" ")[0], visita: r.datos.visita === "si" });
  };

  if (listo) {
    return (
      <div role="status" className="rounded-2xl border border-[#e7e1d8] bg-white p-6">
        <p className="text-lg font-semibold">Gracias, {listo.nombre}.</p>
        <p className="mt-2 text-[15px] text-[#57534e]">
          {listo.visita ? "Te llamaremos hoy para agendar la visita." : "Un asesor te escribirá en menos de una hora."}
        </p>
        <p className="mt-4 text-xs text-[#78716c]">Demo: este mensaje no se envía a ningún lugar.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={enviar} className="space-y-4 rounded-2xl border border-[#e7e1d8] bg-white p-6">
      <p className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
        ¿Te interesa?
      </p>
      <Campo etiqueta="Nombre" nombre="nombre" autoComplete="name" error={errores.nombre} />
      <Campo etiqueta="Celular" nombre="telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="987 654 321" error={errores.telefono} />
      <div>
        <label htmlFor="rz-mensaje" className="text-sm font-semibold text-[#44403c]">Mensaje</label>
        <textarea
          id="rz-mensaje"
          name="mensaje"
          rows={3}
          maxLength={500}
          defaultValue={`Hola, me interesa "${titulo}". ¿Sigue disponible?`}
          className={`${estiloCampo} py-2.5`}
        />
      </div>
      <label className="flex min-h-11 items-center gap-3 text-[15px]">
        <input type="checkbox" name="visita" value="si" className="h-5 w-5 accent-[#b4532a]" />
        Quiero agendar una visita
      </label>
      <button type="submit" className="min-h-12 w-full rounded-xl bg-[#b4532a] font-semibold text-white transition-colors hover:bg-[#933f1d]">
        Contactar a un asesor
      </button>
    </form>
  );
}
