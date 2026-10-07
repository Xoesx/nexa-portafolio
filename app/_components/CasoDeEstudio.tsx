import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatoPrecio, planes, proyectos } from "../_data/contenido";
import { alternas, ANCLA, LOCALE, RUTA, type Idioma } from "../_data/idioma";
import { FECHA_MEDICION, METRICAS, medirEnPageSpeed, type Metrica } from "../_data/metricas";
import { EXTERNO, SITIO, wa } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { Boton } from "./Boton";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Check, Flecha, FlechaDiagonal, IconoWhatsApp } from "./Iconos";
import { MarcoCelular, MarcoNavegador } from "./Marcos";
import { Capturas } from "./Proyectos";
import { Puntaje } from "./Puntaje";
import { WhatsAppFlotante } from "./WhatsAppFlotante";

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

/** Metadata de un caso de estudio, con su versión en el otro idioma. */
export function metadataCaso(slug: string, idioma: Idioma): Metadata {
  const p = proyectos(idioma).find((x) => x.slug === slug);
  if (!p) return {};
  const titulo = TEXTOS[idioma].caso.tituloMeta(p.nombre);
  const ruta = RUTA.caso(slug)[idioma];
  // Imagen para compartir propia de cada caso (public/og), con la captura del demo.
  const imagen = { url: `/og/${slug}-${idioma}.png`, width: 1200, height: 630, alt: `${p.nombre} · ${p.bajada}` };
  return {
    title: titulo,
    description: p.resumen,
    alternates: alternas(RUTA.caso(slug), idioma),
    openGraph: { title: titulo, description: p.resumen, url: ruta, images: [imagen] },
    twitter: { title: titulo, description: p.resumen, images: [imagen] },
  };
}

