import { preguntas } from "../_data/contenido";
import { ANCLA, type Idioma } from "../_data/idioma";
import { cotizar, EXTERNO } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";

export function Preguntas({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].preguntas;
  return (
    <section id={ANCLA[idioma].faq} className="scroll-mt-24 bg-alterno">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 pb-40 pt-24 md:grid-cols-[0.8fr_1.2fr] md:pb-48 md:pt-32">
        <div data-revelar="texto" className="md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1] tracking-[-0.034em] text-balance">{t.titulo}</h2>
          <p className="mt-4 max-w-xs leading-relaxed text-tenue">
            {t.otraDuda}{" "}
            <a href={cotizar(idioma)} {...EXTERNO} className="font-semibold text-acento underline underline-offset-4">
              {t.pregunta}
            </a>
            .
          </p>
        </div>

        <div className="border-t border-tinta/15">
          {preguntas(idioma).map((f) => (
            <details key={f.q} name="preguntas" className="faq group border-b border-tinta/15">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[1.08rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 hover:text-acento [&::-webkit-details-marker]:hidden">
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
