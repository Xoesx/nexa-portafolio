import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F0F12] text-white" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Banner de demo */}
      <div className="border-b border-[#C1440E]/30 bg-gradient-to-r from-[#C1440E]/15 via-[#C1440E]/5 to-transparent">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#C1440E] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Modo demo
            </span>
            <p className="text-[13px] text-white/80">
              En producción este panel pide usuario y contraseña. Aquí lo dejamos abierto para que explores todas las funciones.
            </p>
          </div>
          <Link
            href="/demos/restaurante"
            className="text-[12px] font-semibold uppercase tracking-wider text-white/60 transition hover:text-white"
          >
            ← Ver sitio público
          </Link>
        </div>
      </div>

      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/demos/restaurante/admin/menu" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#C1440E] font-bold">S</div>
            <div className="leading-none">
              <p className="text-sm font-bold">Sabor Criollo</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-gray-500">
                Panel de administración
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-gray-400 md:block">admin@saborcriollo.pe</span>
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
              ADMIN
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-xs font-bold">
              A
            </div>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 px-6 text-sm">
          <Link
            href="/demos/restaurante/admin/menu"
            className="rounded-t-lg bg-white/5 px-4 py-3 font-semibold text-white"
          >
            Menú
          </Link>
          <Link
            href="/demos/restaurante/admin/reservas"
            className="rounded-t-lg px-4 py-3 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            Reservas
          </Link>
          <Link
            href="/demos/restaurante/admin/configuracion"
            className="rounded-t-lg px-4 py-3 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            Configuración
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
