import { EXTERNO, NAVEGACION, SITIO } from "../_data/sitio";
import { Logo } from "./Logo";

export function Footer({ enInicio = true }: { enInicio?: boolean }) {
  const base = enInicio ? "" : "/";
  return (
    <footer className="sobre-oscuro bg-tinta pb-20 text-papel/70 md:pb-0">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr]">
        <div>
          <Logo className="text-papel" />
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            Páginas web, asistentes de WhatsApp y automatizaciones para negocios de {SITIO.ciudad} y de todo el Perú.
          </p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-7 gap-y-1 text-sm md:justify-end md:self-end">
          {NAVEGACION.map((e) => (
            <a key={e.href} href={base + e.href} className="flex min-h-11 items-center transition-colors hover:text-white">
              {e.label}
            </a>
          ))}
          <a href={SITIO.github} {...EXTERNO} className="flex min-h-11 items-center transition-colors hover:text-white">
            GitHub
          </a>
        </nav>
      </div>
      <div className="border-t border-papel/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs">
          © {new Date().getFullYear()} {SITIO.nombreLegal}. {SITIO.ciudad}, {SITIO.region}, Perú.
        </p>
      </div>
    </footer>
  );
}
