import Link from "next/link";
import { useIdioma } from "../i18n";

export function Footer() {
  const { t } = useIdioma();

  return (
    <footer id="contact" className="border-t border-[#C9A96E]/30 bg-[#1A1A1A] py-20">
      <div className="mx-auto grid max-w-[1300px] gap-12 px-6 md:grid-cols-3 md:px-10">
        {/* Columna 1 */}
        <div>
          <p
            className="text-[13px] font-bold uppercase tracking-[0.2em] text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {t.pie.ubicacion}
          </p>
          <div className="mt-3 h-px w-10 bg-[#C9A96E]" />
          <p className="mt-5 text-[14px] leading-[1.8] text-[#B0B0B0]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {t.pie.direccion[0]}
            <br />
            {t.pie.direccion[1]}
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <p
            className="text-[13px] font-bold uppercase tracking-[0.2em] text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {t.pie.horario}
          </p>
          <div className="mt-3 h-px w-10 bg-[#C9A96E]" />
          <div className="mt-5 space-y-1.5 text-[14px] leading-[2] text-[#B0B0B0]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {t.pie.horas.map((h) => (
              <p key={h}>{h}</p>
            ))}
          </div>
        </div>

        {/* Columna 3 */}
        <div className="md:text-right">
          <p
            className="text-[32px] leading-none text-[#C9A96E]"
            style={{ fontFamily: "var(--font-script), cursive" }}
          >
            Steakhouse
          </p>
          <p className="mt-3 text-[14px] text-[#B0B0B0]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            reservas@steakhouse.demo
          </p>
          <Link
            href="/#proyectos"
            className="mt-6 inline-block text-[12px] uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-[#C9A96E]"
          >
            {t.pie.demo} →
          </Link>
        </div>
      </div>
    </footer>
  );
}
