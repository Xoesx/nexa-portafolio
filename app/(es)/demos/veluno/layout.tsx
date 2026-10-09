import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import s from "./veluno.module.css";

// Outfit es la sans geométrica más cercana a la referencia: "a" y "g" de un solo piso y la misma altura de x.
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-veluno" });

export const metadata: Metadata = {
  title: "Veluno | Tecnología inteligente, vida más simple",
  description:
    "Demo de NEXA: recreación visual de la portada de Veluno, una tienda de electrónica: su cabecera y un recorrido por los auriculares SonicWave.",
  // Recreación sin tienda real detrás: no se ofrece a los buscadores.
  robots: { index: false, follow: false },
};

// El fondo llega hasta el borde (también bajo la muesca); el contenido se aparta con env(safe-area-inset-*).
// La barra del navegador toma el mismo blanco roto que hay detrás del header.
export const viewport: Viewport = {
  themeColor: "#fbfbfa",
  viewportFit: "cover",
};

export default function VelunoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${outfit.variable} ${s.escena}`}>{children}</div>;
}
