import Link from "next/link";
import { medirEnPageSpeed } from "../_data/metricas";
import { EXTERNO, SITIO } from "../_data/sitio";
import { Flecha } from "./Iconos";

const host = new URL(SITIO.url).host;

type Estandar = {
  titulo: string;
  texto: string;
  prueba: { label: string; href: string; externo?: boolean };
};

const ESTANDARES: Estandar[] = [
  {
    titulo: "Primero el celular",
    texto: "Diseñamos desde el teléfono hacia arriba, con botones fáciles de tocar y textos que se leen sin hacer zoom.",
    prueba: { label: "Abre la agenda dental en tu celular", href: "/demos/dental/agendar" },
  },
  {
    titulo: "Formularios a prueba de errores",
    texto: "Revisamos DNI, teléfonos, fechas y horarios antes de enviar, y te decimos exactamente qué corregir.",
    prueba: { label: "Intenta preinscribirte sin datos", href: "/demos/colegio/admision#preinscripcion" },
  },
  {
    titulo: "Seguridad configurada",
    texto: "Content-Security-Policy, HSTS y bloqueo de iframes ajenos desde el primer día.",
    prueba: { label: "Revísalo en securityheaders.com", href: `https://securityheaders.com/?q=${host}&followRedirects=on`, externo: true },
  },
  {
    titulo: "Listo para Google",
    texto: "Títulos y descripciones por página, sitemap, datos estructurados e imagen para compartir en redes.",
    prueba: { label: "Mira nuestro sitemap", href: "/sitemap.xml", externo: true },
  },
  {
    titulo: "Accesible para todos",
    texto: "Contraste suficiente, navegación con teclado y textos alternativos para lectores de pantalla.",
    prueba: { label: "Mídelo en PageSpeed Insights", href: medirEnPageSpeed(SITIO.url), externo: true },
  },
  {
    titulo: "Código que se puede revisar",
    texto: "Ordenado y con TypeScript. El de estos demos está publicado para que lo revise quien quiera.",
    prueba: { label: "Ver el código en GitHub", href: SITIO.github, externo: true },
  },
];

export function Calidad() {
  return (
    <section id="calidad" className="scroll-mt-28 border-t border-linea">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="max-w-2xl" data-revelar>
          <p className="text-sm font-semibold text-azul">Calidad</p>
          <h2 className="mt-2 font-display text-3xl text-balance sm:text-[2.75rem] sm:leading-[1.1]">
            Lo que cuidamos en cada proyecto, y cómo comprobarlo
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-linea bg-linea sm:grid-cols-2 lg:grid-cols-3">
          {ESTANDARES.map((e) => {
            const clase = "group mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-azul";
            const contenido = (
              <>
                {e.prueba.label}
                <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            );
            return (
              <li key={e.titulo} className="flex flex-col bg-white p-6 sm:p-7">
                <h3 className="font-display text-lg">{e.titulo}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-tinta/75">{e.texto}</p>
                {e.prueba.externo ? (
                  <a href={e.prueba.href} {...EXTERNO} className={clase}>
                    {contenido}
                  </a>
                ) : (
                  <Link href={e.prueba.href} className={clase}>
                    {contenido}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
