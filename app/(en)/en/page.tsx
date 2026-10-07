import type { Metadata } from "next";
import { Inicio } from "../../_components/Inicio";
import { alternas, RUTA } from "../../_data/idioma";

export const metadata: Metadata = { alternates: alternas(RUTA.inicio, "en") };

export default function Home() {
  return <Inicio idioma="en" />;
}
