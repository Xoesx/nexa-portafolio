export const SITIO = {
  nombre: "NEXA",
  nombreLegal: "NEXA Soluciones Digitales",
  url: "https://nexa-portafolio.vercel.app",
  titulo: "NEXA | Páginas web y asistentes de WhatsApp en Pucallpa",
  descripcion:
    "Estudio de desarrollo en Pucallpa. Hacemos páginas web, asistentes de WhatsApp y automatizaciones para negocios de todo el Perú, con precio y plazo por escrito antes de empezar.",
  ciudad: "Pucallpa",
  region: "Ucayali",
  github: "https://github.com/Xoesx/nexa-portafolio",
  whatsapp: "51918641720",
  telefonoVisible: "918 641 720",
} as const;

export const wa = (mensaje: string) =>
  `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

export const COTIZAR = wa("Hola NEXA, quiero cotizar una solución digital.");

export const EXTERNO = { target: "_blank", rel: "noopener noreferrer" } as const;

export const NAVEGACION = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Calidad", href: "#calidad" },
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Precios", href: "#precios" },
  { label: "Preguntas", href: "#faq" },
] as const;
