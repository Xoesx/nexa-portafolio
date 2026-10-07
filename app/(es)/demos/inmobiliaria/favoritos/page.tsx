import type { Metadata } from "next";
import { ListaFavoritos } from "./ListaFavoritos";

export const metadata: Metadata = {
  title: "Mis favoritos",
  description: "Las propiedades que guardaste para comparar y volver a ver.",
  robots: { index: false },
};

export default function FavoritosPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-rz-titulo)" }}>
        Mis favoritos
      </h1>
      <p className="mt-3 max-w-xl text-[#57534e]">Se guardan en este navegador. Tócalos con el corazón para quitarlos.</p>
      <ListaFavoritos />
    </main>
  );
}
