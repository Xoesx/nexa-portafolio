import Image from "next/image";
import Link from "next/link";
import { PROYECTOS, type Proyecto } from "../_data/contenido";
import { EXTERNO, SITIO } from "../_data/sitio";
import { Check, Flecha } from "./Iconos";

const dominio = new URL(SITIO.url).host;

function Capturas({ p, prioridad }: { p: Proyecto; prioridad: boolean }) {
  return (
    <div className="relative pb-10 pr-6 sm:pr-14">
      <figure className="overflow-hidden rounded-xl border border-tinta/15 bg-white shadow-[0_24px_60px_-30px_rgb(19_32_30/0.45)]">
        <div className="flex items-center gap-3 border-b border-tinta/10 bg-papel-hondo px-3 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-tinta/20" />
            <span className="h-2 w-2 rounded-full bg-tinta/20" />
          </span>
          <span className="truncate rounded-md bg-white/70 px-2.5 py-0.5 text-xs text-tinta/60">
            {dominio}
            {p.ruta}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={p.captura.escritorio}
            alt={`Página de inicio del demo ${p.nombre} en computadora`}
            fill
            priority={prioridad}
            sizes="(min-width: 1024px) 640px, 92vw"
            className="object-cover object-top"
          />
        </div>
      </figure>

      <figure className="absolute bottom-0 right-0 w-[28%] max-w-[150px] overflow-hidden rounded-[1.1rem] border-4 border-tinta bg-tinta shadow-xl">
        <div className="relative aspect-[390/844]">
          <Image
            src={p.captura.movil}
            alt={`El demo ${p.nombre} en un celular`}
            fill
            sizes="150px"
            className="object-cover object-top"
          />
        </div>
      </figure>
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
              className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16"
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

                {p.nota && <p className="mt-5 text-sm text-tinta/60">{p.nota}</p>}

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={p.ruta}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-tinta px-6 font-semibold text-papel transition-colors hover:bg-arcilla"
                  >
                    Abrir el demo
                    <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={p.codigo}
                    {...EXTERNO}
                    className="inline-flex min-h-11 items-center font-semibold underline decoration-tinta/30 underline-offset-4 transition-colors hover:decoration-arcilla"
                  >
                    Ver el código
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
