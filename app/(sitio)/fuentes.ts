import { Archivo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

// Fuentes de la marca NEXA. Se cargan en el layout de (sitio) y no en el raíz,
// así los demos no descargan fuentes que no usan. Cada una tiene un papel:

/** Títulos: Archivo con su eje de ancho, para titulares anchos y firmes. */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

/** Texto corrido: Source Sans 3, humanista y muy legible. */
export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source",
});

/** Etiquetas, datos y detalles técnicos. */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-plex",
});

/**
 * Notas escritas a mano: pocas y cortas. Es Caveat 600 recortada a minúsculas, tildes, ñ y
 * puntuación (16 KB en vez de 50 KB). Se descargó de Google Fonts con el parámetro text=:
 * si una nota nueva usa mayúsculas o números, hay que volver a descargarla con esos caracteres.
 */
export const caveat = localFont({
  src: "./tipografias/caveat-notas.woff2",
  weight: "600",
  display: "swap",
  preload: false,
  variable: "--font-caveat",
});
