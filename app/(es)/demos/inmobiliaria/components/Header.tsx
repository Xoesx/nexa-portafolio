"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavoritos } from "../lib/favoritos";

const BASE = "/demos/inmobiliaria";
const ENLACES = [
  { label: "Comprar", href: `${BASE}/propiedades?op=venta` },
  { label: "Alquilar", href: `${BASE}/propiedades?op=alquiler` },
  { label: "Terrenos", href: `${BASE}/propiedades?tipo=terreno` },
  { label: "Vender mi propiedad", href: `${BASE}#vender` },
  { label: "Asesores", href: `${BASE}#asesores` },
];

export function Marca() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#b4532a" />
        <path d="M8 22V14l8-6 8 6v8" fill="none" stroke="#faf8f5" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M16 24v-6" stroke="#faf8f5" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M16 18c-3 0-4-2-4-4M16 20c3 0 4-2 4-4" fill="none" stroke="#faf8f5" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block text-[18px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
          Raíces
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#57534e]">Inmobiliaria</span>
      </span>
    </span>
  );
}

function Corazon({ lleno }: { lleno: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={lleno ? "#b4532a" : "none"} stroke={lleno ? "#b4532a" : "currentColor"} strokeWidth="1.8" aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" />
    </svg>
  );
}

export function Header() {
  const ruta = usePathname();
  const { favoritos } = useFavoritos();
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(ruta);

  // Al navegar a otra página, el menú móvil se cierra.
  if (ruta !== rutaPrevia) {
    setRutaPrevia(ruta);
    setAbierto(false);
  }

  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [abierto]);

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur">
      {/* Barra de contacto */}
      <div className="hidden bg-[#1c1917] text-[13px] text-white/85 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2">
          <p>Lunes a sábado de 9:00 a 19:00 · Jr. Inmaculada 480, Pucallpa</p>
          <p className="flex gap-5">
            <span>hola@raices.demo</span>
            <Link href={`${BASE}#vender`} className="font-semibold text-[#f3c7a8] hover:text-white">
              Tasación gratuita →
            </Link>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e7e1d8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
          <Link href={BASE}>
            <Marca />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
            {ENLACES.map((e) => (
              <Link key={e.href} href={e.href} className="text-[#44403c] transition-colors hover:text-[#1c1917]">
                {e.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`${BASE}/favoritos`}
              aria-current={ruta === `${BASE}/favoritos` ? "page" : undefined}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#e7e1d8] bg-white px-4 text-sm font-semibold transition-colors hover:border-[#b4532a]"
            >
              <Corazon lleno={favoritos.length > 0} />
              <span className="hidden sm:inline">Favoritos</span>
              <span className="rounded-full bg-[#f3efe9] px-1.5 text-xs tabular-nums">{favoritos.length}</span>
            </Link>
            <Link
              href={`${BASE}/propiedades`}
              className="hidden min-h-11 items-center rounded-full bg-[#1c1917] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#b4532a] md:inline-flex"
            >
              Buscar propiedad
            </Link>
            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="rz-menu"
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#e7e1d8] bg-white lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <nav id="rz-menu" hidden={!abierto} aria-label="Menú móvil" className="border-b border-[#e7e1d8] px-5 pb-5 lg:hidden">
        <ul>
          {[{ label: "Inicio", href: BASE }, ...ENLACES, { label: "Todas las propiedades", href: `${BASE}/propiedades` }].map((e) => (
            <li key={e.href}>
              <Link href={e.href} onClick={() => setAbierto(false)} className="flex min-h-12 items-center border-b border-[#e7e1d8] text-lg">
                {e.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
