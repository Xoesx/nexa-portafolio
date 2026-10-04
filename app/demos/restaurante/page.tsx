import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Categorias } from "./components/Categorias";
import { Recomendados } from "./components/Recomendados";
import { Nosotros } from "./components/Nosotros";
import { Oferta } from "./components/Oferta";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Sabor Criollo | Cocina peruana en Pucallpa",
  description:
    "Recetas familiares preparadas al momento. Reserva tu mesa por WhatsApp. Jr. Comercio 245, Pucallpa.",
  openGraph: {
    title: "Sabor Criollo | Demo de NEXA",
    description: "Sitio completo para un restaurante, con carta, reservas y panel de administración. Hecho por NEXA.",
    url: "/demos/restaurante",
  },
};

export default function RestauranteHome() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main>
        <Hero />
        <Categorias />
        <Recomendados />
        <Nosotros />
        <Oferta />
      </main>
      <Footer />
    </div>
  );
}
