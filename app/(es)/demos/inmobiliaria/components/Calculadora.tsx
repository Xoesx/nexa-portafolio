"use client";

import { useId, useState } from "react";
import type { Moneda } from "../data";
import { cuotaMensual } from "../lib/credito";

export function Calculadora({ precio, moneda }: { precio: number; moneda: Moneda }) {
  const id = useId();
  const [inicialPct, setInicialPct] = useState(20);
  const [anios, setAnios] = useState(20);
  const [tea, setTea] = useState(9.5);

  const fmt = (v: number) =>
    `${moneda === "USD" ? "US$" : "S/"} ${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(Math.round(v))}`;
  const inicial = (precio * inicialPct) / 100;
  const financiado = precio - inicial;
  const cuota = cuotaMensual(financiado, tea, anios);
  const total = cuota * anios * 12;

  const deslizador = "mt-3 w-full accent-[#b4532a]";

  return (
    <section aria-labelledby={`${id}-t`} className="rounded-2xl border border-[#e7e1d8] bg-white p-6">
      <h2 id={`${id}-t`} className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
        Simula tu crédito
      </h2>

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <label htmlFor={`${id}-i`} className="font-semibold text-[#44403c]">Cuota inicial</label>
            <span className="tabular-nums text-[#57534e]">{inicialPct}% · {fmt(inicial)}</span>
          </div>
          <input id={`${id}-i`} type="range" min={10} max={50} step={5} value={inicialPct} onChange={(e) => setInicialPct(+e.target.value)} className={deslizador} />
        </div>
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <label htmlFor={`${id}-a`} className="font-semibold text-[#44403c]">Plazo</label>
            <span className="tabular-nums text-[#57534e]">{anios} años</span>
          </div>
          <input id={`${id}-a`} type="range" min={5} max={30} step={1} value={anios} onChange={(e) => setAnios(+e.target.value)} className={deslizador} />
        </div>
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <label htmlFor={`${id}-t2`} className="font-semibold text-[#44403c]">Tasa efectiva anual (TEA)</label>
            <span className="tabular-nums text-[#57534e]">{tea.toFixed(1)}%</span>
          </div>
          <input id={`${id}-t2`} type="range" min={6} max={16} step={0.1} value={tea} onChange={(e) => setTea(+e.target.value)} className={deslizador} />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-[#f3efe9] p-5" aria-live="polite">
        <p className="text-sm text-[#57534e]">Cuota mensual aproximada</p>
        <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
          {fmt(cuota)}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-[#57534e]">Monto a financiar</dt>
            <dd className="font-semibold tabular-nums">{fmt(financiado)}</dd>
          </div>
          <div>
            <dt className="text-[#57534e]">Total en {anios} años</dt>
            <dd className="font-semibold tabular-nums">{fmt(total)}</dd>
          </div>
        </dl>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#78716c]">
        Referencial. No incluye seguros ni comisiones; cada banco evalúa tu caso.
      </p>
    </section>
  );
}
