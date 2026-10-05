const RESENAS = [
  { nombre: "Karina S.", ocasion: "Cumpleaños", hace: "hace 1 semana", texto: "Reservé para 10 desde la web y nos tenían la mesa larga lista con globos. El lomo saltado, increíble.", iniciales: "KS", color: "#C1440E" },
  { nombre: "Pedro A.", ocasion: "Almuerzo de trabajo", hace: "hace 2 semanas", texto: "Rápido, rico y bien atendido. El juane es de los mejores que he probado en Pucallpa.", iniciales: "PA", color: "#1E3B2C" },
  { nombre: "Familia Ríos", ocasion: "Almuerzo familiar", hace: "hace 1 mes", texto: "Fuimos un domingo con los abuelos y los niños. Nos atendieron con paciencia y la porción alcanza para compartir.", iniciales: "FR", color: "#7C5A2E" },
];

export function Resenas() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl leading-tight text-[#1F1A15] md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
            Lo que dicen <span className="italic text-[#C1440E]">en la mesa</span>
          </h2>
          <p className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[15px] shadow-sm">
            <span className="text-[#E89B1C]" aria-hidden="true">★★★★★</span>
            <strong className="font-semibold">4.8</strong>
            <span className="text-[#6E6457]">de 1 240 opiniones</span>
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {RESENAS.map((r) => (
            <figure key={r.nombre} className="flex flex-col rounded-3xl bg-white p-7 shadow-[0_10px_30px_-15px_rgba(31,26,21,0.2)]">
              <p role="img" className="text-[#E89B1C]" aria-label="5 de 5 estrellas">★★★★★</p>
              <blockquote className="mt-3 flex-1 text-[17px] leading-relaxed text-[#1F1A15]">“{r.texto}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: r.color }} aria-hidden="true">
                  {r.iniciales}
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
