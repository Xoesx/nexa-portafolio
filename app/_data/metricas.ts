/**
 * Resultados de PageSpeed Insights (Lighthouse de Google) en modo celular, medidos sobre el sitio publicado.
 * Solo se muestran los proyectos que tienen medición: nunca se publican números estimados.
 */
export type Metrica = {
  rendimiento: number;
  accesibilidad: number;
  buenasPracticas: number;
  seo: number;
};

export const FECHA_MEDICION = "2026-10-04";

export const METRICAS: Partial<Record<string, Metrica>> = {};

export const ETIQUETAS: Record<keyof Metrica, string> = {
  rendimiento: "Rendimiento",
  accesibilidad: "Accesibilidad",
  buenasPracticas: "Buenas prácticas",
  seo: "SEO",
};

/** Enlace para que cualquiera repita la medición en PageSpeed Insights. */
export const medirEnPageSpeed = (url: string) =>
  `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}&form_factor=mobile`;
