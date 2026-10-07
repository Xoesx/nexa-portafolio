"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore, type MouseEvent } from "react";

type Tema = "claro" | "oscuro";

const CLAVE = "nexa-tema";
const BARRA: Record<Tema, string> = { claro: "#f7f8fa", oscuro: "#0c1119" };
const sistemaOscuro = () => window.matchMedia("(prefers-color-scheme: dark)");

function guardado(): Tema | null {
  try {
    const t = localStorage.getItem(CLAVE);
    return t === "oscuro" || t === "claro" ? t : null;
  } catch {
    return null;
  }
}

function aplicar(t: Tema) {
  document.documentElement.dataset.tema = t;
  // Color de la barra del navegador en el celular.
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", BARRA[t]));
}

// El tema vive en <html data-tema>: lo pone el script del layout raíz y este botón lo cambia.
const suscribir = (avisar: () => void) => {
  const observador = new MutationObserver(avisar);
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
  return () => observador.disconnect();
};
const leer = (): Tema => (document.documentElement.dataset.tema === "oscuro" ? "oscuro" : "claro");

/** Etiqueta accesible y título del botón, en el idioma de la página. */
type Props = { etiqueta: string; titulo: string };

export function TemaBoton({ etiqueta, titulo }: Props) {
  // En el servidor no se sabe el tema: el ícono lo decide el CSS y aria-pressed llega al hidratar.
  const tema = useSyncExternalStore(suscribir, leer, () => null);

  // En desarrollo, React reinicia los atributos de <html> al remontar; esto los repone antes de pintar.
  useLayoutEffect(() => {
    const t = guardado() ?? (sistemaOscuro().matches ? "oscuro" : "claro");
    if (document.documentElement.dataset.tema !== t) document.documentElement.dataset.tema = t;
    if (guardado()) aplicar(t);
  }, []);

  // Si la persona no eligió un tema, sigue al sistema aunque cambie con la página abierta.
  useEffect(() => {
    const mq = sistemaOscuro();
    const cambio = (e: MediaQueryListEvent) => {
      if (!guardado()) document.documentElement.dataset.tema = e.matches ? "oscuro" : "claro";
    };
    mq.addEventListener("change", cambio);
    return () => mq.removeEventListener("change", cambio);
  }, []);

  const alternar = (e: MouseEvent<HTMLButtonElement>) => {
    const siguiente: Tema = leer() === "oscuro" ? "claro" : "oscuro";
    const confirmar = () => {
      aplicar(siguiente);
      try {
        localStorage.setItem(CLAVE, siguiente);
      } catch {
        // Sin almacenamiento (modo privado): el cambio vale solo para esta visita.
      }
    };

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto || !document.startViewTransition) {
      confirmar();
      return;
    }

    // Círculo que se abre desde el botón. Con teclado no hay coordenadas: se usa su centro.
    const caja = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || caja.left + caja.width / 2;
    const y = e.clientY || caja.top + caja.height / 2;
    const radio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const raiz = document.documentElement;
    raiz.classList.add("cambio-tema");
    const transicion = document.startViewTransition(confirmar);
    transicion.ready
      .then(() =>
        raiz.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radio}px at ${x}px ${y}px)`] },
          { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
    transicion.finished.finally(() => raiz.classList.remove("cambio-tema"));
  };

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={etiqueta}
      aria-pressed={tema === null ? undefined : tema === "oscuro"}
      title={titulo}
      className="tema-boton grid h-11 w-11 shrink-0 place-items-center rounded-full border border-linea text-tinta transition-colors hover:border-tinta/40 hover:bg-superficie"
    >
      <svg className="icono-luna" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
      </svg>
      <svg className="icono-sol" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
}
