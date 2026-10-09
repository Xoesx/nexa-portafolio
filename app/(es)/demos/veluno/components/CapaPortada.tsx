"use client";

import type { FocusEvent, ReactNode } from "react";

/**
 * La capa con el texto de la portada. Con el recorrido activo se desvanece al bajar, pero sigue
 * siendo enfocable y legible para lectores de pantalla. Si el foco del teclado vuelve a ella desde
 * más abajo (Shift+Tab), la página sube al inicio para que lo enfocado se vea como en la portada
 * y no sobre la cámara a oscuras.
 */
export function CapaPortada({ className, children }: { className: string; children: ReactNode }) {
  function alEnfocar(evento: FocusEvent<HTMLDivElement>) {
    if (!evento.target.matches(":focus-visible")) return;

    const hayRecorrido =
      CSS.supports("animation-timeline: view()") &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const viaje = evento.currentTarget.closest("section");
    if (!hayRecorrido || !viaje || viaje.getBoundingClientRect().top >= 0) return;

    // Solo el header queda por encima del recorrido: el principio de la página es la portada intacta.
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className={className} onFocus={alEnfocar}>
      {children}
    </div>
  );
}
