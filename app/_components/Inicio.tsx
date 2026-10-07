import { habilidades } from "../_data/contenido";
import { RUTA, type Idioma } from "../_data/idioma";
import { META, SITIO } from "../_data/sitio";
import { Experiencia } from "./Experiencia";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Precios } from "./Precios";
import { Preguntas } from "./Preguntas";
import { Proyectos } from "./Proyectos";
import { WhatsAppFlotante } from "./WhatsAppFlotante";

/** Home de NEXA. La usan / (español) y /en (inglés). */
export function Inicio({ idioma }: { idioma: Idioma }) {
  const otro: Idioma = idioma === "es" ? "en" : "es";

  const datosEstructurados = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITIO.nombreLegal,
    url: `${SITIO.url}${RUTA.inicio[idioma] === "/" ? "" : RUTA.inicio[idioma]}`,
    description: META[idioma].descripcion,
    inLanguage: idioma,
    telephone: `+${SITIO.whatsapp}`,
    areaServed: idioma === "es" ? ["PE", "Latinoamérica"] : "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITIO.ciudad,
      addressRegion: SITIO.region,
      addressCountry: "PE",
    },
    knowsAbout: [idioma === "es" ? "Desarrollo web" : "Web development", ...habilidades(idioma).flatMap((h) => h.items)],
    sameAs: [SITIO.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c") }}
      />
      <Header idioma={idioma} alterna={RUTA.inicio[otro]} />
      <main id="contenido">
        <Hero idioma={idioma} />
        <Proyectos idioma={idioma} />
        <Experiencia idioma={idioma} />
        <Precios idioma={idioma} />
        <Preguntas idioma={idioma} />
      </main>
      <Footer idioma={idioma} />
      <WhatsAppFlotante idioma={idioma} />
    </>
  );
}
