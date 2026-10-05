import { PREGUNTAS } from "../_data/contenido";
import { COTIZAR, EXTERNO } from "../_data/sitio";

export function Preguntas() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-linea bg-alterno">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-32 pt-20 md:grid-cols-[0.8fr_1.2fr] md:pb-36 md:pt-24">
        <div data-revelar className="md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.03] text-balance">Preguntas frecuentes</h2>
          <p className="mt-4 max-w-xs leading-relaxed text-tenue">
            ¿Tienes otra duda?{" "}
            <a href={COTIZAR} {...EXTERNO} className="font-semibold text-acento underline underline-offset-4">
              Pregúntanos por WhatsApp
            </a>
            .
          </p>
        </div>

        <div className="border-t border-tinta/15">
          {PREGUNTAS.map((f) => (
            <details key={f.q} name="preguntas" className="faq group border-b border-tinta/15">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.06rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="relative h-3.5 w-3.5 shrink-0 text-acento">
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded bg-current transition-transform duration-300 group-open:scale-y-0 motion-reduce:transition-none" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-tenue">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
