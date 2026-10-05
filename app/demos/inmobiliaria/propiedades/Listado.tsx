"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mapa } from "../components/Mapa";
import { TarjetaPropiedad } from "../components/TarjetaPropiedad";
import { ACTIVAS, DISTRITOS, enSoles, TIPO_DE_CAMBIO, TIPOS, type Propiedad, type Tipo } from "../data";
import { aPunto } from "../lib/puntos";

const ORDENES = {
  recientes: "Más recientes",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  area: "Mayor área",
} as const;
type Orden = keyof typeof ORDENES;

const selector =
  "mt-1.5 block min-h-11 w-full rounded-xl border border-[#e7e1d8] bg-white px-3 text-[15px] outline-none focus:border-[#b4532a] focus:ring-2 focus:ring-[#b4532a]/20";
const etiqueta = "text-sm font-semibold text-[#44403c]";

function ordenar(lista: Propiedad[], orden: Orden) {
  const copia = [...lista];
  // Para comparar precios en soles y dólares, todo se lleva a soles con el tipo de cambio referencial.
  switch (orden) {
    case "precio-asc":
      return copia.sort((a, b) => enSoles(a) - enSoles(b));
    case "precio-desc":
      return copia.sort((a, b) => enSoles(b) - enSoles(a));
    case "area":
      return copia.sort((a, b) => b.area - a.area);
    default:
      return copia.sort((a, b) => Number(!!b.nueva) - Number(!!a.nueva) || Number(b.codigo) - Number(a.codigo));
  }
}

