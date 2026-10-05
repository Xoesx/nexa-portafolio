import type { PuntoMapa } from "../components/Mapa";
import { precioTexto, type Propiedad } from "../data";

/** Convierte una propiedad en un marcador para el mapa. */
export const aPunto = (p: Propiedad): PuntoMapa => ({
  id: p.id,
  lat: p.lat,
  lng: p.lng,
  etiqueta: precioTexto(p).replace(" /mes", "/mes"),
  titulo: p.titulo,
  subtitulo: `${p.distrito} · Cód. ${p.codigo}`,
  foto: p.fotos[0],
  href: `/demos/inmobiliaria/propiedades/${p.id}`,
});
