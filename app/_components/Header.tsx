import { COTIZAR, EXTERNO, NAVEGACION } from "../_data/sitio";
import { IconoWhatsApp } from "./Iconos";
import { Logo } from "./Logo";

type Props = {
  /** Fuera de la home, los enlaces de sección apuntan a "/#seccion". */
  enInicio?: boolean;
};

export function Header({ enInicio = true }: Props) {
  const base = enInicio ? "" : "/";
  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-papel/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href={enInicio ? "#inicio" : "/"} aria-label="NEXA, ir al inicio" className="rounded-md">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] md:flex">
          {NAVEGACION.map((e) => (
            <a key={e.href} href={base + e.href} className="text-tinta/70 transition-colors hover:text-tinta">
              {e.label}
            </a>
          ))}
        </nav>

        <a
          href={COTIZAR}
          {...EXTERNO}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-azul px-4 text-sm font-semibold text-white transition-colors hover:bg-azul-hondo"
        >
          <IconoWhatsApp tam={16} />
          <span className="sm:hidden">WhatsApp</span>
          <span className="hidden sm:inline">Escribir por WhatsApp</span>
        </a>
      </div>

      <nav
        aria-label="Secciones"
        className="flex gap-1 overflow-x-auto border-t border-linea px-3 text-sm text-tinta/70 [scrollbar-width:none] md:hidden"
      >
        {NAVEGACION.map((e) => (
          <a key={e.href} href={base + e.href} className="flex min-h-11 items-center whitespace-nowrap px-2">
            {e.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
