import { ANCLA, type Idioma } from "../_data/idioma";
import { cotizar, EXTERNO } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import ChatDemo from "./ChatDemo";
import { FlechaAbajo, IconoWhatsApp } from "./Iconos";
import { MarcoNavegador } from "./Marcos";
import { FlechaMano, Subrayado } from "./Trazos";

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

/** Teléfono con el asistente de WhatsApp: el bisel es oscuro en ambos temas, como uno real. */
function Telefono({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2.6rem] bg-[#0b0f17] p-[9px] shadow-[0_50px_90px_-40px_rgb(10_18_36/0.75)] ring-1 ring-white/10">
      <div className="relative overflow-hidden rounded-[2.05rem]">
        <div aria-hidden="true" className="absolute left-1/2 top-2.5 z-10 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#0b0f17]" />
        {children}
      </div>
    </div>
  );
}

export function Hero({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].hero;

  return (
    <section data-inclinar className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-24 lg:pt-14">
        <div>
          <p data-entrada className="flex items-center gap-3 font-mono text-[13px] text-tenue">
            <span aria-hidden="true" className="h-px w-8 bg-tinta/35" />
            {t.lugar}
          </p>

          <h1
            data-entrada="sube"
            style={retraso(80)}
            className="mt-6 font-display text-[clamp(2.55rem,6.4vw,4.75rem)] leading-[0.98] text-balance"
          >
            {t.tituloAntes}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {t.tituloSubrayado}
              <Subrayado demora={900} className="absolute -bottom-[0.14em] left-[-2%] h-[0.22em] w-[104%] text-acento" />
            </span>
          </h1>

          <p data-entrada="sube" style={retraso(160)} className="mt-7 max-w-[34rem] text-lg leading-relaxed text-tenue sm:text-[1.2rem]">
            {t.texto}
          </p>

          <div data-entrada style={retraso(240)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={cotizar(idioma)}
              {...EXTERNO}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-acento px-7 font-semibold text-sobre-acento shadow-[0_14px_30px_-16px_rgb(47_79_191/0.8)] transition-colors hover:bg-acento-hondo"
            >
              <IconoWhatsApp tam={19} />
              {t.cta}
            </a>
            <a
              href={`#${ANCLA[idioma].proyectos}`}
              className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-tinta/25 decoration-[1.5px] underline-offset-[7px] transition-colors hover:decoration-acento"
            >
              {t.verProyectos}
              <FlechaAbajo className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <dl data-entrada style={retraso(320)} className="mt-12 grid max-w-xl grid-cols-3 border-t border-linea pt-6">
            {t.datos.map((d) => (
              <div key={d.texto} className="flex flex-col border-l border-linea px-3 first:border-l-0 first:pl-0 sm:px-5">
                <dt className="order-2 mt-2 font-mono text-[11.5px] leading-snug text-tenue sm:text-xs">{d.texto}</dt>
                <dd className="order-1 font-display text-[1.75rem] leading-none sm:text-[2.1rem]">{d.valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Escena 3D: la agenda de la clínica en el navegador y, delante, su asistente de WhatsApp. */}
        <div data-entrada style={retraso(200)} className="escena relative mx-auto w-full max-w-[540px] lg:mx-0 lg:justify-self-end">
          <div aria-hidden="true" className="escena-giro absolute right-0 top-0 hidden w-[86%] sm:block">
            <div className="escena-puntero">
              <MarcoNavegador
                src="/proyectos/clinica-dental/agenda-horario.webp"
                alt=""
                ruta="/demos/dental/agendar"
                sizes="(min-width: 1024px) 465px, 72vw"
              />
            </div>
          </div>

          <div className="escena-frente relative z-10 mx-auto w-full max-w-[300px] sm:mx-0 sm:mt-24">
            <Telefono>
              <ChatDemo idioma={idioma} textos={TEXTOS[idioma].chat} />
            </Telefono>
          </div>

          <div className="pointer-events-none absolute bottom-24 right-0 z-20 hidden w-[190px] text-acento sm:block lg:hidden xl:block xl:right-[-12px]">
            <p className="-rotate-[4deg] text-right font-mano text-[1.45rem] leading-[1.05]">
              {t.nota[0]}
              <br />
              {t.nota[1]}
            </p>
            <FlechaMano demora={1500} className="ml-3 mt-1 h-14 w-16 rotate-[38deg]" />
          </div>

          <p className="mt-6 max-w-[300px] text-sm leading-relaxed text-tenue max-sm:mx-auto max-sm:text-center">{t.pie}</p>
        </div>
      </div>
    </section>
  );
}
