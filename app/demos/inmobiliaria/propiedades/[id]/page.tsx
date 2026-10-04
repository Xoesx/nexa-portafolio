import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculadora } from "../../components/Calculadora";
import { ContactoAsesor } from "../../components/ContactoAsesor";
import { Galeria } from "../../components/Galeria";
import { IconoArea, IconoAuto, IconoBano, IconoCama, IconoUbicacion } from "../../components/Iconos";
import { TarjetaPropiedad } from "../../components/TarjetaPropiedad";
import { buscarPropiedad, precioTexto, PROPIEDADES } from "../../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROPIEDADES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/demos/inmobiliaria/propiedades/[id]">): Promise<Metadata> {
  const p = buscarPropiedad((await params).id);
  if (!p) return {};
  return {
    title: `${p.titulo} en ${p.distrito}`,
    description: `${p.resumen} ${precioTexto(p)}. ${p.area} m², ${p.dormitorios} dormitorios.`,
  };
}

export default async function FichaPropiedad({ params }: PageProps<"/demos/inmobiliaria/propiedades/[id]">) {
  const p = buscarPropiedad((await params).id);
  if (!p) notFound();

  const similares = PROPIEDADES.filter((x) => x.id !== p.id && x.operacion === p.operacion).slice(0, 3);
  const datos = [
    { icono: IconoArea, valor: `${p.area} m²`, etiqueta: "Área" },
    { icono: IconoCama, valor: p.dormitorios, etiqueta: "Dormitorios" },
    { icono: IconoBano, valor: p.banos, etiqueta: "Baños" },
    { icono: IconoAuto, valor: p.cocheras, etiqueta: "Cocheras" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
      <nav aria-label="Ruta de navegación" className="text-sm text-[#57534e]">
        <Link href="/demos/inmobiliaria/propiedades" className="inline-flex min-h-11 items-center hover:text-[#1c1917]">
          ← Volver a propiedades
        </Link>
      </nav>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#933f1d] first-letter:uppercase">
            {p.tipo} en {p.operacion}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-rz-titulo)" }}>
            {p.titulo}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-[#57534e]">
            <IconoUbicacion /> {p.direccion}, {p.distrito}
          </p>
        </div>
        <p className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
          {precioTexto(p)}
        </p>
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
                <dd className="mt-1 text-xl font-semibold" style={{ fontFamily: "var(--font-rz-titulo)" }}>
                  {valor}
                </dd>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
              Descripción
            </h2>
            <div className="mt-4 max-w-2xl space-y-4 text-[16px] leading-relaxed text-[#44403c]">
              {p.descripcion.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
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
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <ContactoAsesor titulo={p.titulo} />
          {p.operacion === "venta" && <Calculadora precio={p.precio} moneda={p.moneda} />}
        </aside>
      </div>

      {similares.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ fontFamily: "var(--font-rz-titulo)" }}>
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
