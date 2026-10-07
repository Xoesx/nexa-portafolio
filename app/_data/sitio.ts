import { ANCLA, type Idioma } from "./idioma";

export const SITIO = {
  nombre: "NEXA",
  nombreLegal: "NEXA Soluciones Digitales",
  url: "https://nexaportafolio.site",
  ciudad: "Pucallpa",
  region: "Ucayali",
  github: "https://github.com/Xoesx/nexa-portafolio",
  whatsapp: "51918641720",
  telefonoVisible: "918 641 720",
  telefonoInternacional: "+51 918 641 720",
  /** Años de experiencia: se muestra como "más de 4". */
  anios: 4,
  /** Tipo de cambio del BCRP usado para mostrar los precios en dólares. */
  cambio: { solesPorDolar: 3.44, fecha: "2026-10-06" },
} as const;

/** Título y descripción del sitio en cada idioma (metadata, Open Graph y datos estructurados). */
export const META: Record<Idioma, { titulo: string; descripcion: string; locale: string }> = {
  es: {
    titulo: "NEXA | Páginas web, citas en línea y sistemas a medida",
    descripcion:
      "Estudio de desarrollo web en Pucallpa con más de 4 años de experiencia. Hacemos páginas web, agendas de citas, catálogos con buscador y sistemas a medida para negocios del Perú y de otros países, con precio y plazo por escrito antes de empezar.",
    locale: "es_PE",
  },
  en: {
    titulo: "NEXA | Websites, online booking and custom web systems",
    descripcion:
      "Web development studio based in Peru with more than 4 years of experience. We build websites, online booking, searchable catalogs and custom systems for small businesses anywhere, with the price and timeline in writing before we start.",
    locale: "en_US",
  },
};

export const wa = (mensaje: string) =>
  `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

/** Enlace a WhatsApp con el primer mensaje ya escrito, en el idioma de la página. */
export const cotizar = (idioma: Idioma) =>
  wa(idioma === "es" ? "Hola NEXA, quiero cotizar una solución digital." : "Hi NEXA, I'd like a quote for a website.");

export const EXTERNO = { target: "_blank", rel: "noopener noreferrer" } as const;

export const NAVEGACION: Record<Idioma, { label: string; href: string }[]> = {
  es: [
    { label: "Proyectos", href: `#${ANCLA.es.proyectos}` },
    { label: "Experiencia", href: `#${ANCLA.es.experiencia}` },
    { label: "Precios", href: `#${ANCLA.es.precios}` },
    { label: "Preguntas", href: `#${ANCLA.es.faq}` },
  ],
  en: [
    { label: "Projects", href: `#${ANCLA.en.proyectos}` },
    { label: "Experience", href: `#${ANCLA.en.experiencia}` },
    { label: "Pricing", href: `#${ANCLA.en.precios}` },
    { label: "FAQ", href: `#${ANCLA.en.faq}` },
  ],
};
