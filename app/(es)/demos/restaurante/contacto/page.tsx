import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { EstadoLocal } from "../components/EstadoLocal";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { horarioPorTramos } from "../lib/horario";
import { wa } from "../lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto | Sabor Criollo",
  description: "Jr. Comercio 245, Pucallpa. Reservas, pedidos y consultas por WhatsApp o correo.",
};

const DATOS = [
  { etiqueta: "Dirección", valor: "Jr. Comercio 245, Pucallpa" },
  { etiqueta: "Teléfono", valor: "(061) 000 000" },
  { etiqueta: "Correo", valor: "hola@saborcriollo.pe" },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h1 className="text-[42px] leading-[1.05] md:text-[56px]" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
          Contacto
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#1F1A15]/75">
          Estamos a dos cuadras de la Plaza de Armas. Para reservas y pedidos, lo más rápido es WhatsApp.
        </p>

        <dl className="mt-12 grid gap-x-8 gap-y-6 border-y border-[#1F1A15]/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {DATOS.map((d) => (
            <div key={d.etiqueta}>
              <dt className="text-[14px] text-[#6E6457]">{d.etiqueta}</dt>
              <dd className="mt-1 text-[16px]">{d.valor}</dd>
            </div>
          ))}
          <div>
            <dt className="text-[14px] text-[#6E6457]">Ahora</dt>
            <dd className="mt-1 text-[16px]">
              <EstadoLocal />
            </dd>
          </div>
        </dl>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-2xl border border-[#1F1A15]/8 bg-[#F0E7D5]">
              <iframe
                src="https://www.google.com/maps?q=Pucallpa,Peru&output=embed"
                className="h-full min-h-[280px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Pucallpa con la ubicación de Sabor Criollo"
              />
            </div>

            <div className="rounded-2xl border border-[#1F1A15]/8 bg-white p-7">
              <h2 className="text-[15px] font-semibold">Horario</h2>
              <ul className="mt-4 space-y-3">
                {horarioPorTramos().map((h) => (
                  <li key={h.dias} className="flex items-baseline justify-between gap-3 border-b border-[#1F1A15]/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-[15px]">{h.dias}</span>
                    <span className="text-[14px] tabular-nums text-[#1F1A15]/70">{h.horas}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#1F1A15] p-7 text-white">
              <h2 className="text-[15px] font-semibold text-[#E8A87C]">¿Prefieres WhatsApp?</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">Te respondemos en el horario de atención, casi siempre en unos minutos.</p>
              <a
                href={wa("Hola, quiero hacer una consulta a Sabor Criollo.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1E7E44] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#176636]"
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
