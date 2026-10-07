import { baseInicio, RUTA, type Idioma } from "../_data/idioma";
import { cotizar, EXTERNO, NAVEGACION } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { IconoWhatsApp } from "./Iconos";
import { Logo } from "./Logo";
import { TemaBoton } from "./TemaBoton";

type Props = {
  idioma: Idioma;
  /** Fuera de la home, los enlaces de sección apuntan a la home ("/#proyectos" o "/en#projects"). */
  enInicio?: boolean;
  /** La misma página en el otro idioma. */
  alterna: string;
};

export function Header({ idioma, enInicio = true, alterna }: Props) {
  const t = TEXTOS[idioma].header;
  const tema = TEXTOS[idioma].tema;
  const base = baseInicio(idioma, enInicio);
  const navegacion = NAVEGACION[idioma];

  return (
    <header className="cabecera sticky top-0 z-40 border-b border-linea bg-fondo/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-3 sm:gap-3">
        <a href={enInicio ? "#inicio" : RUTA.inicio[idioma]} aria-label={t.irInicio} className="mr-auto rounded-md">
          <Logo />
        </a>

        <nav aria-label={t.navPrincipal} className="mr-3 hidden items-center gap-7 text-[15px] md:flex">
          {navegacion.map((e) => (
            <a key={e.href} href={base + e.href} className="text-tenue transition-colors hover:text-tinta">
              {e.label}
            </a>
          ))}
        </nav>

        {/* Cambiar de idioma recarga la página: cada idioma tiene su propio layout raíz. */}
        <a
          href={alterna}
          hrefLang={t.otroIdioma.hreflang}
          lang={t.otroIdioma.hreflang}
          aria-label={t.otroIdioma.nombre}
          title={t.otroIdioma.nombre}
          className="grid h-11 min-w-11 place-items-center rounded-md px-2 font-mono text-[13px] font-medium tracking-wide text-tenue transition-colors hover:bg-superficie hover:text-tinta"
        >
          {t.otroIdioma.corto}
        </a>
        <TemaBoton etiqueta={tema.etiqueta} titulo={tema.titulo} />
        <a
          href={cotizar(idioma)}
          {...EXTERNO}
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-tinta text-sm font-semibold text-fondo transition-colors hover:bg-acento hover:text-sobre-acento sm:px-5"
        >
          <IconoWhatsApp tam={17} />
          <span className="sr-only sm:not-sr-only">{t.whatsappLargo}</span>
        </a>
      </div>

      <nav
        aria-label={t.navSecciones}
        className="flex justify-between gap-1 overflow-x-auto border-t border-linea px-3 text-sm text-tenue [scrollbar-width:none] sm:justify-start sm:gap-4 md:hidden"
      >
        {navegacion.map((e) => (
          <a key={e.href} href={base + e.href} className="flex min-h-11 items-center whitespace-nowrap px-2">
            {e.label}
          </a>
        ))}
      </nav>

      {/* Avance de lectura: crece con el scroll (solo donde el navegador lo soporta). */}
      <div aria-hidden="true" className="barra-progreso absolute inset-x-0 -bottom-px h-[2px] bg-acento" />
    </header>
  );
}
