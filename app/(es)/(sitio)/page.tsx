import type { Metadata } from "next";
import { Inicio } from "../../_components/Inicio";
import { alternas, RUTA } from "../../_data/idioma";

// La canónica va en cada página y no en el layout raíz: si no, todas apuntarían a la home.
export const metadata: Metadata = { alternates: alternas(RUTA.inicio, "es") };

export default function Home() {
  return <Inicio idioma="es" />;
}
