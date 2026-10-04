import Link from "next/link";
import { SERVICIOS } from "../_data/contenido";
import { Flecha } from "./Iconos";

const ICONOS = [
  // Página web
  <path key="web" d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01" />,
  // Agenda
  <path key="agenda" d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h3v3H8z" />,
  // Catálogo con buscador
  <path key="catalogo" d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM17.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M19.3 19.3L21 21" />,
  // Sistemas a medida
  <path key="sistema" d="M4 6h10M4 12h16M4 18h7M17 4v4M14 6h6M13 16v4M11 18h4" />,
];

export function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-28 border-t border-linea bg-niebla">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end" data-revelar>
          <div>
            <p className="text-sm font-semibold text-azul">Servicios</p>
            <h2 className="mt-2 font-display text-3xl text-balance sm:text-[2.75rem] sm:leading-[1.1]">
              Lo que construimos para tu negocio
            </h2>
          </div>
          <p className="leading-relaxed text-tinta/75">
            No partimos de una plantilla. Primero entendemos cómo atiendes hoy y después construimos lo que de verdad te
            ahorra tiempo o te trae clientes.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERVICIOS.map((s, i) => (
            <li key={s.titulo} data-revelar className="flex flex-col rounded-3xl border border-linea bg-white p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-azul/10 text-azul">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONOS[i]}
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl">{s.titulo}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-tinta/75">{s.texto}</p>
              <Link href={s.ejemplo.href} className="group mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-azul">
                {s.ejemplo.label}
                <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
