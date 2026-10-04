import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-alba" });

export const metadata: Metadata = {
  title: {
    default: "Clínica Dental Alba | Odontología en Pucallpa",
    template: "%s | Clínica Dental Alba",
  },
  description:
    "Demo de NEXA: sitio para una clínica dental con tratamientos, equipo, preguntas frecuentes y agenda de citas en línea con horarios disponibles.",
  openGraph: {
    title: "Clínica Dental Alba | Demo de NEXA",
    description: "Agenda de citas en línea por pasos, con horarios disponibles por especialista. Hecho por NEXA.",
    url: "/demos/dental",
  },
};

export default function DentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${manrope.variable} flex min-h-screen flex-col overflow-x-clip bg-white text-[#0f2a2a] antialiased`}
      style={{ fontFamily: "var(--font-alba), system-ui, sans-serif" }}
    >
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
