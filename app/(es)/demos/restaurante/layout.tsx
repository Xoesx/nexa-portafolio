import { Inter } from "next/font/google";
import { preload } from "react-dom";
import "./fonts.css";
import { PlatosProvider } from "./lib/context/PlatosContext";
import { CookieBanner } from "./components/CookieBanner";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { LiveChat } from "./components/LiveChat";

// Fuentes del primer pantallazo: precargarlas evita que el título cambie de tamaño al cargar (CLS).
const FUENTES_CRITICAS = ["/fonts/Cormorant-400.woff2"];

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export default function RestauranteLayout({ children }: { children: React.ReactNode }) {
  for (const href of FUENTES_CRITICAS) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <div className={`${inter.variable} overflow-x-clip`} style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
      <PlatosProvider>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
        <LiveChat />
      </PlatosProvider>
    </div>
  );
}
