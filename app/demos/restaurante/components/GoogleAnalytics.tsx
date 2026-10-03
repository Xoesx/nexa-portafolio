"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { leerConsent, EVENTO_CONSENT, type NivelConsent } from "../lib/consent";

// Tipado explícito como string para evitar que TS lo infiera como literal
const GA_ID: string = "PENDIENTE";

const estaConfigurado =
  GA_ID !== "PENDIENTE" &&
  GA_ID !== "G-XXXXXXXXXX" &&
  GA_ID.startsWith("G-") &&
  GA_ID.length > 5;

export function GoogleAnalytics() {
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
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
