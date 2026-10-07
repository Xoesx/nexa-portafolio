"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ANIO_ESCOLAR, fechaLegible, REQUISITOS, VISITAS } from "../data";
import { proximasVisitas } from "../lib/calendario";
import { gradoSegunNacimiento, motivoSinGrado, rangoNacimiento } from "../lib/grado";

const PASOS = ["Estudiante", "Apoderado", "Visita"] as const;
const RANGO = rangoNacimiento();

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

// Zod se carga recién al validar, así no pesa en la carga inicial de la página.
async function crearEsquema(visitas: string[]) {
  const { z } = await import("zod");
  return z.object({
    nombres: z.string().trim().min(2, "Escribe los nombres del estudiante."),
    apellidos: z.string().trim().min(2, "Escribe los apellidos."),
    nacimiento: z
      .string()
      .min(1, "Escribe la fecha de nacimiento.")
      .refine((v) => gradoSegunNacimiento(v) !== null, { error: (issue) => motivoSinGrado(String(issue.input)) }),
    procedencia: z.string().max(120).optional(),
    apoderado: z.string().trim().min(5, "Escribe el nombre completo del apoderado."),
    parentesco: z.enum(["madre", "padre", "apoderado"], { error: "Elige el parentesco." }),
    dni: z.string().trim().regex(/^\d{8}$/, "El DNI tiene 8 dígitos."),
    telefono: z
      .string()
      .transform((v) => v.replace(/[\s-]/g, ""))
      .pipe(z.string().regex(/^9\d{8}$/, "Escribe un celular de 9 dígitos.")),
    correo: z.email("Revisa el correo."),
    visita: z.enum(visitas as [string, ...string[]], { error: "Elige una fecha para tu visita." }),
    turno: z.enum(VISITAS.turnos, { error: "Elige el turno." }),
    acepto: z.literal("si", { error: "Necesitamos tu autorización para continuar." }),
  });
}

type Esquema = Awaited<ReturnType<typeof crearEsquema>>;

/** El primer error de cada campo, solo de los campos que se están revisando. */
function erroresDe(resultado: ReturnType<Esquema["safeParse"]>, campos: string[]): Errores {
  const errores: Errores = {};
  if (resultado.success) return errores;
  for (const issue of resultado.error.issues) {
    const campo = String(issue.path[0]);
    if (campos.includes(campo)) errores[campo] ??= issue.message;
  }
  return errores;
}

/** Una fecha que llega por enlace (desde la calculadora de la portada) solo se usa si corresponde a un grado. */
const nacimientoDelEnlace = (params: URLSearchParams) => {
  const valor = params.get("nacimiento") ?? "";
  return gradoSegunNacimiento(valor) ? valor : "";
};

const horaLegible = (turno: string) => `${turno} ${Number(turno.split(":")[0]) < 12 ? "a. m." : "p. m."}`;

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
  // Este componente se dibuja solo en el navegador (lee la URL dentro de un Suspense), así que puede usar la fecha de hoy.
  const params = useSearchParams();
  const [visitas] = useState(() => proximasVisitas(new Date(), VISITAS.dias));
  const [paso, setPaso] = useState(0);
  const [errores, setErrores] = useState<Errores>({});
  const [nacimiento, setNacimiento] = useState(() => nacimientoDelEnlace(params));
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const montado = useRef(false);

  const grado = nacimiento ? gradoSegunNacimiento(nacimiento) : null;

  useEffect(() => {
    // Al cambiar de paso, el foco va al título para que los lectores de pantalla lo anuncien.
    if (montado.current) titulo.current?.focus();
    montado.current = true;
  }, [paso, resumen]);

  const enfocar = (campo: string) => requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`[name="${campo}"]`)?.focus());

  /** Valida el formulario completo pero muestra solo los errores de los campos indicados. */
  const validar = async (campos: string[]) => {
    if (!form.current) return null;
    const esquema = await crearEsquema(visitas);
    const resultado = esquema.safeParse(Object.fromEntries(new FormData(form.current)));
    const nuevos = erroresDe(resultado, campos);
    setErrores(nuevos);
    return { resultado, primero: Object.keys(nuevos)[0] };
  };

  /** Para avanzar basta con que los campos del paso actual estén bien. */
  const siguiente = async () => {
    const v = await validar(CAMPOS_POR_PASO[paso]);
    if (!v) return;
    if (v.primero) enfocar(v.primero);
    else setPaso((p) => p + 1);
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = await validar(CAMPOS_POR_PASO.flat());
    if (!v) return;
    const { resultado, primero } = v;
    if (primero) {
      // Si el error está en un paso anterior, se vuelve a ese paso.
      setPaso(CAMPOS_POR_PASO.findIndex((campos) => campos.includes(primero)));
      enfocar(primero);
      return;
    }
    if (!resultado.success) return;
    const datos = resultado.data;
    setResumen({
      codigo: `HZ-${ANIO_ESCOLAR}-${String(Math.floor(1000 + Math.random() * 9000))}`,
      estudiante: `${datos.nombres} ${datos.apellidos}`,
      grado: gradoSegunNacimiento(datos.nacimiento)?.grado ?? "",
      apoderado: datos.apoderado,
      visita: fechaLegible(datos.visita, { weekday: "long", day: "numeric", month: "long" }),
      turno: horaLegible(datos.turno),
    });
  };

  const cambiarNacimiento = (valor: string) => {
    setNacimiento(valor);
    // El aviso de la fecha se actualiza mientras la escriben, sin esperar a "Continuar".
    setErrores((previos) => {
      const siguientes = { ...previos };
      if (valor && !gradoSegunNacimiento(valor)) siguientes.nacimiento = motivoSinGrado(valor);
      else delete siguientes.nacimiento;
      return siguientes;
    });
  };

  if (resumen) {
    return (
      <div role="status" className="rounded-2xl border border-[#ebe3d6] bg-white p-6 sm:p-10">
        <p className="text-[15px] font-semibold text-[#7a1f2b]">Preinscripción recibida</p>
        <h3 ref={titulo} tabIndex={-1} className="mt-2 text-3xl font-semibold outline-none" style={{ fontFamily: "var(--font-hz-titulo)" }}>
          Código {resumen.codigo}
        </h3>
        <p className="mt-3 max-w-lg leading-relaxed text-[#5a4f47]">
          Guarda este código. Te esperamos con {resumen.estudiante.split(" ")[0]} el <span className="font-bold">{resumen.visita}</span> a
          las {resumen.turno}
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
              setErrores({});
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
          <input
            {...a11y("nacimiento", errores)}
            type="date"
            min={RANGO.min}
            max={RANGO.max}
            value={nacimiento}
            onChange={(e) => cambiarNacimiento(e.target.value)}
            className={estiloCampo}
          />
        </Campo>
        <div aria-live="polite" className="self-end">
          {grado && (
            <p className="rounded-lg bg-[#fbf3dc] px-4 py-3 text-[15px]">
              En {ANIO_ESCOLAR} le corresponde <strong>{grado.grado}</strong>.
            </p>
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
            {visitas.map((v, i) => (
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
            Hora
          </p>
          <div role="radiogroup" aria-labelledby="pi-turno-label" className="mt-2 grid max-w-sm grid-cols-2 gap-3">
            {VISITAS.turnos.map((t) => (
              <label key={t} className="flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-[#d9cfc0] font-bold has-[:checked]:border-[#7a1f2b] has-[:checked]:bg-[#7a1f2b] has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#7a1f2b]/40">
                <input type="radio" name="turno" value={t} className="sr-only" aria-describedby={errores.turno ? "pi-turno-error" : undefined} />
                {horaLegible(t)}
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
