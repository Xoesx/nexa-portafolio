import Link from "next/link";
import { DISTRITOS, TIPOS, type Tipo } from "../data";
import { Marca } from "./Header";

const BASE = "/demos/inmobiliaria";

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-28 border-t border-[#e7e1d8] bg-[#f3efe9]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Marca />
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#57534e]">
            Compra, venta y alquiler de terrenos, casas, departamentos y locales en Pucallpa, con asesoría legal en cada paso.
          </p>
          <div className="mt-6 space-y-1 text-[15px] text-[#44403c]">
            <p>Jr. Inmaculada 480, Callería</p>
            <p>Lunes a sábado, 9:00 a 19:00</p>
            <p>hola@raices.demo</p>
          </div>
          <Link href="/#proyectos" className="mt-6 inline-block text-sm font-semibold text-[#933f1d] underline underline-offset-4">
            Demo hecha por NEXA →
          </Link>
        </div>
        <nav aria-label="Búsquedas frecuentes" className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {DISTRITOS.map((d) => (
            <div key={d}>
              <p className="font-semibold text-[#1c1917]">{d}</p>
              <ul className="mt-3 space-y-1.5 text-[15px] text-[#57534e]">
                {(Object.keys(TIPOS) as Tipo[]).map((t) => (
                  <li key={t}>
                    <Link href={`${BASE}/propiedades?tipo=${t}&distrito=${encodeURIComponent(d)}`} className="inline-flex min-h-8 items-center hover:text-[#1c1917] hover:underline">
                      {TIPOS[t].plural} en {d}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
