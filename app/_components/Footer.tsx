import { ANCLA, baseInicio, type Idioma } from "../_data/idioma";
import { cotizar, EXTERNO, NAVEGACION, SITIO } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { IconoWhatsApp } from "./Iconos";
import { Logo } from "./Logo";

type Props = {
  idioma: Idioma;
  /** Fuera de la home, los enlaces de sección apuntan a la home. */
  enInicio?: boolean;
  /** Bloque para escribir por WhatsApp. Los casos de estudio ya tienen el suyo. */
  contacto?: boolean;
};

/**
 * Cierre de la página: una hoja con esquinas grandes que sube sobre la sección anterior,
 * con el contacto y el pie. La sección anterior deja espacio abajo para el traslape.
 */
export function Footer({ idioma, enInicio = true, contacto = true }: Props) {
  const t = TEXTOS[idioma].footer;
  const base = baseInicio(idioma, enInicio);
  return (
    <footer id={ANCLA[idioma].contacto} className="invertido relative z-10 -mt-12 rounded-t-[2.5rem] pb-24 sm:rounded-t-[3.5rem] md:pb-0">
      {contacto && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-16 pt-20 md:grid-cols-[1.35fr_1fr] md:items-end md:pt-24">
          <div data-revelar>
            <h2 className="font-display text-[clamp(2.3rem,5.4vw,4rem)] leading-[1] text-balance">{t.titulo}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-tenue">{t.texto}</p>
          </div>
          <div data-revelar className="md:justify-self-end">
            <a
              href={cotizar(idioma)}
              {...EXTERNO}
              className="inline-flex min-h-14 items-center gap-3 rounded-full bg-tinta px-7 text-lg font-semibold text-fondo transition-colors hover:bg-acento"
            >
              <IconoWhatsApp tam={22} />
              {t.telefono}
            </a>
            <p className="mt-3 -rotate-2 pl-4 font-mano text-[1.35rem] text-acento">{t.horario}</p>
          </div>
        </div>
      )}

      <div className={contacto ? "border-t border-linea" : "pt-6"}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Logo />
            <p className="max-w-xs text-sm leading-snug text-tenue">{t.descripcion}</p>
          </div>
          <nav aria-label={t.navPie} className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-tenue">
            {NAVEGACION[idioma].map((e) => (
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
          © {new Date().getFullYear()} {SITIO.nombreLegal} · {t.lugar}
        </p>
      </div>
    </footer>
  );
}
