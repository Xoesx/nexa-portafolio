import Link from "next/link";

export default function AdminReservas() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">Reservas</h1>
      <p className="mt-1 text-sm text-gray-400">Todas las reservas, con filtros por fecha y estado.</p>

      <div className="mt-10 rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-gray-500" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gray-400">
          En la demo las reservas no se guardan, para no exponer los datos de quienes la prueban. Con el sistema en producción, aquí
          aparecen todas y solo las ve el dueño después de iniciar sesión.
        </p>
        <Link href="/demos/restaurante/admin" className="mt-6 inline-block text-sm font-semibold text-[#E8A87C] underline underline-offset-4">
          Ver la agenda de ejemplo de hoy
        </Link>
      </div>
    </div>
  );
}
