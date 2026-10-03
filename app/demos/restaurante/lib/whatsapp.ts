export const WHATSAPP = "51918641720";
export const wa = (mensaje: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
