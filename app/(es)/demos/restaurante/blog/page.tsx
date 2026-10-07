import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ARTICULOS } from "../data/blog";

export const metadata: Metadata = {
  title: "Blog | Sabor Criollo",
  description: "Historias, técnicas e ingredientes de la cocina peruana.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1
            className="text-[42px] leading-[1.05] md:text-[56px]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Desde la cocina
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#1F1A15]/75">
            Lo que aprendimos cocinando: cómo elegimos el pescado, de dónde sale cada ají y algunas recetas de la casa.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {ARTICULOS.map((a) => (
            <Link
              key={a.slug}
              href={`/demos/restaurante/blog/${a.slug}`}
              className="group flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#F0E7D5]">
                <Image width={800} height={600} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={a.imagen}
                  alt={a.titulo}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-3 text-[13px] text-[#6E6457]">
                  <span className="text-[#C1440E]">{a.categoria}</span>
                  <span>·</span>
                  <span>{a.lectura} de lectura</span>
                </div>
                <h2
                  className="mt-3 text-[22px] leading-tight text-[#1F1A15] transition group-hover:text-[#C1440E]"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
                >
                  {a.titulo}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#1F1A15]/70">
                  {a.extracto}
                </p>
                <p className="mt-4 text-[13px] text-[#6E6457]">
                  {a.fecha}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
