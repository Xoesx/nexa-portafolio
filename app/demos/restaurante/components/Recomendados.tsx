import Link from "next/link";

const platos = [
  {
    nombre: "Lomo saltado",
    descripcion: "Carne de res al wok con cebolla y papas fritas.",
    precio: 28,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    badge: "Favorito",
  },
  {
    nombre: "Ají de gallina",
    descripcion: "Gallina deshilachada en salsa cremosa de ají amarillo.",
    precio: 24,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    badge: null,
  },
  {
    nombre: "Arroz con pato",
    descripcion: "Pato guisado con culantro, cerveza negra y arroz verde.",
    precio: 32,
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    badge: "Nuevo",
  },
  {
    nombre: "Anticuchos",
    descripcion: "Corazón de res marinado en ají panca, con papa y choclo.",
    precio: 18,
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    badge: null,
  },
];

export function Recomendados() {
  return (
    <section className="bg-[#FBF9F4] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
              Especial del chef
            </p>
            <h2
              className="mt-3 text-3xl tracking-[-0.01em] md:text-4xl"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
            >
              Nuestros platos populares
            </h2>
          </div>
          <Link
            href="/demos/restaurante/menu"
            className="border-b border-[#1F1A15]/30 pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#1F1A15]/70 transition hover:border-[#C1440E] hover:text-[#C1440E]"
          >
            Ver menú completo →
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {platos.map((p) => (
            <article key={p.nombre} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F0E7D5]">
                {p.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-[#C1440E] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {p.badge}
                  </span>
                )}
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3
                    className="text-lg leading-tight text-[#1F1A15]"
                    style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
                  >
                    {p.nombre}
                  </h3>
                  <p className="mt-1 text-[12px] leading-snug text-[#8A7F72]">
                    {p.descripcion}
                  </p>
                </div>
                <span className="whitespace-nowrap text-[15px] font-bold text-[#C1440E]">
                  S/ {p.precio}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
