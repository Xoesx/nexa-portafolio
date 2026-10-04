import Link from "next/link";
import { Marca } from "./Header";

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-20 border-t border-[#e7e1d8] bg-[#f3efe9]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Marca />
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#57534e]">
            Compra, venta y alquiler de casas y departamentos en Pucallpa, con asesoría legal en cada paso.
          </p>
        </div>
        <div className="text-[15px] leading-relaxed text-[#57534e]">
          <p className="font-semibold text-[#1c1917]">Oficina</p>
          <p className="mt-2">Jr. Inmaculada 480, Callería</p>
          <p>Lunes a sábado, 9:00 a 19:00</p>
        </div>
        <div className="text-[15px] leading-relaxed text-[#57534e]">
          <p className="font-semibold text-[#1c1917]">Escríbenos</p>
          <p className="mt-2">hola@raices.demo</p>
          <Link href="/#proyectos" className="mt-4 inline-block text-sm font-semibold text-[#933f1d] underline underline-offset-4">
            Demo hecha por NEXA →
          </Link>
        </div>
      </div>
    </footer>
  );
}
