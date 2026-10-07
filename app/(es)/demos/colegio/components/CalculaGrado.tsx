"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ANIO_ESCOLAR } from "../data";
import { gradoSegunNacimiento, motivoSinGrado, rangoNacimiento } from "../lib/grado";

const RANGO = rangoNacimiento();

/**
 * La pregunta que más se repite en admisión, resuelta antes de llenar nada. El enlace lleva la fecha
 * a la preinscripción para que la familia no tenga que escribirla otra vez.
 */
export function CalculaGrado() {
  const id = useId();
  const [nacimiento, setNacimiento] = useState("");
  const grado = nacimiento ? gradoSegunNacimiento(nacimiento) : null;

  return (
    <div className="mt-10 max-w-lg rounded-xl border border-[#e3d8c6] bg-white p-5 shadow-[0_1px_0_#e3d8c6]">
      <label htmlFor={id} className="block text-lg font-semibold" style={{ fontFamily: "var(--font-hz-titulo)" }}>
        ¿A qué grado entra tu hijo en {ANIO_ESCOLAR}?
      </label>
      <p id={`${id}-ayuda`} className="mt-1 text-sm leading-relaxed text-[#5a4f47]">
        Pon su fecha de nacimiento. Contamos la edad al 31 de marzo, que es la regla del Minedu.
      </p>
      <div className="mt-4 grid grid-cols-1 items-center gap-x-5 gap-y-3 sm:grid-cols-[minmax(0,12rem)_1fr]">
        <input
          id={id}
          type="date"
          min={RANGO.min}
          max={RANGO.max}
          value={nacimiento}
          onChange={(e) => setNacimiento(e.target.value)}
          aria-describedby={`${id}-ayuda ${id}-resultado`}
          className="block min-h-12 w-full rounded-lg border border-[#d9cfc0] bg-[#fbf8f3] px-3 text-[15px] outline-none transition-colors focus:border-[#7a1f2b] focus:ring-2 focus:ring-[#7a1f2b]/15"
        />
        <p id={`${id}-resultado`} aria-live="polite" className="text-[15px] leading-snug">
          {!nacimiento ? (
            <span className="text-[#6b5f56]">El resultado aparece aquí.</span>
          ) : grado ? (
            <>
              Le corresponde <strong className="text-[#7a1f2b]">{grado.grado}</strong>.{" "}
              <Link
                href={`/demos/colegio/admision?nacimiento=${nacimiento}#preinscripcion`}
                className="whitespace-nowrap font-bold underline decoration-[#c9a227] decoration-2 underline-offset-4 hover:text-[#7a1f2b]"
              >
                Seguir con la preinscripción
              </Link>
            </>
          ) : (
            <span className="text-[#8a1c1c]">{motivoSinGrado(nacimiento)}</span>
          )}
        </p>
      </div>
    </div>
  );
}
