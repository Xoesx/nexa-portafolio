"use client";

import { useEffect, useState } from "react";
import { useIdioma, type Idioma } from "../i18n";

const IDIOMAS: Idioma[] = ["es", "en"];

function SelectorIdioma({ className = "" }: { className?: string }) {
  const { idioma, cambiar, t } = useIdioma();
  return (
    <div role="group" aria-label={t.cambiarIdioma} className={`flex items-center gap-1 ${className}`}>
      {IDIOMAS.map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => cambiar(i)}
          aria-pressed={idioma === i}
          className={`min-h-9 min-w-9 px-1.5 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors ${
            idioma === i ? "text-[#C9A96E]" : "text-white/60 hover:text-white"
          }`}
        >
          {i}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useIdioma();
  const [scrolled, setScrolled] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú móvil abierto: sin scroll de fondo y se cierra con Escape.
  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionar);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alPresionar);
    };
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${
        scrolled || abierto ? "bg-[#111111]/95 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1300px] items-center justify-between px-6 md:px-10">
        <a
          href="#home"
          className="text-[28px] leading-none text-[#C9A96E]"
          style={{ fontFamily: "var(--font-script), cursive" }}
        >
          Steakhouse
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-medium uppercase tracking-[0.12em] text-white lg:flex">
          {t.nav.map((e, i) => (
            <a
              key={e.href}
              href={e.href}
              className={`relative pb-1 transition-colors duration-200 hover:text-[#C9A96E] ${
                i === 0 ? "text-white" : "text-white/80"
              }`}
            >
              {e.label}
              {i === 0 && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-[#C9A96E]" />}
            </a>
          ))}
          <SelectorIdioma />
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? t.cerrarMenu : t.abrirMenu}
          className="grid h-11 w-11 place-items-center text-white lg:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {abierto ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      <nav
        id="menu-movil"
        hidden={!abierto}
        className="h-[calc(100dvh-4.75rem)] overflow-y-auto px-6 pb-10 pt-6 lg:hidden"
      >
        <ul className="space-y-1">
          {t.nav.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                onClick={() => setAbierto(false)}
                className="block py-3 text-[26px] text-white transition-colors hover:text-[#C9A96E]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {e.label}
              </a>
            </li>
          ))}
        </ul>
        <SelectorIdioma className="mt-8 border-t border-white/10 pt-6" />
      </nav>
    </header>
  );
}
