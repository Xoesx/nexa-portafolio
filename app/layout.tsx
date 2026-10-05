import type { Metadata, Viewport } from "next";
import { SITIO } from "./_data/sitio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: SITIO.titulo,
  description: SITIO.descripcion,
  applicationName: SITIO.nombre,
  authors: [{ name: SITIO.nombreLegal }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: SITIO.nombre,
    title: SITIO.titulo,
    description: SITIO.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: SITIO.titulo,
    description: SITIO.descripcion,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
};

/*
 * Pone el tema (claro u oscuro) en <html> antes del primer pintado, así no hay destello.
 * Usa la elección guardada y, si no hay, la del sistema. Solo las páginas de NEXA lo usan:
 * el CSS del modo oscuro está limitado a ellas y los demos se ven siempre igual.
 */
const TEMA = `(function(){try{var t=localStorage.getItem("nexa-tema");if(t!=="oscuro"&&t!=="claro")t=matchMedia("(prefers-color-scheme: dark)").matches?"oscuro":"claro";document.documentElement.dataset.tema=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
