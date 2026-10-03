"use client";

import { useState } from "react";
import { reservaSchema } from "../lib/validation/schemas";

export function ReservationForm() {
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [exito, setExito] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrores({});
    setExito(null);

    const formData = new FormData(e.currentTarget);
    const datos = {
      nombre: String(formData.get("nombre") ?? ""),
      telefono: String(formData.get("telefono") ?? ""),
      personas: Number(formData.get("personas") ?? 0),
      fecha: String(formData.get("fecha") ?? ""),
      hora: String(formData.get("hora") ?? ""),
      notas: String(formData.get("notas") ?? "") || undefined,
    };

    const resultado = reservaSchema.safeParse(datos);
    if (!resultado.success) {
      const erroresMap: Record<string, string> = {};
      resultado.error.issues.forEach((issue) => {
        erroresMap[String(issue.path[0])] = issue.message;
      });
      setErrores(erroresMap);
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/demos/restaurante/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultado.data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrores(json.errores ?? { general: "Error al enviar" });
        return;
      }
      setExito("Tu reserva fue registrada. Te confirmaremos por WhatsApp.");
      (e.target as HTMLFormElement).reset();
    } catch {
      setErrores({ general: "Error de conexión" });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#2A1F14]/10 bg-white p-7">
      <div>
        <label className="text-sm font-semibold">Tu nombre</label>
        <input name="nombre" type="text" placeholder="Ej. María Pérez" className="mt-1 w-full rounded-lg border border-[#2A1F14]/20 bg-[#FDF8F0] px-4 py-3 outline-none focus:border-[#B14A28]" />
        {errores.nombre && <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold">Teléfono</label>
        <input name="telefono" type="tel" placeholder="Ej. 987 654 321" className="mt-1 w-full rounded-lg border border-[#2A1F14]/20 bg-[#FDF8F0] px-4 py-3 outline-none focus:border-[#B14A28]" />
        {errores.telefono && <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-semibold">Personas</label>
          <select name="personas" defaultValue="2" className="mt-1 w-full rounded-lg border border-[#2A1F14]/20 bg-[#FDF8F0] px-4 py-3 outline-none focus:border-[#B14A28]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (<option key={n} value={n}>{n}</option>))}
          </select>
          {errores.personas && <p className="mt-1 text-xs text-red-600">{errores.personas}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold">Fecha</label>
          <input name="fecha" type="date" className="mt-1 w-full rounded-lg border border-[#2A1F14]/20 bg-[#FDF8F0] px-4 py-3 outline-none focus:border-[#B14A28]" />
          {errores.fecha && <p className="mt-1 text-xs text-red-600">{errores.fecha}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold">Hora</label>
          <input name="hora" type="time" className="mt-1 w-full rounded-lg border border-[#2A1F14]/20 bg-[#FDF8F0] px-4 py-3 outline-none focus:border-[#B14A28]" />
          {errores.hora && <p className="mt-1 text-xs text-red-600">{errores.hora}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold">Notas (opcional)</label>
        <textarea name="notas" rows={3} placeholder="Ej. Mesa cerca a la ventana…" className="mt-1 w-full rounded-lg border border-[#2A1F14]/20 bg-[#FDF8F0] px-4 py-3 outline-none focus:border-[#B14A28]" />
      </div>
      {errores.general && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errores.general}</p>}
      {exito && <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{exito}</p>}
      <button type="submit" disabled={enviando} className="w-full rounded-full bg-[#B14A28] px-6 py-4 font-bold text-white transition hover:bg-[#8B3A1F] disabled:opacity-60">
        {enviando ? "Enviando…" : "Confirmar reserva"}
      </button>
    </form>
  );
}
