import { Calidad } from "../_components/Calidad";
import { Contacto } from "../_components/Contacto";
import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import { Hero } from "../_components/Hero";
import { Precios } from "../_components/Precios";
import { Preguntas } from "../_components/Preguntas";
import { Proceso } from "../_components/Proceso";
import { Proyectos } from "../_components/Proyectos";
import { Servicios } from "../_components/Servicios";
import { WhatsAppFlotante } from "../_components/WhatsAppFlotante";
import type { Metadata } from "next";
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
        <Servicios />
        <Calidad />
        <Proceso />
        <Precios />
        <Preguntas />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}
