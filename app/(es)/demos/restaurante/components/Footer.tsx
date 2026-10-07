import Link from "next/link";
import { CATEGORIAS, idCategoria } from "../data/menu";
import { horarioPorTramos } from "../lib/horario";
import { wa } from "../lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-[#1F1A15]/8 bg-[#FBF9F4]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C1440E" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 3v7a3 3 0 0 0 6 0V3M8 3v18M19 3c-2 3-3 6-3 10 0 3 1 5 3 6v2M16 3h6" />
              </svg>
              <p
                className="text-xl tracking-tight"
                style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
              >
                Sabor Criollo
              </p>
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#1F1A15]/70">
              Cocina criolla y amazónica en el Jr. Comercio desde 2014.
            </p>
            <dl className="mt-6 max-w-xs space-y-1.5 text-[14px]">
              {horarioPorTramos().map((t) => (
                <div key={t.dias} className="flex justify-between gap-4">
                  <dt className="text-[#1F1A15]/70">{t.dias}</dt>
                  <dd className="tabular-nums text-[#1F1A15]">{t.horas}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-[#1F1A15]/70">Visitar</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#1F1A15]/75">
              <li><Link href="/demos/restaurante" className="hover:text-[#C1440E]">Inicio</Link></li>
              <li><Link href="/demos/restaurante/menu" className="hover:text-[#C1440E]">Carta</Link></li>
              <li><Link href="/demos/restaurante/nosotros" className="hover:text-[#C1440E]">Nosotros</Link></li>
              <li><Link href="/demos/restaurante/blog" className="hover:text-[#C1440E]">Blog</Link></li>
              <li><Link href="/demos/restaurante/reservar" className="hover:text-[#C1440E]">Reservar</Link></li>
              <li><Link href="/demos/restaurante/contacto" className="hover:text-[#C1440E]">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-[#1F1A15]/70">Carta</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#1F1A15]/75">
              {CATEGORIAS.map((c) => (
                <li key={c}>
                  <Link href={`/demos/restaurante/menu#${idCategoria(c)}`} className="hover:text-[#C1440E]">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-[#1F1A15]/70">Contacto</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#1F1A15]/75">
              <li>Jr. Comercio 245<br />Pucallpa, Ucayali</li>
              <li>
                <a href={wa("Hola, quiero hacer una consulta a Sabor Criollo.")} target="_blank" rel="noopener noreferrer" className="hover:text-[#C1440E]">
                  WhatsApp
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
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] text-[#1F1A15]/70 md:justify-start">
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

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#1F1A15]/8 pt-6 text-[12px] text-[#1F1A15]/70 md:flex-row">
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
