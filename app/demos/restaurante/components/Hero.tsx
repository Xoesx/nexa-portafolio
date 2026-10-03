import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0F0F12] text-white">
      {/* Luces ambientales */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#C1440E]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28">
        {/* Texto */}
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E8A87C]">
            Pucallpa · Cocina peruana
          </p>

          <h1
            className="mt-6 text-[3.5rem] leading-[0.95] tracking-[-0.02em] sm:text-[4rem] lg:text-[4.5rem]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Cocina peruana
            <br />
            para <span className="italic text-[#E8A87C]">cada antojo.</span>
          </h1>

          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-white/60">
            Recetas familiares, ingredientes frescos del mercado y una cocina que no
            para. Todo listo para servirte hoy.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/demos/restaurante/reservar"
              className="inline-flex items-center gap-3 rounded-full bg-[#C1440E] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#9A3410]"
            >
              Reservar mesa
            </Link>
            <Link
              href="/demos/restaurante/menu"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-[#E8A87C] hover:text-[#E8A87C]"
            >
              Ver el menú
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {[
              { n: "10+", l: "Años cocinando" },
              { n: "30+", l: "Platos de casa" },
              { n: "100%", l: "Hecho al momento" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl text-[#E8A87C]" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
                  {s.n}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Foto del plato con círculo */}
        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C1440E]/30 via-transparent to-transparent blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85"
              alt="Plato de comida peruana"
              className="absolute inset-[4%] rounded-full object-cover shadow-[0_30px_100px_-20px_rgba(193,68,14,0.5)]"
            />
            <div className="absolute right-0 top-12 rounded-full bg-[#0F0F12]/90 px-5 py-4 text-center shadow-xl backdrop-blur">
              <p className="text-3xl text-[#E8A87C]" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
                30+
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/50">
                Platos<br />de casa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
