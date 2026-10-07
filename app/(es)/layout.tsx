import type { Metadata, Viewport } from "next";
import { ScriptTema } from "../_components/ScriptTema";
import { metadataRaiz } from "../_data/metadata";
import "../globals.css";

export const metadata: Metadata = metadataRaiz("es");

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
};

/** Layout raíz en español: el sitio de NEXA en / y los cuatro demos en /demos. */
export default function LayoutEspanol({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ScriptTema />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
