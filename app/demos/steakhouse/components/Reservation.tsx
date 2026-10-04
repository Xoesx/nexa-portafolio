"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useIdioma, type Textos } from "../i18n";

type Campo = "nombre" | "telefono" | "fecha" | "hora" | "personas";
type Errores = Partial<Record<Campo, string>>;
type Confirmada = { nombre: string; fecha: string; hora: string; personas: number };

const hoyISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// Zod se descarga recién al enviar el formulario: la página carga más liviana.
async function crearEsquema(e: Textos["reserva"]["errores"]) {
  const { z } = await import("zod");
  return z.object({
    nombre: z.string().trim().min(3, e.nombre).max(80, e.nombre),
    telefono: z
      .string()
      .transform((v) => v.replace(/[\s-]/g, ""))
      .pipe(z.string().regex(/^9\d{8}$/, e.telefono)),
    fecha: z.string().refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && v >= hoyISO(), e.fecha),
    hora: z.string().refine((v) => /^\d{2}:\d{2}$/.test(v) && v >= "12:00" && v <= "22:30", e.hora),
    personas: z.coerce.number().int(e.personas).min(1, e.personas).max(20, e.personas),
    nota: z.string().max(300).optional(),
  });
}

const estiloCampo =
  "mt-2 block min-h-12 w-full border-b border-white/30 bg-transparent px-0 py-2 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#C9A96E] aria-[invalid=true]:border-red-400 [color-scheme:dark]";
const estiloEtiqueta = "block text-[12px] font-medium uppercase tracking-[0.15em] text-white/70";

export function Reservation() {
  const { t, idioma } = useIdioma();
  const r = t.reserva;
  const id = useId();
  const [errores, setErrores] = useState<Errores>({});
  const [confirmada, setConfirmada] = useState<Confirmada | null>(null);

  const enviar = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formulario = ev.currentTarget;
    const datos = Object.fromEntries(new FormData(formulario));
    const resultado = (await crearEsquema(r.errores)).safeParse(datos);

    if (!resultado.success) {
      const nuevos: Errores = {};
      for (const issue of resultado.error.issues) {
        const campo = issue.path[0] as Campo;
        nuevos[campo] ??= issue.message;
      }
      setErrores(nuevos);
      // Llevamos el foco al primer campo con error.
      const primero = Object.keys(nuevos)[0];
      formulario.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    setErrores({});
    const { nombre, fecha, hora, personas } = resultado.data;
    setConfirmada({ nombre: nombre.split(" ")[0], fecha, hora, personas });
  };

  const campo = (nombre: Campo) => ({
    id: `${id}-${nombre}`,
    name: nombre,
    "aria-invalid": errores[nombre] ? true : undefined,
    "aria-describedby": errores[nombre] ? `${id}-${nombre}-error` : undefined,
  });

  const error = (nombre: Campo) =>
    errores[nombre] && (
      <p id={`${id}-${nombre}-error`} className="mt-1.5 text-[13px] text-red-300">
        {errores[nombre]}
      </p>
    );

  const fechaLegible = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString(idioma === "es" ? "es-PE" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <section
      id="reservation"
      className="relative flex min-h-[600px] scroll-mt-16 items-center justify-center overflow-hidden py-28 md:py-32"
    >
      {/* Fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <Image width={1600} height={1000} sizes="100vw"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6">
        <div className="text-center">
          <p
            className="text-[28px] text-[#C9A96E]"
            style={{ fontFamily: "var(--font-script), cursive" }}
            data-reveal
          >
            {r.antetitulo}
          </p>
          <h2
            className="mt-4 text-[38px] leading-[1.1] text-white md:text-[52px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
            data-reveal
            data-delay="100"
          >
            {r.titulo}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/70" data-reveal data-delay="200">
            {r.texto}
          </p>
        </div>

        <div className="mt-12 border border-white/15 bg-[#111111]/70 p-6 backdrop-blur-sm sm:p-10" data-reveal data-delay="300">
          {confirmada ? (
            <div role="status" className="py-6 text-center">
              <p
                className="text-[26px] leading-snug text-white"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {r.exito(confirmada.nombre, fechaLegible(confirmada.fecha), confirmada.hora, confirmada.personas)}
              </p>
              <p className="mt-4 text-[13px] text-white/50">{r.nota}</p>
              <button
                type="button"
                onClick={() => setConfirmada(null)}
                className="mt-8 inline-block min-h-12 border border-white px-8 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
              >
                {r.otra}
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={enviar} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-nombre`} className={estiloEtiqueta}>
                  {r.campos.nombre}
                </label>
                <input {...campo("nombre")} autoComplete="name" className={estiloCampo} />
                {error("nombre")}
              </div>

              <div>
                <label htmlFor={`${id}-telefono`} className={estiloEtiqueta}>
                  {r.campos.telefono}
                </label>
                <input
                  {...campo("telefono")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="987 654 321"
                  className={estiloCampo}
                />
                {error("telefono")}
              </div>

              <div>
                <label htmlFor={`${id}-personas`} className={estiloEtiqueta}>
                  {r.campos.personas}
                </label>
                <input {...campo("personas")} type="number" inputMode="numeric" min={1} max={20} defaultValue={2} className={estiloCampo} />
                {error("personas")}
              </div>

              <div>
                <label htmlFor={`${id}-fecha`} className={estiloEtiqueta}>
                  {r.campos.fecha}
                </label>
                <input {...campo("fecha")} type="date" className={estiloCampo} />
                {error("fecha")}
              </div>

              <div>
                <label htmlFor={`${id}-hora`} className={estiloEtiqueta}>
                  {r.campos.hora}
                </label>
                <input {...campo("hora")} type="time" min="12:00" max="22:30" step={900} className={estiloCampo} />
                {error("hora")}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`${id}-nota`} className={estiloEtiqueta}>
                  {r.campos.nota}
                </label>
                <textarea id={`${id}-nota`} name="nota" rows={2} maxLength={300} className={`${estiloCampo} resize-none`} />
              </div>

              <div className="sm:col-span-2 flex flex-col items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="min-h-12 w-full border border-[#C9A96E] bg-[#C9A96E] px-10 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#111111] transition-colors hover:bg-transparent hover:text-[#C9A96E] sm:w-auto"
                >
                  {r.enviar}
                </button>
                <p className="text-[12px] text-white/45">{r.nota}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
