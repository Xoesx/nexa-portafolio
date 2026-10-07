import Image from "next/image";
import Link from "next/link";
import { FormularioTasacion } from "./components/FormularioTasacion";
import { Mapa } from "./components/Mapa";
import { TarjetaPropiedad } from "./components/TarjetaPropiedad";
import { ACTIVAS, ASESORES, DISTRITOS, TIPOS, VENDIDAS, type Tipo } from "./data";
import { aPunto } from "./lib/puntos";

const titulo = { fontFamily: "var(--font-rz-titulo)" };
const BASE = "/demos/inmobiliaria";
const campo =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-[#e7e1d8] bg-white px-3 text-[15px] text-[#1c1917] outline-none focus:border-[#b4532a] focus:ring-2 focus:ring-[#b4532a]/20";

const FOTOS_TIPO: Record<Tipo, string> = {
  terreno: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=75",
  casa: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=75",
  departamento: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=75",
  local: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=75",
};

const RAZONES = [
  { titulo: "Papeles revisados", texto: "Antes de publicar pedimos la partida en SUNARP y revisamos que no haya hipotecas ni embargos." },
  { titulo: "Asesoría legal incluida", texto: "Te acompañamos en la minuta, la notaría y la inscripción. Ese trabajo ya está dentro de nuestra comisión." },
  { titulo: "Ayuda con el crédito", texto: "Cada ficha trae un simulador de cuota, y si lo necesitas te presentamos con el banco que mejor te trate." },
];

export default function InmobiliariaInicio() {
  const destacadas = ACTIVAS.filter((p) => p.destacada);
  const conteo = (t: Tipo) => ACTIVAS.filter((p) => p.tipo === t).length;

  return (
    <main>
      {/* ============ Hero con buscador ============ */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c1917]/90 via-[#1c1917]/60 to-[#1c1917]/10" />

        <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="text-[15px] font-semibold text-[#f3c7a8]">Inmobiliaria en Pucallpa, Yarinacocha y Manantay</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl" style={titulo}>
            Encuentra el lugar donde quieres echar raíces.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Revisamos cada título en SUNARP antes de publicar y te acompañamos hasta la notaría. Busca por distrito y precio, o mira
            todo en el mapa.
          </p>

          <form action={`${BASE}/propiedades`} method="get" className="mt-10 max-w-5xl rounded-2xl bg-[#faf8f5] p-4 shadow-2xl sm:p-5">
            <fieldset className="flex flex-wrap gap-2">
              <legend className="sr-only">Operación</legend>
              {[
                ["venta", "Comprar"],
                ["alquiler", "Alquilar"],
              ].map(([v, t], i) => (
                <label
                  key={v}
                  className="cursor-pointer rounded-full border border-[#e7e1d8] bg-white px-5 py-2 text-[15px] font-semibold text-[#57534e] has-[:checked]:border-[#1c1917] has-[:checked]:bg-[#1c1917] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#b4532a]"
                >
                  <input type="radio" name="op" value={v} defaultChecked={i === 0} className="sr-only" />
                  {t}
                </label>
              ))}
            </fieldset>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_auto] lg:items-end">
              <label className="text-sm font-semibold text-[#44403c]">
                Tipo de inmueble
                <select name="tipo" defaultValue="" className={campo}>
                  <option value="">Todos</option>
                  {(Object.keys(TIPOS) as Tipo[]).map((t) => (
                    <option key={t} value={t}>
                      {TIPOS[t].plural}
                    </option>
                  ))}
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
              <div>
                <span id="rz-precio-hero" className="text-sm font-semibold text-[#44403c]">
                  Precio máximo
                </span>
                <div className="flex gap-2" role="group" aria-labelledby="rz-precio-hero">
                  <select name="moneda" defaultValue="USD" aria-label="Moneda" className={`${campo.replace("w-full", "w-24")} shrink-0`}>
                    <option value="USD">US$</option>
                    <option value="PEN">S/</option>
                  </select>
                  <input name="max" type="number" min={0} step={5000} inputMode="numeric" placeholder="Sin límite" aria-label="Monto máximo" className={campo} />
                </div>
              </div>
              <button
                type="submit"
                className="min-h-12 rounded-xl bg-[#b4532a] px-8 font-semibold text-white transition-colors hover:bg-[#933f1d] sm:col-span-2 lg:col-span-1"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ============ Categorías ============ */}
      <section className="mx-auto max-w-7xl px-5 pt-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={titulo}>
          ¿Qué estás buscando?
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(Object.keys(TIPOS) as Tipo[]).map((t) => (
            <li key={t}>
              <Link href={`${BASE}/propiedades?tipo=${t}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={FOTOS_TIPO[t]} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/85 via-[#1c1917]/20 to-transparent" />
                <span className="absolute inset-x-4 bottom-4 text-white">
                  <span className="block text-lg font-semibold leading-tight sm:text-xl" style={titulo}>
                    {TIPOS[t].plural}
                  </span>
                  <span className="text-sm text-white/85">{conteo(t)} disponibles →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ Destacadas ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
              Destacadas de la semana
            </h2>
            <p className="mt-2 text-[#57534e]">Elegidas por nuestros asesores por ubicación y precio.</p>
          </div>
          <Link
            href={`${BASE}/propiedades`}
            className="inline-flex min-h-11 items-center font-semibold text-[#933f1d] underline decoration-[#b4532a]/40 underline-offset-4 hover:decoration-[#b4532a]"
          >
            Ver las {ACTIVAS.length} propiedades →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destacadas.slice(0, 6).map((p) => (
            <TarjetaPropiedad key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* ============ Mapa ============ */}
      <section className="border-y border-[#e7e1d8] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
              Explora en el mapa
            </h2>
            <p className="mt-3 leading-relaxed text-[#57534e]">
              Mira dónde está cada propiedad: cerca de la laguna, en la zona comercial o sobre la Federico Basadre. Toca un precio
              para ver la ficha.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {DISTRITOS.map((d) => (
                <div key={d} className="border-l-2 border-[#e7e1d8] pl-3">
                  <dt className="text-sm text-[#57534e]">{d}</dt>
                  <dd className="text-2xl font-semibold" style={titulo}>
                    {ACTIVAS.filter((p) => p.distrito === d).length}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href={`${BASE}/propiedades?vista=mapa`}
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#1c1917] px-6 font-semibold text-white transition-colors hover:bg-[#b4532a]"
            >
              Buscar en el mapa
            </Link>
          </div>
          <Mapa puntos={ACTIVAS.map(aPunto)} alto={480} />
        </div>
      </section>

      {/* ============ Cómo trabajamos ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
          Cómo trabajamos
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          {RAZONES.map((r) => (
            <div key={r.titulo} className="border-t-2 border-[#1c1917] pt-5">
              <h3 className="text-xl font-semibold tracking-tight" style={titulo}>
                {r.titulo}
              </h3>
              <p className="mt-2 leading-relaxed text-[#57534e]">{r.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Vendidas recientemente ============ */}
      <section className="bg-[#f3efe9]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
            Vendidas recientemente
          </h2>
          <p className="mt-2 text-[#57534e]">Lo último que vendimos y cuánto tardó cada una desde que la publicamos.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VENDIDAS.map((p) => (
              <div key={p.id}>
                <TarjetaPropiedad p={p} />
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#166534]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {p.resumen}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Asesores ============ */}
      <section id="asesores" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
            Nuestros asesores
          </h2>
          <p className="mt-2 max-w-xl text-[#57534e]">Cada uno trabaja un tipo de propiedad. Desde la primera visita hasta la firma te atiende la misma persona.</p>
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ASESORES.map((a) => (
              <li key={a.id}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#efe9e1]">
                  <Image src={a.foto} alt={`Retrato de ${a.nombre}`} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="object-cover object-[center_30%]" />
                </div>
                <div className="pt-4">
                  <p className="text-lg font-semibold" style={titulo}>
                    {a.nombre}
                  </p>
                  <p className="text-sm font-semibold text-[#933f1d]">{a.especialidad}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#57534e]">{a.experiencia}</p>
                  <p className="mt-3 text-sm text-[#44403c]">{a.correo}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ Vender con nosotros ============ */}
      <section id="vender" className="scroll-mt-28 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
              ¿Quieres vender o alquilar tu propiedad?
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#57534e]">
              Te damos una tasación gratuita en 48 horas y tomamos las fotos nosotros. Solo cobramos comisión si se vende o se
              alquila.
            </p>
            <ol className="mt-8 space-y-4">
              {["Nos cuentas de tu propiedad", "Visitamos y tasamos en 48 horas", "Publicamos y filtramos interesados", "Te acompañamos hasta la firma"].map(
                (paso, i) => (
                  <li key={paso} className="flex items-center gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#b4532a] font-semibold text-white">{i + 1}</span>
                    <span className="text-[16px] font-semibold">{paso}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
          <FormularioTasacion />
        </div>
      </section>
    </main>
  );
}
