"use client";

import Script from "next/script";
import { useConsent } from "../lib/consent";

// Tipado explícito como string para evitar que TS lo infiera como literal
const GA_ID: string = "PENDIENTE";

const estaConfigurado =
  GA_ID !== "PENDIENTE" &&
  GA_ID !== "G-XXXXXXXXXX" &&
  GA_ID.startsWith("G-") &&
  GA_ID.length > 5;

export function GoogleAnalytics() {
  const consent = useConsent();

  if (!estaConfigurado || consent !== "all") return null;

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
