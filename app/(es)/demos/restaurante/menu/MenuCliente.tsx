"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIAS, idCategoria } from "../data/menu";
import { usePlatos } from "../lib/context/PlatosContext";
import { wa } from "../lib/whatsapp";
import type { Plato } from "../types";

const display = { fontFamily: "var(--font-display), Georgia, serif" };

const COLOR_ETIQUETA: Record<NonNullable<Plato["etiqueta"]>, string> = {
  Popular: "bg-[#C1440E]",
  Nuevo: "bg-[#2F5233]",
  Chef: "bg-[#1F1A15]",
};

// Solo las fotos de Unsplash pasan por el optimizador de Next (es el dominio configurado). Las que se suben desde
// el panel llegan como data: o desde otros dominios permitidos, y se muestran tal cual.
const optimizable = (src: string) => /^https:\/\/([a-z0-9-]+\.)*unsplash\.com\//.test(src);

/**
 * La carta completa en una sola página, por secciones. Cada sección tiene su ancla (#entradas, #de-la-selva…),
 * así la portada puede enlazar directo a una categoría y todo el contenido queda en el HTML para buscadores.
 */
export function MenuCliente() {
  const { platos } = usePlatos();
  const disponibles = platos.filter((p) => p.disponible !== false);

  // Las categorías conocidas van en su orden; si desde el panel se crea otra, aparece al final.
  const extras = [...new Set(disponibles.map((p) => p.categoria))].filter((c) => !(CATEGORIAS as readonly string[]).includes(c));
  const secciones = [...CATEGORIAS, ...extras]
    .map((categoria) => ({ categoria, id: idCategoria(categoria), platos: disponibles.filter((p) => p.categoria === categoria) }))
    .filter((s) => s.platos.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="max-w-2xl">
        <h1 className="text-[42px] leading-[1.05] tracking-[-0.01em] text-[#1F1A15] md:text-[56px]" style={{ ...display, fontWeight: 400 }}>
          La carta
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#1F1A15]/75">
          Todo se prepara al momento. Los precios están en soles e incluyen IGV.
        </p>
      </div>

      <nav
        aria-label="Secciones de la carta"
        className="sticky top-[77px] z-30 -mx-6 mt-10 overflow-x-auto border-y border-[#1F1A15]/10 bg-[#FBF9F4]/95 px-6 backdrop-blur"
      >
        <ul className="flex gap-6 whitespace-nowrap">
          {secciones.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex min-h-12 items-center gap-1.5 text-[15px] font-semibold text-[#1F1A15]/75 transition hover:text-[#C1440E]">
                {s.categoria}
                <span className="text-[12px] font-normal tabular-nums text-[#6E6457]">{s.platos.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {secciones.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-titulo`} className="scroll-mt-36 pt-14">
          <h2 id={`${s.id}-titulo`} className="text-[32px] leading-tight text-[#1F1A15]" style={{ ...display, fontWeight: 500 }}>
            {s.categoria}
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {s.platos.map((p) => (
              <article key={p.id} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F0E7D5]">
                  {p.imagen && (
                    <Image
                      src={p.imagen}
                      alt={p.nombre}
                      fill
                      sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                      unoptimized={!optimizable(p.imagen)}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  {p.etiqueta && (
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[12px] font-semibold text-white ${COLOR_ETIQUETA[p.etiqueta]}`}>
                      {p.etiqueta === "Chef" ? "Recomendado del chef" : p.etiqueta}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-[19px] leading-tight text-[#1F1A15]" style={{ ...display, fontWeight: 500 }}>
                      {p.nombre}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-snug text-[#6E6457]">{p.descripcion}</p>
                  </div>
                  <span className="whitespace-nowrap text-[17px] font-bold text-[#C1440E]">S/ {p.precio}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-20 rounded-2xl bg-[#1F1A15] px-8 py-12 text-white md:px-16">
        <p className="text-3xl md:text-4xl" style={{ ...display, fontWeight: 400 }}>
          ¿Ya sabes qué vas a pedir?
        </p>
        <p className="mt-3 max-w-xl text-[15px] text-white/70">Reserva una mesa o haz tu pedido por WhatsApp para recogerlo.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/demos/restaurante/reservar" className="rounded-full bg-[#C1440E] px-7 py-3.5 text-[15px] font-semibold transition hover:bg-[#9A3410]">
            Reservar mesa
          </Link>
          <a
            href={wa("Hola, quiero hacer un pedido en Sabor Criollo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold transition hover:bg-white/10"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
