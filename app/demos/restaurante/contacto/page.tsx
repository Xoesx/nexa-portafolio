import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Sabor Criollo",
  description: "Visítanos en Pucallpa. Reservas, pedidos y consultas por WhatsApp o correo.",
};

const infoContacto = [
  { icon: "📍", label: "Dirección", valor: "Jr. Comercio 245, Pucallpa, Ucayali" },
  { icon: "📞", label: "Teléfono", valor: "+51 999 888 777" },
  { icon: "✉️", label: "Correo", valor: "hola@saborcriollo.pe" },
  { icon: "🕐", label: "Horario", valor: "Lun – Dom · 12:00 a 22:00" },
];

const horarios = [
  { dia: "Lunes – Jueves", hora: "12:00 – 22:00" },
  { dia: "Viernes – Sábado", hora: "12:00 – 23:30" },
  { dia: "Domingo", hora: "12:00 – 17:00" },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
            Contacto
          </p>
          <h1
            className="mt-3 text-[42px] leading-[1.05] md:text-[56px]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Visítanos
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#1F1A15]/60">
            Estamos a dos cuadras de la Plaza de Armas. Escríbenos por WhatsApp o por correo.
          </p>
        </div>

        {/* Grid de datos de contacto */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {infoContacto.map((info) => (
            <div
              key={info.label}
              className="rounded-2xl border border-[#1F1A15]/8 bg-white p-6 transition hover:border-[#C1440E]/30 hover:shadow-lg"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#F0E7D5] text-lg">
                {info.icon}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A7F72]">
                {info.label}
              </p>
              <p className="mt-2 text-[14px] leading-snug text-[#1F1A15]">{info.valor}</p>
            </div>
          ))}
        </div>

        {/* Formulario + Panel lateral */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-2xl border border-[#1F1A15]/8 bg-[#F0E7D5]">
              <iframe
                src="https://www.google.com/maps?q=Pucallpa,Peru&output=embed"
                className="h-full min-h-[280px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Sabor Criollo"
              />
            </div>

            <div className="rounded-2xl border border-[#1F1A15]/8 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8A7F72]">
                Horarios
              </p>
              <ul className="mt-4 space-y-3">
                {horarios.map((h) => (
                  <li
                    key={h.dia}
                    className="flex items-baseline justify-between gap-3 border-b border-[#1F1A15]/5 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-[14px] text-[#1F1A15]">{h.dia}</span>
                    <span className="text-[13px] text-[#1F1A15]/50">{h.hora}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#1F1A15] p-7 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8A87C]">
                ¿Prefieres WhatsApp?
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Escríbenos y te respondemos en menos de 5 minutos.
              </p>
              <a
                href="https://wa.me/51999888777?text=Hola,%20quiero%20hacer%20una%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#1DA851]"
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
