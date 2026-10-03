import { SaltParticles } from "./SaltParticles";

const platos = [
  {
    nombre: "Appetizer",
    descripcion: "Start with our fresh baked bread with an egg and basil on top.",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=85",
    align: "left" as const,
  },
  {
    nombre: "Main Dish",
    descripcion: "Our juicy fresh grilled steak is served to satisfy your appetite.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=85",
    align: "right" as const,
    grande: true,
  },
  {
    nombre: "Side Dish",
    descripcion: "Have a healthy salad mixed with light sliced meat to complement your steak.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=85",
    align: "left" as const,
  },
  {
    nombre: "Dessert",
    descripcion: "Finish your Kitchen experience with a cake to cleanse your mouth.",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=85",
    align: "right" as const,
  },
];

export function OurMenu() {
  return (
    <section id="menu" className="relative bg-[#111111] py-28 md:py-40">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10">
        {/* Encabezado centrado */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-2xl text-[#C9A96E]"
            style={{ fontFamily: "var(--font-script), cursive" }}
            data-reveal
          >
            Discover
          </p>
          <h2
            className="mt-2 text-[38px] leading-[1.15] text-white md:text-[48px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
            data-reveal
            data-delay="100"
          >
            Our Menu
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.8] text-[#B0B0B0]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            data-reveal
            data-delay="200"
          >
            Few things come close to the joy of steak and chips — cooked simply with tender,
            loving care. Rest assured that our chefs treat our beef with the respect it deserves.
          </p>
        </div>

        {/* Platos en zigzag */}
        <div className="relative mt-24 space-y-32">
          {platos.map((p, i) => (
            <div
              key={p.nombre}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                p.align === "right" ? "" : ""
              }`}
              data-reveal
              data-delay={`${i * 100}`}
            >
              {/* Imagen */}
              <div className={`relative ${p.align === "right" ? "md:order-2" : ""}`}>
                <div
                  className={`relative mx-auto aspect-square overflow-hidden rounded-full ${
                    p.grande ? "max-w-[520px]" : "max-w-[420px]"
                  }`}
                >
                  <img
                    src={p.img}
                    alt={p.nombre}
                    className="h-full w-full object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                  />
                </div>
                <SaltParticles count={30} className="-inset-8" />
              </div>

              {/* Texto */}
              <div className={p.align === "right" ? "md:order-1 md:text-right" : ""}>
                <p
                  className={`text-[28px] text-[#C9A96E] ${p.align === "right" ? "md:text-right" : ""}`}
                  style={{ fontFamily: "var(--font-script), cursive" }}
                >
                  {p.nombre}
                </p>
                <p
                  className="mt-4 max-w-md text-[14px] leading-[1.8] text-[#CCCCCC] md:max-w-sm"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    marginLeft: p.align === "right" ? "auto" : undefined,
                  }}
                >
                  {p.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sal decorativa general de la sección */}
      <SaltParticles count={50} className="opacity-30" />
    </section>
  );
}
