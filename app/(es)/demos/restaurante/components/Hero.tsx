import Image from "next/image";
import Link from "next/link";
import { EstadoLocal } from "./EstadoLocal";
import { ReservaRapida } from "./ReservaRapida";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0F0F12] text-white">
      <Image
        src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1800&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0F0F12]/95 via-[#0F0F12]/75 to-[#0F0F12]/30" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="text-[15px] text-[#E8A87C]">Cocina criolla y amazónica en Pucallpa</p>
          <h1
            className="mt-4 text-[3.2rem] leading-[0.98] tracking-[-0.02em] sm:text-[4.4rem]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            La mesa larga, como en casa de la abuela.
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/80">
            Lomo saltado, ceviche, juane y tacacho con cecina, preparados al momento con lo que llega cada mañana del mercado de
            Pucallpa. Ven con la familia, que aquí se comparte.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/demos/restaurante/menu"
              className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 text-[15px] font-semibold transition hover:border-[#E8A87C] hover:text-[#E8A87C]"
            >
              Ver la carta
            </Link>
            <p className="flex items-center gap-3 text-[14px] text-white/80">
              <span className="text-[#F5B544]" aria-hidden="true">
                ★★★★★
              </span>
              <span>
                <strong className="font-semibold text-white">4.8</strong> · 1 240 opiniones
              </span>
            </p>
          </div>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-[14px]">
            <div>
              <dt className="text-white/60">Precio promedio</dt>
              <dd className="font-semibold">S/ 45 por persona</dd>
            </div>
            <div>
              <dt className="text-white/60">Hoy</dt>
              <dd className="font-semibold">
                <EstadoLocal />
              </dd>
            </div>
            <div>
              <dt className="text-white/60">Dirección</dt>
              <dd className="font-semibold">Jr. Comercio 245</dd>
            </div>
          </dl>
        </div>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          <ReservaRapida />
        </div>
      </div>
    </section>
  );
}
