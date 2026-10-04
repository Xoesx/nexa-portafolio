import { PASOS } from "../_data/contenido";

export function Proceso() {
  return (
    <section id="proceso" className="sobre-oscuro scroll-mt-28 bg-marino text-papel">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end" data-revelar>
          <div>
            <p className="text-sm font-semibold text-cielo">Proceso</p>
            <h2 className="mt-2 font-display text-3xl text-balance sm:text-[2.75rem] sm:leading-[1.1]">
              Sin letra chica, de principio a fin
            </h2>
          </div>
          <p className="leading-relaxed text-papel/75">
            Antes de pagar sabes qué vas a recibir, cuánto cuesta y en cuánto tiempo. Después, ves cómo avanza.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => (
            <li key={p.titulo} data-revelar className="rounded-3xl border border-papel/10 bg-papel/[0.04] p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-azul font-display text-lg text-white">{i + 1}</span>
              <h3 className="mt-5 font-display text-lg">{p.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-papel/75">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
