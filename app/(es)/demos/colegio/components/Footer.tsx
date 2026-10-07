import Link from "next/link";
import { COLEGIO } from "../data";
import { Escudo } from "./Header";

export function Footer() {
  return (
    <footer className="bg-[#3d1016] text-[#fbf8f3]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Escudo claro />
          <p className="mt-4 max-w-xs text-[15px] italic leading-relaxed text-[#fbf8f3]/80" style={{ fontFamily: "var(--font-hz-titulo)" }}>
            {COLEGIO.lema}
          </p>
        </div>
        <div className="text-[15px] leading-relaxed text-[#fbf8f3]/80">
          <p className="font-bold text-[#fbf8f3]">Visítanos</p>
          <p className="mt-2">{COLEGIO.direccion}</p>
          <p>Secretaría: lunes a viernes, 8:00 a 16:00</p>
        </div>
        <div className="text-[15px] leading-relaxed text-[#fbf8f3]/80">
          <p className="font-bold text-[#fbf8f3]">Contacto</p>
          <p className="mt-2">Tel. {COLEGIO.telefono}</p>
          <p>{COLEGIO.correo}</p>
          <Link href="/#proyectos" className="mt-5 inline-block text-sm font-semibold text-[#e9cf7a] underline underline-offset-4">
            Demo hecha por NEXA →
          </Link>
        </div>
      </div>
    </footer>
  );
}
