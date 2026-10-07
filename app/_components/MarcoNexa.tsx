import type { Viewport } from "next";
import { archivo, caveat, plexMono, sourceSans } from "../_marca/fuentes";
import { Movimiento } from "./Movimiento";

/** Color de la barra del navegador en el celular, según el tema del sistema. */
export const viewportNexa: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1119" },
  ],
};

/**
 * Envoltura de las páginas de NEXA (no de los demos): fuentes de la marca, colores del tema
 * y la inclinación 3D con el mouse. La clase .nexa es la que activa el modo oscuro en el CSS.
 */
export function MarcoNexa({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`nexa ${archivo.variable} ${sourceSans.variable} ${plexMono.variable} ${caveat.variable} flex min-h-full flex-1 flex-col bg-fondo font-sans text-tinta`}
    >
      {children}
      {/* Grano fijo encima de todo (sin capturar clics): da textura de papel a lo que es plano. */}
      <div aria-hidden="true" className="grano" />
      <Movimiento />
    </div>
  );
}
