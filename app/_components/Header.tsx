import { baseInicio, RUTA, type Idioma } from "../_data/idioma";
import { cotizar, EXTERNO, NAVEGACION } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { Boton } from "./Boton";
import { IconoWhatsApp } from "./Iconos";
import { Logo } from "./Logo";
import { MenuMovil } from "./MenuMovil";
import { TemaBoton } from "./TemaBoton";

type Props = {
  idioma: Idioma;
  /** Fuera de la home, los enlaces de sección apuntan a la home ("/#proyectos" o "/en#projects"). */
  enInicio?: boolean;
  /** La misma página en el otro idioma. */
  alterna: string;
};

/**
 * Navegación en forma de isla: una píldora de vidrio que flota sobre la página, separada del borde.
 * El contenido pasa por debajo y se ve desenfocado a través de ella. En el celular, la isla lleva
 * el logo, WhatsApp y el botón del menú.
 */
export function Header({ idioma, enInicio = true, alterna }: Props) {
  const t = TEXTOS[idioma].header;
  const tema = TEXTOS[idioma].tema;
  const base = baseInicio(idioma, enInicio);
  const enlaces = NAVEGACION[idioma].map((e) => ({ href: base + e.href, label: e.label }));

  return (
    <>
      <a href="#contenido" className="saltar rounded-full bg-tinta px-5 py-3 text-sm font-semibold text-fondo">
        {t.saltar}
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="isla pointer-events-auto mx-auto flex w-full max-w-6xl items-center gap-1 rounded-full py-1.5 pl-4 pr-1.5 lg:w-max lg:max-w-none lg:gap-1.5 lg:pl-5">
          <a href={enInicio ? "#contenido" : RUTA.inicio[idioma]} aria-label={t.irInicio} className="mr-auto rounded-full lg:mr-5">
            <Logo />
          </a>

          <nav aria-label={t.navPrincipal} className="hidden items-center lg:flex">
            {enlaces.map((e) => (
              <a
                key={e.href}
                href={e.href}
                className="rounded-full px-4 py-2 text-[15px] text-tenue transition-colors duration-300 ease-resorte hover:bg-tinta/[0.05] hover:text-tinta"
              >
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
            className="hidden h-11 min-w-11 place-items-center rounded-full px-2 font-mono text-[13px] font-medium tracking-wide text-tenue transition-colors duration-300 hover:bg-tinta/[0.05] hover:text-tinta lg:grid"
          >
            {t.otroIdioma.corto}
          </a>
          <div className="hidden lg:block">
            <TemaBoton etiqueta={tema.etiqueta} titulo={tema.titulo} />
          </div>
          <div className="ml-1.5 hidden lg:block">
            <Boton href={cotizar(idioma)} externo variante="tinta" tam="sm" icono={<IconoWhatsApp tam={16} />}>
              {t.whatsappLargo}
            </Boton>
          </div>

          {/* Celular: WhatsApp a un toque y el menú. */}
          <a
            href={cotizar(idioma)}
            {...EXTERNO}
            aria-label={t.whatsappLargo}
            className="grid h-11 w-11 place-items-center rounded-full bg-tinta text-fondo transition-transform duration-300 ease-resorte active:scale-95 lg:hidden"
          >
            <IconoWhatsApp tam={18} />
          </a>
          <MenuMovil
            enlaces={enlaces}
            etiquetas={{ abrir: t.abrirMenu, cerrar: t.cerrarMenu, nav: t.navSecciones }}
            idiomaAlterno={{ href: alterna, nombre: t.otroIdioma.nombre, hreflang: t.otroIdioma.hreflang }}
            tema={tema}
            cta={{ href: cotizar(idioma), label: t.whatsappLargo }}
          />
        </div>
      </header>
    </>
  );
}
