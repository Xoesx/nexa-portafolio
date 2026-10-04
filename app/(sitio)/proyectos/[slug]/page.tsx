import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../../_components/Footer";
import { Header } from "../../../_components/Header";
import { Check, Flecha, IconoWhatsApp } from "../../../_components/Iconos";
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

export default async function CasoDeEstudio({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const indice = PROYECTOS.findIndex((x) => x.slug === slug);
  if (indice === -1) notFound();

  const p = PROYECTOS[indice];
  const siguiente = PROYECTOS[(indice + 1) % PROYECTOS.length];
  const plan = PLANES.find((x) => x.nombre === p.plan);
  const metricas = METRICAS[p.slug];
  const urlDemo = `${SITIO.url}${p.ruta}`;

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
        <section className="mx-auto max-w-6xl px-5 pb-14 pt-10 md:pt-16">
          <nav aria-label="Ruta de navegación" className="text-sm text-tinta/70" data-entrada>
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
              <li aria-current="page" className="font-semibold text-tinta">
                {p.nombre}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div data-entrada style={{ "--retraso": "80ms" } as React.CSSProperties}>
              <p className="text-sm font-semibold text-arcilla">Caso de estudio · {p.rubro}</p>
              <h1 className="mt-3 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">{p.nombre}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-tinta/75">{p.resumen}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={p.ruta}
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-arcilla px-7 font-semibold text-white transition-colors hover:bg-arcilla-hondo"
                >
                  Abrir el demo
                  <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={p.codigo}
                  {...EXTERNO}
                  className="inline-flex min-h-11 items-center font-semibold underline decoration-tinta/30 underline-offset-4 transition-colors hover:decoration-arcilla"
                >
                  Ver el código en GitHub
                </a>
              </div>
            </div>

            <dl
              data-entrada
              style={{ "--retraso": "160ms" } as React.CSSProperties}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-tinta/15 bg-tinta/15"
            >
              {p.alcance.map((a) => (
                <div key={a.etiqueta} className="bg-papel p-5">
                  <dt className="text-xs font-medium text-tinta/70">{a.etiqueta}</dt>
                  <dd className="mt-1 font-serif text-xl leading-tight">{a.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14" data-entrada style={{ "--retraso": "240ms" } as React.CSSProperties}>
            <Capturas p={p} prioridad />
          </div>
        </section>

        {/* ============ Reto y solución ============ */}
        <section className="border-t border-tinta/10 bg-papel-hondo/50">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.5fr] md:py-24">
            <div data-revelar>
              <h2 className="font-serif text-3xl tracking-tight">El reto</h2>
              <p className="mt-4 text-lg leading-relaxed text-tinta/80">{p.reto}</p>
            </div>
            <div data-revelar>
              <h2 className="font-serif text-3xl tracking-tight">Lo que construimos</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-tinta/80">
                {p.solucion.map((parrafo) => (
                  <p key={parrafo}>{parrafo}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ Recorrido por pantallas ============ */}
        <section className="border-t border-tinta/10">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl" data-revelar>
              Recorrido por el sitio
            </h2>

            <div className="mt-14 space-y-20 md:space-y-28">
              {p.pantallas.map((s, i) => (
                <article
                  key={s.src}
                  className={`grid items-center gap-8 md:gap-14 ${
                    s.movil ? "md:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.6fr_1fr]"
                  }`}
                >
                  <div
                    data-revelar
                    className={`${i % 2 === 1 ? "lg:order-2" : ""} ${s.movil ? "flex justify-center" : ""}`}
                  >
                    {s.movil ? (
                      <MarcoCelular src={s.src} alt={s.alt} sizes="280px" className="w-full max-w-[280px]" />
                    ) : (
                      <MarcoNavegador src={s.src} alt={s.alt} ruta={p.ruta} sizes="(min-width: 1152px) 690px, (min-width: 1024px) 60vw, 92vw" />
                    )}
                  </div>
                  <div data-revelar>
                    <h3 className="font-serif text-2xl tracking-tight">{s.titulo}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-tinta/75">{s.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Métricas ============ */}
        <section className="sobre-oscuro bg-selva text-papel">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-5 py-20 md:py-24 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div data-revelar>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Medido, no prometido</h2>
              <p className="mt-4 max-w-md leading-relaxed text-papel/80">
                Resultados de Lighthouse, la herramienta de Google, en modo celular ({fechaMedicion}). Haz tu propia
                medición: debería darte números muy parecidos.
              </p>
              <a
                href={medirEnPageSpeed(urlDemo)}
                {...EXTERNO}
                className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-mango"
              >
                Medirlo en PageSpeed Insights
                <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4" data-revelar>
              {(Object.keys(ETIQUETAS) as (keyof Metrica)[]).map((k) => (
                <Puntaje key={k} valor={metricas[k]} etiqueta={ETIQUETAS[k]} tam={96} oscuro />
              ))}
            </div>
          </div>
        </section>

        {/* ============ Detalles técnicos ============ */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr] md:items-end" data-revelar>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Lo que no se ve, pero cuenta</h2>
              <p className="leading-relaxed text-tinta/75">
                Detalles técnicos que hacen que el sitio sea seguro, rápido y fácil de mantener. Todos se pueden revisar
                en el código.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {p.tecnico.map((t) => (
                <li key={t.titulo} className="border-t border-tinta/20 pt-5" data-revelar>
                  <h3 className="font-semibold">{t.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-tinta/75">{t.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ ¿Quieres algo así? ============ */}
        <section className="border-t border-tinta/10">
          <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div data-revelar>
              <h2 className="font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
                ¿Quieres algo así para tu negocio?
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-tinta/75">
                Cuéntanos qué vendes y cómo atiendes hoy. Te enviamos una propuesta por escrito, con precio y plazo,
                antes de que pagues nada.
              </p>
              <a
                href={wa(`Hola NEXA, vi el caso ${p.nombre} y quiero algo parecido para mi negocio.`)}
                {...EXTERNO}
                className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-arcilla px-7 font-semibold text-white transition-colors hover:bg-arcilla-hondo"
              >
                <IconoWhatsApp tam={20} />
                Conversemos por WhatsApp
              </a>
            </div>

            {plan && (
              <div className="rounded-2xl bg-tinta p-8 text-papel sobre-oscuro" data-revelar>
                <p className="text-sm text-papel/70">El plan más parecido a este proyecto</p>
                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-3xl">{plan.nombre}</h3>
                  <p className="font-serif text-3xl">
                    <span className="mr-1 font-sans text-sm text-papel/70">desde</span>S/ {plan.precio}
                  </p>
                </div>
                <ul className="mt-6 space-y-2.5 text-[15px]">
                  {plan.incluye.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="text-mango" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#precios" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-mango underline underline-offset-4">
                  Comparar todos los planes
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ============ Siguiente proyecto ============ */}
        {siguiente.slug !== p.slug && (
          <section className="border-t border-tinta/10 bg-papel-hondo/50">
            <Link
              href={`/proyectos/${siguiente.slug}`}
              className="group mx-auto grid grid-cols-1 max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-sm font-semibold text-tinta/70">Siguiente proyecto</p>
                <p className="mt-2 font-serif text-4xl tracking-tight transition-colors group-hover:text-arcilla sm:text-5xl">
                  {siguiente.nombre}
                </p>
                <p className="mt-2 text-tinta/70">{siguiente.rubro}</p>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-full border border-tinta/25 transition-colors group-hover:border-arcilla group-hover:bg-arcilla group-hover:text-white">
                <Flecha />
              </span>
            </Link>
          </section>
        )}
      </main>

      <Footer enInicio={false} />
      <WhatsAppFlotante />
    </>
  );
}
