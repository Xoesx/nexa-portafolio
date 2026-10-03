import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MenuCliente } from "./MenuCliente";

export const metadata: Metadata = {
  title: "Menú | Sabor Criollo",
  description: "Carta completa: entradas, principales, postres y bebidas. Precios en soles.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main>
        <MenuCliente />
      </main>
      <Footer />
    </div>
  );
}
