import Image from "next/image";
import Link from "next/link";
import { FormularioTasacion } from "./components/FormularioTasacion";
import { TarjetaPropiedad } from "./components/TarjetaPropiedad";
import { DISTRITOS, PROPIEDADES } from "./data";

const titulo = { fontFamily: "var(--font-rz-titulo)" };
const campo =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-[#e7e1d8] bg-white px-3 text-[15px] text-[#1c1917] outline-none focus:border-[#b4532a] focus:ring-2 focus:ring-[#b4532a]/20";

const RAZONES = [
  {
    titulo: "Propiedades verificadas",
    texto: "Revisamos títulos en SUNARP y cargas antes de publicar. Lo que ves está en regla.",
  },
  {
    titulo: "Asesoría legal incluida",
    texto: "Te acompañamos en la minuta, la notaría y la inscripción, sin costos escondidos.",
  },
  {
    titulo: "Te ayudamos con el crédito",
    texto: "Simula tu cuota en cada ficha y te conectamos con el banco que más te conviene.",
  },
];

export default function InmobiliariaInicio() {
  const destacadas = PROPIEDADES.filter((p) => p.destacada);
  const enVenta = PROPIEDADES.filter((p) => p.operacion === "venta").length;
  const enAlquiler = PROPIEDADES.length - enVenta;

  return (
    <main>
      {/* ============ Hero con buscador ============ */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c1917]/85 via-[#1c1917]/60 to-[#1c1917]/20" />

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:pb-24 md:pt-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f3c7a8]">Pucallpa · Yarinacocha · Manantay</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl" style={titulo}>
            Encuentra el lugar donde quieres echar raíces.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Casas y departamentos verificados, con asesoría legal y ayuda para tu crédito desde el primer día.
          </p>

          <form
            action="/demos/inmobiliaria/propiedades"
            method="get"
            className="mt-10 grid max-w-4xl grid-cols-1 gap-3 rounded-2xl bg-[#faf8f5] p-4 shadow-2xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
          >
            <label className="text-sm font-semibold text-[#44403c]">
              Quiero
              <select name="op" defaultValue="venta" className={campo}>
                <option value="venta">Comprar</option>
                <option value="alquiler">Alquilar</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-[#44403c]">
              Tipo
              <select name="tipo" defaultValue="" className={campo}>
                <option value="">Casa o departamento</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-[#44403c]">
              Distrito
              <select name="distrito" defaultValue="" className={campo}>
                <option value="">Todos</option>
                {DISTRITOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="min-h-12 rounded-xl bg-[#b4532a] px-7 font-semibold text-white transition-colors hover:bg-[#933f1d] sm:col-span-2 lg:col-span-1"
            >
              Buscar
            </button>
          </form>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-white">
            <div>
              <dt className="text-sm text-white/75">En venta</dt>
              <dd className="text-2xl font-semibold" style={titulo}>{enVenta} propiedades</dd>
            </div>
            <div>
              <dt className="text-sm text-white/75">En alquiler</dt>
              <dd className="text-2xl font-semibold" style={titulo}>{enAlquiler} propiedades</dd>
            </div>
            <div>
              <dt className="text-sm text-white/75">Distritos</dt>
              <dd className="text-2xl font-semibold" style={titulo}>{DISTRITOS.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ============ Destacadas ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
              Propiedades destacadas
            </h2>
            <p className="mt-2 text-[#57534e]">Elegidas esta semana por nuestros asesores.</p>
          </div>
          <Link
            href="/demos/inmobiliaria/propiedades"
            className="inline-flex min-h-11 items-center font-semibold text-[#933f1d] underline decoration-[#b4532a]/40 underline-offset-4 hover:decoration-[#b4532a]"
          >
            Ver las {PROPIEDADES.length} propiedades →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destacadas.map((p) => (
            <TarjetaPropiedad key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* ============ Por qué Raíces ============ */}
      <section className="border-y border-[#e7e1d8] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 md:grid-cols-3">
          {RAZONES.map((r, i) => (
            <div key={r.titulo}>
              <span className="text-sm font-semibold text-[#933f1d]">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight" style={titulo}>
                {r.titulo}
              </h3>
              <p className="mt-2 leading-relaxed text-[#57534e]">{r.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Vender con nosotros ============ */}
      <section id="vender" className="scroll-mt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
              ¿Quieres vender o alquilar tu propiedad?
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#57534e]">
              Te damos una tasación gratuita en 48 horas, tomamos fotos profesionales y la mostramos a compradores
              verificados. Solo cobramos si se concreta.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
                alt="Sala moderna de una casa en venta"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <FormularioTasacion />
        </div>
      </section>
    </main>
  );
}
