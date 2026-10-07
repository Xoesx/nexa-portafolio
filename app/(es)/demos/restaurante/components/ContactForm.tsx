"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactForm() {
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [exito, setExito] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrores({});
    setExito(null);

    const fd = new FormData(e.currentTarget);
    const datos = {
      nombre: String(fd.get("nombre") ?? ""),
      email: String(fd.get("email") ?? ""),
      asunto: String(fd.get("asunto") ?? ""),
      mensaje: String(fd.get("mensaje") ?? ""),
      acepto: fd.get("acepto") === "on" ? true : (false as unknown as true),
    };

    setEnviando(true);
    try {
      const res = await fetch("/demos/restaurante/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrores(json.errores ?? { general: "Error al enviar" });
        return;
      }
      setExito(json.mensaje);
      (e.target as HTMLFormElement).reset();
    } catch {
      setErrores({ general: "Error de conexión" });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[#1F1A15]/10 bg-white p-7 md:p-9"
    >
      <div>
        <h2
          className="text-[24px] leading-tight text-[#1F1A15]"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
        >
          Envíanos un mensaje
        </h2>
        <p className="mt-1 text-[13px] text-[#1F1A15]/70">
          Respondemos en menos de 24 horas por correo.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-[14px] font-semibold text-[#1F1A15]/70">
            Tu nombre
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Ej. María Pérez"
            className="mt-2 w-full rounded-lg border border-[#1F1A15]/15 bg-[#FBF9F4] px-4 py-3 text-[14px] outline-none focus:border-[#C1440E]"
          />
          {errores.nombre && <p className="mt-1 text-[11px] text-red-600">{errores.nombre}</p>}
        </div>
        <div>
          <label className="text-[14px] font-semibold text-[#1F1A15]/70">
            Correo
          </label>
          <input
            name="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className="mt-2 w-full rounded-lg border border-[#1F1A15]/15 bg-[#FBF9F4] px-4 py-3 text-[14px] outline-none focus:border-[#C1440E]"
          />
          {errores.email && <p className="mt-1 text-[11px] text-red-600">{errores.email}</p>}
        </div>
      </div>

      <div>
        <label className="text-[14px] font-semibold text-[#1F1A15]/70">
          Asunto
        </label>
        <input
          name="asunto"
          type="text"
          placeholder="Ej. Consulta sobre reservas para 10 personas"
          className="mt-2 w-full rounded-lg border border-[#1F1A15]/15 bg-[#FBF9F4] px-4 py-3 text-[14px] outline-none focus:border-[#C1440E]"
        />
        {errores.asunto && <p className="mt-1 text-[11px] text-red-600">{errores.asunto}</p>}
      </div>

      <div>
        <label className="text-[14px] font-semibold text-[#1F1A15]/70">
          Mensaje
        </label>
        <textarea
          name="mensaje"
          rows={5}
          placeholder="Cuéntanos qué necesitas…"
          className="mt-2 w-full rounded-lg border border-[#1F1A15]/15 bg-[#FBF9F4] px-4 py-3 text-[14px] outline-none focus:border-[#C1440E]"
        />
        {errores.mensaje && <p className="mt-1 text-[11px] text-red-600">{errores.mensaje}</p>}
      </div>

      <label className="flex items-start gap-3 text-[12px] leading-relaxed text-[#1F1A15]/70">
        <input
          name="acepto"
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#C1440E]"
        />
        <span>
          Acepto la{" "}
          <Link
            href="/demos/restaurante/legal/privacidad"
            className="text-[#C1440E] underline underline-offset-2"
          >
            política de privacidad
          </Link>{" "}
          y el tratamiento de mis datos para responder a esta consulta.
        </span>
      </label>
      {errores.acepto && <p className="text-[11px] text-red-600">{errores.acepto}</p>}

      {errores.general && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-700">{errores.general}</p>
      )}
      {exito && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-[13px] text-green-700">{exito}</p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-full bg-[#C1440E] px-6 py-4 text-[15px] font-semibold text-white transition hover:bg-[#9A3410] disabled:opacity-60"
      >
        {enviando ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
