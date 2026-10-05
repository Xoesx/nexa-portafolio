"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { buscarTratamiento, CLINICA, DOCTORES, doctoresPara, TRATAMIENTOS, type Doctor, type Tratamiento } from "../data";
import { aISO, crearICS, proximosDias, turnosDel, type Turno } from "../lib/agenda";

const PASOS = ["Tratamiento", "Especialista", "Fecha y hora", "Tus datos"] as const;
const CUALQUIERA = "cualquiera";

type Datos = { nombre: string; dni: string; telefono: string; email?: string; primera?: string };
type Cita = { tratamiento: Tratamiento; doctor: Doctor; inicio: Date; datos: Datos };

const soles = (n: number) => `S/ ${n}`;
const fechaLarga = (d: Date) => d.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" });
const campo =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-[#cfe3df] bg-white px-3.5 text-[15px] outline-none transition-colors focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 aria-[invalid=true]:border-[#b91c1c]";

function Opcion({ activa, onClick, children }: { activa: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={activa}
      onClick={onClick}
      className="w-full rounded-2xl border border-[#cfe3df] bg-white p-4 text-left transition-colors hover:border-[#0f766e] aria-checked:border-[#0f766e] aria-checked:bg-[#f0fdfa] aria-checked:ring-2 aria-checked:ring-[#0f766e]/25"
    >
      {children}
    </button>
  );
}

export function Agenda() {
  // Si el paciente llega desde "¿Qué te está pasando?" o desde un tratamiento, ya viene elegido.
  const preelegido = buscarTratamiento(useSearchParams().get("tratamiento") ?? "");
  const [paso, setPaso] = useState(preelegido ? 1 : 0);
  const [tratamientoId, setTratamientoId] = useState<string | null>(preelegido?.id ?? null);
  const [doctorId, setDoctorId] = useState<string>(CUALQUIERA);
  const [fechaISO, setFechaISO] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [cita, setCita] = useState<Cita | null>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const montado = useRef(false);

  const tratamiento = TRATAMIENTOS.find((t) => t.id === tratamientoId) ?? null;
  const candidatos = useMemo(() => (tratamiento ? doctoresPara(tratamiento.especialidad) : []), [tratamiento]);
  // Los días se calculan al llegar al paso 3, siempre en el navegador (dependen de la fecha de hoy).
  const dias = useMemo(() => (paso >= 2 ? proximosDias(12) : []), [paso]);
  const fecha = dias.find((d) => aISO(d) === fechaISO) ?? null;

  // Turnos del día: con "cualquiera", un turno está libre si al menos un especialista lo tiene libre.
  const turnos: Turno[] = useMemo(() => {
    if (!fecha || !tratamiento) return [];
    const docs = doctorId === CUALQUIERA ? candidatos : candidatos.filter((d) => d.id === doctorId);
    const listas = docs.map((d) => turnosDel(fecha, tratamiento.minutos, d.id));
    return (listas[0] ?? []).map((t, i) => ({ hora: t.hora, libre: listas.some((l) => l[i].libre) }));
  }, [fecha, tratamiento, doctorId, candidatos]);

  useEffect(() => {
    // Al cambiar de paso, llevamos el foco al título para que lectores de pantalla lo anuncien.
    if (montado.current) titulo.current?.focus();
    montado.current = true;
  }, [paso, cita]);

  const puedeAvanzar = [!!tratamiento, true, !!(fecha && hora)][paso] ?? true;

  const confirmar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { z } = await import("zod");
    const r = z
      .object({
        nombre: z.string().trim().min(3, "Escribe tu nombre completo."),
        dni: z.string().trim().regex(/^\d{8}$/, "El DNI tiene 8 dígitos."),
        telefono: z
          .string()
          .transform((v) => v.replace(/[\s-]/g, ""))
          .pipe(z.string().regex(/^9\d{8}$/, "Escribe un celular de 9 dígitos.")),
        email: z.union([z.literal(""), z.email("Revisa el correo.")]).optional(),
        primera: z.string().optional(),
        acepto: z.literal("si", { message: "Necesitamos tu autorización para agendar." }),
      })
      .safeParse(Object.fromEntries(new FormData(form)));

    if (!r.success) {
      const nuevos: Record<string, string> = {};
      for (const i of r.error.issues) nuevos[String(i.path[0])] ??= i.message;
      setErrores(nuevos);
      form.querySelector<HTMLElement>(`[name="${Object.keys(nuevos)[0]}"]`)?.focus();
      return;
    }
    if (!tratamiento || !fecha || !hora) return;

    // Con "cualquiera", asignamos al primer especialista libre en ese horario.
    const doctor =
      DOCTORES.find((d) => d.id === doctorId) ??
      candidatos.find((d) => turnosDel(fecha, tratamiento.minutos, d.id).some((t) => t.hora === hora && t.libre)) ??
      candidatos[0];
    const [h, m] = hora.split(":").map(Number);
    const inicio = new Date(fecha);
    inicio.setHours(h, m, 0, 0);
    setErrores({});
    setCita({ tratamiento, doctor, inicio, datos: r.data });
  };

  const descargarICS = () => {
    if (!cita) return;
    const ics = crearICS({
      titulo: `${cita.tratamiento.nombre} · ${CLINICA.nombre}`,
      inicio: cita.inicio,
      minutos: cita.tratamiento.minutos,
      lugar: CLINICA.direccion,
      detalle: `Con ${cita.doctor.nombre}. Llega 10 minutos antes con tu DNI.`,
    });
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "cita-dental-alba.ics" });
    a.click();
    URL.revokeObjectURL(url);
  };

  const reiniciar = () => {
    setCita(null);
    setPaso(0);
    setTratamientoId(null);
    setDoctorId(CUALQUIERA);
    setFechaISO(null);
    setHora(null);
  };

  if (cita) {
    return (
      <div className="rounded-3xl border border-[#cfe3df] bg-white p-6 sm:p-10" role="status">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ccfbef] text-[#0f766e]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h2 ref={titulo} tabIndex={-1} className="mt-5 text-center text-2xl font-extrabold tracking-tight outline-none sm:text-3xl">
          ¡Tu cita está reservada, {cita.datos.nombre.split(" ")[0]}!
        </h2>
        <dl className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#cfe3df] bg-[#cfe3df] text-[15px] sm:grid-cols-2">
          {[
            ["Tratamiento", cita.tratamiento.nombre],
            ["Especialista", cita.doctor.nombre],
            ["Día", fechaLarga(cita.inicio)],
            ["Hora", cita.inicio.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })],
          ].map(([k, v]) => (
            <div key={k} className="bg-white p-4">
              <dt className="text-sm text-[#3f5f5b]">{k}</dt>
              <dd className="mt-0.5 font-semibold first-letter:uppercase">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-6 max-w-lg text-center text-[15px] leading-relaxed text-[#3f5f5b]">
          Te enviaremos un recordatorio por WhatsApp al {cita.datos.telefono.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")} el día
          anterior. Llega 10 minutos antes con tu DNI.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" onClick={descargarICS} className="min-h-12 rounded-full bg-[#0f766e] px-6 font-semibold text-white hover:bg-[#115e59]">
            Agregar a mi calendario
          </button>
          <button type="button" onClick={reiniciar} className="min-h-12 rounded-full border border-[#cfe3df] px-6 font-semibold hover:border-[#0f766e]">
            Agendar otra cita
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-[#5b7572]">Demo: la cita no se registra en ningún lugar.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#cfe3df] bg-white p-5 sm:p-8">
      {/* Progreso */}
      <ol className="grid grid-cols-4 gap-2" aria-label="Pasos de la reserva">
        {PASOS.map((p, i) => (
          <li key={p} aria-current={i === paso ? "step" : undefined}>
            <span className={`block h-1.5 rounded-full ${i <= paso ? "bg-[#0f766e]" : "bg-[#e2efed]"}`} />
            <span className={`mt-2 hidden text-xs font-semibold sm:block ${i === paso ? "text-[#0f2a2a]" : "text-[#5b7572]"}`}>
              {i + 1}. {p}
            </span>
          </li>
        ))}
      </ol>

      <h2 ref={titulo} tabIndex={-1} className="mt-6 text-2xl font-extrabold tracking-tight outline-none">
        <span className="sr-only">Paso {paso + 1} de 4: </span>
        {["¿Qué necesitas?", "¿Con quién te atiendes?", "Elige día y hora", "Tus datos"][paso]}
      </h2>

      {paso > 0 && paso < 3 && tratamiento && (
        <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[15px] text-[#3f5f5b]">
          Tratamiento: <strong className="font-bold text-[#0f2a2a]">{tratamiento.nombre}</strong> · {tratamiento.minutos} min · desde{" "}
          {soles(tratamiento.desde)}
          <button type="button" onClick={() => setPaso(0)} className="min-h-11 font-bold text-[#0f766e] underline underline-offset-4">
            Cambiar
          </button>
        </p>
      )}

      {/* Paso 1: tratamiento */}
      {paso === 0 && (
        <div role="radiogroup" aria-label="Tratamiento" className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TRATAMIENTOS.map((t) => (
            <Opcion
              key={t.id}
              activa={t.id === tratamientoId}
              onClick={() => {
                setTratamientoId(t.id);
                setDoctorId(CUALQUIERA);
                setHora(null);
              }}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-bold">{t.nombre}</span>
                <span className="shrink-0 text-sm font-semibold text-[#0f766e]">desde {soles(t.desde)}</span>
              </span>
              <span className="mt-1 block text-sm leading-snug text-[#3f5f5b]">{t.resumen}</span>
              <span className="mt-2 block text-xs font-semibold text-[#5b7572]">{t.minutos} minutos</span>
            </Opcion>
          ))}
        </div>
      )}

      {/* Paso 2: especialista */}
      {paso === 1 && (
        <div role="radiogroup" aria-label="Especialista" className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Opcion activa={doctorId === CUALQUIERA} onClick={() => { setDoctorId(CUALQUIERA); setHora(null); }}>
            <span className="font-bold">Primer especialista disponible</span>
            <span className="mt-1 block text-sm text-[#3f5f5b]">Te mostramos más horarios.</span>
          </Opcion>
          {candidatos.map((d) => (
            <Opcion key={d.id} activa={doctorId === d.id} onClick={() => { setDoctorId(d.id); setHora(null); }}>
              <span className="flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e2efed]">
                  <Image src={d.foto} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-bold">{d.nombre}</span>
                  <span className="block text-sm text-[#3f5f5b]">{d.cargo}</span>
                </span>
              </span>
            </Opcion>
          ))}
        </div>
      )}

      {/* Paso 3: fecha y hora */}
      {paso === 2 && (
        <div className="mt-5">
          <div role="radiogroup" aria-label="Día" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {dias.map((d) => {
              const iso = aISO(d);
              return (
                <button
                  key={iso}
                  type="button"
                  role="radio"
                  aria-checked={iso === fechaISO}
                  onClick={() => { setFechaISO(iso); setHora(null); }}
                  className="flex min-w-[4.5rem] shrink-0 flex-col items-center rounded-2xl border border-[#cfe3df] px-3 py-3 transition-colors hover:border-[#0f766e] aria-checked:border-[#0f766e] aria-checked:bg-[#0f766e] aria-checked:text-white"
                >
                  <span className="text-xs font-semibold uppercase">{d.toLocaleDateString("es-PE", { weekday: "short" }).replace(".", "")}</span>
                  <span className="text-2xl font-extrabold">{d.getDate()}</span>
                  <span className="text-xs">{d.toLocaleDateString("es-PE", { month: "short" }).replace(".", "")}</span>
                </button>
              );
            })}
          </div>

          {fecha ? (
            <>
              <p className="mt-5 text-sm font-semibold text-[#3f5f5b] first-letter:uppercase">
                {fechaLarga(fecha)} · {turnos.filter((t) => t.libre).length} horarios libres
              </p>
              <div role="radiogroup" aria-label="Hora" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {turnos.map((t) => (
                  <button
                    key={t.hora}
                    type="button"
                    role="radio"
                    aria-checked={t.hora === hora}
                    disabled={!t.libre}
                    onClick={() => setHora(t.hora)}
                    className="min-h-11 rounded-xl border border-[#cfe3df] text-[15px] font-semibold tabular-nums transition-colors hover:border-[#0f766e] disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#f3f6f6] disabled:text-[#9fb3b0] disabled:line-through aria-checked:border-[#0f766e] aria-checked:bg-[#0f766e] aria-checked:text-white"
                  >
                    {t.hora}
                    {!t.libre && <span className="sr-only"> (ocupado)</span>}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-5 text-[15px] text-[#3f5f5b]">Elige un día para ver los horarios libres.</p>
          )}
        </div>
      )}

      {/* Paso 4: datos */}
      {paso === 3 && tratamiento && fecha && hora && (
        <form id="form-cita" noValidate onSubmit={confirmar} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <p className="rounded-2xl bg-[#f0fdfa] p-4 text-[15px] sm:col-span-2">
            <strong>{tratamiento.nombre}</strong> · <span className="first-letter:uppercase">{fechaLarga(fecha)}</span> a las {hora}
          </p>
          {(
            [
              ["nombre", "Nombre completo", { autoComplete: "name" }],
              ["dni", "DNI", { inputMode: "numeric", maxLength: 8 }],
              ["telefono", "Celular", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "987 654 321" }],
              ["email", "Correo (opcional)", { type: "email", autoComplete: "email" }],
            ] as const
          ).map(([nombre, etiqueta, extra]) => (
            <div key={nombre} className={nombre === "nombre" ? "sm:col-span-2" : undefined}>
              <label htmlFor={`cita-${nombre}`} className="text-sm font-semibold">
                {etiqueta}
              </label>
              <input
                id={`cita-${nombre}`}
                name={nombre}
                {...extra}
                aria-invalid={errores[nombre] ? true : undefined}
                aria-describedby={errores[nombre] ? `cita-${nombre}-error` : undefined}
                className={campo}
              />
              {errores[nombre] && (
                <p id={`cita-${nombre}-error`} className="mt-1.5 text-sm text-[#b91c1c]">
                  {errores[nombre]}
                </p>
              )}
            </div>
          ))}
          <label className="flex min-h-11 items-center gap-3 text-[15px] sm:col-span-2">
            <input type="checkbox" name="primera" value="si" className="h-5 w-5 accent-[#0f766e]" />
            Es mi primera vez en la clínica
          </label>
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 text-[15px]">
              <input
                type="checkbox"
                name="acepto"
                value="si"
                aria-invalid={errores.acepto ? true : undefined}
                aria-describedby={errores.acepto ? "cita-acepto-error" : undefined}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#0f766e]"
              />
              Autorizo el uso de mis datos para gestionar mi cita y recibir recordatorios.
            </label>
            {errores.acepto && (
              <p id="cita-acepto-error" className="mt-1.5 text-sm text-[#b91c1c]">
                {errores.acepto}
              </p>
            )}
          </div>
        </form>
      )}

      {/* Navegación */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#e2efed] pt-5">
        <button
          type="button"
          onClick={() => setPaso((p) => p - 1)}
          className={`min-h-12 rounded-full px-5 font-semibold text-[#0f2a2a] hover:bg-[#f0fdfa] ${paso === 0 ? "invisible" : ""}`}
        >
          ← Atrás
        </button>
        {paso < 3 ? (
          <button
            type="button"
            disabled={!puedeAvanzar}
            onClick={() => setPaso((p) => p + 1)}
            className="min-h-12 rounded-full bg-[#0f766e] px-7 font-semibold text-white transition-colors hover:bg-[#115e59] disabled:cursor-not-allowed disabled:bg-[#a7c8c3]"
          >
            Continuar
          </button>
        ) : (
          <button type="submit" form="form-cita" className="min-h-12 rounded-full bg-[#0f766e] px-7 font-semibold text-white hover:bg-[#115e59]">
            Confirmar cita
          </button>
        )}
      </div>
    </div>
  );
}
