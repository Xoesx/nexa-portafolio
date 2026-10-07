"use client";

import { useEffect, useRef, useState } from "react";
import { ANIO_ESCOLAR, fechaLegible, REQUISITOS, VISITAS } from "../data";
import { gradoSegunNacimiento } from "../lib/grado";

const PASOS = ["Estudiante", "Apoderado", "Visita"] as const;

const estiloCampo =
  "mt-1.5 block min-h-12 w-full rounded-lg border border-[#d9cfc0] bg-white px-3.5 text-[15px] outline-none transition-colors focus:border-[#7a1f2b] focus:ring-2 focus:ring-[#7a1f2b]/15 aria-[invalid=true]:border-[#b91c1c]";

type Errores = Record<string, string>;
type Resumen = { codigo: string; estudiante: string; grado: string; apoderado: string; visita: string; turno: string };

// Campos que se validan en cada paso.
const CAMPOS_POR_PASO: string[][] = [
  ["nombres", "apellidos", "nacimiento", "procedencia"],
  ["apoderado", "parentesco", "dni", "telefono", "correo"],
  ["visita", "turno", "acepto"],
];

async function crearEsquema() {
  const { z } = await import("zod");
  return z.object({
    nombres: z.string().trim().min(2, "Escribe los nombres del estudiante."),
    apellidos: z.string().trim().min(2, "Escribe los apellidos."),
    nacimiento: z.string().refine((v) => gradoSegunNacimiento(v) !== null, `La edad no corresponde a ningún grado para ${ANIO_ESCOLAR}.`),
    procedencia: z.string().max(120).optional(),
    apoderado: z.string().trim().min(5, "Escribe el nombre completo del apoderado."),
    parentesco: z.enum(["madre", "padre", "apoderado"], { message: "Elige el parentesco." }),
    dni: z.string().trim().regex(/^\d{8}$/, "El DNI tiene 8 dígitos."),
    telefono: z
      .string()
      .transform((v) => v.replace(/[\s-]/g, ""))
      .pipe(z.string().regex(/^9\d{8}$/, "Escribe un celular de 9 dígitos.")),
    correo: z.email("Revisa el correo."),
    visita: z.enum(VISITAS as [string, ...string[]], { message: "Elige una fecha para tu visita." }),
    turno: z.enum(["9:00", "15:00"], { message: "Elige el turno." }),
    acepto: z.literal("si", { message: "Necesitamos tu autorización para continuar." }),
  });
}

function Campo({
  nombre,
  etiqueta,
  error,
  className,
  children,
}: {
  nombre: string;
  etiqueta: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`pi-${nombre}`} className="text-sm font-bold text-[#3d342e]">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p id={`pi-${nombre}-error`} className="mt-1.5 text-sm text-[#b91c1c]">
          {error}
        </p>
      )}
    </div>
  );
}

const a11y = (nombre: string, errores: Errores) => ({
  id: `pi-${nombre}`,
  name: nombre,
  "aria-invalid": errores[nombre] ? true : undefined,
  "aria-describedby": errores[nombre] ? `pi-${nombre}-error` : undefined,
});

