"use client";

import { useRef } from "react";
import { AVISOS } from "../data";
import s from "../veluno.module.css";
import { IconoLupa } from "./Iconos";

/**
 * Buscador de la cabecera. La demo no tiene catálogo, así que al enviar
 * no finge resultados: muestra un aviso debajo del campo.
 */
export function Buscador({ id, className }: { id: string; className?: string }) {
  const aviso = useRef<HTMLDivElement>(null);

  return (
    <form
      role="search"
      className={`${s.buscador} ${s.anclaje} ${s.disparador} ${className ?? ""}`}
      onSubmit={(evento) => {
        evento.preventDefault();
        aviso.current?.showPopover();
      }}
    >
      <label htmlFor={id} className={s.oculto}>
        Buscar productos
      </label>
      <IconoLupa className={s.buscadorIcono} />
      <input id={id} name="q" type="search" placeholder="Buscar" autoComplete="off" enterKeyHint="search" />
      <div ref={aviso} popover="auto" role="status" className={s.aviso}>
        {AVISOS.busqueda}
      </div>
    </form>
  );
}
