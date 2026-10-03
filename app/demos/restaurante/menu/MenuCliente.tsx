"use client";

import { useState } from "react";
import { usePlatos } from "../lib/context/PlatosContext";
import { CATEGORIAS } from "../data/menu";

export function MenuCliente() {
  const { platos } = usePlatos();
  const [activa, setActiva] = useState<string>("Principales");

  const disponibles = platos.filter((p) => p.disponible !== false);
  const filtrados = disponibles.filter((p) => p.categoria === activa);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      {/* Encabezado */}
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
          Carta completa
        </p>
        <h1
          className="mt-3 text-[42px] leading-[1.05] tracking-[-0.01em] text-[#1F1A15] md:text-[56px]"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
        >
          Nuestro menú
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#1F1A15]/60">
          Todo se prepara al momento. Los platos con etiqueta son los más pedidos por nuestros clientes.
        </p>
      </div>

      {/* Filtros */}
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {CATEGORIAS.map((cat) => {
          const total = disponibles.filter((p) => p.categoria === cat).length;
          const activo = activa === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiva(cat)}
              className={`group flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] transition-all ${
                activo
                  ? "bg-[#C1440E] text-white shadow-lg shadow-[#C1440E]/25"
                  : "border border-[#1F1A15]/15 text-[#1F1A15]/70 hover:border-[#C1440E] hover:text-[#C1440E]"
              }`}
            >
              {cat}
              <span className={`text-[10px] ${activo ? "text-white/70" : "text-[#1F1A15]/40"}`}>
                {total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de platos */}
      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((p) => (
          <article key={p.id} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F0E7D5]">
              <img
                src={p.imagen}
                alt={p.nombre}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              {p.etiqueta && (
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg ${
                    p.etiqueta === "Popular"
                      ? "bg-[#C1440E]"
                      : p.etiqueta === "Nuevo"
                      ? "bg-[#2F5233]"
                      : "bg-[#1F1A15]"
                  }`}
                >
                  {p.etiqueta}
                </span>
              )}
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3
                  className="text-[19px] leading-tight text-[#1F1A15]"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
                >
                  {p.nombre}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-[#8A7F72]">
                  {p.descripcion}
                </p>
              </div>
              <span className="whitespace-nowrap text-[17px] font-bold text-[#C1440E]">
                S/ {p.precio}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* CTA inferior */}
      <div className="mt-20 rounded-2xl bg-[#1F1A15] px-8 py-12 text-center text-white md:px-16">
        <p
          className="text-3xl md:text-4xl"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
        >
          ¿Listo para probar?
        </p>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-white/60">
          Reserva una mesa o pide por WhatsApp. Atendemos todos los días.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/demos/restaurante/reservar"
            className="rounded-full bg-[#C1440E] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition hover:bg-[#9A3410]"
          >
            Reservar mesa
          </a>
          <a
            href="https://wa.me/51999888777"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition hover:bg-white/10"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
