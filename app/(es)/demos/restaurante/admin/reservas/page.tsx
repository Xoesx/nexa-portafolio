export default function AdminReservas() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Reservas</h1>
      <p className="mt-1 text-sm text-gray-400">Cuando un cliente reserve desde el sitio público, aparecerá aquí.</p>

      <div className="mt-10 rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/5 text-2xl">📅</div>
        <p className="mt-5 text-sm text-gray-400">Aún no hay reservas registradas.</p>
      </div>
    </div>
  );
}
