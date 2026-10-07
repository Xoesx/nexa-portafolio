import Image from "next/image";
import Link from "next/link";
import { ProximoTurno } from "./components/ProximoTurno";
import { CALIFICACION, CLINICA, DOCTORES, FOTOS, GALERIA, HISTORIA, PREGUNTAS, PRIMERA_VISITA, PROBLEMAS, RESENAS, TRATAMIENTOS } from "./data";

const AGENDAR = "/demos/dental/agendar";

// Íconos simples para cada problema, dibujados a mano para que se vean iguales en todos lados.
const ICONOS: Record<string, React.ReactNode> = {
  dolor: <path d="M8 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2.2 7.5.5 2.5 1 5 2.6 5 1.6 0 1.5-4 2.7-5.5.3-.4.7-.4 1 0 1.2 1.5 1.1 5.5 2.7 5.5 1.6 0 2.1-2.5 2.6-5 .7-3 2.2-4.5 2.2-7.5C20 5 18.5 3 16 3c-2 0-3 1.2-4 1.2S10 3 8 3ZM18 2l3-1M20 5h3" />,
  roto: <path d="M8 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2.2 7.5.5 2.5 1 5 2.6 5 1.6 0 1.5-4 2.7-5.5.3-.4.7-.4 1 0 1.2 1.5 1.1 5.5 2.7 5.5 1.6 0 2.1-2.5 2.6-5 .7-3 2.2-4.5 2.2-7.5C20 5 18.5 3 16 3c-2 0-3 1.2-4 1.2S10 3 8 3ZM12 4.5l-1.5 3 2.5 1.5-1.5 3" />,
  encia: <path d="M3 9c3 2 6 3 9 3s6-1 9-3M6 10.5v3.5a2 2 0 0 0 4 0v-2.5M14 11.5V14a2 2 0 0 0 4 0v-3.5M12 16v4M10 19l2 2 2-2" />,
  brillo: <path d="M8 4c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2.2 7.5.5 2.5 1 5 2.6 5 1.6 0 1.5-4 2.7-5.5.3-.4.7-.4 1 0 1.2 1.5 1.1 5.5 2.7 5.5 1.6 0 2.1-2.5 2.6-5 .7-3 2.2-4.5 2.2-7.5C20 6 18.5 4 16 4M19 1v4M17 3h4" />,
  alinear: <path d="M3 8h18M3 16h18M6 6v4M10 6v4M14 6v4M18 6v4M6 14v4M10 14v4M14 14v4M18 14v4" />,
  implante: <path d="M8 2c-2 0-3.5 1.5-3.5 3.5S6 9 8 9h8c2 0 3.5-1.5 3.5-3.5S18 2 16 2c-1.5 0-2.5 1-4 1S9.5 2 8 2ZM9 11h6M9.5 14h5M10 17h4M11 20h2" />,
};

