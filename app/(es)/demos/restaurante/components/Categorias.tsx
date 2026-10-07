import Link from "next/link";
import { CATEGORIAS, idCategoria, MENU_COMPLETO } from "../data/menu";

const QUE_HAY: Record<(typeof CATEGORIAS)[number], string> = {
  Entradas: "Causa, ceviche, anticuchos y tequeños",
  "De la selva": "Juane, tacacho con cecina, patarashca e inchicapi",
  Principales: "Lomo saltado, arroz con pato, ají de gallina y pollo a la brasa",
  Postres: "Suspiro a la limeña, picarones y mazamorra morada",
  Bebidas: "Chicha morada, maracuyá sour, café pasado y emoliente",
};

/** Índice de la carta: cada categoría lleva a su sección en /menu. */
export function Categorias() {
  return (
    <section className="bg-[#FBF9F4] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl tracking-[-0.01em] md:text-4xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
            La carta
          </h2>
          <Link
            href="/demos/restaurante/menu"
            className="border-b border-[#1F1A15]/30 pb-1 text-[15px] font-semibold text-[#1F1A15]/80 transition hover:border-[#C1440E] hover:text-[#C1440E]"
          >
            Ver la carta completa
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIAS.map((c) => {
            const total = MENU_COMPLETO.filter((p) => p.categoria === c && p.disponible !== false).length;
            return (
              <li key={c} className="border-t border-[#1F1A15]/20">
                <Link href={`/demos/restaurante/menu#${idCategoria(c)}`} className="group block py-5">
                  <span className="flex items-baseline justify-between gap-3">
                    <span
                      className="text-[1.65rem] leading-tight transition-colors group-hover:text-[#C1440E]"
                      style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
                    >
                      {c}
                    </span>
                    <span className="shrink-0 text-[13px] tabular-nums text-[#6E6457]">{total} platos</span>
                  </span>
                  <span className="mt-1.5 block text-[14px] leading-relaxed text-[#6E6457]">{QUE_HAY[c]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
