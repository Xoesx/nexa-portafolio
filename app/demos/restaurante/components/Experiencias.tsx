import Image from "next/image";
import Link from "next/link";

const EXPERIENCIAS = [
  {
    titulo: "Viernes criollos",
    cuando: "Todos los viernes · 20:00",
    texto: "Música criolla en vivo, pisco sour de la casa y la carta completa hasta la medianoche.",
    precio: "Sin cover",
    foto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=75",
    alt: "Mesas llenas de comensales en una noche animada",
  },
  {
    titulo: "Taller de ceviche para dos",
    cuando: "Sábados · 11:00",
    texto: "Nuestro cocinero te enseña a preparar un ceviche clásico y una leche de tigre. Al final, almuerzan lo que hicieron.",
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
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#E8A87C]">Eventos y experiencias</p>
            <h2 className="mt-3 text-4xl leading-tight md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
              Más que comer: <span className="italic text-[#E8A87C]">celebrar.</span>
            </h2>
          </div>
          <Link href="/demos/restaurante/reservar" className="inline-flex min-h-11 items-center text-[13px] font-semibold uppercase tracking-[0.15em] text-[#E8A87C] underline underline-offset-4">
            Reservar →
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {EXPERIENCIAS.map((e) => (
            <article key={e.titulo} className="group overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={e.foto} alt={e.alt} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-[#C1440E] px-3 py-1 text-[12px] font-semibold">{e.cuando}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
                  {e.titulo}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{e.texto}</p>
                <p className="mt-4 text-[14px] font-semibold text-[#E8A87C]">{e.precio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
