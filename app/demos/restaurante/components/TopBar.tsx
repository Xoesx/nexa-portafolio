export function TopBar() {
  return (
    <div className="hidden border-b border-[#1F1A15]/8 bg-[#F5F0E6] px-6 py-2.5 text-[11px] tracking-wide text-[#1F1A15]/70 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="tel:+51999888777" className="flex items-center gap-2 hover:text-[#C1440E]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +51 999 888 777
          </a>
          <a href="mailto:hola@saborcriollo.pe" className="flex items-center gap-2 hover:text-[#C1440E]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hola@saborcriollo.pe
          </a>
        </div>
        <div className="flex items-center gap-6">
          <span>Lun – Dom · 12:00 a 22:00</span>
          <span className="flex items-center gap-3">
            <a href="#" className="hover:text-[#C1440E]">IG</a>
            <a href="#" className="hover:text-[#C1440E]">FB</a>
            <a href="#" className="hover:text-[#C1440E]">TK</a>
          </span>
        </div>
      </div>
    </div>
  );
}
