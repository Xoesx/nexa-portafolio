"use client";

import { useSyncExternalStore } from "react";

const CLAVE = "nexa_sabor_criollo_consent_v1";

export type NivelConsent = "pending" | "essential" | "all";

export function leerConsent(): NivelConsent {
  if (typeof window === "undefined") return "pending";
  try {
    const valor = localStorage.getItem(CLAVE);
    if (valor === "all" || valor === "essential") return valor;
  } catch {}
  return "pending";
}

export function guardarConsent(nivel: NivelConsent) {
  try {
    localStorage.setItem(CLAVE, nivel);
    window.dispatchEvent(new CustomEvent("consent-cambiado", { detail: nivel }));
  } catch {}
}

export const EVENTO_CONSENT = "consent-cambiado";

function suscribirConsent(aviso: () => void) {
  window.addEventListener(EVENTO_CONSENT, aviso);
  window.addEventListener("storage", aviso);
  return () => {
    window.removeEventListener(EVENTO_CONSENT, aviso);
    window.removeEventListener("storage", aviso);
  };
}

/** Nivel de consentimiento actual. En el servidor siempre es "pending". */
export function useConsent(): NivelConsent {
  return useSyncExternalStore(suscribirConsent, leerConsent, () => "pending");
}
