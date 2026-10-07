import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const lora = Lora({ subsets: ["latin"], display: "swap", variable: "--font-hz-titulo" });
const nunito = Nunito_Sans({ subsets: ["latin"], display: "swap", variable: "--font-hz-texto" });

export const metadata: Metadata = {
  title: {
    default: "Colegio Horizonte | Inicial, primaria y secundaria en Pucallpa",
    template: "%s | Colegio Horizonte",
  },
  description:
    "Demo de NEXA: sitio para un colegio con niveles, propuesta educativa, calendario de admisión y preinscripción en línea que calcula el grado según la edad.",
  openGraph: {
    images: [{ url: "/og/colegio-es.png", width: 1200, height: 630 }],
    title: "Colegio Horizonte | Demo de NEXA",
    description: "Admisión en línea por pasos, con cálculo automático del grado. Hecho por NEXA.",
    url: "/demos/colegio",
  },
};

export default function ColegioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${lora.variable} ${nunito.variable} flex min-h-screen flex-col overflow-x-clip bg-[#fbf8f3] text-[#26201c] antialiased`}
      style={{ fontFamily: "var(--font-hz-texto), system-ui, sans-serif" }}
    >
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
