import "./fonts.css";
import { PlatosProvider } from "./lib/context/PlatosContext";
import { CookieBanner } from "./components/CookieBanner";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { LiveChat } from "./components/LiveChat";

export default function RestauranteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
      <PlatosProvider>
        {children}
        <CookieBanner />
        <GoogleAnalytics />
        <LiveChat />
      </PlatosProvider>
    </div>
  );
}
