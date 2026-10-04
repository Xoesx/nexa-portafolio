import Image from "next/image";
import Link from "next/link";
import { DOCTORES, FOTOS, PREGUNTAS, TESTIMONIOS, TRATAMIENTOS } from "./data";

const VENTAJAS = [
  { titulo: "Radiografía digital", texto: "Hasta 90% menos radiación y resultados en segundos, en la misma consulta." },
  { titulo: "Sin dolor, sin apuro", texto: "Anestesia computarizada y citas largas: nunca te atendemos a la carrera." },
  { titulo: "Paga en cuotas", texto: "Ortodoncia e implantes en cuotas sin intereses, con tarjeta o Yape." },
];

export default function DentalInicio() {
  return (
    <main>
      {/* ============ Hero ============ */}
      <section className="bg-[#f0fdfa]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#0f766e]">
              <span className="h-2 w-2 rounded-full bg-[#14b8a6]" aria-hidden="true" />
              Citas disponibles esta semana
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Una sonrisa sana, sin miedo al dentista.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#3f5f5b]">
              Tratamientos para toda la familia en Pucallpa, con especialistas que te explican todo antes de empezar.
              Agenda en línea y elige tu horario.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/demos/dental/agendar"
                className="inline-flex min-h-12 items-center rounded-full bg-[#0f766e] px-7 font-bold text-white transition-colors hover:bg-[#115e59]"
              >
                Agendar mi cita
              </Link>
              <Link href="#tratamientos" className="inline-flex min-h-12 items-center font-bold text-[#0f766e] underline underline-offset-4">
                Ver tratamientos y precios
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                ["12", "años atendiendo"],
                ["4.9", "valoración de pacientes"],
                ["3", "especialistas"],
              ].map(([n, t]) => (
                <div key={t}>
                  <dt className="sr-only">{t}</dt>
                  <dd>
                    <span className="block text-3xl font-extrabold tracking-tight">{n}</span>
                    <span className="block text-sm leading-snug text-[#3f5f5b]">{t}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={FOTOS.hero} alt="Consultorio luminoso de la clínica con sillón dental" fill priority sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-white p-4 shadow-xl sm:left-auto sm:right-[-1rem] sm:w-64">
              <p className="text-sm font-bold">Próximo horario libre</p>
              <p className="mt-1 text-[15px] text-[#3f5f5b]">Mañana · Evaluación y limpieza</p>
              <Link href="/demos/dental/agendar" className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-[#0f766e]">
                Reservar ahora →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Tratamientos ============ */}
      <section id="tratamientos" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tratamientos y precios</h2>
          <p className="mt-3 max-w-xl text-[#3f5f5b]">Precios de referencia. En tu evaluación te damos el presupuesto exacto por escrito.</p>
          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRATAMIENTOS.map((t) => (
              <li key={t.id} className="flex flex-col rounded-2xl border border-[#e2efed] p-6 transition-colors hover:border-[#0f766e]">
                <h3 className="text-lg font-extrabold">{t.nombre}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#3f5f5b]">{t.resumen}</p>
                <p className="mt-5 flex items-baseline justify-between border-t border-[#e2efed] pt-4">
                  <span className="text-sm text-[#3f5f5b]">{t.minutos} min</span>
                  <span className="font-extrabold text-[#0f766e]">desde S/ {t.desde}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Ventajas ============ */}
      <section className="bg-[#0f2a2a] text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={FOTOS.radiografia} alt="Especialista revisando una radiografía dental digital" fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tecnología que se nota en la silla</h2>
            <ul className="mt-8 space-y-6">
              {VENTAJAS.map((v) => (
                <li key={v.titulo} className="border-l-2 border-[#5eead4] pl-5">
                  <h3 className="text-lg font-bold">{v.titulo}</h3>
                  <p className="mt-1 leading-relaxed text-white/75">{v.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ Equipo ============ */}
      <section id="equipo" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Nuestro equipo</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DOCTORES.map((d) => (
              <article key={d.id}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#e2efed]">
                  <Image src={d.foto} alt={`Retrato de ${d.nombre}`} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{d.nombre}</h3>
                <p className="text-sm font-semibold text-[#0f766e]">{d.cargo}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3f5f5b]">{d.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Testimonios ============ */}
      <section className="bg-[#f0fdfa]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Lo que dicen nuestros pacientes</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIOS.map((t) => (
              <figure key={t.nombre} className="rounded-2xl bg-white p-6">
                <p className="text-[#f59e0b]" aria-label="5 de 5 estrellas">★★★★★</p>
                <blockquote className="mt-3 leading-relaxed">“{t.texto}”</blockquote>
                <figcaption className="mt-4 text-sm text-[#3f5f5b]">
                  <span className="font-bold text-[#0f2a2a]">{t.nombre}</span> · {t.tratamiento}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Preguntas ============ */}
      <section id="preguntas" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Preguntas frecuentes</h2>
            <p className="mt-3 text-[#3f5f5b]">¿No encuentras tu duda? Escríbenos y te respondemos el mismo día.</p>
          </div>
          <div className="divide-y divide-[#e2efed] border-y border-[#e2efed]">
            {PREGUNTAS.map((p) => (
              <details key={p.q} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {p.q}
                  <span aria-hidden="true" className="text-2xl font-normal text-[#0f766e] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 leading-relaxed text-[#3f5f5b]">{p.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-[#0f766e] px-8 py-12 text-white md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">¿Hace cuánto no vas al dentista?</h2>
            <p className="mt-2 text-white">Tu evaluación con limpieza cuesta S/ 80 y dura 45 minutos.</p>
          </div>
          <Link href="/demos/dental/agendar" className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-white px-7 font-bold text-[#0f766e] hover:bg-[#ccfbef]">
            Agendar ahora
          </Link>
        </div>
      </section>
    </main>
  );
}
