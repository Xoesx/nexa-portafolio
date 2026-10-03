"use client";

import { useEffect, useState } from "react";

const enlaces = [
  { label: "Home", href: "#home", activo: true },
  { label: "About Us", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
  { label: "Reservations", href: "#reservation" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${
        scrolled ? "bg-[#111111]/95 backdrop-blur-md py-4" : "bg-transparent py-6"
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
          {enlaces.map((e) => (
            <a
              key={e.label}
              href={e.href}
              className={`relative pb-1 transition-colors duration-200 hover:text-[#C9A96E] ${
                e.activo ? "text-white" : "text-white/80"
              }`}
            >
              {e.label}
              {e.activo && (
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-[#C9A96E]" />
              )}
            </a>
          ))}
          <button className="flex items-center gap-1 text-white/80 transition hover:text-[#C9A96E]">
            EN
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </nav>

        <button className="text-white lg:hidden" aria-label="Abrir menú">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
      </div>
    </header>
  );
}
