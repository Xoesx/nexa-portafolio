/*
 * Créditos de las fotos de Unsplash que usa la landing (licencia de Unsplash: uso libre, sin
 * obligación de atribuir, pero se reconoce a cada autor en el pie). Datos planos, sin imports de
 * imágenes, para poder probarlos con vitest.
 */
export type Credito = {
  /** Id de la foto en Unsplash. */
  id: string;
  /** Segmento photo-… de su URL en images.unsplash.com. */
  foto: string;
  autor: string;
  /** Página de la foto en Unsplash. */
  enlace: string;
};

export const CREDITOS: readonly Credito[] = [];
