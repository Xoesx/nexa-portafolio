"use client";

import { useSyncExternalStore } from "react";
import { ANIO_ESCOLAR, COLEGIO, FECHAS_ADMISION } from "../data";
import { aISO, avisoDeEtapa, estadosDelCalendario, rangoLegible, type EstadoEtapa } from "../lib/calendario";

// "Hoy" solo existe en el navegador: el servidor genera la página una vez y la sirve igual todos los días.
const sinCambios = () => () => {};
const hoyLocal = () => aISO(new Date());
const enServidor = () => null;

const BORDE: Record<EstadoEtapa, string> = {
  pasada: "border-[#7a1f2b]/35",
  "en-curso": "border-[#7a1f2b]",
  siguiente: "border-[#c9a227]",
  pendiente: "border-[#e3d8c6]",
};

/** Calendario de admisión que marca en qué etapa estamos y cuánto falta para la siguiente. */
export function CalendarioAdmision() {
  const hoy = useSyncExternalStore(sinCambios, hoyLocal, enServidor);
  const estados = hoy ? estadosDelCalendario(FECHAS_ADMISION, hoy) : null;
  const termino = estados?.every((e) => e === "pasada");

  return (
    <>
      {termino && (
        <p className="mt-6 max-w-2xl rounded-lg bg-[#fbf3dc] px-4 py-3 text-[15px] leading-relaxed">
          La admisión {ANIO_ESCOLAR} ya cerró. Si buscas una vacante que haya quedado libre, llama a secretaría al {COLEGIO.telefono}.
        </p>
      )}
      <ol className="mt-10 grid grid-cols-1 gap-x-5 gap-y-7 md:grid-cols-5">
        {FECHAS_ADMISION.map((etapa, i) => {
          const estado = estados?.[i] ?? "pendiente";
          const aviso = hoy && estados ? avisoDeEtapa(etapa, estado, hoy) : null;
          const resaltada = estado === "en-curso" || estado === "siguiente";
          return (
            <li
              key={etapa.titulo}
              aria-current={estado === "en-curso" ? "step" : undefined}
              className={`border-l-[3px] pl-4 md:border-l-0 md:border-t-[3px] md:pl-0 md:pt-4 ${BORDE[estado]}`}
            >
              <p className="text-sm tabular-nums text-[#6b5f56]">
                <time dateTime={etapa.fecha}>{rangoLegible(etapa)}</time>
              </p>
              <h3 className={`mt-1 font-bold leading-snug ${estado === "pasada" ? "text-[#6b5f56]" : ""}`}>{etapa.titulo}</h3>
              <p className={`mt-1 text-sm leading-relaxed ${estado === "pasada" ? "text-[#8a7d72]" : "text-[#5a4f47]"}`}>{etapa.detalle}</p>
              {/* El espacio se reserva desde el servidor para que el aviso no mueva la página al aparecer. */}
              <p className={`mt-3 min-h-5 text-sm font-bold ${resaltada ? "text-[#7a1f2b]" : "text-[#8a7d72]"}`}>{aviso}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
}
