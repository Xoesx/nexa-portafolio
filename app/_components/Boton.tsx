import Link from "next/link";
import type { ReactNode } from "react";
import { EXTERNO } from "../_data/sitio";

type Variante = "acento" | "tinta" | "claro";
type Tamano = "sm" | "md" | "lg";

const VARIANTES: Record<Variante, { boton: string; circulo: string }> = {
  acento: {
    boton: "bg-acento text-sobre-acento shadow-[0_18px_36px_-20px_rgb(47_79_191/0.9)] hover:bg-acento-hondo",
    circulo: "bg-white/[0.16]",
  },
  tinta: {
    boton: "bg-tinta text-fondo hover:bg-acento hover:text-sobre-acento",
    circulo: "bg-fondo/[0.14]",
  },
  claro: {
    boton:
      "bg-superficie text-tinta shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-tinta)_12%,transparent)] hover:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-tinta)_30%,transparent)]",
    circulo: "bg-tinta/[0.06]",
  },
};

const TAMANOS: Record<Tamano, { boton: string; circulo: string }> = {
  sm: { boton: "min-h-10 gap-2.5 py-1 pl-4 pr-1 text-sm", circulo: "h-8 w-8" },
  md: { boton: "min-h-12 gap-3 py-1.5 pl-6 pr-1.5", circulo: "h-9 w-9" },
  lg: { boton: "min-h-14 gap-4 py-1.5 pl-7 pr-1.5 text-lg", circulo: "h-11 w-11" },
};

type Props = {
  href: string;
  children: ReactNode;
  /** El ícono va dentro de su propio círculo, pegado al borde derecho del botón. */
  icono: ReactNode;
  variante?: Variante;
  tam?: Tamano;
  /** Enlaces que salen del sitio (WhatsApp, GitHub): se abren en otra pestaña. */
  externo?: boolean;
  className?: string;
};

/**
 * Botón píldora con el ícono anidado en un círculo. Al pasar el mouse el círculo se adelanta un poco y
 * crece; al presionar, todo el botón se hunde al instante (la respuesta va en el press, no al soltar).
 */
export function Boton({ href, children, icono, variante = "acento", tam = "md", externo = false, className = "" }: Props) {
  const v = VARIANTES[variante];
  const t = TAMANOS[tam];
  const clases = `group/boton inline-flex items-center rounded-full font-semibold transition-[transform,background-color,box-shadow,color] duration-500 ease-resorte active:scale-[0.97] active:duration-100 ${v.boton} ${t.boton} ${className}`;
  const contenido = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-resorte group-hover/boton:-translate-y-px group-hover/boton:translate-x-0.5 group-hover/boton:scale-105 ${v.circulo} ${t.circulo}`}
      >
        {icono}
      </span>
    </>
  );

  return externo ? (
    <a href={href} {...EXTERNO} className={clases}>
      {contenido}
    </a>
  ) : (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}
