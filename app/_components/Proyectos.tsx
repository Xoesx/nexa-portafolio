import Link from "next/link";
import { PROYECTOS, type Proyecto } from "../_data/contenido";
import { FECHA_MEDICION, METRICAS } from "../_data/metricas";
import { Flecha } from "./Iconos";
import { MarcoCelular, MarcoNavegador } from "./Marcos";

/** Captura de escritorio con el celular superpuesto (se usa en los casos de estudio). */
export function Capturas({ p, prioridad }: { p: Proyecto; prioridad: boolean }) {
  return (
    <div className="relative pb-10 pr-6 sm:pr-14">
      <MarcoNavegador
        src={p.captura.escritorio}
        alt={`Página de inicio del demo ${p.nombre} en computadora`}
        ruta={p.ruta}
        prioridad={prioridad}
        sizes="(min-width: 1152px) 1000px, 92vw"
      />
      <MarcoCelular
        src={p.captura.movil}
        alt={`El demo ${p.nombre} en un celular`}
        sizes="170px"
        className="absolute bottom-0 right-0 w-[24%] max-w-[170px]"
      />
    </div>
  );
}

function Tarjeta({ p, prioridad }: { p: Proyecto; prioridad: boolean }) {
  const m = METRICAS[p.slug];
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-linea bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgb(11_31_58/0.35)]">
      <div className="overflow-hidden bg-niebla px-5 pt-5 sm:px-7 sm:pt-7">
        <MarcoNavegador
          src={p.captura.escritorio}
          alt={`Página de inicio del demo ${p.nombre}`}
          ruta={p.ruta}
          prioridad={prioridad}
          sizes="(min-width: 1152px) 520px, (min-width: 768px) 45vw, 88vw"
          className="translate-y-1 rounded-b-none border-b-0 transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm font-semibold text-azul">{p.rubro}</p>
        <h3 className="mt-1.5 font-display text-2xl">
          <Link href={`/proyectos/${p.slug}`} className="after:absolute after:inset-0">
            {p.nombre}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-tinta/75">{p.resumen}</p>
        <ul className="mb-6 mt-5 flex flex-wrap gap-2" aria-label="Incluye">
          {p.incluye.slice(0, 3).map((c) => (
            <li key={c} className="rounded-full bg-niebla px-3 py-1 text-[13px] font-medium text-tinta/80">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-linea pt-5">
          {m && (
            <p className="text-sm text-tinta/70">
              Lighthouse: <span className="font-semibold text-tinta">{m.rendimiento}</span> velocidad ·{" "}
              <span className="font-semibold text-tinta">{m.accesibilidad}</span> accesibilidad
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-azul">
            Ver el caso
            <Flecha className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function Proyectos() {
  const fecha = new Date(`${FECHA_MEDICION}T12:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section id="proyectos" className="scroll-mt-28 border-t border-linea">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end" data-revelar>
          <div>
            <p className="text-sm font-semibold text-azul">Proyectos</p>
            <h2 className="mt-2 font-display text-3xl text-balance sm:text-[2.75rem] sm:leading-[1.1]">
              No te mostramos maquetas. Te dejamos usarlos.
            </h2>
          </div>
          <p className="leading-relaxed text-tinta/75">
            Agenda una cita en la clínica, busca una casa, preinscribe a un alumno o reserva una mesa. Cada demo funciona
            de verdad, tiene su caso de estudio y su código publicado en GitHub.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROYECTOS.map((p, i) => (
            <div key={p.slug} data-revelar className="flex">
              <Tarjeta p={p} prioridad={i < 2} />
            </div>
          ))}
        </div>

        {Object.keys(METRICAS).length > 0 && (
          <p className="mt-6 text-sm text-tinta/70">
            Puntajes de Google Lighthouse en modo celular, medidos el {fecha}. Puedes repetir la medición desde cada caso
            de estudio.
          </p>
        )}
      </div>
    </section>
  );
}
