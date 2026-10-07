"use client";

import Image from "next/image";
import { useState } from "react";

export function Galeria({ fotos, titulo }: { fotos: string[]; titulo: string }) {
  const [actual, setActual] = useState(0);
  const mover = (paso: number) => setActual((i) => (i + paso + fotos.length) % fotos.length);

  return (
    <div
      className="outline-none"
      role="group"
      aria-roledescription="galería"
      aria-label={`Fotos de ${titulo}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") mover(1);
        if (e.key === "ArrowLeft") mover(-1);
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#efe9e1]">
        {fotos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${titulo}, foto ${i + 1} de ${fotos.length}`}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 760px, 100vw"
            className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${i === actual ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== actual}
          />
        ))}
        <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
          {[
            { paso: -1, etiqueta: "Foto anterior", d: "M15 6l-6 6 6 6" },
            { paso: 1, etiqueta: "Foto siguiente", d: "M9 6l6 6-6 6" },
          ].map((b) => (
            <button
              key={b.paso}
              type="button"
              onClick={() => mover(b.paso)}
              aria-label={b.etiqueta}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-[#1c1917] shadow-md transition hover:bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d={b.d} />
              </svg>
            </button>
          ))}
        </div>
        <p className="absolute bottom-3 right-3 rounded-full bg-[#1c1917]/75 px-3 py-1 text-xs font-semibold text-white" aria-live="polite">
          {actual + 1} / {fotos.length}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {fotos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActual(i)}
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === actual}
            className="relative aspect-[4/3] overflow-hidden rounded-xl ring-offset-2 ring-offset-[#faf8f5] aria-[current=true]:ring-2 aria-[current=true]:ring-[#b4532a]"
          >
            <Image src={src} alt="" fill sizes="180px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
