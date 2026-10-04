import Link from "next/link";

const BASE = "/demos/colegio";

export function Escudo({ claro = false }: { claro?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 32 36" className="h-10 w-9" aria-hidden="true">
        <path d="M16 1 30 6v12c0 8.5-6 14.5-14 17C8 32.5 2 26.5 2 18V6Z" fill={claro ? "#fbf8f3" : "#7a1f2b"} />
        <path d="M7 22c3-5 6-7 9-7s6 2 9 7" fill="none" stroke="#c9a227" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="16" cy="11" r="3.2" fill="#c9a227" />
      </svg>
      <span className="leading-tight">
        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">Colegio</span>
        <span className="block text-xl font-semibold" style={{ fontFamily: "var(--font-hz-titulo)" }}>
          Horizonte
        </span>
      </span>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ebe3d6] bg-[#fbf8f3]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
        <Link href={BASE} className="text-[#7a1f2b]">
          <Escudo />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] font-semibold text-[#5a4f47] lg:flex">
          <Link href={`${BASE}#niveles`} className="hover:text-[#7a1f2b]">Niveles</Link>
          <Link href={`${BASE}#propuesta`} className="hover:text-[#7a1f2b]">Propuesta</Link>
          <Link href={`${BASE}#fechas`} className="hover:text-[#7a1f2b]">Calendario</Link>
          <Link href={`${BASE}/admision`} className="hover:text-[#7a1f2b]">Admisión</Link>
        </nav>
        <Link
          href={`${BASE}/admision#preinscripcion`}
          className="inline-flex min-h-11 items-center rounded-lg bg-[#7a1f2b] px-4 text-sm font-bold text-white transition-colors hover:bg-[#5e1520]"
        >
          Admisión 2027
        </Link>
      </div>
    </header>
  );
}
