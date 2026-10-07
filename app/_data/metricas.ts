/**
 * Resultados de Lighthouse (la herramienta de Google detrás de PageSpeed Insights) en modo celular,
 * medidos sobre el sitio publicado en producción. Solo se muestran proyectos con medición real.
 */
export type Metrica = {
  rendimiento: number;
  accesibilidad: number;
  buenasPracticas: number;
  seo: number;
};

export const FECHA_MEDICION = "2026-10-04";

export const METRICAS: Partial<Record<string, Metrica>> = {
  inicio: { rendimiento: 99, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
  "clinica-dental": { rendimiento: 100, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
  inmobiliaria: { rendimiento: 98, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
  colegio: { rendimiento: 100, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
  "sabor-criollo": { rendimiento: 97, accesibilidad: 100, buenasPracticas: 100, seo: 100 },
};

/** Enlace para que cualquiera repita la medición en PageSpeed Insights. */
export const medirEnPageSpeed = (url: string) =>
  `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}&form_factor=mobile`;