export function Listado() {
  const params = useSearchParams();
  const router = useRouter();
  const ruta = usePathname();
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const op = params.get("op") ?? "";
  const tipo = (params.get("tipo") ?? "") as Tipo | "";
  const distrito = params.get("distrito") ?? "";
  const dorm = Number(params.get("dorm") ?? 0);
  const max = Number(params.get("max") ?? 0);
  const moneda = params.get("moneda") === "USD" ? "USD" : "PEN";
  const orden = (params.get("orden") ?? "recientes") as Orden;
  const vista = params.get("vista") === "mapa" ? "mapa" : "lista";

  const actualizar = (cambios: Record<string, string>) => {
    const nuevos = new URLSearchParams(params);
    for (const [clave, valor] of Object.entries(cambios)) {
      if (valor) nuevos.set(clave, valor);
      else nuevos.delete(clave);
    }
    const q = nuevos.toString();
    router.replace(q ? `${ruta}?${q}` : ruta, { scroll: false });
  };

  const topeEnSoles = max ? max * (moneda === "USD" ? TIPO_DE_CAMBIO : 1) : Infinity;
  const resultados = ordenar(
    ACTIVAS.filter(
      (p) =>
        (!op || p.operacion === op) &&
        (!tipo || p.tipo === tipo) &&
        (!distrito || p.distrito === distrito) &&
        p.dormitorios >= dorm &&
        enSoles(p) <= topeEnSoles,
    ),
    ORDENES[orden] ? orden : "recientes",
  );

  const activos = [op, tipo, distrito, dorm ? "d" : "", max ? "m" : ""].filter(Boolean).length;
  const limpiar = () => router.replace(vista === "mapa" ? `${ruta}?vista=mapa` : ruta, { scroll: false });
  const sinDormitorios = tipo === "terreno" || tipo === "local";

  return (
    <div className="mt-8">
      {/* Operación como pestañas */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Operación" className="inline-flex rounded-full border border-[#e7e1d8] bg-white p-1">
          {[
            ["", "Todo"],
            ["venta", "Comprar"],
            ["alquiler", "Alquilar"],
          ].map(([valor, texto]) => (
            <button
              key={valor}
              type="button"
              aria-pressed={op === valor}
              onClick={() => actualizar({ op: valor })}
              className="min-h-10 rounded-full px-5 text-[15px] font-semibold text-[#57534e] transition-colors aria-pressed:bg-[#1c1917] aria-pressed:text-white"
            >
              {texto}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltrosAbiertos((v) => !v)}
            aria-expanded={filtrosAbiertos}
            aria-controls="rz-filtros"
            className="flex min-h-11 items-center gap-2 rounded-full border border-[#e7e1d8] bg-white px-5 font-semibold md:hidden"
          >
            Filtros {activos > 0 && <span className="rounded-full bg-[#b4532a] px-2 text-xs text-white">{activos}</span>}
          </button>
          <div role="group" aria-label="Vista" className="inline-flex rounded-full border border-[#e7e1d8] bg-white p-1">
            {(["lista", "mapa"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={vista === v}
                onClick={() => actualizar({ vista: v === "mapa" ? "mapa" : "" })}
                className="min-h-10 rounded-full px-4 text-[15px] font-semibold capitalize text-[#57534e] transition-colors aria-pressed:bg-[#b4532a] aria-pressed:text-white"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        id="rz-filtros"
        className={`${filtrosAbiertos ? "grid" : "hidden"} mt-4 grid-cols-2 gap-4 rounded-2xl border border-[#e7e1d8] bg-white p-4 md:grid md:grid-cols-3 lg:grid-cols-6`}
      >
        <label className={etiqueta}>
          Tipo
          <select className={selector} value={tipo} onChange={(e) => actualizar({ tipo: e.target.value, dorm: "" })}>
            <option value="">Todos</option>
            {(Object.keys(TIPOS) as Tipo[]).map((t) => (
              <option key={t} value={t}>
                {TIPOS[t].plural}
              </option>
            ))}
          </select>
        </label>
        <label className={etiqueta}>
          Distrito
          <select className={selector} value={distrito} onChange={(e) => actualizar({ distrito: e.target.value })}>
            <option value="">Todos</option>
            {DISTRITOS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className={etiqueta}>
          Dormitorios
          <select
            className={`${selector} disabled:bg-[#f5f5f4] disabled:text-[#a8a29e]`}
            value={dorm || ""}
            disabled={sinDormitorios}
            onChange={(e) => actualizar({ dorm: e.target.value })}
          >
            <option value="">Cualquiera</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} o más
              </option>
            ))}
          </select>
        </label>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <p id="rz-precio" className={etiqueta}>
            Precio máximo
          </p>
          <div className="mt-1.5 flex gap-2" role="group" aria-labelledby="rz-precio">
            <select aria-label="Moneda" className={`${selector.replace("w-full", "w-24").replace("mt-1.5", "mt-0")} shrink-0`} value={moneda} onChange={(e) => actualizar({ moneda: e.target.value === "USD" ? "USD" : "" })}>
              <option value="PEN">S/</option>
              <option value="USD">US$</option>
            </select>
            <input
              key={`${max}-${moneda}`}
              type="number"
              inputMode="numeric"
              min={0}
              step={moneda === "USD" ? 5000 : 500}
              defaultValue={max || ""}
              placeholder="Sin límite"
              aria-label="Monto máximo"
              onBlur={(e) => actualizar({ max: e.target.value && Number(e.target.value) > 0 ? String(Number(e.target.value)) : "" })}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              className={selector.replace("mt-1.5", "mt-0")}
            />
          </div>
        </div>
        <label className={`col-span-2 md:col-span-1 ${etiqueta}`}>
          Ordenar por
          <select className={selector} value={orden} onChange={(e) => actualizar({ orden: e.target.value === "recientes" ? "" : e.target.value })}>
            {Object.entries(ORDENES).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-[15px] text-[#44403c]">
          <strong className="font-semibold text-[#1c1917]">{resultados.length}</strong>{" "}
          {resultados.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
          {max > 0 && <span className="text-[#57534e]"> · tipo de cambio referencial S/ {TIPO_DE_CAMBIO.toFixed(2)}</span>}
        </p>
        {activos > 0 && (
          <button type="button" onClick={limpiar} className="min-h-11 text-sm font-semibold text-[#933f1d] underline underline-offset-4">
            Limpiar filtros
          </button>
        )}
      </div>

      {resultados.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#d6cfc4] bg-white px-6 py-16 text-center">
          <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-rz-titulo)" }}>
            No hay propiedades con esos filtros
          </p>
          <p className="mt-2 text-[#57534e]">Prueba quitando algún filtro o déjanos tus datos y te avisamos cuando llegue una.</p>
          <button type="button" onClick={limpiar} className="mt-6 min-h-11 rounded-full bg-[#1c1917] px-6 font-semibold text-white">
            Ver todas las propiedades
          </button>
        </div>
      ) : vista === "mapa" ? (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Mapa puntos={resultados.map(aPunto)} alto={560} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {resultados.map((p, i) => (
              <TarjetaPropiedad key={p.id} p={p} prioridad={i < 2} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resultados.map((p, i) => (
            <TarjetaPropiedad key={p.id} p={p} prioridad={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
