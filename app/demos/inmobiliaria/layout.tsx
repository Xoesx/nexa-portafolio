import type { Metadata } from "next";
import { Sora, Urbanist } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-rz-titulo" });
const urbanist = Urbanist({ subsets: ["latin"], display: "swap", variable: "--font-rz-texto" });

export const metadata: Metadata = {
  title: {
    default: "Raíces Inmobiliaria | Casas y departamentos en Pucallpa",
    template: "%s | Raíces Inmobiliaria",
  },
  description:
    "Demo de NEXA: buscador de casas y departamentos en venta y alquiler en Pucallpa, con filtros, fichas detalladas y calculadora de crédito hipotecario.",
  openGraph: {
    title: "Raíces Inmobiliaria | Demo de NEXA",
    description: "Buscador de propiedades con filtros, fichas y calculadora hipotecaria. Hecho por NEXA.",
    url: "/demos/inmobiliaria",
  },
};

export default function InmobiliariaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${sora.variable} ${urbanist.variable} flex min-h-screen flex-col overflow-x-clip bg-[#faf8f5] text-[#1c1917] antialiased`}
      style={{ fontFamily: "var(--font-rz-texto), system-ui, sans-serif" }}
    >
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
