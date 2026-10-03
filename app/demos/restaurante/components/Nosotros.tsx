import Link from "next/link";

export function Nosotros() {
  return (
    <section className="bg-[#F5F0E6] px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* Foto del local con badge */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(31,26,21,0.35)]">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85"
              alt="Interior del restaurante"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#C1440E] px-6 py-5 text-white shadow-xl">
            <p
              className="text-4xl leading-none"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
            >
              10+
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-90">
              Años de<br />experiencia
            </p>
          </div>
        </div>

        {/* Texto a la derecha */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
            Bienvenido a Sabor Criollo
          </p>
          <h2
            className="mt-4 text-4xl leading-[1.05] tracking-[-0.01em] text-[#1F1A15] md:text-5xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Buena comida,
            <br />
            <span className="italic text-[#C1440E]">buena vida.</span>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#1F1A15]/70">
            Creemos que la buena comida une a las personas. Nuestro menú está inspirado
            en recetas familiares y preparado con ingredientes frescos del mercado de Pucallpa.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: "🌿", t: "Ingredientes de calidad", s: "Frescos, comprados cada mañana." },
              { icon: "👨‍🍳", t: "Cocineros expertos", s: "Recetas con más de 10 años de historia." },
              { icon: "🏡", t: "Ambiente familiar", s: "Perfecto para compartir en familia." },
            ].map((f) => (
              <div key={f.t} className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FBF9F4] text-lg shadow-sm">
                  {f.icon}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1F1A15]">{f.t}</p>
                  <p className="mt-0.5 text-[13px] text-[#8A7F72]">{f.s}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/demos/restaurante/contacto"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#1F1A15] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#C1440E]"
          >
            Conoce más sobre nosotros →
          </Link>
        </div>
      </div>
    </section>
  );
}
