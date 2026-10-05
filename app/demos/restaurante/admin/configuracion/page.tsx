"use client";

import { useState } from "react";

export default function AdminConfiguracion() {
  const [guardado, setGuardado] = useState(false);

  const guardar = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold">Configuración</h1>
      <p className="mt-1 text-sm text-gray-400">
        Ajustes generales del restaurante. En producción, estos cambios se guardan en la base de datos.
      </p>

      {/* Info del negocio */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
        <h2 className="text-lg font-bold">Información del negocio</h2>
        <p className="mt-1 text-xs text-gray-500">
          Aparecerá en el sitio público y en los correos automáticos.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Nombre del restaurante
            </label>
            <input
              type="text"
              defaultValue="Sabor Criollo"
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#C1440E]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Teléfono / WhatsApp
            </label>
            <input
              type="text"
              defaultValue="+51 918 641 720"
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#C1440E]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Dirección
            </label>
            <input
              type="text"
              defaultValue="Jr. Comercio 245, Pucallpa, Ucayali"
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#C1440E]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Correo de contacto
            </label>
            <input
              type="email"
              defaultValue="hola@saborcriollo.pe"
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#C1440E]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Instagram / TikTok
            </label>
            <input
              type="text"
              defaultValue="@saborcriollo"
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#C1440E]"
            />
          </div>
        </div>
      </div>

      {/* Horarios */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
        <h2 className="text-lg font-bold">Horarios de atención</h2>
        <div className="mt-6 space-y-3">
          {[
            { dia: "Lunes – Jueves", valor: "12:00 – 22:00" },
            { dia: "Viernes – Sábado", valor: "12:00 – 23:30" },
            { dia: "Domingo", valor: "12:00 – 17:00" },
          ].map((h) => (
            <div key={h.dia} className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-300">{h.dia}</span>
              <input
                type="text"
                defaultValue={h.valor}
                className="w-48 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-[#C1440E]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Redes y notificaciones */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
        <h2 className="text-lg font-bold">Notificaciones</h2>
        <p className="mt-1 text-xs text-gray-500">
          Cómo te avisamos cuando llega una reserva nueva.
        </p>
        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#C1440E]" />
            Enviar correo a hola@saborcriollo.pe
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#C1440E]" />
            Enviar mensaje de WhatsApp al +51 918 641 720
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-[#C1440E]" />
            Sonido en el panel cuando llega una reserva
          </label>
        </div>
      </div>

      {/* Guardar */}
      <div className="mt-8 flex items-center justify-end gap-4">
        {guardado && (
          <span className="text-sm text-green-400">✓ Cambios guardados (demo)</span>
        )}
        <button
          onClick={guardar}
          className="rounded-full bg-[#C1440E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9A3410]"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
