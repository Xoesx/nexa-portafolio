import { ANCLA, type Idioma } from "../_data/idioma";
import { cotizar } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { Boton } from "./Boton";
import ChatDemo from "./ChatDemo";
import { FlechaAbajo, IconoWhatsApp } from "./Iconos";
import { MarcoNavegador } from "./Marcos";
import { FlechaMano, Subrayado } from "./Trazos";

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

/** Teléfono con el asistente de WhatsApp: el bisel es oscuro en ambos temas, como uno real. */
function Telefono({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2.75rem] bg-[#0b0f17] p-[9px] shadow-[0_60px_100px_-44px_rgb(10_18_36/0.8),inset_0_1px_0_rgb(255_255_255/0.12)] ring-1 ring-white/10">
      <div className="relative overflow-hidden rounded-[calc(2.75rem-9px)]">
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
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:pt-40 lg:pb-36">
        <p data-entrada="nitido" className="flex items-center gap-3 font-mono text-[13px] text-tenue">
          <span aria-hidden="true" className="h-px w-8 bg-tinta/35" />
          {t.lugar}
        </p>

        {/* El título va a todo el ancho: dos líneas firmes en vez de cuatro palabras apiladas. */}
        <h1
          data-entrada="sube"
          style={retraso(80)}
          className="mt-7 font-display text-[clamp(2.7rem,6.4vw,5.2rem)] leading-[0.95] tracking-[-0.038em] text-balance"
        >
          {t.tituloAntes}{" "}
          <span className="relative inline-block whitespace-nowrap">
            {t.tituloSubrayado}
            <Subrayado demora={900} className="absolute -bottom-[0.12em] left-[-2%] h-[0.2em] w-[104%] text-acento" />
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 items-start gap-16 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="lg:pt-4">
            <p
              data-entrada="sube"
              style={retraso(160)}
              className="max-w-[31rem] text-lg leading-relaxed text-tenue text-pretty sm:text-[1.2rem]"
            >
              {t.texto}
            </p>

            <div data-entrada="nitido" style={retraso(240)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Boton href={cotizar(idioma)} externo icono={<IconoWhatsApp tam={18} />}>
                {t.cta}
              </Boton>
              <a
                href={`#${ANCLA[idioma].proyectos}`}
                className="group inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-tinta/25 decoration-[1.5px] underline-offset-[7px] transition-colors duration-300 hover:decoration-acento"
              >
                {t.verProyectos}
                <FlechaAbajo className="transition-transform duration-500 ease-resorte group-hover:translate-y-0.5" />
              </a>
            </div>

            <dl data-entrada="nitido" style={retraso(320)} className="mt-16 grid max-w-md grid-cols-3 border-t border-linea pt-6">
              {t.datos.map((d) => (
                <div key={d.texto} className="flex flex-col border-l border-linea px-3 first:border-l-0 first:pl-0 sm:px-5">
                  <dt className="order-2 mt-2 font-mono text-[11.5px] leading-snug text-tenue sm:text-xs">{d.texto}</dt>
                  <dd className="order-1 font-display text-[1.75rem] leading-none tracking-[-0.03em] tabular-nums sm:text-[2.1rem]">
                    {d.valor}
                  </dd>
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

            <div className="escena-frente relative z-10 mx-auto w-full max-w-[290px] sm:mx-0 sm:mt-16">
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
      </div>
    </section>
  );
}
