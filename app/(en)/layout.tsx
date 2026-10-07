import type { Metadata, Viewport } from "next";
import { ScriptTema } from "../_components/ScriptTema";
import { metadataRaiz } from "../_data/metadata";
import "../globals.css";

export const metadata: Metadata = metadataRaiz("en");

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
};

/** Layout raíz en inglés: el sitio de NEXA en /en. Los demos siguen en español, en el otro layout. */
export default function LayoutIngles({ children }: LayoutProps<"/en">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ScriptTema />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
