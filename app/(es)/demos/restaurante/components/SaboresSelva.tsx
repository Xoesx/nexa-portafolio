import Image from "next/image";
import Link from "next/link";
import { idCategoria, MENU_COMPLETO } from "../data/menu";

// Los mismos platos y precios de la carta, para que la portada nunca muestre algo que la carta no tiene.
const PLATOS = MENU_COMPLETO.filter((p) => p.categoria === "De la selva");

export function SaboresSelva() {
  return (
    <section className="bg-[#1E3B2C] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-24 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl leading-tight md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
            Sabores de la selva
          </h2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/80">
            Los hacemos con productos de las chacras y los ríos de Ucayali. Fuera de la selva es difícil encontrarlos bien hechos.
          </p>
          <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {PLATOS.map((p) => (
              <li key={p.nombre} className="flex items-baseline justify-between gap-6 py-4">
                <span>
                  <span className="block text-xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
                    {p.nombre}
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-white/75">{p.descripcion}</span>
                </span>
                <span className="shrink-0 text-lg font-semibold text-[#B9D99A]">S/ {p.precio}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/demos/restaurante/menu#${idCategoria("De la selva")}`}
            className="mt-6 inline-block border-b border-white/40 pb-1 text-[15px] font-semibold transition hover:border-[#B9D99A] hover:text-[#B9D99A]"
          >
            Ver en la carta
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80"
            alt="Verduras y ajíes frescos del mercado"
            fill
            sizes="(min-width: 1024px) 580px, 100vw"
            className="object-cover"
          />
          <p className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#1E3B2C]/90 p-4 text-[14px] leading-relaxed backdrop-blur">
            Cada mañana a las 6:00 doña Rosa, la mamá de Miguel, recorre el mercado Bellavista y escoge el pescado y las verduras del día.
          </p>
        </div>
      </div>
    </section>
  );
}
