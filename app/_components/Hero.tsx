import Link from "next/link";
import { PROYECTOS } from "../_data/contenido";
import { COTIZAR, EXTERNO } from "../_data/sitio";
import ChatDemo from "./ChatDemo";
import { IconoWhatsApp } from "./Iconos";

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Trama sutil de fondo: solo decoración */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-linea)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-linea)_1px,transparent_1px)] bg-[size:56px_56px] opacity-50 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p data-entrada className="inline-flex items-center gap-2 rounded-full border border-linea bg-white px-3 py-1.5 text-sm font-semibold text-tinta/80">
            <span className="h-2 w-2 rounded-full bg-azul" aria-hidden="true" />
            Estudio de desarrollo web en Pucallpa, para todo el Perú
          </p>
          <h1
            data-entrada
            style={retraso(80)}
            className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] text-balance sm:text-[4rem]"
          >
            Tu negocio, atendido <span className="text-azul">aunque no estés.</span>
          </h1>
          <p data-entrada style={retraso(160)} className="mt-6 max-w-xl text-lg leading-relaxed text-tinta/75">
            Hacemos páginas web, agendas de citas, catálogos con buscador y asistentes de WhatsApp que atienden a tus
            clientes las 24 horas. Recibes precio y plazo por escrito antes de pagar un sol.
          </p>

          <div data-entrada style={retraso(240)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={COTIZAR}
              {...EXTERNO}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-azul px-7 font-semibold text-white shadow-[0_10px_30px_-10px_rgb(36_87_245/0.6)] transition-colors hover:bg-azul-hondo"
            >
              <IconoWhatsApp tam={20} />
              Cotizar por WhatsApp
            </a>
            <Link
              href="#proyectos"
              className="inline-flex min-h-12 items-center rounded-xl border border-linea bg-white px-6 font-semibold transition-colors hover:border-tinta/40"
            >
              Ver {PROYECTOS.length} proyectos funcionando
            </Link>
          </div>

          <ul
            data-entrada
            style={retraso(320)}
            className="mt-10 grid grid-cols-1 gap-2 border-t border-linea pt-6 text-sm text-tinta/75 sm:grid-cols-3 sm:gap-4"
          >
            {["Respuesta en menos de 24 horas", "Pagas 50% al inicio y 50% al final", "Yape, Plin o transferencia"].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-azul" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div data-entrada style={retraso(200)}>
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
