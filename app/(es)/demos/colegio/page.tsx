import Image from "next/image";
import Link from "next/link";
import { Niveles } from "./components/Niveles";
import { ANIO_ESCOLAR, DIA, FECHAS_ADMISION, FOTOS, fechaLegible, MENSAJE_DIRECTORA, NOTICIAS, PILARES, PREGUNTAS, TESTIMONIOS, VIDA_ESCOLAR } from "./data";

const titulo = { fontFamily: "var(--font-hz-titulo)" };
const ADMISION = "/demos/colegio/admision#preinscripcion";

export default function ColegioInicio() {
  const proxima = FECHAS_ADMISION[0];

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-12 md:pt-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#7a1f2b]/10 px-3 py-1.5 text-sm font-bold text-[#7a1f2b]">
              Admisión {ANIO_ESCOLAR} abierta · vacantes limitadas
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] sm:text-[3.4rem]" style={titulo}>
              Un colegio donde cada niño es conocido por su nombre.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5a4f47]">
              Inicial, primaria y secundaria en Yarinacocha. Aulas pequeñas, inglés todos los días y profesores que te llaman cuando tu
              hijo logra algo, no solo cuando hay un problema.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={ADMISION} className="inline-flex min-h-12 items-center rounded-lg bg-[#7a1f2b] px-7 font-bold text-white transition-colors hover:bg-[#5e1520]">
                Preinscribir a mi hijo
              </Link>
              <Link href="#dia" className="inline-flex min-h-12 items-center rounded-lg border border-[#d9cfc0] bg-white px-7 font-bold transition-colors hover:border-[#7a1f2b]">
                Ver un día en Horizonte
              </Link>
            </div>
            <div className="mt-10 rounded-2xl border border-[#ebe3d6] bg-white p-5">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#7a1f2b]">Próximo evento</p>
              <p className="mt-1 text-lg font-bold">
                {proxima.titulo} · <time dateTime={proxima.fecha}>{fechaLegible(proxima.fecha, { weekday: "long", day: "numeric", month: "long" })}</time>
              </p>
              <p className="mt-1 text-[15px] text-[#5a4f47]">{proxima.detalle}</p>
            </div>
          </div>

          {/* Collage de fotos */}
          <div className="grid grid-cols-[1.3fr_1fr] grid-rows-2 gap-4" style={{ height: "min(34rem, 110vw)" }}>
            <div className="relative row-span-2 overflow-hidden rounded-[1.75rem]">
              <Image src={FOTOS.hero} alt="Grupo de alumnos sonriendo juntos en el patio" fill priority sizes="(min-width: 1024px) 360px, 55vw" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem]">
              <Image src={FOTOS.heroAula} alt="Profesor explicando en un aula de primaria" fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem]">
              <Image src={FOTOS.heroDibujando} alt="Niños de inicial dibujando en sus mesas" fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover" />
              <p className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#3d1016]/90 px-3 py-2 text-sm font-bold text-[#fbf8f3]">22 alumnos como máximo por aula</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Cifras ============ */}
      <section className="border-y border-[#ebe3d6] bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
          {[
            ["25", "años educando en Ucayali"],
            ["640", "alumnos y sus familias"],
            ["96%", "de egresados ingresa a la universidad"],
            ["5 h", "de inglés a la semana"],
          ].map(([n, t]) => (
            <div key={t}>
              <dt className="sr-only">{t}</dt>
              <dd>
                <span className="block text-4xl font-semibold text-[#7a1f2b]" style={titulo}>
                  {n}
                </span>
                <span className="mt-1 block text-[15px] leading-snug text-[#5a4f47]">{t}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ============ Mensaje de la directora ============ */}
      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#efe7da]">
              <Image src={FOTOS.directora} alt={`Retrato de ${MENSAJE_DIRECTORA.nombre}`} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#7a1f2b]">Mensaje de la directora</p>
            <div className="mt-4 space-y-4 text-xl leading-relaxed sm:text-2xl" style={titulo}>
              {MENSAJE_DIRECTORA.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-bold">
              {MENSAJE_DIRECTORA.nombre} <span className="font-normal text-[#5a4f47]">· {MENSAJE_DIRECTORA.cargo}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ Niveles ============ */}
      <section id="niveles" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
            Un camino completo, de los 3 a los 16 años
          </h2>
          <p className="mt-3 max-w-xl text-[#5a4f47]">Cada nivel con su propio espacio, horario y equipo de profesores.</p>
          <div className="mt-10">
            <Niveles />
          </div>
        </div>
      </section>

      {/* ============ Un día en Horizonte ============ */}
      <section id="dia" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
            Un día en Horizonte
          </h2>
          <p className="mt-3 max-w-xl text-[#5a4f47]">Así viven la jornada nuestros alumnos de primaria.</p>
          <ol className="mt-12 space-y-6">
            {DIA.map((d, i) => (
              <li key={d.hora} className={`grid grid-cols-1 items-center gap-6 md:grid-cols-[110px_1fr_1fr] ${i % 2 ? "md:[&>*:nth-child(2)]:order-3" : ""}`}>
                <p className="text-3xl font-semibold text-[#7a1f2b] md:text-right" style={titulo}>
                  <time>{d.hora}</time>
                </p>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#efe7da]">
                  <Image src={d.foto} alt="" fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold" style={titulo}>
                    {d.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#5a4f47]">{d.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ Propuesta ============ */}
      <section id="propuesta" className="scroll-mt-20 bg-[#3d1016] text-[#fbf8f3]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
              Nuestra propuesta educativa
            </h2>
            <p className="mt-4 leading-relaxed text-[#fbf8f3]/80">
              Creemos que un buen colegio no se mide solo por las notas: se mide por cómo salen sus alumnos a enfrentar el mundo.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={FOTOS.profesora} alt="Profesora resolviendo un ejercicio en la pizarra" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-[#fbf8f3]/15 bg-[#fbf8f3]/[0.04] p-6">
                <span className="text-sm font-bold text-[#e9cf7a]">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold" style={titulo}>
                  {p.titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-[#fbf8f3]/80">{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Familias ============ */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
            Lo que cuentan las familias
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIOS.map((t) => (
              <figure key={t.nombre} className="flex flex-col rounded-2xl border border-[#ebe3d6] bg-white p-7">
                <span className="text-5xl leading-none text-[#c9a227]" aria-hidden="true" style={titulo}>
                  “
                </span>
                <blockquote className="mt-2 flex-1 text-[17px] leading-relaxed">{t.texto}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#efe7da]">
                    <Image src={t.foto} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-bold">{t.nombre}</span>
                    <span className="text-sm text-[#6b5f56]">{t.rol}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Vida escolar ============ */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
            Vida escolar
          </h2>
          <ul className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[13rem] md:grid-cols-4">
            {VIDA_ESCOLAR.map((v, i) => (
              <li key={v.src} className={`relative overflow-hidden rounded-2xl bg-[#efe7da] ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <Image src={v.src} alt={v.alt} fill sizes={i === 0 ? "(min-width: 768px) 560px, 100vw" : "(min-width: 768px) 280px, 50vw"} className="object-cover" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-[#fbf8f3]/95 px-2.5 py-1 text-sm font-bold">{v.pie}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Noticias ============ */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
            Noticias
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {NOTICIAS.map((n) => (
              <article key={n.titulo} className="overflow-hidden rounded-2xl border border-[#ebe3d6] bg-white">
                <div className="relative aspect-[16/10] bg-[#efe7da]">
                  <Image src={n.foto} alt="" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <time dateTime={n.fecha} className="text-sm font-bold uppercase tracking-wide text-[#7a1f2b]">
                    {fechaLegible(n.fecha, { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <h3 className="mt-2 text-xl font-semibold leading-snug" style={titulo}>
                    {n.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#5a4f47]">{n.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Calendario de admisión ============ */}
      <section id="fechas" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
              Calendario de admisión {ANIO_ESCOLAR}
            </h2>
            <Link href="/demos/colegio/admision" className="inline-flex min-h-11 items-center font-bold text-[#7a1f2b] underline underline-offset-4">
              Requisitos y costos →
            </Link>
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-5">
            {FECHAS_ADMISION.map((f) => (
              <li key={f.fecha} className="rounded-2xl border border-[#ebe3d6] bg-[#fbf8f3] p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-[#7a1f2b]">
                  <time dateTime={f.fecha}>{fechaLegible(f.fecha, { day: "numeric", month: "short" }).replace(".", "")}</time>
                </p>
                <h3 className="mt-2 font-bold leading-snug">{f.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#5a4f47]">{f.detalle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ Preguntas ============ */}
      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
            Preguntas de las familias
          </h2>
          <div className="divide-y divide-[#ebe3d6] border-y border-[#ebe3d6]">
            {PREGUNTAS.map((p) => (
              <details key={p.q} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {p.q}
                  <span aria-hidden="true" className="text-2xl font-normal text-[#7a1f2b] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-[#5a4f47]">{p.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-5 pb-20">
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-[#7a1f2b] text-white md:grid-cols-[1.3fr_1fr]">
          <div className="px-8 py-12">
            <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
              Ven a conocernos con tu hijo
            </h2>
            <p className="mt-3 max-w-md text-white/90">
              Recorre las aulas, conversa con los profesores y resuelve tus dudas. La preinscripción toma tres minutos.
            </p>
            <Link href={ADMISION} className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-[#c9a227] px-7 font-bold text-[#26201c] hover:bg-[#e0bb3d]">
              Preinscribir ahora
            </Link>
          </div>
          <div className="relative hidden min-h-64 md:block">
            <Image src={FOTOS.campus} alt="" fill sizes="420px" className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
