import type { Viewport } from "next";
import { Movimiento } from "../_components/Movimiento";
import { archivo, caveat, plexMono, sourceSans } from "./fuentes";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1119" },
  ],
};

export default function SitioLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      className={`nexa ${archivo.variable} ${sourceSans.variable} ${plexMono.variable} ${caveat.variable} flex min-h-full flex-1 flex-col bg-fondo font-sans text-tinta`}
    >
      {children}
      <Movimiento />
    </div>
  );
}
