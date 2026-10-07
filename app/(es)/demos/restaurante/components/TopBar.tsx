import { EstadoLocal } from "./EstadoLocal";

export function TopBar() {
  return (
    <div className="hidden border-b border-[#1F1A15]/8 bg-[#F5F0E6] px-6 py-2 text-[13px] text-[#1F1A15]/75 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/demos/restaurante/contacto" className="flex items-center gap-2 hover:text-[#C1440E]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (061) 000 000
          </a>
          <a href="mailto:hola@saborcriollo.pe" className="flex items-center gap-2 hover:text-[#C1440E]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hola@saborcriollo.pe
          </a>
        </div>
        <EstadoLocal />
      </div>
    </div>
  );
}
