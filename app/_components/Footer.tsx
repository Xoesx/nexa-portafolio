import { COTIZAR, EXTERNO, NAVEGACION, SITIO } from "../_data/sitio";
import { IconoWhatsApp } from "./Iconos";
import { Logo } from "./Logo";

type Props = {
  /** Fuera de la home, los enlaces de sección apuntan a "/#seccion". */
  enInicio?: boolean;
  /** Bloque para escribir por WhatsApp. Los casos de estudio ya tienen el suyo. */
  contacto?: boolean;
};

/**
 * Cierre de la página: una hoja con esquinas grandes que sube sobre la sección anterior,
 * con el contacto y el pie. La sección anterior deja espacio abajo para el traslape.
 */
export function Footer({ enInicio = true, contacto = true }: Props) {
  const base = enInicio ? "" : "/";
  return (
    <footer id="contacto" className="invertido relative z-10 -mt-12 rounded-t-[2.5rem] pb-24 sm:rounded-t-[3.5rem] md:pb-0">
      {contacto && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-16 pt-20 md:grid-cols-[1.35fr_1fr] md:items-end md:pt-24">
          <div data-revelar>
            <h2 className="font-display text-[clamp(2.3rem,5.4vw,4rem)] leading-[1] text-balance">
              Cuéntanos qué necesita tu negocio.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-tenue">
              Escríbenos por WhatsApp. Te respondemos en menos de 24 horas y la primera conversación no te cuesta nada.
            </p>
          </div>
          <div data-revelar className="md:justify-self-end">
            <a
              href={COTIZAR}
              {...EXTERNO}
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-tinta px-7 text-lg font-semibold text-fondo transition-colors hover:bg-acento"
            >
              <IconoWhatsApp tam={22} />
              {SITIO.telefonoVisible}
            </a>
            <p className="mt-3 -rotate-2 pl-4 font-mano text-[1.35rem] text-acento">de lunes a sábado</p>
          </div>
        </div>
      )}

      <div className={contacto ? "border-t border-linea" : "pt-6"}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Logo />
            <p className="max-w-xs text-sm leading-snug text-tenue">
              Páginas web y sistemas a medida desde {SITIO.ciudad} para todo el Perú.
            </p>
          </div>
          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-tenue">
            {NAVEGACION.map((e) => (
              <a key={e.href} href={base + e.href} className="flex min-h-11 items-center transition-colors hover:text-tinta">
                {e.label}
              </a>
            ))}
            <a href={SITIO.github} {...EXTERNO} className="flex min-h-11 items-center transition-colors hover:text-tinta">
              GitHub
            </a>
          </nav>
        </div>
        <p className="mx-auto max-w-6xl px-5 pb-8 font-mono text-xs text-tenue">
          © {new Date().getFullYear()} {SITIO.nombreLegal} · {SITIO.ciudad}, {SITIO.region}, Perú
        </p>
      </div>
    </footer>
  );
}
