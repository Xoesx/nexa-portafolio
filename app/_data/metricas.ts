/**
 * Resultados de Lighthouse (Google) en modo celular, medidos sobre el sitio publicado.
 * Para actualizarlos: npx lighthouse <url> --output=json y copiar las cuatro categorías.
 */
export type Metrica = {
  rendimiento: number;
  accesibilidad: number;
  buenasPracticas: number;
  seo: number;
};

export const FECHA_MEDICION = "2026-10-04";

export const METRICAS: Record<string, Metrica> = {
  inicio: { rendimiento: 92, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
  "sabor-criollo": { rendimiento: 86, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
  steakhouse: { rendimiento: 81, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
};

export const ETIQUETAS: Record<keyof Metrica, string> = {
  rendimiento: "Rendimiento",
  accesibilidad: "Accesibilidad",
  buenasPracticas: "Buenas prácticas",
  seo: "SEO",
};

/** Enlace para que cualquiera repita la medición en PageSpeed Insights. */
export const medirEnPageSpeed = (url: string) =>
  `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}&form_factor=mobile`;
