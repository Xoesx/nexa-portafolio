"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";

const enlaces = [
  { label: "Inicio", id: "inicio", href: "/demos/restaurante" },
  { label: "Menú", id: "menu", href: "/demos/restaurante/menu" },
  { label: "Nosotros", id: "nosotros", href: "/demos/restaurante/nosotros" },
  { label: "Blog", id: "blog", href: "/demos/restaurante/blog" },
  { label: "Reservar", id: "reservar", href: "/demos/restaurante/reservar" },
  { label: "Contacto", id: "contacto", href: "/demos/restaurante/contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activo = enlaces.find((e) => {
    if (e.href === "/demos/restaurante") return pathname === "/demos/restaurante";
    return pathname.startsWith(e.href);
  });

  const esAdmin = pathname.startsWith("/demos/restaurante/admin");

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-[#1F1A15]/8 bg-[#FBF9F4]/95 backdrop-blur-md shadow-sm"
            : "border-transparent bg-[#FBF9F4]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/demos/restaurante" className="flex items-center gap-3">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C1440E" strokeWidth="1.5">
              <path d="M5 3v7a3 3 0 0 0 6 0V3M8 3v18M19 3c-2 3-3 6-3 10 0 3 1 5 3 6v2M16 3h6" />
            </svg>
            <div className="leading-none">
              <p
                className="text-xl text-[#1F1A15]"
                style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
              >
                Sabor Criollo
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-[#6E6457]">
                Cocina Peruana
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-[12px] font-medium uppercase tracking-[0.15em] lg:flex">
            {enlaces.map((e) => {
              const estaActivo = activo?.id === e.id;
              return (
                <Link
                  key={e.id}
                  href={e.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    estaActivo ? "text-[#C1440E]" : "text-[#1F1A15]/70 hover:text-[#1F1A15]"
                  }`}
                >
                  {e.label}
                  {estaActivo && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#C1440E]" />
                  )}
                </Link>
              );
            })}

            {/* Admin con estilo distinto (badge demo) */}
            <Link
              href="/demos/restaurante/admin/menu"
              className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition ${
                esAdmin
                  ? "border-[#C1440E] bg-[#C1440E] text-white"
                  : "border-[#1F1A15]/15 text-[#1F1A15]/70 hover:border-[#C1440E] hover:text-[#C1440E]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Admin
            </Link>
          </nav>

          <Link
            href="/demos/restaurante/reservar"
            className="rounded-full bg-[#C1440E] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#9A3410]"
          >
            Reservar
          </Link>
        </div>
      </header>
    </>
  );
}
