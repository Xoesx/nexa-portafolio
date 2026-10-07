const RESENAS = [
  { nombre: "Karina S.", ocasion: "Cumpleaños", hace: "hace 1 semana", texto: "Reservé para 10 desde la web y nos tenían la mesa larga lista con globos. El lomo saltado, increíble." },
  { nombre: "Pedro A.", ocasion: "Almuerzo de trabajo", hace: "hace 2 semanas", texto: "Rápido, rico y bien atendido. El juane es de los mejores que he probado en Pucallpa." },
  { nombre: "Familia Ríos", ocasion: "Almuerzo familiar", hace: "hace 1 mes", texto: "Fuimos un domingo con los abuelos y los niños. Nos atendieron con paciencia y la porción alcanza para compartir." },
];

const iniciales = (nombre: string) =>
  nombre
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export function Resenas() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl leading-tight text-[#1F1A15] md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
            Lo que dicen los clientes
          </h2>
          <p className="flex items-center gap-2 text-[15px]">
            <span className="text-[#E89B1C]" aria-hidden="true">
              ★★★★★
            </span>
            <strong className="font-semibold">4.8</strong>
            <span className="text-[#6E6457]">de 1 240 opiniones</span>
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-3">
          {RESENAS.map((r) => (
            <figure key={r.nombre} className="flex flex-col border-t border-[#1F1A15]/15 py-7">
              <p role="img" className="text-[14px] text-[#E89B1C]" aria-label="5 de 5 estrellas">
                ★★★★★
              </p>
              <blockquote className="mt-3 flex-1 text-[17px] leading-relaxed text-[#1F1A15]">
                <p>{r.texto}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F0E7D5] text-[13px] font-semibold text-[#7C5A2E]" aria-hidden="true">
                  {iniciales(r.nombre)}
                </span>
                <span className="leading-tight">
                  <span className="block font-semibold text-[#1F1A15]">{r.nombre}</span>
                  <span className="text-[13px] text-[#6E6457]">
                    {r.ocasion} · {r.hace}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
