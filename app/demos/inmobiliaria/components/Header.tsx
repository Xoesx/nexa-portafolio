"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BASE = "/demos/inmobiliaria";
const ENLACES = [
  { label: "Inicio", href: BASE },
  { label: "Propiedades", href: `${BASE}/propiedades` },
  { label: "Vender con nosotros", href: `${BASE}#vender` },
  { label: "Contacto", href: `${BASE}#contacto` },
];

export function Marca() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#b4532a" />
        <path d="M8 22V14l8-6 8 6v8" fill="none" stroke="#faf8f5" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M16 24v-6" stroke="#faf8f5" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M16 18c-3 0-4-2-4-4M16 20c3 0 4-2 4-4" fill="none" stroke="#faf8f5" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block text-[17px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
          Raíces
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#57534e]">Inmobiliaria</span>
      </span>
    </span>
  );
}

export function Header() {
  const ruta = usePathname();
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

  const activo = (href: string) => (href === BASE ? ruta === BASE : ruta.startsWith(href.split("#")[0]) && !href.includes("#"));

  return (
    <header className="sticky top-0 z-40 border-b border-[#e7e1d8] bg-[#faf8f5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
        <Link href={BASE}>
          <Marca />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              aria-current={activo(e.href) ? "page" : undefined}
              className="text-[#57534e] transition-colors hover:text-[#1c1917] aria-[current=page]:text-[#1c1917] aria-[current=page]:underline aria-[current=page]:decoration-[#b4532a] aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
            >
              {e.label}
            </Link>
          ))}
        </nav>

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
          className="grid h-11 w-11 place-items-center rounded-full border border-[#e7e1d8] md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav id="rz-menu" hidden={!abierto} aria-label="Menú móvil" className="border-t border-[#e7e1d8] px-5 pb-5 md:hidden">
        <ul>
          {ENLACES.map((e) => (
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
