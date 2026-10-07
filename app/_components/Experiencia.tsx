import { habilidades, STACK_SITIO } from "../_data/contenido";
import { ANCLA, type Idioma } from "../_data/idioma";
import { medirEnPageSpeed } from "../_data/metricas";
import { EXTERNO, SITIO } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { FlechaDiagonal } from "./Iconos";

const host = new URL(SITIO.url).host;

const CAPAS = 16;

/**
 * La cifra de años en 3D: copias apiladas en profundidad que forman el volumen.
 * Gira con el scroll (CSS). Es decorativa; el texto de al lado dice lo mismo.
 */
function Cifra3D() {
  return (
    <div aria-hidden="true" className="cifra w-fit select-none">
      <div className="cifra-giro font-display text-[clamp(13rem,30vw,21rem)] font-extrabold leading-[0.8]">
        {Array.from({ length: CAPAS }, (_, i) => (
          <span
            key={i}
            style={
              {
                "--i": CAPAS - 1 - i,
                color:
                  i === CAPAS - 1
                    ? "var(--color-tinta)"
                    : `color-mix(in oklab, var(--color-acento) ${40 + i * 3}%, var(--color-alterno))`,
              } as React.CSSProperties
            }
          >
            {SITIO.anios}
          </span>
        ))}
        <span className="cifra-mas self-start justify-self-end text-[0.34em] leading-none text-acento">+</span>
      </div>
    </div>
  );
}

export function Experiencia({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].experiencia;
  return (
    <section id={ANCLA[idioma].experiencia} className="cifra-seccion scroll-mt-24 overflow-x-clip border-t border-linea bg-alterno">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-32">
            <Cifra3D />
            <p className="mt-5 max-w-[16rem] font-mono text-sm leading-snug text-tenue">
              <span className="sr-only">{t.pieCifraLector}</span>
              {t.pieCifra}
            </p>
          </div>
        </div>

        <div>
          <h2 data-revelar className="font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.03] text-balance">
            {t.titulo}
          </h2>
          <p data-revelar className="mt-5 max-w-xl text-lg leading-relaxed text-tenue">
            {t.texto}
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {habilidades(idioma).map((h, i) => (
              <div key={h.area} data-revelar style={{ "--i": i % 2 } as React.CSSProperties} className="border-t border-linea py-4">
                <dt className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-tenue">{h.area}</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[15.5px] leading-snug">
                    {h.items.map((item, j) => (
                      <li key={item}>
                        {item}
                        {j < h.items.length - 1 && (
                          <span aria-hidden="true" className="ml-2 text-tinta/25">
                            /
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>

          <div data-revelar className="mt-8 rounded-[1.25rem_0.5rem_1.25rem_0.5rem] border border-dashed border-tinta/20 p-5 sm:p-6">
            <p className="leading-relaxed">
              {t.stackAntes}{" "}
              <strong className="font-semibold">
                {STACK_SITIO.slice(0, -1).join(", ")} {t.y} {STACK_SITIO.at(-1)}
              </strong>
              .
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
              <li>
                <a href={SITIO.github} {...EXTERNO} className="inline-flex min-h-11 items-center gap-1.5 text-acento hover:underline hover:underline-offset-4">
                  {t.codigo}
                  <FlechaDiagonal />
                </a>
              </li>
              <li>
                <a href={medirEnPageSpeed(SITIO.url)} {...EXTERNO} className="inline-flex min-h-11 items-center gap-1.5 text-acento hover:underline hover:underline-offset-4">
                  {t.velocidad}
                  <FlechaDiagonal />
                </a>
              </li>
              <li>
                <a
                  href={`https://securityheaders.com/?q=${host}&followRedirects=on`}
                  {...EXTERNO}
                  className="inline-flex min-h-11 items-center gap-1.5 text-acento hover:underline hover:underline-offset-4"
                >
                  {t.seguridad}
                  <FlechaDiagonal />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
