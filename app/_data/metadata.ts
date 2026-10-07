import type { Metadata } from "next";
import type { Idioma } from "./idioma";
import { META, SITIO } from "./sitio";

/** Metadata compartida por todas las páginas de un idioma (se define en su layout raíz). */
export function metadataRaiz(idioma: Idioma): Metadata {
  const { titulo, descripcion, locale } = META[idioma];
  return {
    metadataBase: new URL(SITIO.url),
    title: titulo,
    description: descripcion,
    applicationName: SITIO.nombre,
    authors: [{ name: SITIO.nombreLegal }],
    openGraph: {
      type: "website",
      locale,
      alternateLocale: idioma === "es" ? META.en.locale : META.es.locale,
      url: idioma === "es" ? "/" : "/en",
      siteName: SITIO.nombre,
      title: titulo,
      description: descripcion,
    },
    twitter: { card: "summary_large_image", title: titulo, description: descripcion },
    formatDetection: { telephone: false },
  };
}
