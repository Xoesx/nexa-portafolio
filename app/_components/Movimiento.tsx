"use client";

import { useEffect } from "react";

/**
 * Inclinación 3D con el mouse. Cualquier elemento con `data-inclinar` recibe las variables
 * --px y --py (de -0.5 a 0.5, según dónde está el puntero) y el CSS decide qué mover.
 * Un solo escuchador para toda la página; los componentes siguen siendo de servidor.
 * Solo se activa con mouse o trackpad y si el usuario no pidió reducir el movimiento.
 */
export function Movimiento() {
  useEffect(() => {
    const permitido = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!permitido.matches) return;

    let activo: HTMLElement | null = null;
    let ultimo: PointerEvent | null = null;
    let cuadro = 0;

    const soltar = () => {
      if (!activo) return;
      activo.style.setProperty("--px", "0");
      activo.style.setProperty("--py", "0");
      delete activo.dataset.activo;
      activo = null;
    };

    const aplicar = () => {
      cuadro = 0;
      if (!activo || !ultimo) return;
      const r = activo.getBoundingClientRect();
      const x = Math.min(Math.max((ultimo.clientX - r.left) / r.width, 0), 1) - 0.5;
      const y = Math.min(Math.max((ultimo.clientY - r.top) / r.height, 0), 1) - 0.5;
      activo.style.setProperty("--px", x.toFixed(3));
      activo.style.setProperty("--py", y.toFixed(3));
    };

    const mover = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-inclinar]") : null;
      if (el !== activo) {
        soltar();
        activo = el;
        if (activo) activo.dataset.activo = "";
      }
      if (!activo) return;
      ultimo = e;
      if (!cuadro) cuadro = requestAnimationFrame(aplicar);
    };

    document.addEventListener("pointermove", mover, { passive: true });
    document.documentElement.addEventListener("pointerleave", soltar);
    window.addEventListener("scroll", soltar, { passive: true });
    window.addEventListener("blur", soltar);

    return () => {
      soltar();
      cancelAnimationFrame(cuadro);
      document.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("pointerleave", soltar);
      window.removeEventListener("scroll", soltar);
      window.removeEventListener("blur", soltar);
    };
  }, []);

  return null;
}
