"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { leerConsent, guardarConsent, type NivelConsent } from "../lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (leerConsent() === "pending") setVisible(true);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const aceptarTodo = () => {
    guardarConsent("all");
    setVisible(false);
  };

  const soloEsenciales = () => {
    guardarConsent("essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-3xl">
      <div className="rounded-2xl border border-[#1F1A15]/10 bg-white p-5 shadow-2xl md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-[#1F1A15]">
              🍪 Cuidamos tu privacidad
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#1F1A15]/70">
              Usamos cookies esenciales para que el sitio funcione. Si aceptas, también
              activamos analíticas para entender qué secciones te sirven más. Lee nuestra{" "}
              <Link
                href="/demos/restaurante/legal/cookies"
                className="text-[#C1440E] underline underline-offset-2"
              >
                política de cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={soloEsenciales}
              className="rounded-full border border-[#1F1A15]/15 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-[#1F1A15]/70 transition hover:border-[#1F1A15]/40 hover:text-[#1F1A15]"
            >
              Solo esenciales
            </button>
            <button
              onClick={aceptarTodo}
              className="rounded-full bg-[#C1440E] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#9A3410]"
            >
              Aceptar todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
