"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { leerConsent, EVENTO_CONSENT, type NivelConsent } from "../lib/consent";

// Tipado explícito como string
const TAWK_PROPERTY_ID: string = "PENDIENTE";
const TAWK_WIDGET_ID: string = "default";

const estaConfigurado =
  TAWK_PROPERTY_ID !== "PENDIENTE" &&
  TAWK_PROPERTY_ID !== "XXXXXXXXXXX" &&
  TAWK_PROPERTY_ID.length > 5;

export function LiveChat() {
  const [consent, setConsent] = useState<NivelConsent>("pending");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setConsent(leerConsent());
    setMontado(true);

    const handler = (e: Event) => {
      const detalle = (e as CustomEvent<NivelConsent>).detail;
      setConsent(detalle);
    };
    window.addEventListener(EVENTO_CONSENT, handler);
    return () => window.removeEventListener(EVENTO_CONSENT, handler);
  }, []);

  if (!estaConfigurado || !montado || consent !== "all") return null;

  return (
    <Script id="tawk-init" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function(){
          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
