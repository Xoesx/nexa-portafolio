"use client";

import { useEffect, useRef, useState } from "react";
import { IconoWhatsApp } from "./Iconos";
import { TemaBoton } from "./TemaBoton";

type Enlace = { href: string; label: string };

type Props = {
  enlaces: Enlace[];
  etiquetas: { abrir: string; cerrar: string; nav: string };
  idiomaAlterno: { href: string; nombre: string; hreflang: string };
  tema: { etiqueta: string; titulo: string };
  cta: { href: string; label: string };
};

const ENFOCABLES = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Menú del celular. Vive dentro de la isla de navegación: el botón queda en la isla y la capa de vidrio
 * se abre detrás de ella, a pantalla completa. Mientras está abierto, el foco no sale de la isla.
 */
export function MenuMovil({ enlaces, etiquetas, idiomaAlterno, tema, cta }: Props) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const capa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const raiz = document.documentElement;
    const overflowAntes = raiz.style.overflow;
    raiz.style.overflow = "hidden";

    const isla = boton.current?.closest<HTMLElement>(".isla");
    const visibles = () => Array.from(isla?.querySelectorAll<HTMLElement>(ENFOCABLES) ?? []).filter((el) => el.getClientRects().length > 0);

    const cuadro = requestAnimationFrame(() => capa.current?.querySelector<HTMLElement>("a")?.focus());

    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const lista = visibles();
      if (lista.length === 0) return;
      const primero = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    // Si la ventana crece hasta mostrar la navegación de escritorio, el menú se cierra solo.
    const escritorio = window.matchMedia("(min-width: 64rem)");
    const alCrecer = () => escritorio.matches && setAbierto(false);

    window.addEventListener("keydown", tecla);
    escritorio.addEventListener("change", alCrecer);
    return () => {
      raiz.style.overflow = overflowAntes;
      cancelAnimationFrame(cuadro);
      window.removeEventListener("keydown", tecla);
      escritorio.removeEventListener("change", alCrecer);
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);
  const linea = "absolute h-[1.5px] w-[18px] rounded-full bg-current transition-[translate,rotate] duration-500 ease-resorte";

  return (
    <>
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        aria-label={abierto ? etiquetas.cerrar : etiquetas.abrir}
        className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-tinta transition-[background-color,transform] duration-300 ease-resorte hover:bg-tinta/[0.06] active:scale-95 lg:hidden"
      >
        <span aria-hidden="true" className={`${linea} ${abierto ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]"}`} />
        <span aria-hidden="true" className={`${linea} ${abierto ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]"}`} />
      </button>

      <div
        ref={capa}
        id="menu-movil"
        data-abierto={abierto ? "" : undefined}
        inert={!abierto}
        className="menu-capa fixed inset-0 -z-10 flex flex-col overflow-y-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 lg:hidden"
      >
        <nav aria-label={etiquetas.nav}>
          <ul>
            {enlaces.map((e, i) => (
              <li key={e.href} data-cascada style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={e.href}
                  onClick={cerrar}
                  className="flex min-h-[4.25rem] items-center border-b border-linea font-display text-[2rem] leading-none tracking-[-0.03em] text-tinta transition-colors hover:text-acento"
                >
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div data-cascada style={{ "--i": enlaces.length } as React.CSSProperties} className="mt-10 flex items-center gap-3">
          <a
            href={idiomaAlterno.href}
            hrefLang={idiomaAlterno.hreflang}
            lang={idiomaAlterno.hreflang}
            className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold text-tinta shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-tinta)_14%,transparent)]"
          >
            {idiomaAlterno.nombre}
          </a>
          <TemaBoton
            etiqueta={tema.etiqueta}
            titulo={tema.titulo}
            className="shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-tinta)_14%,transparent)]"
          />
        </div>

        <a
          data-cascada
          style={{ "--i": enlaces.length + 1 } as React.CSSProperties}
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={cerrar}
          className="group/boton mt-auto flex min-h-14 items-center justify-between rounded-full bg-acento py-1.5 pl-7 pr-1.5 text-lg font-semibold text-sobre-acento transition-transform duration-500 ease-resorte active:scale-[0.98] active:duration-100"
        >
          {cta.label}
          <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.16]">
            <IconoWhatsApp tam={20} />
          </span>
        </a>
      </div>
    </>
  );
}
