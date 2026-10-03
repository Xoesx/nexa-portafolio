import type { Plato } from "../types";

export function MenuCard({ plato }: { plato: Plato }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 py-6 last:border-0">
      <div>
        <h3 className="text-xl font-semibold" style={{ fontFamily: "Georgia, serif" }}>{plato.nombre}</h3>
        <p className="mt-1 text-sm text-white/60">{plato.descripcion}</p>
      </div>
      <span className="whitespace-nowrap text-lg font-bold text-[#F5B784]">S/ {plato.precio}</span>
    </div>
  );
}
