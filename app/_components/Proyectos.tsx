import Link from "next/link";
import { proyectos, type Proyecto } from "../_data/contenido";
import { ANCLA, RUTA, type Idioma } from "../_data/idioma";
import { TEXTOS } from "../_data/textos";
import { Flecha, FlechaDiagonal } from "./Iconos";
import { MarcoCelular, MarcoNavegador } from "./Marcos";

/** Captura de escritorio con el celular superpuesto (se usa en los casos de estudio). */
export function Capturas({ p, prioridad, idioma }: { p: Proyecto; prioridad: boolean; idioma: Idioma }) {
  const t = TEXTOS[idioma].proyectos;
  return (
    <div data-inclinar className="relative pb-10 pr-6 sm:pr-14">
      <div className="dispositivo">
        <MarcoNavegador
          src={p.captura.escritorio}
          alt={t.altEscritorioCaso(p.nombre)}
          ruta={p.ruta}
          prioridad={prioridad}
          sizes="(min-width: 1152px) 1000px, 92vw"
        />
      </div>
      <MarcoCelular
        src={p.captura.movil}
        alt={t.altMovil(p.nombre)}
        sizes="170px"
        className="escena-frente absolute bottom-0 right-0 w-[24%] max-w-[170px]"
      />
    </div>
  );
}

function Tarjeta({ p, i, total, idioma }: { p: Proyecto; i: number; total: number; idioma: Idioma }) {
  const t = TEXTOS[idioma].proyectos;
  // Primera y última, anchas con la captura de escritorio; las del medio, angostas con el celular.
  const ancha = i === 0 || i === total - 1;
  const tonos = { "--tono-claro": p.tono.claro, "--tono-oscuro": p.tono.oscuro } as React.CSSProperties;

  const texto = (
    <div className="relative z-10 flex flex-col p-7 sm:p-9">
      <p className="flex items-center gap-2.5 font-mono text-xs text-tenue">
        <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: p.tono.marca }} />
        {p.rubro}
      </p>
      <h3 className="mt-4 font-display text-[1.65rem] leading-[1.1] sm:text-[1.85rem]">
        <Link href={RUTA.caso(p.slug)[idioma]} className="after:absolute after:inset-0 after:z-10 after:content-['']">
          {p.nombre}
        </Link>
      </h3>
      <p className="mt-3 max-w-sm leading-relaxed text-tenue">{p.bajada}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.incluye}>
        {p.etiquetas.map((e) => (
          <li key={e} className="rounded-md border border-tinta/10 bg-superficie/55 px-2 py-1 font-mono text-[11.5px] text-tinta/80">
            {e}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
        <span className="inline-flex items-center gap-1.5 text-acento">
          {t.verCaso}
          <Flecha className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        <Link
          href={p.ruta}
          className="relative z-20 inline-flex min-h-11 items-center gap-1 text-tenue underline decoration-tinta/20 underline-offset-4 transition-colors hover:text-tinta hover:decoration-tinta/50"
        >
          {t.abrirDemo}
          <FlechaDiagonal />
        </Link>
      </div>
    </div>
  );

  if (ancha) {
    // La última va en espejo (captura a la izquierda) para que la grilla no se sienta repetida.
    const espejo = i === total - 1;
    return (
      <article
        data-inclinar
        data-revelar
        style={tonos}
        className="tarjeta group relative isolate overflow-hidden rounded-[1.75rem] md:col-span-2 lg:col-span-4"
      >
        <div className={`grid h-full ${espejo ? "lg:grid-cols-[1.08fr_0.92fr]" : "lg:grid-cols-[0.92fr_1.08fr]"}`}>
          {texto}
          <div className={`relative h-[230px] sm:h-[300px] lg:h-auto ${espejo ? "lg:order-first" : ""}`}>
            <div
              className={`dispositivo-sube absolute left-7 right-[-14%] top-0 sm:left-9 lg:top-auto lg:bottom-[-14%] ${
                espejo ? "lg:left-[-62%] lg:right-2" : "lg:left-2 lg:right-[-62%]"
              }`}
            >
              <div className="dispositivo brillo rounded-xl">
                <MarcoNavegador
                  src={p.captura.escritorio}
                  alt={t.altEscritorio(p.nombre)}
                  ruta={p.ruta}
                  sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 96vw"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      data-inclinar
      data-revelar
      style={tonos}
      className="tarjeta group relative isolate flex flex-col overflow-hidden rounded-[1.75rem] lg:col-span-2"
    >
      {texto}
      <div className="relative mt-auto h-[270px] sm:h-[290px] lg:h-[250px]">
        <div className="dispositivo-sube absolute left-1/2 top-0 w-[210px] -translate-x-1/2">
          <div className="dispositivo brillo rounded-[1.6rem]">
            <MarcoCelular src={p.captura.movil} alt={t.altMovil(p.nombre)} sizes="210px" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Proyectos({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].proyectos;
  const lista = proyectos(idioma);

  return (
    <section id={ANCLA[idioma].proyectos} className="scroll-mt-24 border-t border-linea">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.25fr_1fr] md:items-end" data-revelar>
          <div>
            <p className="font-mono text-[13px] text-tenue">{t.etiqueta}</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.03] text-balance">{t.titulo}</h2>
          </div>
          <div className="max-w-md md:justify-self-end">
            <p className="leading-relaxed text-tenue">{t.texto}</p>
            {t.nota && <p className="mt-3 font-mono text-xs leading-relaxed text-tenue">{t.nota}</p>}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {lista.map((p, i) => (
            <Tarjeta key={p.slug} p={p} i={i} total={lista.length} idioma={idioma} />
          ))}
        </div>
      </div>
    </section>
  );
}
