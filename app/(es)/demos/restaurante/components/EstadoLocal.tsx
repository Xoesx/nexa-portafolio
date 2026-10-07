"use client";

import { useSyncExternalStore } from "react";
import { ahoraEnPucallpa, estadoDelLocal, type EstadoLocal as Estado } from "../lib/horario";

// Se revisa cada minuto para que "cierra pronto" aparezca sin recargar la página.
const cadaMinuto = (avisar: () => void) => {
  const id = setInterval(avisar, 60_000);
  return () => clearInterval(id);
};

// useSyncExternalStore necesita el mismo objeto mientras el estado no cambie.
let ultimo: Estado | null = null;
const leer = () => {
  const estado = estadoDelLocal(ahoraEnPucallpa());
  if (ultimo?.texto !== estado.texto) ultimo = estado;
  return ultimo;
};

/** Si el local está abierto ahora, con la hora de Pucallpa. En el HTML del servidor muestra el horario general. */
export function EstadoLocal({ className = "" }: { className?: string }) {
  const estado = useSyncExternalStore(cadaMinuto, leer, () => null);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${!estado ? "bg-current opacity-40" : estado.abierto ? "bg-[#3C9D5D]" : "bg-[#C1440E]"}`}
      />
      {estado?.texto ?? "Todos los días desde las 12:00"}
    </span>
  );
}
