"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { aISO, turnosDelDia } from "../lib/disponibilidad";
import { wa } from "../lib/whatsapp";

const sinSuscripcion = () => () => {};

export function ReservaRapida() {
  const router = useRouter();
  // Las fechas dependen de "hoy": solo se calculan en el navegador para no desfasar el HTML estático.
  const enNavegador = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const [personas, setPersonas] = useState(2);
  const [diaISO, setDiaISO] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  const dias = useMemo(() => {
    if (!enNavegador) return [];
    const hoy = new Date();
    return Array.from({ length: 7 }, (_, i) => new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i));
  }, [enNavegador]);

  // Si no se eligió un día, mostramos el primero que todavía tiene mesas (hoy puede estar cerrado o lleno).
  const dia =
    dias.find((d) => aISO(d) === diaISO) ?? dias.find((d) => turnosDelDia(d, personas, new Date()).some((t) => t.libre)) ?? dias[0];
  const lista = useMemo(() => (dia ? turnosDelDia(dia, personas, new Date()) : []), [dia, personas]);
  const grupoGrande = personas > 8;

  const etiquetaDia = (d: Date, i: number) =>
    i === 0 ? "Hoy" : i === 1 ? "Mañana" : d.toLocaleDateString("es-PE", { weekday: "short" }).replace(".", "");

  const continuar = () => {
    if (!dia || !hora) return;
    router.push(`/demos/restaurante/reservar?fecha=${aISO(dia)}&hora=${hora}&personas=${personas}`);
  };

  return (
    <div className="rounded-3xl bg-white p-5 text-[#1F1A15] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-6">
      <p className="text-[22px] leading-tight" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}>
        Reserva tu mesa
      </p>
      <p className="mt-1 text-[13px] text-[#6E6457]">Te confirmamos al instante y no se cobra nada por reservar.</p>

      {/* Personas */}
      <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#1F1A15]/10 px-4 py-2">
        <span id="rr-personas" className="text-sm font-semibold">
          Personas
        </span>
        <div className="flex items-center gap-3" role="group" aria-labelledby="rr-personas">
          <button
            type="button"
            onClick={() => {
              setPersonas((p) => Math.max(1, p - 1));
              setHora(null);
            }}
            aria-label="Una persona menos"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#1F1A15]/15 text-lg hover:border-[#C1440E] disabled:opacity-40"
            disabled={personas <= 1}
          >
            −
          </button>
          <span className="w-6 text-center text-lg font-semibold tabular-nums" aria-live="polite">
            {personas}
          </span>
          <button
            type="button"
            onClick={() => {
              setPersonas((p) => Math.min(12, p + 1));
              setHora(null);
            }}
            aria-label="Una persona más"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#1F1A15]/15 text-lg hover:border-[#C1440E] disabled:opacity-40"
            disabled={personas >= 12}
          >
            +
          </button>
        </div>
      </div>

      {grupoGrande ? (
        <div className="mt-4 rounded-2xl bg-[#FBF1E9] p-4 text-[14px] leading-relaxed">
          Para más de 8 personas preparamos un menú especial y juntamos mesas.{" "}
          <a href={wa(`Hola, quiero reservar para ${personas} personas en Sabor Criollo.`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C1440E] underline">
            Escríbenos por WhatsApp
          </a>
          .
        </div>
      ) : (
        <>
          {/* Día */}
          <div role="radiogroup" aria-label="Día" className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
            {enNavegador
              ? dias.map((d, i) => (
                  <button
                    key={aISO(d)}
                    type="button"
                    role="radio"
                    aria-checked={dia && aISO(d) === aISO(dia)}
                    onClick={() => {
                      setDiaISO(aISO(d));
                      setHora(null);
                    }}
                    className="flex min-w-[3.9rem] shrink-0 flex-col items-center rounded-2xl border border-[#1F1A15]/10 px-2 py-2 transition-colors hover:border-[#C1440E] aria-checked:border-[#C1440E] aria-checked:bg-[#C1440E] aria-checked:text-white"
                  >
                    <span className="text-[12px] font-semibold first-letter:uppercase">{etiquetaDia(d, i)}</span>
                    <span className="text-lg font-semibold">{d.getDate()}</span>
                  </button>
                ))
              : Array.from({ length: 5 }, (_, i) => <span key={i} className="h-[3.6rem] min-w-[3.9rem] shrink-0 animate-pulse rounded-2xl bg-[#F4EFE7]" />)}
          </div>

          {/* Hora */}
          <div role="radiogroup" aria-label="Hora" className="mt-4 grid max-h-40 grid-cols-4 gap-2 overflow-y-auto pr-1">
            {lista.length === 0 && enNavegador && <p className="col-span-4 text-sm text-[#6E6457]">Ya no quedan horarios hoy. Elige otro día.</p>}
            {lista.map((t) => (
              <button
                key={t.hora}
                type="button"
                role="radio"
                aria-checked={t.hora === hora}
                disabled={!t.libre}
                onClick={() => setHora(t.hora)}
                className="min-h-10 rounded-xl border border-[#1F1A15]/10 text-[14px] font-semibold tabular-nums transition-colors hover:border-[#C1440E] disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#F4EFE7] disabled:text-[#B5AA9B] disabled:line-through aria-checked:border-[#C1440E] aria-checked:bg-[#C1440E] aria-checked:text-white"
              >
                {t.hora}
                {!t.libre && <span className="sr-only"> (sin mesas)</span>}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={continuar}
            disabled={!hora}
            className="mt-5 min-h-12 w-full rounded-full bg-[#1F1A15] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#C1440E] disabled:cursor-not-allowed disabled:bg-[#1F1A15]/40"
          >
            {hora && dia
              ? `Reservar ${dia.toLocaleDateString("es-PE", { weekday: "long", day: "numeric" })} a las ${hora}`
              : "Elige un horario"}
          </button>
        </>
      )}
    </div>
  );
}
