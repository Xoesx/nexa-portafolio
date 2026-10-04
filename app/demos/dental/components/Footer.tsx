import Link from "next/link";
import { CLINICA } from "../data";
import { Marca } from "./Header";

export function Footer() {
  return (
    <footer id="ubicacion" className="scroll-mt-20 bg-[#0f2a2a] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Marca claro />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/75">
            Odontología integral para toda la familia, con tecnología digital y sin apuros.
          </p>
        </div>
        <div className="text-[15px] leading-relaxed text-white/80">
          <p className="font-bold text-white">Dónde estamos</p>
          <p className="mt-2">{CLINICA.direccion}</p>
          <p>Tel. {CLINICA.telefono}</p>
        </div>
        <div className="text-[15px] leading-relaxed text-white/80">
          <p className="font-bold text-white">Horario</p>
          {CLINICA.horario.map((h) => (
            <p key={h.dias} className="mt-2 first:mt-2">
              {h.dias}: {h.horas}
            </p>
          ))}
          <Link href="/#proyectos" className="mt-5 inline-block text-sm font-semibold text-[#99f6e4] underline underline-offset-4">
            Demo hecha por NEXA →
          </Link>
        </div>
      </div>
    </footer>
  );
}
