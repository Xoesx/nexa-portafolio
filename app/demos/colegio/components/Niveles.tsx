"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { NIVELES } from "../data";

export function Niveles() {
  const [activo, setActivo] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);

  const ir = (i: number) => {
    const destino = (i + NIVELES.length) % NIVELES.length;
    setActivo(destino);
    pestanas.current[destino]?.focus();
  };

  const n = NIVELES[activo];

  return (
    <div>
      <div role="tablist" aria-label="Niveles educativos" className="inline-flex rounded-xl border border-[#ebe3d6] bg-white p-1">
        {NIVELES.map((nivel, i) => (
          <button
            key={nivel.id}
            ref={(el) => {
              pestanas.current[i] = el;
            }}
            role="tab"
            id={`tab-${nivel.id}`}
            aria-selected={i === activo}
            aria-controls={`panel-${nivel.id}`}
            tabIndex={i === activo ? 0 : -1}
            onClick={() => setActivo(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") ir(activo + 1);
              if (e.key === "ArrowLeft") ir(activo - 1);
              if (e.key === "Home") ir(0);
              if (e.key === "End") ir(NIVELES.length - 1);
            }}
            className="min-h-11 rounded-lg px-4 text-[15px] font-bold text-[#5a4f47] transition-colors aria-selected:bg-[#7a1f2b] aria-selected:text-white sm:px-6"
          >
            {nivel.nombre}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${n.id}`}
        aria-labelledby={`tab-${n.id}`}
        tabIndex={0}
        className="mt-8 grid grid-cols-1 items-center gap-10 outline-none lg:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#efe7da]">
          <Image key={n.foto} src={n.foto} alt={`Estudiantes de ${n.nombre.toLowerCase()} en clase`} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#7a1f2b]">{n.edades}</p>
          <h3 className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--font-hz-titulo)" }}>
            {n.nombre}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-[#5a4f47]">{n.resumen}</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {n.destacados.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-[15px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a1f2b" strokeWidth="2.5" className="mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {d}
              </li>
            ))}
          </ul>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-[#ebe3d6] pt-6">
            <div>
              <dt className="text-sm text-[#6b5f56]">Horario</dt>
              <dd className="font-bold">{n.horario}</dd>
            </div>
            <div>
              <dt className="text-sm text-[#6b5f56]">Pensión mensual</dt>
              <dd className="font-bold">S/ {n.pension}</dd>
            </div>
          </dl>
          <Link
            href="/demos/colegio/admision#preinscripcion"
            className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-[#7a1f2b] px-6 font-bold text-white transition-colors hover:bg-[#5e1520]"
          >
            Preinscribir en {n.nombre.toLowerCase()}
          </Link>
        </div>
      </div>
    </div>
  );
}