/** Caso de estudio de un proyecto. Lo usan /proyectos/[slug] (español) y /en/projects/[slug] (inglés). */
export function CasoDeEstudio({ slug, idioma }: { slug: string; idioma: Idioma }) {
  const t = TEXTOS[idioma].caso;
  const lista = proyectos(idioma);
  const indice = lista.findIndex((x) => x.slug === slug);
  if (indice === -1) notFound();

  const p = lista[indice];
  const siguiente = lista[(indice + 1) % lista.length];
  const plan = planes(idioma).find((x) => x.id === p.plan);
  const precioPlan = plan ? formatoPrecio(plan.precio, idioma) : null;
  const metricas = METRICAS[p.slug];
  const urlDemo = `${SITIO.url}${p.ruta}`;
  const inicio = RUTA.inicio[idioma];
  const tonos = { "--tono-claro": p.tono.claro, "--tono-oscuro": p.tono.oscuro } as React.CSSProperties;
  const fechaMedicion = new Date(`${FECHA_MEDICION}T12:00:00`).toLocaleDateString(LOCALE[idioma], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const otro: Idioma = idioma === "es" ? "en" : "es";

  const migas = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.inicio, item: `${SITIO.url}${inicio === "/" ? "" : inicio}` },
      {
        "@type": "ListItem",
        position: 2,
        name: t.proyectos,
        item: `${SITIO.url}${inicio === "/" ? "/" : inicio}#${ANCLA[idioma].proyectos}`,
      },
      { "@type": "ListItem", position: 3, name: p.nombre, item: `${SITIO.url}${RUTA.caso(p.slug)[idioma]}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(migas).replace(/</g, "\\u003c") }} />
      <Header idioma={idioma} enInicio={false} alterna={RUTA.caso(p.slug)[otro]} />

      <main id="contenido">
        {/* ============ Encabezado ============ */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:pt-36">
          <nav aria-label={t.rutaNavegacion} className="font-mono text-[13px] text-tenue" data-entrada>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={inicio} className="hover:text-tinta">
                  {t.inicio}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`${inicio === "/" ? "/" : inicio}#${ANCLA[idioma].proyectos}`} className="hover:text-tinta">
                  {t.proyectos}
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
                {t.casoDe} · {p.rubro}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.7rem,7vw,5.25rem)] leading-[0.95] tracking-[-0.038em]">{p.nombre}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-tenue text-pretty">{p.resumen}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Boton href={p.ruta} icono={<Flecha />}>
                  {t.abrirDemo}
                </Boton>
                <a
                  href={p.codigo}
                  {...EXTERNO}
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-tinta/25 underline-offset-[6px] transition-colors hover:decoration-acento"
                >
                  {t.verCodigo}
                  <FlechaDiagonal />
                </a>
              </div>
              {t.notaDemo && <p className="mt-4 font-mono text-xs text-tenue">{t.notaDemo}</p>}
            </div>

            <dl data-entrada style={retraso(160)} className="grid grid-cols-2 gap-x-6">
              {p.alcance.map((a) => (
                <div key={a.etiqueta} className="border-t border-tinta/15 py-4">
                  <dt className="font-mono text-[13px] text-tenue">{a.etiqueta}</dt>
                  <dd className="mt-1.5 font-display text-lg leading-tight tracking-[-0.015em]">{a.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            data-entrada
            style={{ ...retraso(240), ...tonos, "--radio": "2.5rem", "--aire": "0.5rem" } as React.CSSProperties}
            className="bisel mt-16"
          >
            <div className="tarjeta bisel-nucleo px-5 pt-8 sm:px-12 sm:pt-12 lg:px-16 lg:pt-16">
              <Capturas p={p} prioridad idioma={idioma} />
            </div>
          </div>
        </section>

        {/* ============ Reto y solución ============ */}
        <section className="bg-alterno">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-24 md:grid-cols-[1fr_1.5fr] md:py-32">
            <div data-revelar="texto">
              <p className="font-mono text-[13px] text-tenue">{t.reto}</p>
              <p className="mt-4 font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-pretty">{p.reto}</p>
            </div>
            <div data-revelar="texto">
              <h2 className="font-display text-3xl tracking-[-0.028em]">{t.construimos}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-tenue">
                {p.solucion.map((parrafo) => (
                  <p key={parrafo}>{parrafo}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ Recorrido por pantallas ============ */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.25rem)] tracking-[-0.032em]" data-revelar="texto">
              {t.recorrido}
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
                      <MarcoNavegador
                        src={s.src}
                        alt={s.alt}
                        ruta={p.ruta}
                        sizes="(min-width: 1152px) 690px, (min-width: 1024px) 60vw, 92vw"
                      />
                    )}
                  </div>
                  <div data-revelar="texto">
                    <p className="font-mono text-[13px] text-tenue">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-2xl tracking-[-0.025em]">{s.titulo}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-tenue">{s.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Métricas ============ */}
        <section className="mx-auto max-w-6xl px-5">
          <div data-revelar className="bisel" style={{ "--radio": "2.25rem", "--aire": "0.5rem" } as React.CSSProperties}>
            <div className="invertido bisel-nucleo grid grid-cols-1 gap-12 px-7 py-14 sm:px-12 md:py-16 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl tracking-[-0.028em] sm:text-4xl">{t.medidoTitulo}</h2>
                <p className="mt-4 max-w-md leading-relaxed text-tenue">{metricas ? t.medidoTexto(fechaMedicion) : t.sinMedicion}</p>
                <a
                  href={medirEnPageSpeed(urlDemo)}
                  {...EXTERNO}
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-acento"
                >
                  {t.medir}
                  <FlechaDiagonal />
                </a>
              </div>
              {metricas ? (
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                  {(Object.keys(TEXTOS[idioma].metricas) as (keyof Metrica)[]).map((k) => (
                    <Puntaje key={k} valor={metricas[k]} etiqueta={TEXTOS[idioma].metricas[k]} tam={96} oscuro idioma={idioma} />
                  ))}
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {Object.values(TEXTOS[idioma].metricas).map((e) => (
                    <li key={e} className="rounded-2xl border border-linea p-4 text-center text-sm font-semibold">
                      {e}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* ============ Detalles técnicos ============ */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-24 md:py-36">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr] md:items-end" data-revelar="texto">
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.02] tracking-[-0.032em]">{t.tecnicoTitulo}</h2>
              <p className="leading-relaxed text-tenue">{t.tecnicoTexto}</p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {p.tecnico.map((d, i) => (
                <li key={d.titulo} className="border-t border-tinta/15 pt-5" data-revelar style={{ "--i": i % 3 } as React.CSSProperties}>
                  <h3 className="font-semibold">{d.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-tenue">{d.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ ¿Quieres algo así? ============ */}
        <section className="border-t border-linea">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-24 md:py-32 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div data-revelar="texto">
              <h2 className="font-display text-[clamp(2.3rem,5.2vw,3.75rem)] leading-[1] tracking-[-0.034em] text-balance">{t.quieres}</h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-tenue">{t.quieresTexto}</p>
              <Boton href={wa(t.mensaje(p.nombre))} externo icono={<IconoWhatsApp tam={18} />} className="mt-9">
                {t.conversemos}
              </Boton>
            </div>

            {plan && (
              <div className="bisel" data-revelar style={{ "--radio": "2rem" } as React.CSSProperties}>
                <div className="invertido bisel-nucleo p-8 sm:p-9">
                  <p className="font-mono text-xs text-tenue">{t.planParecido}</p>
                  <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-3xl">{plan.nombre}</h3>
                    <p className="font-display text-3xl">
                      <span className="mr-1 font-sans text-sm font-normal text-tenue">{TEXTOS[idioma].precios.desde}</span>
                      {precioPlan?.principal}
                      {precioPlan?.secundario && (
                        <span className="ml-2 font-mono text-sm font-normal text-tenue">· {precioPlan.secundario}</span>
                      )}
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
                  <Link
                    href={`${inicio === "/" ? "/" : inicio}#${ANCLA[idioma].precios}`}
                    className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-acento underline underline-offset-4"
                  >
                    {t.compararPlanes}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============ Siguiente proyecto ============ */}
        {siguiente.slug !== p.slug && (
          <section className="border-t border-linea bg-alterno pb-12">
            <Link
              href={RUTA.caso(siguiente.slug)[idioma]}
              className="group mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-14 pt-14 md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="font-mono text-[13px] text-tenue">{t.siguiente}</p>
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

      <Footer idioma={idioma} enInicio={false} contacto={false} />
      <WhatsAppFlotante idioma={idioma} />
    </>
  );
}
