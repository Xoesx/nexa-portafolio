import type { StaticImageData } from "next/image";
import portadaProducto from "./portada-producto.webp";
import portadaRetrato from "./portada-retrato.webp";

/*
 * Fotos de la landing como imports estáticos: Next conoce su tamaño y genera el desenfoque de carga.
 * Va aparte de data.ts porque data.ts también lo importa un componente de cliente (el buscador) y
 * los datos del desenfoque no deben viajar en ese JavaScript.
 *
 * Solo la foto de la portada (y sus recortes) muestra a SonicWave; el resto son fotos de ambiente.
 */
export type Foto = {
  imagen: StaticImageData;
  alt: string;
  /** Recorte dentro del marco. Va en el prop style para que el desenfoque de carga coincida. */
  posicion?: string;
};

const retrato: Foto = {
  imagen: portadaRetrato,
  alt: "Mujer de perfil con auriculares de diadema lila y el pelo al viento",
  posicion: "50% 45%",
};

const producto: Foto = {
  imagen: portadaProducto,
  alt: "Mujer de perfil con auriculares de diadema lila y chaqueta negra, sobre un fondo lila",
  posicion: "45% 40%",
};

// PROVISIONAL: mientras Unsplash siga bloqueado, los huecos nuevos muestran recortes de la portada
// para poder maquetar. No se publica así: cada entrada se reemplaza por su foto de ambiente.
const provisional: Foto = { ...retrato, alt: "" };

export const FOTOS_LANDING = {
  retrato,
  producto,
  sonido: provisional,
  confort: provisional,
  estilo: [provisional, provisional, provisional] as const,
  rendimiento: provisional,
  dia: [provisional, provisional, provisional] as const,
  final: { ...producto, alt: "" },
} satisfies Record<string, Foto | readonly Foto[]>;