function Estrellas({ n, tam = 16 }: { n: number; tam?: number }) {
  return (
    <span role="img" className="inline-flex text-[#f59e0b]" aria-label={`${n} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={tam} height={tam} viewBox="0 0 24 24" fill={i <= n ? "currentColor" : "#e2e8e7"} aria-hidden="true">
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" />
        </svg>
      ))}
    </span>
  );
}

export default function DentalInicio() {
  const doctora = DOCTORES[0];

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden bg-[#f0fdfa]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-12 md:pt-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold text-[#0f766e]">Clínica familiar · Callería, Pucallpa</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-[3.4rem]">
              Una clínica dental donde te explican todo antes de empezar.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#3f5f5b]">
              Te damos el presupuesto por escrito, no te atendemos a la carrera y puedes reservar tu cita a cualquier hora, incluso de
              noche.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={AGENDAR}
                className="inline-flex min-h-12 items-center rounded-full bg-[#0f766e] px-7 font-bold text-white shadow-[0_12px_30px_-12px_rgb(15_118_110/0.7)] transition-colors hover:bg-[#115e59]"
              >
                Agendar mi cita
              </Link>
              <Link href="#problemas" className="inline-flex min-h-12 items-center font-bold text-[#0f766e] underline underline-offset-4">
                ¿Qué te está pasando?
              </Link>
            </div>
            <div className="mt-8 max-w-md">
              <ProximoTurno />
            </div>
            <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#3f5f5b]">
              <Estrellas n={5} tam={14} />
              <span>
                <strong className="font-bold text-[#0f2a2a]">{CALIFICACION.promedio}</strong> en {CALIFICACION.total} opiniones de pacientes
              </span>
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image src={FOTOS.hero} alt="La doctora conversa con una paciente sentada en el sillón dental" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xl sm:left-auto sm:right-6 sm:w-72">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#e2efed]">
                <Image src={doctora.foto} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span>
                <span className="block font-bold">{doctora.nombre}</span>
                <span className="block text-sm text-[#3f5f5b]">12 años cuidando sonrisas en Pucallpa</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ¿Qué te está pasando? ============ */}
      <section id="problemas" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">¿Qué te está pasando?</h2>
            <p className="max-w-md text-[#3f5f5b] md:justify-self-end">
              Elige lo que más se parece a lo que sientes. Te llevamos a la agenda con el tratamiento correcto ya elegido.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 border-t border-[#d5e6e2] md:grid-cols-2 md:gap-x-12">
            {PROBLEMAS.map((p) => (
              <li key={p.titulo} className="border-b border-[#d5e6e2]">
                <Link href={`${AGENDAR}?tratamiento=${p.tratamiento}`} className="group flex items-start gap-4 py-5">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    aria-hidden="true"
                  >
                    {ICONOS[p.icono]}
                  </svg>
                  <span className="flex-1">
                    <span className="block text-lg font-extrabold group-hover:text-[#0f766e]">{p.titulo}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-[#3f5f5b]">{p.texto}</span>
                  </span>
                  <span aria-hidden="true" className="mt-1 text-xl text-[#0f766e] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Historia de la doctora ============ */}
      <section className="bg-[#0f2a2a] text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={doctora.foto} alt={`Retrato de ${doctora.nombre}`} fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
            </div>
            <p className="absolute -bottom-5 -right-2 rounded-2xl bg-[#14b8a6] px-5 py-3 text-sm font-bold text-[#0f2a2a] shadow-xl sm:-right-6">Directora médica</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#5eead4]">Quién te va a atender</p>
            <blockquote className="mt-4 text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl">“{HISTORIA.cita}”</blockquote>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-white/80">
              {HISTORIA.parrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-bold">
              {doctora.nombre} <span className="font-normal text-white/70">· {doctora.cargo}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ Tratamientos ============ */}
      <section id="tratamientos" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Tratamientos y precios</h2>
            <p className="max-w-md text-[#3f5f5b] md:justify-self-end">
              Precios de referencia. En tu evaluación te damos el presupuesto exacto por escrito.
            </p>
          </div>
          <table className="mt-10 w-full border-collapse text-left">
            <caption className="sr-only">Tratamientos, duración y precio desde</caption>
            <thead className="text-sm text-[#3f5f5b]">
              <tr className="border-b-2 border-[#0f2a2a]">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Tratamiento
                </th>
                <th scope="col" className="hidden py-3 pr-4 font-semibold sm:table-cell">
                  Duración
                </th>
                <th scope="col" className="py-3 text-right font-semibold">
                  Desde
                </th>
              </tr>
            </thead>
            <tbody>
              {TRATAMIENTOS.map((t) => (
                <tr key={t.id} className="group border-b border-[#d5e6e2] align-top">
                  <th scope="row" className="py-5 pr-4 font-normal">
                    <Link href={`${AGENDAR}?tratamiento=${t.id}`} className="text-lg font-extrabold group-hover:text-[#0f766e]">
                      {t.nombre}
                    </Link>
                    <span className="mt-1 block max-w-xl text-[15px] leading-relaxed text-[#3f5f5b]">{t.resumen}</span>
                    <span className="mt-1 block text-sm text-[#3f5f5b] sm:hidden">{t.minutos} min</span>
                  </th>
                  <td className="hidden whitespace-nowrap py-5 pr-4 tabular-nums text-[#3f5f5b] sm:table-cell">{t.minutos} min</td>
                  <td className="whitespace-nowrap py-5 text-right text-lg font-extrabold tabular-nums text-[#0f766e]">S/ {t.desde}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-[15px] text-[#3f5f5b]">
            Pagas con <strong className="font-bold text-[#0f2a2a]">Yape, Plin, tarjeta o efectivo</strong>. Ortodoncia e implantes, en cuotas sin intereses.
          </p>
        </div>
      </section>

      {/* ============ Primera visita ============ */}
      <section className="bg-[#f0fdfa]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Así es tu primera visita</h2>
            <p className="mt-3 max-w-md text-[#3f5f5b]">Esto es lo que pasa desde que llegas hasta que sales.</p>
            <ol className="mt-8 space-y-6">
              {PRIMERA_VISITA.map((paso, i) => (
                <li key={paso.titulo} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0f766e] font-extrabold text-white">{i + 1}</span>
                  <span>
                    <span className="block text-lg font-extrabold">{paso.titulo}</span>
                    <span className="mt-1 block leading-relaxed text-[#3f5f5b]">{paso.texto}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={FOTOS.familia} alt="Un papá sonriente con sus dos hijos" fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
            <p className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 text-[15px] font-semibold shadow-lg sm:right-auto sm:max-w-xs">
              Atendemos a toda la familia: la primera visita de los niños es gratis con la de un adulto.
            </p>
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

      {/* ============ Reseñas ============ */}
      <section className="bg-[#f0fdfa]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 lg:grid-cols-[320px_1fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Lo que dicen nuestros pacientes</h2>
            <div className="mt-6 rounded-2xl bg-white p-6">
              <p className="text-5xl font-extrabold tracking-tight">{CALIFICACION.promedio}</p>
              <Estrellas n={5} tam={20} />
              <p className="mt-1 text-sm text-[#3f5f5b]">{CALIFICACION.total} opiniones verificadas</p>
              <dl className="mt-5 space-y-1.5">
                {CALIFICACION.distribucion.map((pct, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <dt className="w-20 shrink-0 whitespace-nowrap text-[#3f5f5b]">{5 - i} {5 - i === 1 ? "estrella" : "estrellas"}</dt>
                    <dd className="flex flex-1 items-center gap-2">
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#e2efed]">
                        <span className="block h-full rounded-full bg-[#f59e0b]" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="w-8 text-right tabular-nums text-[#3f5f5b]">{pct}%</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {RESENAS.map((r) => (
              <figure key={r.nombre} className="flex flex-col rounded-2xl bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-white" style={{ background: r.color }} aria-hidden="true">
                    {r.iniciales}
                  </span>
                  <figcaption className="leading-tight">
                    <span className="block font-bold">{r.nombre}</span>
                    <span className="text-sm text-[#3f5f5b]">
                      {r.tratamiento} · {r.hace}
                    </span>
                  </figcaption>
                </div>
                <Estrellas n={r.estrellas} />
                <blockquote className="mt-3 flex-1 leading-relaxed">“{r.texto}”</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Conoce la clínica ============ */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Conoce la clínica antes de venir</h2>
          <p className="mt-3 max-w-xl text-[#3f5f5b]">Consultorios luminosos, ventilados y esterilizados después de cada paciente.</p>
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {GALERIA.map((g, i) => (
              <li key={g.src} className={`relative overflow-hidden rounded-2xl bg-[#e2efed] ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"}`}>
                <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(min-width: 1024px) 540px, 100vw" : "(min-width: 1024px) 270px, 50vw"} className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Urgencias ============ */}
      <section className="px-5">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl border border-[#f1d5d2] border-l-4 border-l-[#b91c1c] bg-[#fdf6f5] px-6 py-7 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">¿Dolor fuerte o un golpe en la boca?</h2>
            <p className="mt-2 max-w-xl text-[#5b3b37]">
              En horario de atención te damos el primer espacio libre del día. No esperes a que el dolor pase solo.
            </p>
          </div>
          <p className="shrink-0 text-lg font-extrabold text-[#b91c1c]">
            Llama al <span className="whitespace-nowrap">{CLINICA.telefono}</span>
          </p>
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
                  <span aria-hidden="true" className="text-2xl font-normal text-[#0f766e] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-[#3f5f5b]">{p.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-5 pb-20">
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl bg-[#0f766e] text-white md:grid-cols-[1.3fr_1fr]">
          <div className="px-8 py-12">
            <h2 className="text-3xl font-extrabold tracking-tight">¿Hace cuánto no vas al dentista?</h2>
            <p className="mt-2 text-white">Tu evaluación con limpieza cuesta S/ 80 y dura 45 minutos.</p>
            <Link href={AGENDAR} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-white px-7 font-bold text-[#0f766e] hover:bg-[#ccfbef]">
              Agendar ahora
            </Link>
          </div>
          <div className="relative hidden h-full min-h-64 md:block">
            <Image src={FOTOS.sonrisa} alt="" fill sizes="400px" className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
