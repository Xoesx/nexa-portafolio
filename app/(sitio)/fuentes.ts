import { Instrument_Sans, Schibsted_Grotesk } from "next/font/google";

// Fuentes de la marca NEXA. Se cargan en el layout de (sitio) y no en el raíz,
// así los demos no descargan fuentes que no usan.
export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

export const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});
