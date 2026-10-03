import Link from "next/link";

const categorias = [
  { nombre: "Entradas", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
  { nombre: "Principales", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
  { nombre: "Postres", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80" },
  { nombre: "Bebidas", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80" },
  { nombre: "Especiales", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80" },
  { nombre: "Familiar", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
];

export function Categorias() {
  return (
    <section className="bg-[#FBF9F4] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            className="text-3xl tracking-[-0.01em] md:text-4xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Explora nuestro menú
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[#C1440E]/40" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#C1440E"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/></svg>
            <div className="h-px w-8 bg-[#C1440E]/40" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 justify-items-center gap-8 md:grid-cols-6">
          {categorias.map((c) => (
            <Link
              key={c.nombre}
              href="/demos/restaurante/menu"
              className="group flex flex-col items-center gap-4"
            >
              <div className="relative aspect-square w-full max-w-[130px] overflow-hidden rounded-full border-4 border-[#FBF9F4] shadow-[0_10px_30px_-10px_rgba(31,26,21,0.25)] transition group-hover:border-[#C1440E]/20">
                <img src={c.img} alt={c.nombre} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1F1A15]/80 transition group-hover:text-[#C1440E]">
                {c.nombre}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
