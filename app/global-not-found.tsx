import type { Metadata } from "next";
import Link from "next/link";
import { Boton } from "./_components/Boton";
import { Flecha } from "./_components/Iconos";
import { Logo } from "./_components/Logo";
import { ScriptTema } from "./_components/ScriptTema";
import { SITIO } from "./_data/sitio";
import { archivo, sourceSans, plexMono } from "./_marca/fuentes";
import "./globals.css";

/*
 * 404 para direcciones que no existen. Con dos layouts raíz (español e inglés) no hay un layout
 * común donde armarla, así que esta página trae su propio <html>, el tema y las fuentes.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: "Página no encontrada · Page not found | NEXA",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ScriptTema />
      </head>
      <body className="flex min-h-full flex-col">
        <div
          className={`nexa ${archivo.variable} ${sourceSans.variable} ${plexMono.variable} flex min-h-full flex-1 flex-col bg-fondo font-sans text-tinta`}
        >
          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-20">
            <Link href="/" aria-label="NEXA" className="w-fit rounded-md">
              <Logo />
            </Link>
            <p className="mt-14 font-mono text-[13px] text-tenue">Error 404</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,7vw,4.4rem)] leading-[0.98] tracking-[-0.036em] text-balance">
              Esta página no existe.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-tenue">
              Puede que el enlace esté mal escrito o que la página haya cambiado de lugar.
            </p>
            <p lang="en" className="mt-3 max-w-lg leading-relaxed text-tenue">
              This page doesn&apos;t exist. The link may be mistyped, or the page may have moved.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-semibold">
              <Boton href="/" icono={<Flecha />}>
                Ir al inicio
              </Boton>
              <Link
                href="/en"
                lang="en"
                className="inline-flex min-h-12 items-center underline decoration-tinta/25 underline-offset-[6px] hover:decoration-acento"
              >
                Go to the English site
              </Link>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
