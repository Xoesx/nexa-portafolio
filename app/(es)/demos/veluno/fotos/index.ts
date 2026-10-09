import type { StaticImageData } from "next/image";
import ciudadImg from "./ciudad.webp";
import portadaProducto from "./portada-producto.webp";
import portadaRetrato from "./portada-retrato.webp";

/*
 * Fotos de la landing. Las propias van como imports estáticos (Next conoce su tamaño y genera el
 * desenfoque de carga); las de Unsplash se sirven en alta resolución desde su CDN, a través del
 * optimizador de Next (images.unsplash.com ya está permitido en next.config y en la CSP).
 * Va aparte de data.ts porque data.ts también lo importa un componente de cliente (el buscador).
 *
 * Solo la foto de la portada (y sus recortes) muestra a SonicWave; el resto son fotos de ambiente
 * y de los otros productos del catálogo, y su texto alternativo nunca las llama SonicWave.
 */
export type Foto = {
  src: StaticImageData | string;
  alt: string;
  /** Recorte dentro del marco. Va en el prop style para que el desenfoque de carga coincida. */
  posicion?: string;
  /** Color dominante: fondo del marco mientras llega una foto remota. */
  color?: string;
  credito?: { autor: string; enlace: string };
};

/** URL de Unsplash a 2400 px: la fuente que el optimizador de Next recorta a cada ancho. */
function unsplash(foto: string, ancho = 2400) {
  return `https://images.unsplash.com/${foto}?auto=format&fit=max&w=${ancho}&q=85`;
}

const retrato: Foto = {
  src: portadaRetrato,
  alt: "Mujer de perfil con auriculares de diadema lila y el pelo al viento",
  posicion: "50% 45%",
};

const producto: Foto = {
  src: portadaProducto,
  alt: "Mujer de perfil con auriculares de diadema lila y chaqueta negra, sobre un fondo lila",
  posicion: "45% 40%",
};

const ciudad: Foto = {
  src: ciudadImg,
  alt: "Rascacielos de vidrio y una antena al atardecer, con el cielo azul y rosado",
  posicion: "50% 60%",
};

// PROVISIONAL hasta elegir las fotos de Unsplash: se reemplaza entrada por entrada.
const provisional: Foto = { ...retrato, alt: "" };
void unsplash;

export const FOTOS_LANDING = {
  retrato,
  producto,
  ciudad,
  sonido: provisional,
  allaDeLoReal: provisional,
  coleccion: { airbeats: provisional, cylinder: provisional, visiontone: provisional },
  confort: provisional,
  estilo: [provisional, provisional, provisional] as const,
  rendimiento: provisional,
  dia: [provisional, provisional, provisional] as const,
  detalle: [provisional, provisional, provisional] as const,
  final: { ...producto, alt: "" },
};
