import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../../_components/Footer";
import { Header } from "../../../_components/Header";
import { Check, Flecha, FlechaDiagonal, IconoWhatsApp } from "../../../_components/Iconos";
import { MarcoCelular, MarcoNavegador } from "../../../_components/Marcos";
import { Capturas } from "../../../_components/Proyectos";
import { Puntaje } from "../../../_components/Puntaje";
import { WhatsAppFlotante } from "../../../_components/WhatsAppFlotante";
import { PLANES, PROYECTOS } from "../../../_data/contenido";
import { ETIQUETAS, FECHA_MEDICION, METRICAS, medirEnPageSpeed, type Metrica } from "../../../_data/metricas";
import { EXTERNO, SITIO, wa } from "../../../_data/sitio";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = PROYECTOS.find((x) => x.slug === slug);
  if (!p) return {};
  const titulo = `${p.nombre}: caso de estudio | NEXA`;
  return {
    title: titulo,
    description: p.resumen,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: { title: titulo, description: p.resumen, url: `/proyectos/${p.slug}` },
    twitter: { title: titulo, description: p.resumen },
  };
}

const fechaMedicion = new Date(`${FECHA_MEDICION}T12:00:00`).toLocaleDateString("es-PE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

export default async function CasoDeEstudio({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const indice = PROYECTOS.findIndex((x) => x.slug === slug);
  if (indice === -1) notFound();

  const p = PROYECTOS[indice];
  const siguiente = PROYECTOS[(indice + 1) % PROYECTOS.length];
  const plan = PLANES.find((x) => x.nombre === p.plan);
  const metricas = METRICAS[p.slug];
  const urlDemo = `${SITIO.url}${p.ruta}`;
  const tonos = { "--tono-claro": p.tono.claro, "--tono-oscuro": p.tono.oscuro } as React.CSSProperties;

  const migas = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO.url },
      { "@type": "ListItem", position: 2, name: "Proyectos", item: `${SITIO.url}/#proyectos` },
      { "@type": "ListItem", position: 3, name: p.nombre, item: `${SITIO.url}/proyectos/${p.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(migas).replace(/</g, "\\u003c") }}
      />
      <Header enInicio={false} />

      <main>
        {/* ============ Encabezado ============ */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:pt-14">
          <nav aria-label="Ruta de navegación" className="font-mono text-[13px] text-tenue" data-entrada>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-tinta">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#proyectos" className="hover:text-tinta">
                  Proyectos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-tinta">
                {p.nombre}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div data-entrada style={retraso(80)}>
              <p className="flex items-center gap-2.5 font-mono text-[13px] text-tenue">
                <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: p.tono.marca }} />
                Caso de estudio · {p.rubro}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.7rem,7vw,5rem)] leading-[0.98]">{p.nombre}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-tenue">{p.resumen}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link
                  href={p.ruta}
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-acento px-7 font-semibold text-sobre-acento transition-colors hover:bg-acento-hondo"
                >
                  Abrir el demo
                  <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={p.codigo}
                  {...EXTERNO}
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-tinta/25 underline-offset-[6px] transition-colors hover:decoration-acento"
                >
                  Ver el código en GitHub
                  <FlechaDiagonal />
                </a>
              </div>
            </div>

            <dl data-entrada style={retraso(160)} className="grid grid-cols-2 gap-x-6">
              {p.alcance.map((a) => (
                <div key={a.etiqueta} className="border-t border-tinta/15 py-4">
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-tenue">{a.etiqueta}</dt>
                  <dd className="mt-1.5 font-display text-lg leading-tight">{a.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            data-entrada
            style={{ ...retraso(240), ...tonos }}
            className="tarjeta mt-14 rounded-[2rem] px-5 pt-8 sm:px-12 sm:pt-12 lg:px-16 lg:pt-16"
          >
            <Capturas p={p} prioridad />
          </div>
        </section>

        {/* ============ Reto y solución ============ */}
        <section className="border-t border-linea bg-alterno">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 md:grid-cols-[1fr_1.5fr] md:py-24">
            <div data-revelar>
              <p className="font-mono text-[13px] text-tenue">El reto</p>
              <p className="mt-4 font-display text-[1.45rem] font-semibold leading-snug">{p.reto}</p>
            </div>
            <div data-revelar>
              <h2 className="font-display text-3xl">Lo que construimos</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-tenue">
                {p.solucion.map((parrafo) => (
                  <p key={parrafo}>{parrafo}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ Recorrido por pantallas ============ */}
        <section className="border-t border-linea">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)]" data-revelar>
              Recorrido por el sitio
            </h2>

            <div className="mt-14 space-y-20 md:space-y-28">
              {p.pantallas.map((s, i) => (
                <article
                  key={s.src}
                  className={`grid items-center gap-8 md:gap-14 ${s.movil ? "md:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.6fr_1fr]"}`}
                >
                  <div data-revelar="3d" className={`${i % 2 === 1 ? "lg:order-2" : ""} ${s.movil ? "flex justify-center" : ""}`}>
                    {s.movil ? (
                      <MarcoCelular src={s.src} alt={s.alt} sizes="280px" className="w-full max-w-[280px]" />
                    ) : (
                      <MarcoNavegador src={s.src} alt={s.alt} ruta={p.ruta} sizes="(min-width: 1152px) 690px, (min-width: 1024px) 60vw, 92vw" />
                    )}
                  </div>
                  <div data-revelar>
                    <p className="font-mono text-[13px] text-tenue">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-2xl">{s.titulo}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-tenue">{s.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Métricas ============ */}
        <section className="invertido">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 md:py-24 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div data-revelar>
              <h2 className="font-display text-3xl sm:text-4xl">Medido en Google Lighthouse</h2>
              <p className="mt-4 max-w-md leading-relaxed text-tenue">
                {metricas
                  ? `Resultados en modo celular (${fechaMedicion}). Haz tu propia medición: debería darte números muy parecidos.`
                  : "PageSpeed Insights es la herramienta de Google que califica la velocidad, accesibilidad, buenas prácticas y SEO de un sitio. Mide este demo tú mismo, en modo celular."}
              </p>
              <a
                href={medirEnPageSpeed(urlDemo)}
                {...EXTERNO}
                className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-acento"
              >
                Medirlo en PageSpeed Insights
                <FlechaDiagonal />
              </a>
            </div>
            {metricas ? (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4" data-revelar>
                {(Object.keys(ETIQUETAS) as (keyof Metrica)[]).map((k) => (
                  <Puntaje key={k} valor={metricas[k]} etiqueta={ETIQUETAS[k]} tam={96} oscuro />
                ))}
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4" data-revelar>
                {Object.values(ETIQUETAS).map((e) => (
                  <li key={e} className="rounded-2xl border border-linea p-4 text-center text-sm font-semibold">
                    {e}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ============ Detalles técnicos ============ */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr] md:items-end" data-revelar>
              <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.05]">Detalles técnicos</h2>
              <p className="leading-relaxed text-tenue">
                Lo que hace que el sitio sea seguro, rápido y fácil de mantener. Todo se puede revisar en el código.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {p.tecnico.map((t, i) => (
                <li key={t.titulo} className="border-t border-tinta/15 pt-5" data-revelar style={{ "--i": i % 3 } as React.CSSProperties}>
                  <h3 className="font-semibold">{t.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-tenue">{t.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ ¿Quieres algo así? ============ */}
        <section className="border-t border-linea">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div data-revelar>
              <h2 className="font-display text-[clamp(2.2rem,5vw,3.25rem)] leading-[1.05] text-balance">
                ¿Quieres algo así para tu negocio?
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-tenue">
                Cuéntanos qué vendes y cómo atiendes hoy. Te enviamos una propuesta por escrito, con precio y plazo,
                antes de que pagues nada.
              </p>
              <a
                href={wa(`Hola NEXA, vi el caso ${p.nombre} y quiero algo parecido para mi negocio.`)}
                {...EXTERNO}
                className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-acento px-7 font-semibold text-sobre-acento transition-colors hover:bg-acento-hondo"
              >
                <IconoWhatsApp tam={20} />
                Conversemos por WhatsApp
              </a>
            </div>

            {plan && (
              <div className="invertido rounded-[1.75rem_0.6rem_1.75rem_0.6rem] p-8" data-revelar>
                <p className="font-mono text-xs text-tenue">El plan más parecido a este proyecto</p>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl">{plan.nombre}</h3>
                  <p className="font-display text-3xl">
                    <span className="mr-1 font-sans text-sm font-normal text-tenue">desde</span>S/ {plan.precio}
                  </p>
                </div>
                <ul className="mt-6 space-y-2.5 text-[15px]">
                  {plan.incluye.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#precios" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-acento underline underline-offset-4">
                  Comparar todos los planes
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ============ Siguiente proyecto ============ */}
        {siguiente.slug !== p.slug && (
          <section className="border-t border-linea bg-alterno pb-12">
            <Link
              href={`/proyectos/${siguiente.slug}`}
              className="group mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-14 pt-14 md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="font-mono text-[13px] text-tenue">Siguiente proyecto</p>
                <p className="mt-2 font-display text-[clamp(2.2rem,5vw,3.25rem)] leading-[1.05] transition-colors group-hover:text-acento">
                  {siguiente.nombre}
                </p>
                <p className="mt-2 text-tenue">{siguiente.rubro}</p>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-full border border-tinta/25 transition-colors group-hover:border-acento group-hover:bg-acento group-hover:text-sobre-acento">
                <Flecha />
              </span>
            </Link>
          </section>
        )}
      </main>

      <Footer enInicio={false} contacto={false} />
      <WhatsAppFlotante />
    </>
  );
}
