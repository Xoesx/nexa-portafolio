import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Steakhouse | Demo de NEXA",
  description:
    "Demo de NEXA: landing bilingüe (español e inglés) para una parrilla premium, con carta por tiempos, eventos y formulario de reserva validado.",
  openGraph: {
    title: "Steakhouse | Demo de NEXA",
    description: "Landing bilingüe para una parrilla premium, hecha por NEXA.",
    url: "/demos/steakhouse",
  },
};

export default function SteakhouseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
