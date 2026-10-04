import { Figtree, Young_Serif } from "next/font/google";

// Fuentes de la marca NEXA. Se cargan en el layout de (sitio) y no en el raíz,
// así los demos no descargan fuentes que no usan.
export const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-young-serif",
});

export const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});
