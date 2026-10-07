"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { buscarTratamiento, DOCTORES, doctoresPara } from "../data";
import { aISO, primerHorarioLibre, proximosDias, type HorarioLibre } from "../lib/agenda";

const TRATAMIENTO = "evaluacion";

// El horario depende del día de hoy, así que se calcula en el navegador y una sola vez por visita.
let cache: HorarioLibre | null | undefined;
function leer() {
  if (cache === undefined) {
    const t = buscarTratamiento(TRATAMIENTO);
    cache = t ? primerHorarioLibre(proximosDias(12), t.minutos, doctoresPara(t.especialidad).map((d) => d.id)) : null;
  }
  return cache;
}
const sinCambios = () => () => {};

const diaCorto = (d: Date) => {
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const dia = d.toLocaleDateString("es-PE", { weekday: "long", day: "numeric" });
  return aISO(d) === aISO(manana) ? `mañana ${dia}` : dia;
};
const horaLegible = (hora: string) => {
  const [h, m] = hora.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "a. m." : "p. m."}`;
};

/** Próximo horario libre para una evaluación, con un enlace que lo deja elegido en la agenda. */
export function ProximoTurno() {
  const turno = useSyncExternalStore(sinCambios, leer, () => null);
  const doctor = turno ? DOCTORES.find((d) => d.id === turno.doctorId) : null;

  return (
    <div className="flex min-h-[3.25rem] items-start gap-3 border-l-2 border-[#14b8a6] pl-4" aria-live="polite">
      {turno && doctor ? (
        <p className="text-[15px] leading-snug text-[#3f5f5b]">
          Próximo horario libre para una evaluación:{" "}
          <strong className="font-bold text-[#0f2a2a]">
            {diaCorto(turno.fecha)}, {horaLegible(turno.hora)}
          </strong>{" "}
          con {doctor.nombre}.{" "}
          <Link
            href={`/demos/dental/agendar?tratamiento=${TRATAMIENTO}&doctor=${turno.doctorId}&fecha=${aISO(turno.fecha)}&hora=${turno.hora}`}
            className="whitespace-nowrap font-bold text-[#0f766e] underline underline-offset-4"
          >
            Reservar este horario
          </Link>
        </p>
      ) : (
        <p className="text-[15px] leading-snug text-[#3f5f5b]">Reserva tu cita en línea, a cualquier hora del día.</p>
      )}
    </div>
  );
}
