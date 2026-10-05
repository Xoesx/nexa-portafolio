import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonCompartir } from "../../components/BotonCompartir";
import { BotonFavorito } from "../../components/BotonFavorito";
import { Calculadora } from "../../components/Calculadora";
import { ContactoAsesor } from "../../components/ContactoAsesor";
import { Galeria } from "../../components/Galeria";
import { IconoArea, IconoAuto, IconoBano, IconoCama, IconoUbicacion } from "../../components/Iconos";
import { Mapa } from "../../components/Mapa";
import { TarjetaPropiedad } from "../../components/TarjetaPropiedad";
import { ACTIVAS, areaTexto, buscarAsesor, buscarPropiedad, ESTADOS, precioTexto, TIPOS } from "../../data";
import { aPunto } from "../../lib/puntos";

export const dynamicParams = false;

export function generateStaticParams() {
  return ACTIVAS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/demos/inmobiliaria/propiedades/[id]">): Promise<Metadata> {
  const p = buscarPropiedad((await params).id);
  if (!p) return {};
  return {
    title: `${p.titulo} en ${p.distrito}`,
    description: `${p.resumen} ${precioTexto(p)}. ${areaTexto(p.area)}${p.dormitorios ? `, ${p.dormitorios} dormitorios` : ""}. Código ${p.codigo}.`,
  };
}

const titulo = { fontFamily: "var(--font-rz-titulo)" };

export default async function FichaPropiedad({ params }: PageProps<"/demos/inmobiliaria/propiedades/[id]">) {
  const p = buscarPropiedad((await params).id);
  if (!p || p.estado === "vendido") notFound();

  const asesor = buscarAsesor(p.asesor);
  const estado = ESTADOS[p.estado];
  // Similares: primero del mismo tipo, luego de la misma operación.
  const similares = [
    ...ACTIVAS.filter((x) => x.id !== p.id && x.tipo === p.tipo),
    ...ACTIVAS.filter((x) => x.id !== p.id && x.tipo !== p.tipo && x.operacion === p.operacion),
  ].slice(0, 3);

  const datos = [
    { icono: IconoArea, valor: areaTexto(p.area), etiqueta: p.tipo === "terreno" ? "Área del terreno" : "Área total" },
    ...(p.areaConstruida ? [{ icono: IconoArea, valor: areaTexto(p.areaConstruida), etiqueta: "Área construida" }] : []),
    ...(p.dormitorios ? [{ icono: IconoCama, valor: String(p.dormitorios), etiqueta: "Dormitorios" }] : []),
    ...(p.banos ? [{ icono: IconoBano, valor: String(p.banos), etiqueta: "Baños" }] : []),
    ...(p.cocheras ? [{ icono: IconoAuto, valor: String(p.cocheras), etiqueta: "Cocheras" }] : []),
  ].slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
      <nav aria-label="Ruta de navegación" className="text-sm text-[#57534e]">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/demos/inmobiliaria" className="inline-flex min-h-11 items-center hover:text-[#1c1917]">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/demos/inmobiliaria/propiedades?tipo=${p.tipo}`} className="inline-flex min-h-11 items-center hover:text-[#1c1917]">
              {TIPOS[p.tipo].plural}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-semibold text-[#1c1917]">
            Cód. {p.codigo}
          </li>
        </ol>
      </nav>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide ${estado.clase}`}>{estado.etiqueta}</span>
            <span className="text-sm font-semibold text-[#933f1d]">
              {TIPOS[p.tipo].singular} en {p.operacion}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl" style={titulo}>
            {p.titulo}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-[#57534e]">
            <IconoUbicacion /> {p.direccion}, {p.distrito}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <p className="text-3xl font-semibold tracking-tight" style={titulo}>
            {precioTexto(p)}
          </p>
          <div className="flex gap-2">
            <BotonCompartir titulo={p.titulo} />
            <BotonFavorito id={p.id} titulo={p.titulo} conTexto />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <Galeria fotos={p.fotos} titulo={p.titulo} />

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e7e1d8] bg-[#e7e1d8] sm:grid-cols-4">
            {datos.map(({ icono: Icono, valor, etiqueta }) => (
              <div key={etiqueta} className="bg-white p-4">
                <dt className="flex items-center gap-2 text-sm text-[#57534e]">
                  <Icono /> {etiqueta}
                </dt>
                <dd className="mt-1 text-xl font-semibold" style={titulo}>
                  {valor}
                </dd>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight" style={titulo}>
              Descripción
            </h2>
            <div className="mt-4 max-w-2xl space-y-4 text-[16px] leading-relaxed text-[#44403c]">
              {p.descripcion.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight" style={titulo}>
              Características
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {p.caracteristicas.map((c) => (
                <li key={c} className="flex items-center gap-3 rounded-xl border border-[#e7e1d8] bg-white px-4 py-3 text-[15px]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#b4532a]" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight" style={titulo}>
              Ubicación
            </h2>
            <p className="mt-2 text-[#57534e]">
              {p.direccion}, {p.distrito}. La ubicación exacta se comparte al agendar la visita.
            </p>
            <Mapa puntos={[aPunto(p)]} alto={340} zoomMax={15} className="mt-4" />
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <ContactoAsesor titulo={p.titulo} codigo={p.codigo} asesor={asesor} />
          {p.operacion === "venta" && <Calculadora precio={p.precio} moneda={p.moneda} />}
        </aside>
      </div>

      {similares.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={titulo}>
            También te puede interesar
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {similares.map((s) => (
              <TarjetaPropiedad key={s.id} p={s} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
