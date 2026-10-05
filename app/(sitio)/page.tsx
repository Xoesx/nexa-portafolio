import type { Metadata } from "next";
import { Experiencia } from "../_components/Experiencia";
import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import { Hero } from "../_components/Hero";
import { Precios } from "../_components/Precios";
import { Preguntas } from "../_components/Preguntas";
import { Proyectos } from "../_components/Proyectos";
import { WhatsAppFlotante } from "../_components/WhatsAppFlotante";
import { HABILIDADES } from "../_data/contenido";
import { SITIO } from "../_data/sitio";

// La canónica va aquí y no en el layout raíz: si no, todas las páginas la heredarían y apuntarían a la home.
export const metadata: Metadata = { alternates: { canonical: "/" } };

const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITIO.nombreLegal,
  url: SITIO.url,
  description: SITIO.descripcion,
  telephone: `+${SITIO.whatsapp}`,
  areaServed: "PE",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITIO.ciudad,
    addressRegion: SITIO.region,
    addressCountry: "PE",
  },
  knowsAbout: ["Desarrollo web", ...HABILIDADES.flatMap((h) => h.items)],
  sameAs: [SITIO.github],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="inicio">
        <Hero />
        <Proyectos />
        <Experiencia />
        <Precios />
        <Preguntas />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}
