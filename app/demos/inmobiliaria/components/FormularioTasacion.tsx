"use client";

import { useState } from "react";
import { DISTRITOS } from "../data";
import { limpiarTelefono, TELEFONO, validar } from "../lib/validar";
import { Campo } from "./Campo";

export function FormularioTasacion() {
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState<string | null>(null);

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = await validar(
      (z) =>
        z.object({
          nombre: z.string().trim().min(3, "Escribe tu nombre."),
          telefono: z.string().transform(limpiarTelefono).pipe(z.string().regex(TELEFONO, "Escribe un celular de 9 dígitos.")),
          distrito: z.enum(DISTRITOS, { message: "Elige el distrito." }),
          tipo: z.enum(["casa", "departamento", "terreno"], { message: "Elige el tipo de propiedad." }),
        }),
      e.currentTarget,
    );
    if (!r.ok) return setErrores(r.errores);
    setErrores({});
    setEnviado(r.datos.nombre.split(" ")[0]);
  };

  if (enviado) {
    return (
      <div role="status" className="rounded-2xl border border-[#e7e1d8] bg-white p-8 text-center">
        <p className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
          Listo, {enviado}.
        </p>
        <p className="mt-3 text-[#57534e]">Un asesor te llamará en las próximas 24 horas para coordinar la visita de tasación.</p>
        <p className="mt-6 text-xs text-[#78716c]">Demo: esta solicitud no se envía a ningún lugar.</p>
        <button type="button" onClick={() => setEnviado(null)} className="mt-6 min-h-11 font-semibold text-[#933f1d] underline underline-offset-4">
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={enviar} className="grid grid-cols-1 gap-5 rounded-2xl border border-[#e7e1d8] bg-white p-6 sm:grid-cols-2 sm:p-8">
      <p className="sm:col-span-2 text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
        Pide tu tasación gratuita
      </p>
      <div className="sm:col-span-2">
        <Campo etiqueta="Nombre completo" nombre="nombre" autoComplete="name" error={errores.nombre} />
      </div>
      <Campo etiqueta="Celular" nombre="telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="987 654 321" error={errores.telefono} />
      <Campo etiqueta="Distrito" nombre="distrito" error={errores.distrito}>
        {(p) => (
          <select {...p} defaultValue="">
            <option value="" disabled>
              Elige uno
            </option>
            {DISTRITOS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        )}
      </Campo>
      <div className="sm:col-span-2">
        <Campo etiqueta="Tipo de propiedad" nombre="tipo" error={errores.tipo}>
          {(p) => (
            <select {...p} defaultValue="">
              <option value="" disabled>
                Elige uno
              </option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
            </select>
          )}
        </Campo>
      </div>
      <button
        type="submit"
        className="sm:col-span-2 min-h-12 rounded-xl bg-[#1c1917] font-semibold text-white transition-colors hover:bg-[#b4532a]"
      >
        Quiero mi tasación
      </button>
      <p className="sm:col-span-2 text-center text-xs text-[#78716c]">Demo: no se envía a ningún lugar.</p>
    </form>
  );
}
