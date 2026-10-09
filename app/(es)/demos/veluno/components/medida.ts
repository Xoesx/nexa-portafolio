import type { CSSProperties } from "react";

/**
 * Ancho aproximado, en em, de la palabra más larga de uno o varios textos (Outfit 500 con el
 * interletrado negativo de los títulos ronda 0,5 em por letra). Los títulos de columna lo usan para
 * no ser más grandes de lo que cabe: font-size ≤ ancho de la columna / palabra más larga.
 */
export function palabraMasLarga(textos: string | readonly string[]): CSSProperties {
  const palabras = [textos].flat().flatMap((texto) => texto.split(/\s+/));
  const letras = Math.max(...palabras.map((palabra) => palabra.length));
  return { "--palabra": (letras * 0.5).toFixed(2) } as CSSProperties;
}
