import { PASOS } from "../_data/contenido";

export function Proceso() {
  return (
    <section id="proceso" className="sobre-oscuro scroll-mt-28 bg-selva text-papel">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div data-revelar>
          <h2 className="max-w-xl font-serif text-3xl tracking-tight sm:text-4xl">Cómo trabajamos juntos</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-papel/75">
            Sin letra chica: antes de pagar sabes qué vas a recibir, cuánto cuesta y en cuánto tiempo.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {PASOS.map((p, i) => (
            <li key={p.titulo} data-revelar className="border-t border-papel/25 pt-5">
              <span className="font-serif text-4xl text-mango">{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold leading-snug">{p.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-papel/75">{p.texto}</p>
            </li>
          ))}
        </ol>

        <p className="mt-14 max-w-xl border-l-2 border-mango pl-4 text-[15px] leading-relaxed text-papel/90">
          Forma de pago: 50% para empezar y 50% al entregar, con Yape, Plin o transferencia.
        </p>
      </div>
    </section>
  );
}
