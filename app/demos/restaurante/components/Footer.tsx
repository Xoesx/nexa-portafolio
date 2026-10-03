import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1F1A15]/8 bg-[#FBF9F4]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C1440E" strokeWidth="1.5">
                <path d="M5 3v7a3 3 0 0 0 6 0V3M8 3v18M19 3c-2 3-3 6-3 10 0 3 1 5 3 6v2M16 3h6" />
              </svg>
              <p
                className="text-xl tracking-tight"
                style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
              >
                Sabor Criollo
              </p>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#1F1A15]/60">
              Cocina peruana preparada al momento. Ingredientes frescos, recetas familiares y atención de barrio.
            </p>
            <div className="mt-6 flex gap-3">
              {["IG", "FB", "TK"].map((r) => (
                <a
                  key={r}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#1F1A15]/15 text-[11px] font-semibold text-[#1F1A15]/70 transition hover:border-[#C1440E] hover:text-[#C1440E]"
                >
                  {r}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1F1A15]/50">Visitar</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#1F1A15]/75">
              <li><Link href="/demos/restaurante" className="hover:text-[#C1440E]">Inicio</Link></li>
              <li><Link href="/demos/restaurante/menu" className="hover:text-[#C1440E]">Menú</Link></li>
              <li><Link href="/demos/restaurante/nosotros" className="hover:text-[#C1440E]">Nosotros</Link></li>
              <li><Link href="/demos/restaurante/blog" className="hover:text-[#C1440E]">Blog</Link></li>
              <li><Link href="/demos/restaurante/reservar" className="hover:text-[#C1440E]">Reservar</Link></li>
              <li><Link href="/demos/restaurante/contacto" className="hover:text-[#C1440E]">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1F1A15]/50">Carta</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#1F1A15]/75">
              <li><Link href="/demos/restaurante/menu" className="hover:text-[#C1440E]">Entradas</Link></li>
              <li><Link href="/demos/restaurante/menu" className="hover:text-[#C1440E]">Principales</Link></li>
              <li><Link href="/demos/restaurante/menu" className="hover:text-[#C1440E]">Postres</Link></li>
              <li><Link href="/demos/restaurante/menu" className="hover:text-[#C1440E]">Bebidas</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1F1A15]/50">Contacto</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#1F1A15]/75">
              <li>Jr. Comercio 245<br />Pucallpa, Ucayali</li>
              <li>
                <a href="https://wa.me/51999888777" className="hover:text-[#C1440E]">
                  +51 999 888 777
                </a>
              </li>
              <li>
                <a href="mailto:hola@saborcriollo.pe" className="hover:text-[#C1440E]">
                  hola@saborcriollo.pe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#1F1A15]/8 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-[#1F1A15]/60 md:justify-start">
            <Link href="/demos/restaurante/legal/terminos" className="hover:text-[#C1440E]">
              Términos y condiciones
            </Link>
            <span className="hidden md:inline text-[#1F1A15]/20">·</span>
            <Link href="/demos/restaurante/legal/privacidad" className="hover:text-[#C1440E]">
              Política de privacidad
            </Link>
            <span className="hidden md:inline text-[#1F1A15]/20">·</span>
            <Link href="/demos/restaurante/legal/cookies" className="hover:text-[#C1440E]">
              Política de cookies
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#1F1A15]/8 pt-6 text-[12px] text-[#1F1A15]/50 md:flex-row">
          <p>© 2026 Sabor Criollo. Demo de NEXA Soluciones Digitales.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-[#C1440E]">Volver a NEXA</Link>
            <a
              href="https://github.com/Xoesx/nexa-portafolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C1440E]"
            >
              Ver el código del proyecto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
