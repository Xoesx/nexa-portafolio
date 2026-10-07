import Image from "next/image";
import Link from "next/link";

const EXPERIENCIAS = [
  {
    titulo: "Viernes criollos",
    cuando: "Todos los viernes · 20:00",
    texto: "Música criolla en vivo con el trío de don Lucho y la carta completa hasta las 11:30 de la noche.",
    precio: "No se cobra entrada",
    foto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=75",
    alt: "Mesas llenas de comensales en una noche animada",
  },
  {
    titulo: "Taller de ceviche para dos",
    cuando: "Sábados · 11:00",
    texto: "Miguel les enseña a preparar un ceviche clásico y una leche de tigre, y después almuerzan lo que hicieron.",
    precio: "S/ 120 la pareja",
    foto: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1000&q=75",
    alt: "Pareja cocinando junta en una cocina",
  },
  {
    titulo: "Almuerzo familiar",
    cuando: "Domingos · 12:00 a 17:00",
    texto: "Fuentes al centro para compartir: arroz con pato, chicharrón y juane. Los niños menores de 6 no pagan.",
    precio: "Desde S/ 38 por persona",
    foto: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1000&q=75",
    alt: "Mesa con muchos platos para compartir vista desde arriba",
  },
];

export function Experiencias() {
  return (
    <section id="experiencias" className="scroll-mt-24 bg-[#0F0F12] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl leading-tight md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
              Cada semana en Sabor Criollo
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/75">Tres planes fijos. Para los tres conviene reservar.</p>
          </div>
          <Link href="/demos/restaurante/reservar" className="inline-flex min-h-11 items-center text-[15px] font-semibold text-[#E8A87C] underline underline-offset-4">
            Reservar una mesa
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {EXPERIENCIAS.map((e) => (
            <article key={e.titulo} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={e.foto} alt={e.alt} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-[14px] text-[#E8A87C]">{e.cuando}</p>
              <h3 className="mt-1 text-2xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
                {e.titulo}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">{e.texto}</p>
              <p className="mt-3 text-[14px] font-semibold">{e.precio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
