import Link from "next/link";
import { PROYECTOS, type Proyecto } from "../_data/contenido";
import { Flecha, FlechaDiagonal } from "./Iconos";
import { MarcoCelular, MarcoNavegador } from "./Marcos";

/** Captura de escritorio con el celular superpuesto (se usa en los casos de estudio). */
export function Capturas({ p, prioridad }: { p: Proyecto; prioridad: boolean }) {
  return (
    <div data-inclinar className="relative pb-10 pr-6 sm:pr-14">
      <div className="dispositivo">
        <MarcoNavegador
          src={p.captura.escritorio}
          alt={`Página de inicio del demo ${p.nombre} en computadora`}
          ruta={p.ruta}
          prioridad={prioridad}
          sizes="(min-width: 1152px) 1000px, 92vw"
        />
      </div>
      <MarcoCelular
        src={p.captura.movil}
        alt={`El demo ${p.nombre} en un celular`}
        sizes="170px"
        className="escena-frente absolute bottom-0 right-0 w-[24%] max-w-[170px]"
      />
    </div>
  );
}

function Tarjeta({ p, i }: { p: Proyecto; i: number }) {
  // Primera y última, anchas con la captura de escritorio; las del medio, angostas con el celular.
  const ancha = i === 0 || i === PROYECTOS.length - 1;
  const tonos = { "--tono-claro": p.tono.claro, "--tono-oscuro": p.tono.oscuro } as React.CSSProperties;

  const texto = (
    <div className="relative z-10 flex flex-col p-7 sm:p-9">
      <p className="flex items-center gap-2.5 font-mono text-xs text-tenue">
        <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: p.tono.marca }} />
        {p.rubro}
      </p>
      <h3 className="mt-4 font-display text-[1.65rem] leading-[1.1] sm:text-[1.85rem]">
        <Link href={`/proyectos/${p.slug}`} className="after:absolute after:inset-0 after:z-10 after:content-['']">
          {p.nombre}
        </Link>
      </h3>
      <p className="mt-3 max-w-sm leading-relaxed text-tenue">{p.bajada}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Incluye">
        {p.etiquetas.map((e) => (
          <li key={e} className="rounded-md border border-tinta/10 bg-superficie/55 px-2 py-1 font-mono text-[11.5px] text-tinta/80">
            {e}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
        <span className="inline-flex items-center gap-1.5 text-acento">
          Ver el caso
          <Flecha className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        <Link
          href={p.ruta}
          className="relative z-20 inline-flex min-h-11 items-center gap-1 text-tenue underline decoration-tinta/20 underline-offset-4 transition-colors hover:text-tinta hover:decoration-tinta/50"
        >
          Abrir el demo
          <FlechaDiagonal />
        </Link>
      </div>
    </div>
  );

  if (ancha) {
    // La última va en espejo (captura a la izquierda) para que la grilla no se sienta repetida.
    const espejo = i === PROYECTOS.length - 1;
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
              className={`dispositivo-sube absolute left-7 right-[-14%] top-0 sm:left-9 lg:top-auto lg:bottom-[-16%] ${
                espejo ? "lg:left-[-24%] lg:right-3" : "lg:left-3 lg:right-[-24%]"
              }`}
            >
              <div className="dispositivo brillo rounded-xl">
                <MarcoNavegador
                  src={p.captura.escritorio}
                  alt={`Página de inicio del demo ${p.nombre}`}
                  ruta={p.ruta}
                  sizes="(min-width: 1152px) 560px, (min-width: 1024px) 52vw, 96vw"
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
            <MarcoCelular src={p.captura.movil} alt={`El demo ${p.nombre} en un celular`} sizes="210px" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Proyectos() {
  return (
    <section id="proyectos" className="scroll-mt-24 border-t border-linea">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.25fr_1fr] md:items-end" data-revelar>
          <div>
            <p className="font-mono text-[13px] text-tenue">Proyectos</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.03] text-balance">
              Cuatro proyectos que puedes usar
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-tenue md:justify-self-end">
            Agenda una cita, busca una casa, preinscribe a un alumno o reserva una mesa. Cada demo tiene su caso de
            estudio y su código en GitHub.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {PROYECTOS.map((p, i) => (
            <Tarjeta key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
