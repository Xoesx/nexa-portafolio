import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ARTICULOS } from "../../data/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articulo = ARTICULOS.find((a) => a.slug === slug);
  if (!articulo) return { title: "Artículo no encontrado" };
  return {
    title: `${articulo.titulo} | Sabor Criollo`,
    description: articulo.extracto,
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const articulo = ARTICULOS.find((a) => a.slug === slug);
  if (!articulo) notFound();

  const otros = ARTICULOS.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <Link
          href="/demos/restaurante/blog"
          className="text-[14px] font-semibold text-[#6E6457] transition hover:text-[#C1440E]"
        >
          ← Volver al blog
        </Link>

        <div className="mt-8 flex items-center gap-3 text-[13px] text-[#6E6457]">
          <span className="text-[#C1440E]">{articulo.categoria}</span>
          <span>·</span>
          <span>{articulo.fecha}</span>
          <span>·</span>
          <span>{articulo.lectura} de lectura</span>
        </div>

        <h1
          className="mt-4 text-[38px] leading-[1.1] md:text-[48px]"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
        >
          {articulo.titulo}
        </h1>

        <p className="mt-6 text-[19px] leading-relaxed text-[#1F1A15]/75">
          {articulo.extracto}
        </p>

        <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-[#F0E7D5]">
          <Image width={1200} height={675} sizes="(min-width: 768px) 768px, 100vw" priority src={articulo.imagen} alt={articulo.titulo} className="h-full w-full object-cover" />
        </div>

        <article className="mt-12 space-y-6 text-[16px] leading-[1.8] text-[#1F1A15]/80">
          {articulo.contenido.map((bloque, i) => (
            <div key={i}>
              {bloque.subtitulo && (
                <h2
                  className="mt-10 mb-3 text-[22px] leading-tight text-[#1F1A15]"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
                >
                  {bloque.subtitulo}
                </h2>
              )}
              <p>{bloque.parrafo}</p>
            </div>
          ))}
        </article>

        {/* Otros artículos */}
        <div className="mt-20 border-t border-[#1F1A15]/10 pt-12">
          <h2 className="text-[22px]" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
            Seguir leyendo
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {otros.map((a) => (
              <Link key={a.slug} href={`/demos/restaurante/blog/${a.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[#F0E7D5]">
                  <Image width={600} height={450} sizes="(min-width: 768px) 33vw, 100vw"
                    src={a.imagen}
                    alt={a.titulo}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <h3
                  className="mt-4 text-[18px] leading-tight text-[#1F1A15] transition group-hover:text-[#C1440E]"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
                >
                  {a.titulo}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
