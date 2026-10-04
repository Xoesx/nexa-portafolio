import { COTIZAR, EXTERNO, SITIO } from "../_data/sitio";
import { IconoWhatsApp } from "./Iconos";

export function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-28 border-t border-tinta/10">
      <div
        data-revelar
        className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:items-end md:py-28"
      >
        <div>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Cuéntanos qué necesita tu negocio.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-tinta/75">
            Escríbenos por WhatsApp. Te respondemos en menos de 24 horas y la primera conversación no te cuesta nada.
          </p>
        </div>
        <div>
          <a
            href={COTIZAR}
            {...EXTERNO}
            className="inline-flex min-h-14 items-center gap-3 rounded-full bg-arcilla px-8 text-lg font-semibold text-white transition-colors hover:bg-arcilla-hondo"
          >
            <IconoWhatsApp tam={24} />
            {SITIO.telefonoVisible}
          </a>
          <p className="mt-3 text-sm text-tinta/70">Atendemos de lunes a sábado.</p>
        </div>
      </div>
    </section>
  );
}
