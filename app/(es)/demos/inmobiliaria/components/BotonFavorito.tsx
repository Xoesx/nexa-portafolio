"use client";

import { useFavoritos } from "../lib/favoritos";

export function BotonFavorito({ id, titulo, conTexto = false }: { id: string; titulo: string; conTexto?: boolean }) {
  const { esFavorito, alternar } = useFavoritos();
  const activo = esFavorito(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        alternar(id);
      }}
      aria-pressed={activo}
      aria-label={conTexto ? undefined : activo ? `Quitar ${titulo} de favoritos` : `Guardar ${titulo} en favoritos`}
      className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-full transition-colors ${
        conTexto
          ? "min-h-11 border border-[#e7e1d8] bg-white px-4 text-sm font-semibold hover:border-[#b4532a]"
          : "h-10 w-10 bg-white/95 shadow-md hover:bg-white"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={activo ? "#b4532a" : "none"}
        stroke={activo ? "#b4532a" : "#1c1917"}
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.8 3.8 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.4 0 5.6 3.3 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4Z" />
      </svg>
      {conTexto && (activo ? "Guardado" : "Guardar")}
    </button>
  );
}
