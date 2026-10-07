import { obtenerReservas, obtenerPlatos } from "../lib/db/queries";

export default async function AdminDashboard() {
  const reservas = await obtenerReservas();
  const platos = await obtenerPlatos();

  const stats = [
    { label: "Reservas totales", value: reservas.length, color: "text-blue-400" },
    { label: "Reservas pendientes", value: reservas.filter((r) => r.estado === "pendiente").length, color: "text-amber-400" },
    { label: "Platos en carta", value: platos.length, color: "text-green-400" },
    { label: "Ingresos estimados", value: `S/ ${reservas.length * 60}`, color: "text-purple-400" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-gray-400">Resumen de la actividad del restaurante.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">{s.label}</p>
            <p className={`mt-2 text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold">Últimas reservas</h2>
        {reservas.length === 0 ? (
          <p className="text-sm text-gray-500">Aún no hay reservas. Cuando alguien reserve, aparecerán aquí.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {reservas.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3 text-sm">
                <span>{r.nombre} · {r.personas} personas</span>
                <span className="text-gray-400">{r.fecha} {r.hora}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
