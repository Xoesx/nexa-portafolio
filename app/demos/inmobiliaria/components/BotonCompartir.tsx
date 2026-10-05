"use client";

import { useState } from "react";

export function BotonCompartir({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  const compartir = async () => {
    const url = window.location.href;
    // En el celular abre el menú nativo (WhatsApp, etc.); en computadora copia el enlace.
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, url });
        return;
      } catch {
        // El usuario canceló: no hacemos nada.
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copia este enlace:", url);
    }
  };

  return (
    <button
      type="button"
      onClick={compartir}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#e7e1d8] bg-white px-4 text-sm font-semibold transition-colors hover:border-[#b4532a]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      </svg>
      <span aria-live="polite">{copiado ? "Enlace copiado" : "Compartir"}</span>
    </button>
  );
}
