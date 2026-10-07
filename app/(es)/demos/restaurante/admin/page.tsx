import { obtenerPlatos } from "../lib/db/queries";
import type { Reserva } from "../types";

// El panel de la demo está abierto a cualquiera, así que muestra una agenda inventada. Las reservas que hacen los
// visitantes nunca se listan: tendrían sus nombres y teléfonos.
const AGENDA_DE_EJEMPLO: Pick<Reserva, "id" | "nombre" | "personas" | "hora" | "estado" | "notas">[] = [
  { id: "e1", nombre: "Karina S.", personas: 10, hora: "13:00", estado: "confirmada", notas: "Cumpleaños, mesa larga" },
  { id: "e2", nombre: "Familia Ríos", personas: 6, hora: "13:30", estado: "confirmada", notas: "Una silla para bebé" },
  { id: "e3", nombre: "Pedro A.", personas: 2, hora: "14:00", estado: "pendiente" },
  { id: "e4", nombre: "Lucía M.", personas: 4, hora: "20:00", estado: "confirmada" },
  { id: "e5", nombre: "Jorge y Ana", personas: 2, hora: "20:30", estado: "pendiente", notas: "Código BIENVENIDO20" },
];

export default async function AdminDashboard() {
  const platos = await obtenerPlatos();
  const personas = AGENDA_DE_EJEMPLO.reduce((total, r) => total + r.personas, 0);
  const pendientes = AGENDA_DE_EJEMPLO.filter((r) => r.estado === "pendiente").length;

  const resumen = [
    { label: "Reservas para hoy", value: AGENDA_DE_EJEMPLO.length },
    { label: "Personas esperadas", value: personas },
    { label: "Por confirmar", value: pendientes },
    { label: "Platos en carta", value: platos.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-3xl font-bold">Hoy en el salón</h1>
      <p className="mt-1 text-gray-400">Datos de ejemplo. Con el sistema en producción, aquí aparecen las reservas reales del día.</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resumen.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <dt className="text-sm text-gray-400">{s.label}</dt>
            <dd className="mt-2 text-3xl font-bold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold">Agenda</h2>
        <ul className="divide-y divide-white/10">
          {AGENDA_DE_EJEMPLO.map((r) => (
            <li key={r.id} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-3 text-sm">
              <span className="font-semibold tabular-nums">{r.hora}</span>
              <span>
                {r.nombre} · {r.personas} personas
                {r.notas && <span className="block text-gray-400">{r.notas}</span>}
              </span>
              <span className={r.estado === "pendiente" ? "text-amber-300" : "text-emerald-300"}>
                {r.estado === "pendiente" ? "Por confirmar" : "Confirmada"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
