import type { Metadata } from "next";
import { Suspense } from "react";
import { Agenda } from "../components/Agenda";
import { CLINICA } from "../data";

export const metadata: Metadata = {
  title: "Agendar cita",
  description: "Elige tratamiento, especialista, día y hora disponibles y reserva tu cita en menos de un minuto.",
};

export default function AgendarPage() {
  return (
    <main className="bg-[#f0fdfa]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-12 md:py-16 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Agenda tu cita</h1>
          <p className="mt-2 max-w-lg text-[#3f5f5b]">Cuatro pasos, menos de un minuto. Solo ves los horarios que de verdad están libres.</p>
          <div className="mt-8">
            {/* La agenda lee ?tratamiento= de la URL; Suspense permite generar la página de forma estática. */}
            <Suspense fallback={<div className="h-96 rounded-3xl border border-[#cfe3df] bg-white" />}>
              <Agenda />
            </Suspense>
          </div>
        </div>
        <aside className="space-y-4 text-[15px] lg:pt-24">
          <div className="rounded-2xl bg-white p-5">
            <p className="font-bold">Horario de atención</p>
            {CLINICA.horario.map((h) => (
              <p key={h.dias} className="mt-1 text-[#3f5f5b]">
                {h.dias}: {h.horas}
              </p>
            ))}
          </div>
          <div className="rounded-2xl bg-white p-5">
            <p className="font-bold">¿Es una urgencia?</p>
            <p className="mt-1 text-[#3f5f5b]">Llámanos al {CLINICA.telefono} y te damos el primer espacio libre del día.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
