import type { Metadata } from "next";
import { Suspense } from "react";
import { wa } from "../lib/whatsapp";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ReservationForm } from "../components/ReservationForm";
import { horarioPorTramos } from "../lib/horario";

export const metadata: Metadata = {
  title: "Reservar mesa | Sabor Criollo",
  description: "Reserva tu mesa en línea y recibe la confirmación por WhatsApp.",
};

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div>
          <h1
            className="text-[42px] leading-[1.05] text-[#1F1A15] md:text-[52px]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Reserva tu mesa
          </h1>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#1F1A15]/75">
            Elige el día, la hora y cuántos vienen. La confirmación te llega por WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* El formulario lee fecha, hora y personas de la URL; Suspense permite generar la página de forma estática. */}
          <Suspense fallback={<div className="min-h-[32rem] rounded-2xl border border-[#2A1F14]/10 bg-white" />}>
            <ReservationForm />
          </Suspense>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#1F1A15]/8 bg-white p-7">
              <h2 className="text-[15px] font-semibold">Horario</h2>
              <ul className="mt-4 space-y-2 text-[14px] text-[#1F1A15]/80">
                {horarioPorTramos().map((t) => (
                  <li key={t.dias} className="flex justify-between gap-4">
                    <span>{t.dias}</span>
                    <span className="tabular-nums text-[#1F1A15]/70">{t.horas}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#C1440E] p-7 text-white">
              <h2 className="text-[15px] font-semibold">Grupos de más de 8</h2>
              <p className="mt-3 text-[15px] leading-relaxed">
                Juntamos mesas y armamos un menú para el grupo. Escríbenos y lo coordinamos.
              </p>
              <a
                href={wa("Hola, quiero reservar para un grupo grande en Sabor Criollo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-[15px] font-semibold underline underline-offset-4"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
