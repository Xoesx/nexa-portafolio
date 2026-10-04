import Link from "next/link";
import { PROYECTOS } from "../_data/contenido";
import { ETIQUETAS, FECHA_MEDICION, METRICAS, medirEnPageSpeed, type Metrica } from "../_data/metricas";
import { EXTERNO, SITIO } from "../_data/sitio";
import { Flecha } from "./Iconos";
import { Puntaje } from "./Puntaje";

const fechaLegible = new Date(`${FECHA_MEDICION}T12:00:00`).toLocaleDateString("es-PE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const host = new URL(SITIO.url).host;

const ESTANDARES = [
  {
    titulo: "Hecho primero para el celular",
    texto: "Cada pantalla se diseña desde el teléfono hacia arriba, con botones fáciles de tocar.",
    prueba: { label: "Abre un demo en tu celular", href: "/demos/restaurante" },
  },
  {
    titulo: "Formularios que no dejan pasar errores",
    texto: "Revisamos teléfono, fechas y horarios antes de enviar; si hay base de datos, también en el servidor.",
    prueba: { label: "Intenta reservar sin datos", href: "/demos/steakhouse#reservation" },
  },
  {
    titulo: "Cabeceras de seguridad",
    texto: "Content-Security-Policy, HSTS y bloqueo de iframes ajenos, configurados desde el primer día.",
    prueba: { label: "Revísalas en securityheaders.com", href: `https://securityheaders.com/?q=${host}&followRedirects=on`, externo: true },
  },
  {
    titulo: "Listo para Google",
    texto: "Títulos y descripciones por página, sitemap, robots.txt, datos estructurados e imagen para compartir.",
    prueba: { label: "Mira nuestro sitemap", href: "/sitemap.xml", externo: true },
  },
  {
    titulo: "Accesible para todos",
    texto: "Contraste suficiente, navegación con teclado y textos alternativos en las imágenes.",
    prueba: { label: "Mide la accesibilidad", href: medirEnPageSpeed(SITIO.url), externo: true },
  },
  {
    titulo: "Código que puedes revisar",
    texto: "Ordenado y con TypeScript. El de estos demos está publicado para que lo revise quien quiera.",
    prueba: { label: "Ver el código en GitHub", href: SITIO.github, externo: true },
  },
];

function FilaPuntajes({ m }: { m: Metrica }) {
  return (
    <div className="grid grid-cols-4 gap-1 sm:gap-2">
      {(Object.keys(ETIQUETAS) as (keyof Metrica)[]).map((k) => (
        <Puntaje key={k} valor={m[k]} etiqueta={ETIQUETAS[k]} tam={58} />
      ))}
    </div>
  );
}

export function Calidad() {
  const medidos = [
    { nombre: "Este sitio", url: SITIO.url, m: METRICAS.inicio },
    ...PROYECTOS.map((p) => ({ nombre: p.nombre, url: `${SITIO.url}${p.ruta}`, m: METRICAS[p.slug] })),
  ];

  return (
    <section id="calidad" className="scroll-mt-28 border-t border-tinta/10">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.2fr] md:items-end" data-revelar>
          <h2 className="font-serif text-3xl tracking-tight text-balance sm:text-4xl">Calidad que puedes comprobar</h2>
          <p className="leading-relaxed text-tinta/75">
            Cualquiera puede decir que hace páginas rápidas y seguras. Nosotros te mostramos los números: así califica
            Lighthouse, la herramienta de Google, a nuestros sitios en modo celular. Puedes repetir la medición tú mismo.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {medidos.map(({ nombre, url, m }) => (
            <li key={nombre} data-revelar className="rounded-2xl border border-tinta/15 bg-white p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl">{nombre}</h3>
                <a
                  href={medirEnPageSpeed(url)}
                  {...EXTERNO}
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-selva underline decoration-selva/30 underline-offset-4 hover:decoration-selva"
                >
                  Medir ahora
                  <span className="sr-only"> {nombre} en PageSpeed Insights (se abre en otra pestaña)</span>
                </a>
              </div>
              <div className="mt-5">
                <FilaPuntajes m={m} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-tinta/70">
          Medido con Lighthouse en modo celular el {fechaLegible}. Los resultados varían un poco entre una medición y otra.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ESTANDARES.map((e) => (
            <div key={e.titulo} data-revelar className="border-t-2 border-tinta pt-5">
              <h3 className="text-lg font-semibold leading-snug">{e.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-tinta/75">{e.texto}</p>
              {e.prueba.externo ? (
                <a
                  href={e.prueba.href}
                  {...EXTERNO}
                  className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-arcilla"
                >
                  {e.prueba.label}
                  <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <Link href={e.prueba.href} className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-arcilla">
                  {e.prueba.label}
                  <Flecha className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
