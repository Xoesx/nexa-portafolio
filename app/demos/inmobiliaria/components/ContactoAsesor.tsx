"use client";

import Image from "next/image";
import { useState } from "react";
import type { Asesor } from "../data";
import { limpiarTelefono, TELEFONO, validar } from "../lib/validar";
import { Campo, estiloCampo } from "./Campo";

// Próximos días hábiles para visitar (sin domingos). Se calculan en el navegador al pedir la visita.
function proximosDias(cantidad = 6) {
  const dias: Date[] = [];
  const d = new Date();
  while (dias.length < cantidad) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) dias.push(new Date(d));
  }
  return dias;
}

const aISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function ContactoAsesor({ titulo, codigo, asesor }: { titulo: string; codigo: string; asesor: Asesor }) {
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [visita, setVisita] = useState(false);
  const [dias, setDias] = useState<Date[]>([]);
  const [listo, setListo] = useState<{ nombre: string; visita?: string } | null>(null);

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = await validar(
      (z) =>
        z
          .object({
            nombre: z.string().trim().min(3, "Escribe tu nombre."),
            telefono: z.string().transform(limpiarTelefono).pipe(z.string().regex(TELEFONO, "Escribe un celular de 9 dígitos.")),
            mensaje: z.string().max(500).optional(),
            dia: z.string().optional(),
            turno: z.string().optional(),
          })
          .refine((d) => !visita || (d.dia && d.turno), { message: "Elige el día y el turno de la visita.", path: ["dia"] }),
      e.currentTarget,
    );
    if (!r.ok) return setErrores(r.errores);
    setErrores({});
    const textoVisita =
      visita && r.datos.dia
        ? `${new Date(`${r.datos.dia}T12:00:00`).toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" })}, ${r.datos.turno}`
        : undefined;
    setListo({ nombre: r.datos.nombre.split(" ")[0], visita: textoVisita });
  };

  const tarjetaAsesor = (
    <div className="flex items-center gap-3 border-b border-[#efe9e1] pb-4">
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#efe9e1]">
        <Image src={asesor.foto} alt="" fill sizes="56px" className="object-cover object-top" />
      </span>
      <span>
        <span className="block font-semibold">{asesor.nombre}</span>
        <span className="block text-sm text-[#57534e]">Especialista en {asesor.especialidad.toLowerCase()}</span>
      </span>
    </div>
  );

  if (listo) {
    return (
      <div role="status" className="rounded-2xl border border-[#e7e1d8] bg-white p-6">
        {tarjetaAsesor}
        <p className="mt-4 text-lg font-semibold">Gracias, {listo.nombre}.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#57534e]">
          {listo.visita ? (
            <>
              {asesor.nombre.split(" ")[0]} te confirmará la visita del <strong className="font-semibold text-[#1c1917]">{listo.visita}</strong> por
              teléfono.
            </>
          ) : (
            `${asesor.nombre.split(" ")[0]} te escribirá en menos de una hora.`
          )}
        </p>
        <p className="mt-4 text-xs text-[#78716c]">Demo: este mensaje no se envía a ningún lugar.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={enviar} className="space-y-4 rounded-2xl border border-[#e7e1d8] bg-white p-6">
      {tarjetaAsesor}
      <Campo etiqueta="Nombre" nombre="nombre" autoComplete="name" error={errores.nombre} />
      <Campo etiqueta="Celular" nombre="telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="987 654 321" error={errores.telefono} />
      <div>
        <label htmlFor="rz-mensaje" className="text-sm font-semibold text-[#44403c]">
          Mensaje
        </label>
        <textarea
          id="rz-mensaje"
          name="mensaje"
          rows={3}
          maxLength={500}
          defaultValue={`Hola, me interesa "${titulo}" (cód. ${codigo}). ¿Sigue disponible?`}
          className={`${estiloCampo} py-2.5`}
        />
      </div>
      <label className="flex min-h-11 items-center gap-3 text-[15px]">
        <input
          type="checkbox"
          checked={visita}
          onChange={(e) => {
            setVisita(e.target.checked);
            if (e.target.checked && dias.length === 0) setDias(proximosDias());
          }}
          className="h-5 w-5 accent-[#b4532a]"
        />
        Quiero agendar una visita
      </label>

      {visita && (
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-[#44403c]">¿Qué día te queda mejor?</legend>
          <div className="grid grid-cols-3 gap-2">
            {dias.map((d, i) => (
              <label
                key={aISO(d)}
                className="flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-xl border border-[#e7e1d8] text-center text-sm has-[:checked]:border-[#b4532a] has-[:checked]:bg-[#b4532a] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#b4532a]/40"
              >
                <input
                  type="radio"
                  name="dia"
                  value={aISO(d)}
                  id={i === 0 ? "rz-dia" : undefined}
                  aria-describedby={errores.dia ? "rz-dia-error" : undefined}
                  className="sr-only"
                />
                <span className="text-xs font-semibold uppercase">{d.toLocaleDateString("es-PE", { weekday: "short" }).replace(".", "")}</span>
                <span className="font-semibold">{d.getDate()}</span>
              </label>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["mañana (9:00–12:00)", "tarde (15:00–18:00)"].map((t) => (
              <label
                key={t}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-[#e7e1d8] text-sm font-semibold first-letter:uppercase has-[:checked]:border-[#b4532a] has-[:checked]:bg-[#b4532a] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#b4532a]/40"
              >
                <input type="radio" name="turno" value={t} className="sr-only" />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
          {errores.dia && (
            <p id="rz-dia-error" className="text-sm text-[#b91c1c]">
              {errores.dia}
            </p>
          )}
        </fieldset>
      )}

      <button type="submit" className="min-h-12 w-full rounded-xl bg-[#b4532a] font-semibold text-white transition-colors hover:bg-[#933f1d]">
        {visita ? "Solicitar visita" : "Contactar a " + asesor.nombre.split(" ")[0]}
      </button>
    </form>
  );
}
