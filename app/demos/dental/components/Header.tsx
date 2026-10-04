import Link from "next/link";

const BASE = "/demos/dental";

export function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill={claro ? "#ffffff" : "#0f766e"} />
        <path
          d="M11 9.5c-2.2 0-3.5 1.8-3.5 4 0 2.6 1.3 4 1.9 6.6.5 2.3 1 4.4 2.3 4.4 1.4 0 1.4-3.4 2.4-4.8.5-.7 1.3-.7 1.8 0 1 1.4 1 4.8 2.4 4.8 1.3 0 1.8-2.1 2.3-4.4.6-2.6 1.9-4 1.9-6.6 0-2.2-1.3-4-3.5-4-1.8 0-2.6 1-4 1s-2.2-1-4-1Z"
          fill={claro ? "#0f766e" : "#ffffff"}
        />
      </svg>
      <span className="leading-tight">
        <span className="block text-[17px] font-extrabold tracking-tight">Alba</span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${claro ? "text-white/80" : "text-[#3f5f5b]"}`}>
          Clínica dental
        </span>
      </span>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e2efed] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href={BASE}>
          <Marca />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] font-semibold text-[#3f5f5b] lg:flex">
          <Link href={`${BASE}#tratamientos`} className="hover:text-[#0f2a2a]">Tratamientos</Link>
          <Link href={`${BASE}#equipo`} className="hover:text-[#0f2a2a]">Equipo</Link>
          <Link href={`${BASE}#preguntas`} className="hover:text-[#0f2a2a]">Preguntas</Link>
          <Link href={`${BASE}#ubicacion`} className="hover:text-[#0f2a2a]">Ubicación</Link>
        </nav>
        <Link
          href={`${BASE}/agendar`}
          className="inline-flex min-h-11 items-center rounded-full bg-[#0f766e] px-5 text-sm font-bold text-white transition-colors hover:bg-[#115e59]"
        >
          Agendar cita
        </Link>
      </div>
    </header>
  );
}