export function Preinscripcion() {
  const [paso, setPaso] = useState(0);
  const [errores, setErrores] = useState<Errores>({});
  const [nacimiento, setNacimiento] = useState("");
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const montado = useRef(false);

  const grado = nacimiento ? gradoSegunNacimiento(nacimiento) : null;

  useEffect(() => {
    if (montado.current) titulo.current?.focus();
    montado.current = true;
  }, [paso, resumen]);

  /** Valida los campos del paso indicado (o todos) y muestra los errores. */
  const validarPaso = async (hasta: number) => {
    if (!form.current) return null;
    const esquema = await crearEsquema();
    const r = esquema.safeParse(Object.fromEntries(new FormData(form.current)));
    const campos = CAMPOS_POR_PASO.slice(0, hasta + 1).flat();
    const nuevos: Errores = {};
    if (!r.success) {
      for (const i of r.error.issues) {
        const c = String(i.path[0]);
        if (campos.includes(c)) nuevos[c] ??= i.message;
      }
    }
    setErrores(nuevos);
    const primero = Object.keys(nuevos)[0];
    if (primero) {
      // Si el error está en un paso anterior, volvemos a ese paso.
      const pasoDelError = CAMPOS_POR_PASO.findIndex((cs) => cs.includes(primero));
      if (pasoDelError !== paso) setPaso(pasoDelError);
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus());
      return null;
    }
    return r.success ? r.data : null;
  };

  /** Para avanzar basta con que los campos del paso actual sean válidos. */
  const siguiente = async () => {
    if (!form.current) return;
    const esquema = await crearEsquema();
    const r = esquema.safeParse(Object.fromEntries(new FormData(form.current)));
    const nuevos: Errores = {};
    if (!r.success) {
      for (const i of r.error.issues) {
        const c = String(i.path[0]);
        if (CAMPOS_POR_PASO[paso].includes(c)) nuevos[c] ??= i.message;
      }
    }
    setErrores(nuevos);
    const primero = Object.keys(nuevos)[0];
    if (primero) {
      form.current.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }
    setPaso((p) => p + 1);
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = await validarPaso(2);
    if (!datos) return;
    const g = gradoSegunNacimiento(datos.nacimiento)!;
    const codigo = `HZ-${ANIO_ESCOLAR}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setResumen({
      codigo,
      estudiante: `${datos.nombres} ${datos.apellidos}`,
      grado: g.grado,
      apoderado: datos.apoderado,
      visita: fechaLegible(datos.visita, { weekday: "long", day: "numeric", month: "long" }),
      turno: datos.turno,
    });
  };

  if (resumen) {
    return (
      <div role="status" className="rounded-2xl border border-[#ebe3d6] bg-white p-6 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#7a1f2b]">Preinscripción recibida</p>
        <h3 ref={titulo} tabIndex={-1} className="mt-2 text-3xl font-semibold outline-none" style={{ fontFamily: "var(--font-hz-titulo)" }}>
          Código {resumen.codigo}
        </h3>
        <p className="mt-3 max-w-lg leading-relaxed text-[#5a4f47]">
          Guarda este código. Te esperamos con {resumen.estudiante.split(" ")[0]} el <span className="font-bold">{resumen.visita}</span> a
          las {resumen.turno}.
        </p>
        <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#ebe3d6] bg-[#ebe3d6] sm:grid-cols-3">
          {[
            ["Estudiante", resumen.estudiante],
            ["Grado " + ANIO_ESCOLAR, resumen.grado],
            ["Apoderado", resumen.apoderado],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#fbf8f3] p-4">
              <dt className="text-sm text-[#6b5f56]">{k}</dt>
              <dd className="font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <h4 className="mt-8 font-bold">Lleva estos documentos el día de la visita</h4>
        <ul className="mt-3 space-y-2">
          {REQUISITOS.map((r) => (
            <li key={r} className="flex items-start gap-3 text-[15px]">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c9a227]" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <button type="button" onClick={() => window.print()} className="min-h-12 rounded-lg bg-[#7a1f2b] px-6 font-bold text-white hover:bg-[#5e1520]">
            Imprimir constancia
          </button>
          <button
            type="button"
            onClick={() => {
              setResumen(null);
              setPaso(0);
              setNacimiento("");
            }}
            className="min-h-12 rounded-lg border border-[#d9cfc0] px-6 font-bold hover:border-[#7a1f2b]"
          >
            Preinscribir a otro hijo
          </button>
        </div>
        <p className="mt-6 text-xs text-[#6b5f56]">Demo: la preinscripción no se envía a ningún lugar.</p>
      </div>
    );
  }

  return (
    <form ref={form} noValidate onSubmit={enviar} className="rounded-2xl border border-[#ebe3d6] bg-white p-5 sm:p-8">
      <ol className="flex gap-2" aria-label="Pasos de la preinscripción">
        {PASOS.map((p, i) => (
          <li key={p} aria-current={i === paso ? "step" : undefined} className="flex-1">
            <span className={`block h-1.5 rounded-full ${i <= paso ? "bg-[#7a1f2b]" : "bg-[#efe7da]"}`} />
            <span className={`mt-2 block text-xs font-bold ${i === paso ? "text-[#26201c]" : "text-[#6b5f56]"}`}>
              {i + 1}. {p}
            </span>
          </li>
        ))}
      </ol>

      <h3 ref={titulo} tabIndex={-1} className="mt-6 text-2xl font-semibold outline-none" style={{ fontFamily: "var(--font-hz-titulo)" }}>
        <span className="sr-only">Paso {paso + 1} de 3: </span>
        {["Datos del estudiante", "Datos del apoderado", "Agenda tu visita"][paso]}
      </h3>

      {/* Paso 1 */}
      <fieldset hidden={paso !== 0} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <legend className="sr-only">Estudiante</legend>
        <Campo nombre="nombres" etiqueta="Nombres" error={errores.nombres}>
          <input {...a11y("nombres", errores)} autoComplete="off" className={estiloCampo} />
        </Campo>
        <Campo nombre="apellidos" etiqueta="Apellidos" error={errores.apellidos}>
          <input {...a11y("apellidos", errores)} autoComplete="off" className={estiloCampo} />
        </Campo>
        <Campo nombre="nacimiento" etiqueta="Fecha de nacimiento" error={errores.nacimiento}>
          <input {...a11y("nacimiento", errores)} type="date" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} className={estiloCampo} />
        </Campo>
        <div aria-live="polite" className="self-end">
          {grado ? (
            <p className="rounded-lg bg-[#fbf3dc] px-4 py-3 text-[15px]">
              En {ANIO_ESCOLAR} le corresponde <strong>{grado.grado}</strong>.
            </p>
          ) : (
            nacimiento && (
              <p className="rounded-lg bg-[#fdeaea] px-4 py-3 text-[15px] text-[#8a1c1c]">Esa edad no corresponde a ningún grado para {ANIO_ESCOLAR}.</p>
            )
          )}
        </div>
        <Campo nombre="procedencia" etiqueta="Colegio de procedencia (opcional)" className="sm:col-span-2">
          <input {...a11y("procedencia", errores)} className={estiloCampo} />
        </Campo>
      </fieldset>

      {/* Paso 2 */}
      <fieldset hidden={paso !== 1} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <legend className="sr-only">Apoderado</legend>
        <Campo nombre="apoderado" etiqueta="Nombre completo" error={errores.apoderado} className="sm:col-span-2">
          <input {...a11y("apoderado", errores)} autoComplete="name" className={estiloCampo} />
        </Campo>
        <Campo nombre="parentesco" etiqueta="Parentesco" error={errores.parentesco}>
          <select {...a11y("parentesco", errores)} defaultValue="" className={estiloCampo}>
            <option value="" disabled>
              Elige uno
            </option>
            <option value="madre">Madre</option>
            <option value="padre">Padre</option>
            <option value="apoderado">Otro apoderado</option>
          </select>
        </Campo>
        <Campo nombre="dni" etiqueta="DNI" error={errores.dni}>
          <input {...a11y("dni", errores)} inputMode="numeric" maxLength={8} className={estiloCampo} />
        </Campo>
        <Campo nombre="telefono" etiqueta="Celular" error={errores.telefono}>
          <input {...a11y("telefono", errores)} type="tel" inputMode="tel" autoComplete="tel" placeholder="987 654 321" className={estiloCampo} />
        </Campo>
        <Campo nombre="correo" etiqueta="Correo" error={errores.correo}>
          <input {...a11y("correo", errores)} type="email" autoComplete="email" className={estiloCampo} />
        </Campo>
      </fieldset>

      {/* Paso 3 */}
      <fieldset hidden={paso !== 2} className="mt-5 space-y-6">
        <legend className="sr-only">Visita</legend>
        <div>
          <p id="pi-visita-label" className="text-sm font-bold text-[#3d342e]">
            Fecha de la visita guiada
          </p>
          <div role="radiogroup" aria-labelledby="pi-visita-label" className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {VISITAS.map((v, i) => (
              <label key={v} className="flex min-h-14 cursor-pointer items-center justify-center rounded-lg border border-[#d9cfc0] px-3 text-center text-[15px] font-bold has-[:checked]:border-[#7a1f2b] has-[:checked]:bg-[#7a1f2b] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#7a1f2b]/40">
                <input
                  type="radio"
                  name="visita"
                  value={v}
                  id={i === 0 ? "pi-visita" : undefined}
                  aria-describedby={errores.visita ? "pi-visita-error" : undefined}
                  className="sr-only"
                />
                {fechaLegible(v, { weekday: "short", day: "numeric", month: "short" }).replace(/\./g, "")}
              </label>
            ))}
          </div>
          {errores.visita && (
            <p id="pi-visita-error" className="mt-1.5 text-sm text-[#b91c1c]">
              {errores.visita}
            </p>
          )}
        </div>
        <div>
          <p id="pi-turno-label" className="text-sm font-bold text-[#3d342e]">
            Turno
          </p>
          <div role="radiogroup" aria-labelledby="pi-turno-label" className="mt-2 grid max-w-sm grid-cols-2 gap-3">
            {["9:00", "15:00"].map((t) => (
              <label key={t} className="flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-[#d9cfc0] font-bold has-[:checked]:border-[#7a1f2b] has-[:checked]:bg-[#7a1f2b] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#7a1f2b]/40">
                <input type="radio" name="turno" value={t} className="sr-only" aria-describedby={errores.turno ? "pi-turno-error" : undefined} />
                {t === "9:00" ? "Mañana · 9:00" : "Tarde · 15:00"}
              </label>
            ))}
          </div>
          {errores.turno && (
            <p id="pi-turno-error" className="mt-1.5 text-sm text-[#b91c1c]">
              {errores.turno}
            </p>
          )}
        </div>
        <div>
          <label className="flex items-start gap-3 text-[15px]">
            <input type="checkbox" name="acepto" value="si" aria-describedby={errores.acepto ? "pi-acepto-error" : undefined} className="mt-0.5 h-5 w-5 shrink-0 accent-[#7a1f2b]" />
            Autorizo el uso de estos datos para el proceso de admisión, según la Ley 29733.
          </label>
          {errores.acepto && (
            <p id="pi-acepto-error" className="mt-1.5 text-sm text-[#b91c1c]">
              {errores.acepto}
            </p>
          )}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#efe7da] pt-5">
        <button type="button" onClick={() => setPaso((p) => p - 1)} className={`min-h-12 rounded-lg px-5 font-bold hover:bg-[#fbf8f3] ${paso === 0 ? "invisible" : ""}`}>
          ← Atrás
        </button>
        {paso < 2 ? (
          <button type="button" onClick={siguiente} className="min-h-12 rounded-lg bg-[#7a1f2b] px-7 font-bold text-white hover:bg-[#5e1520]">
            Continuar
          </button>
        ) : (
          <button type="submit" className="min-h-12 rounded-lg bg-[#7a1f2b] px-7 font-bold text-white hover:bg-[#5e1520]">
            Enviar preinscripción
          </button>
        )}
      </div>
    </form>
  );
}
