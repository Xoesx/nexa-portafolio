import type { Metadata } from "next";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Categorias } from "./components/Categorias";
import { Recomendados } from "./components/Recomendados";
import { Cocinera } from "./components/Cocinera";
import { Experiencias } from "./components/Experiencias";
import { Oferta } from "./components/Oferta";
import { Resenas } from "./components/Resenas";
import { SaboresSelva } from "./components/SaboresSelva";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Sabor Criollo | Cocina peruana en Pucallpa",
  description:
    "Cocina criolla y amazónica en Pucallpa: lomo saltado, ceviche, juane y tacacho. Reserva tu mesa en línea con horarios disponibles.",
  openGraph: {
    images: [{ url: "/og/sabor-criollo-es.png", width: 1200, height: 630 }],
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
        <Experiencias />
        <Cocinera />
        <SaboresSelva />
        <Resenas />
        <Oferta />
      </main>
      <Footer />
    </div>
  );
}
