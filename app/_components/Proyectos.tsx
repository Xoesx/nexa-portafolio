import Link from "next/link";
import { PROYECTOS, type Proyecto } from "../_data/contenido";
import { METRICAS } from "../_data/metricas";
import { Check, Flecha } from "./Iconos";
import { MarcoCelular, MarcoNavegador } from "./Marcos";

export function Capturas({ p, prioridad }: { p: Proyecto; prioridad: boolean }) {
  return (
    <div className="relative pb-10 pr-6 sm:pr-14">
      <MarcoNavegador
        src={p.captura.escritorio}
        alt={`Página de inicio del demo ${p.nombre} en computadora`}
        ruta={p.ruta}
        prioridad={prioridad}
        sizes="(min-width: 1152px) 640px, (min-width: 1024px) 55vw, 92vw"
      />
      <MarcoCelular
        src={p.captura.movil}
        alt={`El demo ${p.nombre} en un celular`}
        sizes="150px"
        className="absolute bottom-0 right-0 w-[28%] max-w-[150px]"
      />
    </div>
  );
}

export function Proyectos() {
  return (
    <section id="proyectos" className="scroll-mt-28 border-t border-tinta/10">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="max-w-2xl" data-revelar>
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Proyectos</h2>
          <p className="mt-4 text-lg leading-relaxed text-tinta/70">
            Sitios completos y funcionando, no maquetas. Ábrelos, navégalos desde tu celular y revisa el código: así de
            terminado te entregamos el tuyo.
          </p>
        </div>

        <div className="mt-16 space-y-24 md:space-y-32">
          {PROYECTOS.map((p, i) => (
            <article
              key={p.slug}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16"
              aria-labelledby={`proyecto-${p.slug}`}
            >
              <div data-revelar className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <Capturas p={p} prioridad={i === 0} />
              </div>

              <div data-revelar>
                <p className="text-sm font-semibold text-arcilla">{p.rubro}</p>
                <h3 id={`proyecto-${p.slug}`} className="mt-2 font-serif text-3xl tracking-tight sm:text-[2.5rem]">
                  {p.nombre}
                </h3>
                <p className="mt-4 leading-relaxed text-tinta/75">{p.resumen}</p>

                <ul className="mt-6 space-y-2.5 text-[15px]">
                  {p.incluye.map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <Check />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm text-tinta/70">
                  Lighthouse en celular:{" "}
                  <span className="font-semibold text-tinta">{METRICAS[p.slug].rendimiento}</span> rendimiento ·{" "}
                  <span className="font-semibold text-tinta">{METRICAS[p.slug].accesibilidad}</span> accesibilidad ·{" "}
                  <span className="font-semibold text-tinta">{METRICAS[p.slug].seo}</span> SEO
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-tinta px-6 font-semibold text-papel transition-colors hover:bg-arcilla"
                  >
                    Ver el caso completo
                    <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href={p.ruta}
                    className="inline-flex min-h-11 items-center font-semibold underline decoration-tinta/30 underline-offset-4 transition-colors hover:decoration-arcilla"
                  >
                    Abrir el demo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
