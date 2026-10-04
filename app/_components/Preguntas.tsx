import { PREGUNTAS } from "../_data/contenido";

export function Preguntas() {
  return (
    <section id="faq" className="scroll-mt-28 border-t border-linea bg-niebla">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-[1fr_1.6fr] md:py-28">
        <div data-revelar>
          <p className="text-sm font-semibold text-azul">Preguntas</p>
          <h2 className="mt-2 font-display text-3xl text-balance sm:text-[2.75rem] sm:leading-[1.1]">Lo que nos preguntan siempre</h2>
        </div>

        <div className="space-y-3">
          {PREGUNTAS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-linea bg-white px-6">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-niebla text-xl font-normal text-azul transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-tinta/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
