import Image from "next/image";
import Link from "next/link";
import { Niveles } from "./components/Niveles";
import { ANIO_ESCOLAR, FECHAS_ADMISION, FOTOS, fechaLegible, PILARES, PREGUNTAS } from "./data";

const titulo = { fontFamily: "var(--font-hz-titulo)" };

export default function ColegioInicio() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className="relative isolate overflow-hidden bg-[#3d1016]">
        <Image src={FOTOS.hero} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-35" />
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 text-[#fbf8f3] md:pb-28 md:pt-24">
          <p className="inline-block rounded-full border border-[#e9cf7a]/60 px-3 py-1 text-sm font-bold text-[#e9cf7a]">
            Admisión {ANIO_ESCOLAR} abierta · vacantes limitadas
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl" style={titulo}>
            Formamos personas que piensan por sí mismas y cuidan de los demás.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#fbf8f3]/85">
            Inicial, primaria y secundaria en Yarinacocha, con inglés diario, ciencia con proyectos y un tutor que
            conoce a cada alumno por su nombre.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/demos/colegio/admision#preinscripcion"
              className="inline-flex min-h-12 items-center rounded-lg bg-[#c9a227] px-7 font-bold text-[#26201c] transition-colors hover:bg-[#e0bb3d]"
            >
              Preinscribir a mi hijo
            </Link>
            <Link
              href="#niveles"
              className="inline-flex min-h-12 items-center rounded-lg border border-[#fbf8f3]/50 px-7 font-bold transition-colors hover:bg-[#fbf8f3]/10"
            >
              Conocer los niveles
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Cifras ============ */}
      <section className="border-b border-[#ebe3d6] bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
          {[
            ["25", "años educando en Ucayali"],
            ["22", "alumnos como máximo por aula"],
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

      {/* ============ Niveles ============ */}
      <section id="niveles" className="scroll-mt-20">
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

      {/* ============ Propuesta ============ */}
      <section id="propuesta" className="scroll-mt-20 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
              Nuestra propuesta educativa
            </h2>
            <p className="mt-4 leading-relaxed text-[#5a4f47]">
              Creemos que un buen colegio no se mide solo por las notas: se mide por cómo salen sus alumnos a enfrentar
              el mundo.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={FOTOS.biblioteca} alt="Estudiante en la biblioteca del colegio" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-[#ebe3d6] bg-[#fbf8f3] p-6">
                <span className="text-sm font-bold text-[#7a1f2b]">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold" style={titulo}>
                  {p.titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-[#5a4f47]">{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Calendario de admisión ============ */}
      <section id="fechas" className="scroll-mt-20">
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
              <li key={f.fecha} className="rounded-2xl border border-[#ebe3d6] bg-white p-5">
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
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold sm:text-4xl" style={titulo}>
            Preguntas de las familias
          </h2>
          <div className="divide-y divide-[#ebe3d6] border-y border-[#ebe3d6]">
            {PREGUNTAS.map((p) => (
              <details key={p.q} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {p.q}
                  <span aria-hidden="true" className="text-2xl font-normal text-[#7a1f2b] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 leading-relaxed text-[#5a4f47]">{p.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
