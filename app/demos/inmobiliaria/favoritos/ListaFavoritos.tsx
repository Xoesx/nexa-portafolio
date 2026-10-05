"use client";

import Link from "next/link";
import { TarjetaPropiedad } from "../components/TarjetaPropiedad";
import { ACTIVAS, enSoles, precioTexto } from "../data";
import { useFavoritos } from "../lib/favoritos";

export function ListaFavoritos() {
  const { favoritos } = useFavoritos();
  const lista = ACTIVAS.filter((p) => favoritos.includes(p.id));

  if (lista.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-[#d6cfc4] bg-white px-6 py-16 text-center">
        <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-rz-titulo)" }}>
          Todavía no guardaste propiedades
        </p>
        <p className="mt-2 text-[#57534e]">Toca el corazón de cualquier propiedad para tenerla aquí a la mano.</p>
        <Link href="/demos/inmobiliaria/propiedades" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#1c1917] px-6 font-semibold text-white">
          Explorar propiedades
        </Link>
      </div>
    );
  }

  const ventas = lista.filter((p) => p.operacion === "venta");
  return (
    <>
      {ventas.length > 1 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e7e1d8] bg-white">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <caption className="px-5 pt-4 text-left text-sm font-semibold text-[#57534e]">Comparativo de tus favoritos en venta</caption>
            <thead>
              <tr className="border-b border-[#efe9e1] text-sm text-[#57534e]">
                <th scope="col" className="px-5 py-3 font-semibold">Propiedad</th>
                <th scope="col" className="px-5 py-3 font-semibold">Precio</th>
                <th scope="col" className="px-5 py-3 font-semibold">Área</th>
                <th scope="col" className="px-5 py-3 font-semibold">Precio por m²</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((p) => (
                <tr key={p.id} className="border-b border-[#efe9e1] last:border-0">
                  <th scope="row" className="px-5 py-3 font-semibold">
                    {p.titulo}
                    <span className="block text-sm font-normal text-[#57534e]">{p.distrito}</span>
                  </th>
                  <td className="px-5 py-3 tabular-nums">{precioTexto(p)}</td>
                  <td className="px-5 py-3 tabular-nums">{p.area} m²</td>
                  <td className="px-5 py-3 tabular-nums">S/ {new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(enSoles(p) / p.area)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((p) => (
          <TarjetaPropiedad key={p.id} p={p} />
        ))}
      </div>
    </>
  );
}
