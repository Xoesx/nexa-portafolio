"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TarjetaPropiedad } from "../components/TarjetaPropiedad";
import { DISTRITOS, PROPIEDADES, type Propiedad } from "../data";

const ORDENES = {
  recientes: "Más recientes",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  area: "Mayor área",
} as const;
type Orden = keyof typeof ORDENES;

const selector =
  "mt-1.5 block min-h-11 w-full rounded-xl border border-[#e7e1d8] bg-white px-3 text-[15px] outline-none focus:border-[#b4532a] focus:ring-2 focus:ring-[#b4532a]/20";

function ordenar(lista: Propiedad[], orden: Orden) {
  const copia = [...lista];
  // Los precios de venta (US$) y alquiler (S/) no se comparan entre sí: primero se agrupa por operación.
  const porOperacion = (a: Propiedad, b: Propiedad) => a.operacion.localeCompare(b.operacion);
  switch (orden) {
    case "precio-asc":
      return copia.sort((a, b) => porOperacion(b, a) || a.precio - b.precio);
    case "precio-desc":
      return copia.sort((a, b) => porOperacion(b, a) || b.precio - a.precio);
    case "area":
      return copia.sort((a, b) => b.area - a.area);
    default:
      return copia.sort((a, b) => Number(!!b.nueva) - Number(!!a.nueva));
  }
}

export function Listado() {
  const params = useSearchParams();
  const router = useRouter();
  const ruta = usePathname();
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const op = params.get("op") ?? "";
  const tipo = params.get("tipo") ?? "";
  const distrito = params.get("distrito") ?? "";
  const dorm = Number(params.get("dorm") ?? 0);
  const orden = (params.get("orden") ?? "recientes") as Orden;

  const actualizar = (clave: string, valor: string) => {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    const q = nuevos.toString();
    router.replace(q ? `${ruta}?${q}` : ruta, { scroll: false });
  };

  const resultados = ordenar(
    PROPIEDADES.filter(
      (p) =>
        (!op || p.operacion === op) &&
        (!tipo || p.tipo === tipo) &&
        (!distrito || p.distrito === distrito) &&
        p.dormitorios >= dorm,
    ),
    ORDENES[orden] ? orden : "recientes",
  );

  const activos = [op, tipo, distrito, dorm ? "d" : ""].filter(Boolean).length;

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setFiltrosAbiertos((v) => !v)}
        aria-expanded={filtrosAbiertos}
        aria-controls="rz-filtros"
        className="flex min-h-11 items-center gap-2 rounded-full border border-[#e7e1d8] bg-white px-5 font-semibold md:hidden"
      >
        Filtros {activos > 0 && <span className="rounded-full bg-[#b4532a] px-2 text-xs text-white">{activos}</span>}
      </button>

      <div
        id="rz-filtros"
        className={`${filtrosAbiertos ? "grid" : "hidden"} mt-4 grid-cols-2 gap-4 rounded-2xl border border-[#e7e1d8] bg-white p-4 md:mt-0 md:grid md:grid-cols-5`}
      >
        <label className="text-sm font-semibold text-[#44403c]">
          Operación
          <select className={selector} value={op} onChange={(e) => actualizar("op", e.target.value)}>
            <option value="">Venta y alquiler</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-[#44403c]">
          Tipo
          <select className={selector} value={tipo} onChange={(e) => actualizar("tipo", e.target.value)}>
            <option value="">Todos</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-[#44403c]">
          Distrito
          <select className={selector} value={distrito} onChange={(e) => actualizar("distrito", e.target.value)}>
            <option value="">Todos</option>
            {DISTRITOS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-[#44403c]">
          Dormitorios
          <select className={selector} value={dorm || ""} onChange={(e) => actualizar("dorm", e.target.value)}>
            <option value="">Cualquiera</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} o más
              </option>
            ))}
          </select>
        </label>
        <label className="col-span-2 text-sm font-semibold text-[#44403c] md:col-span-1">
          Ordenar por
          <select className={selector} value={orden} onChange={(e) => actualizar("orden", e.target.value === "recientes" ? "" : e.target.value)}>
            {Object.entries(ORDENES).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-[15px] text-[#44403c]">
          <strong className="font-semibold text-[#1c1917]">{resultados.length}</strong>{" "}
          {resultados.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
        </p>
        {activos > 0 && (
          <button type="button" onClick={() => router.replace(ruta, { scroll: false })} className="min-h-11 text-sm font-semibold text-[#933f1d] underline underline-offset-4">
            Limpiar filtros
          </button>
        )}
      </div>

      {resultados.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resultados.map((p, i) => (
            <TarjetaPropiedad key={p.id} p={p} prioridad={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-[#d6cfc4] bg-white px-6 py-16 text-center">
          <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-rz-titulo)" }}>
            No hay propiedades con esos filtros
          </p>
          <p className="mt-2 text-[#57534e]">Prueba quitando algún filtro o déjanos tus datos y te avisamos cuando llegue una.</p>
          <button type="button" onClick={() => router.replace(ruta, { scroll: false })} className="mt-6 min-h-11 rounded-full bg-[#1c1917] px-6 font-semibold text-white">
            Ver todas las propiedades
          </button>
        </div>
      )}
    </div>
  );
}
