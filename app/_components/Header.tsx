import { COTIZAR, EXTERNO, NAVEGACION } from "../_data/sitio";
import { IconoWhatsApp } from "./Iconos";
import { Logo } from "./Logo";
import { TemaBoton } from "./TemaBoton";

type Props = {
  /** Fuera de la home, los enlaces de sección apuntan a "/#seccion". */
  enInicio?: boolean;
};

export function Header({ enInicio = true }: Props) {
  const base = enInicio ? "" : "/";
  return (
    <header className="cabecera sticky top-0 z-40 border-b border-linea bg-fondo/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
        <a href={enInicio ? "#inicio" : "/"} aria-label="NEXA, ir al inicio" className="mr-auto rounded-md">
          <Logo />
        </a>

        <nav aria-label="Principal" className="mr-4 hidden items-center gap-7 text-[15px] md:flex">
          {NAVEGACION.map((e) => (
            <a key={e.href} href={base + e.href} className="text-tenue transition-colors hover:text-tinta">
              {e.label}
            </a>
          ))}
        </nav>

        <TemaBoton />
        <a
          href={COTIZAR}
          {...EXTERNO}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-tinta px-4 text-sm font-semibold text-fondo transition-colors hover:bg-acento hover:text-sobre-acento sm:px-5"
        >
          <IconoWhatsApp tam={16} />
          <span className="sm:hidden">WhatsApp</span>
          <span className="hidden sm:inline">Escribir por WhatsApp</span>
        </a>
      </div>

      <nav
        aria-label="Secciones"
        className="flex justify-between gap-1 overflow-x-auto border-t border-linea px-3 text-sm text-tenue [scrollbar-width:none] sm:justify-start sm:gap-4 md:hidden"
      >
        {NAVEGACION.map((e) => (
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
