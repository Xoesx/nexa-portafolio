export const SITIO = {
  nombre: "NEXA",
  nombreLegal: "NEXA Soluciones Digitales",
  url: "https://nexaportafolio.site",
  titulo: "NEXA | Páginas web, citas en línea y sistemas para negocios en Perú",
  descripcion:
    "Estudio de desarrollo web en Pucallpa con más de 4 años de experiencia. Hacemos páginas web, agendas de citas, catálogos con buscador y sistemas a medida para negocios de todo el Perú, con precio y plazo por escrito antes de empezar.",
  ciudad: "Pucallpa",
  region: "Ucayali",
  github: "https://github.com/Xoesx/nexa-portafolio",
  whatsapp: "51918641720",
  telefonoVisible: "918 641 720",
  /** Años de experiencia: se muestra como "más de 4". */
  anios: 4,
} as const;

export const wa = (mensaje: string) =>
  `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

export const COTIZAR = wa("Hola NEXA, quiero cotizar una solución digital.");

export const EXTERNO = { target: "_blank", rel: "noopener noreferrer" } as const;

export const NAVEGACION = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Precios", href: "#precios" },
  { label: "Preguntas", href: "#faq" },
] as const;
