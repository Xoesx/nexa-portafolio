import { COTIZAR, EXTERNO, SITIO } from "../_data/sitio";
import { IconoWhatsApp } from "./Iconos";

export function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-28 px-5 py-20 md:py-24">
      <div
        data-revelar
        className="sobre-oscuro relative mx-auto grid max-w-6xl grid-cols-1 gap-10 overflow-hidden rounded-[2rem] bg-azul px-7 py-14 text-white sm:px-12 md:grid-cols-[1.4fr_1fr] md:items-center"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/10" />
        <div className="relative">
          <h2 className="font-display text-4xl leading-[1.08] text-balance sm:text-5xl">Cuéntanos qué necesita tu negocio.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Escríbenos por WhatsApp. Te respondemos en menos de 24 horas y la primera conversación no te cuesta nada.
          </p>
        </div>
        <div className="relative">
          <a
            href={COTIZAR}
            {...EXTERNO}
            className="inline-flex min-h-14 items-center gap-3 rounded-xl bg-white px-7 text-lg font-semibold text-tinta transition-colors hover:bg-niebla"
          >
            <IconoWhatsApp tam={24} className="text-whatsapp" />
            {SITIO.telefonoVisible}
          </a>
          <p className="mt-3 text-sm text-white/80">Atendemos de lunes a sábado.</p>
        </div>
      </div>
    </section>
  );
}
