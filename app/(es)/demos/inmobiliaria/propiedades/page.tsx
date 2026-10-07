import type { Metadata } from "next";
import { Suspense } from "react";
import { Listado } from "./Listado";

export const metadata: Metadata = {
  title: "Propiedades en venta y alquiler",
  description: "Terrenos, casas, departamentos y locales en Callería, Yarinacocha y Manantay, con filtros, mapa y precios en soles o dólares.",
};

export default function PropiedadesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-rz-titulo)" }}>
        Propiedades
      </h1>
      <p className="mt-3 max-w-xl text-[#57534e]">Filtra por lo que necesitas. Puedes compartir el enlace de tu búsqueda tal cual.</p>
      {/* useSearchParams necesita un límite de Suspense para que la página se genere de forma estática. */}
      <Suspense fallback={<p className="mt-10 text-[#57534e]">Cargando propiedades…</p>}>
        <Listado />
      </Suspense>
    </main>
  );
}
