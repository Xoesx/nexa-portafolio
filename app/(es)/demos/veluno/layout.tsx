import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import s from "./veluno.module.css";

// Outfit es la sans geométrica más cercana a la referencia: "a" y "g" de un solo piso y la misma altura de x.
const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-veluno" });

export const metadata: Metadata = {
  title: "Veluno | Tecnología inteligente, vida más simple",
  description:
    "Demo de NEXA: recreación visual de la portada de Veluno, una tienda de electrónica, con su cabecera, banner y producto destacado.",
  // Recreación sin tienda real detrás: no se ofrece a los buscadores.
  robots: { index: false, follow: false },
};

// El cielo llega hasta el borde (también bajo la muesca); el contenido se aparta con env(safe-area-inset-*).
export const viewport: Viewport = {
  themeColor: "#79adaa",
  viewportFit: "cover",
};

export default function VelunoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${outfit.variable} ${s.escena}`}>{children}</div>;
}
