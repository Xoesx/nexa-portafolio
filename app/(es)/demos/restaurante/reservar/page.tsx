import type { Metadata } from "next";
import { Suspense } from "react";
import { wa } from "../lib/whatsapp";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ReservationForm } from "../components/ReservationForm";

export const metadata: Metadata = {
  title: "Reservar mesa | Sabor Criollo",
  description: "Reserva tu mesa en 30 segundos. Confirmación por WhatsApp.",
};

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
            Reservas
          </p>
          <h1
            className="mt-3 text-[42px] leading-[1.05] text-[#1F1A15] md:text-[52px]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Reserva tu mesa
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#1F1A15]/70">
            En 30 segundos. Te confirmamos por WhatsApp al instante.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* El formulario lee fecha, hora y personas de la URL; Suspense permite generar la página de forma estática. */}
          <Suspense fallback={<div className="min-h-[32rem] rounded-2xl border border-[#2A1F14]/10 bg-white" />}>
            <ReservationForm />
          </Suspense>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-[#1F1A15]/8 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6E6457]">
                Horarios
              </p>
              <ul className="mt-4 space-y-2 text-[14px] text-[#1F1A15]/80">
                <li className="flex justify-between">
                  <span>Lun – Jue</span>
                  <span className="text-[#1F1A15]/70">12:00 – 22:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Vie – Sáb</span>
                  <span className="text-[#1F1A15]/70">12:00 – 23:30</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-[#1F1A15]/70">12:00 – 17:00</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[#C1440E] p-7 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Grupos grandes
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                Para grupos de más de 8 personas, escríbenos por WhatsApp y coordinamos un menú especial.
              </p>
              <a
                href={wa("Hola, quiero reservar para un grupo grande en Sabor Criollo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-[12px] font-semibold uppercase tracking-[0.15em] underline underline-offset-4"
              >
                Escribir por WhatsApp →
              </a>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
