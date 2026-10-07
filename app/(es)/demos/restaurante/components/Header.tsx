"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";

const BASE = "/demos/restaurante";

const enlaces = [
  { label: "Inicio", href: BASE },
  { label: "Carta", href: `${BASE}/menu` },
  { label: "Nosotros", href: `${BASE}/nosotros` },
  { label: "Blog", href: `${BASE}/blog` },
  { label: "Reservar", href: `${BASE}/reservar` },
  { label: "Contacto", href: `${BASE}/contacto` },
];

const esActivo = (href: string, pathname: string) => (href === BASE ? pathname === BASE : pathname.startsWith(href));

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El menú del celular se cierra con Escape, como cualquier panel desplegable.
  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [abierto]);

  const esAdmin = pathname.startsWith(`${BASE}/admin`);

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled || abierto ? "border-[#1F1A15]/8 bg-[#FBF9F4]/95 shadow-sm backdrop-blur-md" : "border-transparent bg-[#FBF9F4]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href={BASE} className="flex items-center gap-3">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C1440E" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 3v7a3 3 0 0 0 6 0V3M8 3v18M19 3c-2 3-3 6-3 10 0 3 1 5 3 6v2M16 3h6" />
            </svg>
            <span className="leading-none">
              <span className="block text-xl text-[#1F1A15]" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
                Sabor Criollo
              </span>
              <span className="mt-1 hidden text-[12px] text-[#6E6457] sm:block">Cocina peruana en Pucallpa</span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
            {enlaces.map((e) => {
              const activo = esActivo(e.href, pathname);
              return (
                <Link
                  key={e.href}
                  href={e.href}
                  aria-current={activo ? "page" : undefined}
                  className={`relative py-1 transition-colors duration-200 ${activo ? "text-[#C1440E]" : "text-[#1F1A15]/70 hover:text-[#1F1A15]"}`}
                >
                  {e.label}
                  {activo && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#C1440E]" aria-hidden="true" />}
                </Link>
              );
            })}
            <Link
              href={`${BASE}/admin/menu`}
              aria-current={esAdmin ? "page" : undefined}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[14px] transition ${
                esAdmin ? "border-[#C1440E] bg-[#C1440E] text-white" : "border-[#1F1A15]/15 text-[#1F1A15]/70 hover:border-[#C1440E] hover:text-[#C1440E]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Panel del dueño
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`${BASE}/reservar`}
              className="inline-flex min-h-11 items-center rounded-full bg-[#C1440E] px-5 text-[15px] font-semibold text-white transition hover:bg-[#9A3410]"
            >
              Reservar
            </Link>
            <button
              type="button"
              onClick={() => setAbierto((a) => !a)}
              aria-expanded={abierto}
              aria-controls="navegacion-movil"
              aria-label={abierto ? "Cerrar navegación" : "Abrir navegación"}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#1F1A15]/15 text-[#1F1A15] lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        <nav id="navegacion-movil" aria-label="Navegación" hidden={!abierto} className="border-t border-[#1F1A15]/8 px-6 pb-5 lg:hidden">
          <ul className="mx-auto max-w-7xl divide-y divide-[#1F1A15]/8">
            {[...enlaces, { label: "Panel del dueño", href: `${BASE}/admin/menu` }].map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  aria-current={esActivo(e.href, pathname) ? "page" : undefined}
                  className="flex min-h-12 items-center text-[17px] text-[#1F1A15] aria-[current=page]:font-semibold aria-[current=page]:text-[#C1440E]"
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
