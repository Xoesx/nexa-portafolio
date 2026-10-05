import Image from "next/image";

const PLATOS = [
  { nombre: "Juane de gallina", texto: "Arroz sazonado con palillo, presa de gallina, huevo y aceituna, envuelto en hoja de bijao.", precio: 28 },
  { nombre: "Tacacho con cecina", texto: "Plátano verde asado y machacado con manteca, cecina ahumada y chorizo regional.", precio: 32 },
  { nombre: "Patarashca de doncella", texto: "Pescado del Ucayali cocido en hoja de bijao con cocona, sacha culantro y ají charapita.", precio: 38 },
  { nombre: "Inchicapi", texto: "Sopa espesa de gallina con maní molido, maíz y yuca. La que pedimos cuando llueve.", precio: 24 },
];

export function SaboresSelva() {
  return (
    <section className="bg-[#1E3B2C] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-24 lg:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#B9D99A]">Lo nuestro</p>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
            Sabores de la selva
          </h2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/80">
            La cocina criolla se luce en Lima; la amazónica, aquí. Estos platos los hacemos con productos de chacras y ríos de Ucayali.
          </p>
          <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {PLATOS.map((p) => (
              <li key={p.nombre} className="flex items-baseline justify-between gap-6 py-4">
                <span>
                  <span className="block text-xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
                    {p.nombre}
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-white/75">{p.texto}</span>
                </span>
                <span className="shrink-0 text-lg font-semibold text-[#B9D99A]">S/ {p.precio}</span>
              </li>
            ))}
          </ul>
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
            Cada mañana a las 6:00 doña Rosa, la mamá de Miguel, recorre el mercado Bellavista. Lo que no está fresco, no entra a la cocina.
          </p>
        </div>
      </div>
    </section>
  );
}
