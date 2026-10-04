import { COTIZAR, EXTERNO } from "../_data/sitio";
import ChatDemo from "./ChatDemo";
import { IconoWhatsApp } from "./Iconos";

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div>
        <p data-entrada className="text-sm font-semibold text-selva">
          Estudio de desarrollo en Pucallpa, Perú
        </p>
        <h1
          data-entrada
          style={retraso(80)}
          className="mt-4 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-balance sm:text-6xl"
        >
          Que tu negocio responda a tiempo, incluso cuando tú no puedes.
        </h1>
        <p data-entrada style={retraso(160)} className="mt-6 max-w-xl text-lg leading-relaxed text-tinta/75">
          Hacemos páginas web y asistentes de WhatsApp para negocios de todo el Perú. Somos un estudio pequeño: hablas
          directamente con quien construye tu proyecto, y recibes precio y plazo por escrito antes de pagar.
        </p>

        <div data-entrada style={retraso(240)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={COTIZAR}
            {...EXTERNO}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-arcilla px-7 font-semibold text-white transition-colors hover:bg-arcilla-hondo"
          >
            <IconoWhatsApp tam={20} />
            Cotizar por WhatsApp
          </a>
          <a
            href="#proyectos"
            className="font-semibold underline decoration-tinta/30 underline-offset-4 transition-colors hover:decoration-arcilla"
          >
            Ver proyectos
          </a>
        </div>

        <ul
          data-entrada
          style={retraso(320)}
          className="mt-10 grid gap-2 border-t border-tinta/15 pt-6 text-sm text-tinta/70 sm:flex sm:flex-wrap sm:gap-x-8"
        >
          <li>Respondemos en menos de 24 horas</li>
          <li>Atendemos de lunes a sábado</li>
          <li>Pagos con Yape, Plin o transferencia</li>
        </ul>
      </div>

      <div data-entrada style={retraso(200)}>
        <ChatDemo />
      </div>
    </section>
  );
}
