import { PREGUNTAS } from "../_data/contenido";

export function Preguntas() {
  return (
    <section id="faq" className="scroll-mt-28 border-t border-tinta/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.7fr] md:py-28">
        <h2 data-revelar className="font-serif text-3xl tracking-tight sm:text-4xl">
          Preguntas frecuentes
        </h2>

        <div className="border-t border-tinta/15">
          {PREGUNTAS.map((f) => (
            <details key={f.q} className="group border-b border-tinta/15">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-2xl font-normal text-arcilla transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
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
