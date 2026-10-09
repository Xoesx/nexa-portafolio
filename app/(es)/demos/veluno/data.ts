/**
 * Contenido de la portada de Veluno, copiado tal cual de la imagen de referencia.
 * Veluno es una recreación visual para el portafolio: no hay tienda, carrito ni cuentas detrás.
 */

export const MARCA = "Veluno";

export const NAVEGACION = ["Inicio", "Nosotros", "Tienda", "Novedades", "Contacto"] as const;

export type Hero = {
  titulo: readonly [string, string];
  /** [texto, frase final que no se parte] */
  descripcion: readonly [string, string];
  accion: string;
};

export type Producto = {
  id: string;
  nombre: string;
  descripcion: readonly [string, string];
  precio: string;
};

export const HERO: Hero = {
  titulo: ["Tecnología inteligente,", "vida más simple"],
  // La última frase va junta, como en la referencia: "estilo y rendimiento." abre la tercera línea.
  descripcion: [
    "Mejora tu día a día con los productos electrónicos de Veluno, diseñados para brindar confort,",
    "estilo y rendimiento.",
  ],
  accion: "Comprar ahora",
};

export const PRODUCTO: Producto = {
  id: "sonicwave",
  nombre: "SonicWave",
  descripcion: ["Sonido envolvente con graves profundos, agudos cristalinos y tonos ricos", "y dinámicos."],
  precio: "$ 99.99",
};

/** Fotos aportadas por el cliente, guardadas en public/demos/veluno. */
export const FOTOS = {
  hero: {
    src: "/demos/veluno/hero.webp",
    width: 1672,
    height: 941,
    alt: "Mujer de perfil con auriculares de diadema lila y el pelo al viento, sobre un fondo lila",
  },
  avatar: {
    // Decorativa: el botón que la contiene ya se llama "Perfil".
    src: "/demos/veluno/avatar.webp",
    width: 256,
    height: 256,
    alt: "",
  },
} as const;

/*
 * Textos del recorrido. Todos salen de la copia original (día a día; confort, estilo y rendimiento;
 * sonido envolvente con graves profundos, agudos cristalinos y tonos ricos y dinámicos):
 * no hay especificaciones técnicas inventadas.
 */
export const RECORRIDO = {
  lema: "Diseñados para tu día a día.",
  cierre: "Así suena SonicWave.",
} as const;

export const SONIDO = {
  titulo: "Sonido envolvente.",
  cualidades: ["Graves profundos.", "Agudos cristalinos.", "Tonos ricos y dinámicos."],
} as const;

/*
 * Textos de los capítulos nuevos. Son frases editoriales que nacen de la copia original (confort,
 * estilo, rendimiento, día a día, tecnología inteligente): no afirman especificaciones, cifras,
 * autonomía, cancelación de ruido, materiales ni nada que la referencia no diga.
 */
export type Contenido = {
  valores: readonly string[];
  destacado: { titulo: string; texto: string; accion: string; lateral: string };
  coleccion: { titulo: string; texto: string };
  manifiesto: { palabras: readonly [string, string, string]; texto: string };
  confort: { titulo: string; texto: string };
  estilo: { titulo: string; texto: string };
  rendimiento: { titulo: string; texto: string };
  diaADia: { titulo: string; momentos: readonly [string, string, string] };
  detalle: { titulo: string; texto: string; rotulos: readonly [string, string, string] };
  cierre: string;
};

export const CONTENIDO: Contenido = {
  // Las cualidades que la referencia atribuye a Veluno y a SonicWave, tal cual.
  valores: [
    "Sonido envolvente",
    "Graves profundos",
    "Agudos cristalinos",
    "Tonos ricos y dinámicos",
    "Confort",
    "Estilo",
    "Rendimiento",
  ],
  // De la referencia ampliada de Veluno ("Sound Without Limits", "Beyond The Real World").
  destacado: {
    titulo: "Sonido sin límites.",
    texto: "Diseñados para una escucha inmersiva y confort todo el día.",
    accion: "Ver SonicWave",
    lateral: "Más allá de lo real.",
  },
  coleccion: {
    titulo: "Explora la colección.",
    texto: "Productos electrónicos diseñados para brindar confort, estilo y rendimiento.",
  },
  manifiesto: {
    palabras: ["Confort.", "Estilo.", "Rendimiento."],
    texto: "Las tres ideas con las que Veluno diseña sus productos.",
  },
  confort: { titulo: "Confort.", texto: "Ponte cómodo. Lo demás es música." },
  estilo: { titulo: "Estilo.", texto: "Combina con quien eres." },
  rendimiento: { titulo: "Rendimiento.", texto: "Tecnología inteligente, sin complicaciones." },
  diaADia: { titulo: "Mejora tu día a día.", momentos: ["Tu música.", "Tu ritmo.", "Tu momento."] },
  detalle: {
    titulo: "En detalle.",
    texto: "Cada pieza, pensada para acompañarte.",
    rotulos: ["La forma.", "Las almohadillas.", "El arco."],
  },
  cierre: "Tecnología inteligente, vida más simple.",
};

/*
 * Catálogo: SonicWave y los tres productos que muestra la referencia ampliada de Veluno, con sus
 * nombres y precios ("From …"). No hay más productos ni más datos: la compra no está conectada.
 */
export type Articulo = {
  id: string;
  nombre: string;
  precio: string;
  /** La referencia dice "From": el precio es el mínimo de la línea. */
  desde: boolean;
};

export const CATALOGO: readonly Articulo[] = [
  { id: "sonicwave", nombre: "SonicWave", precio: "$ 99.99", desde: false },
  { id: "airbeats", nombre: "AirBeats Pro Buds", precio: "$ 699.99", desde: true },
  { id: "cylinder", nombre: "Cylinder Audio Core", precio: "$ 179.99", desde: true },
  { id: "visiontone", nombre: "VisionTone Smart Glasses", precio: "$ 1,299.99", desde: true },
];

export const PIE = "Recreación de portafolio hecha por NEXA. Veluno no tiene una tienda conectada." as const;

/** Mensajes para los controles que en una tienda real llevarían a otra pantalla. */
export const AVISOS = {
  compra: "La compra no está disponible en esta demo.",
  tienda: "La tienda no está disponible en esta demo.",
  paginas: "Esta demo recrea solo la portada de Veluno.",
  busqueda: "La búsqueda no está conectada en esta demo.",
  favoritos: "Los favoritos no están disponibles en esta demo.",
  carrito: "El carrito no está disponible en esta demo.",
  perfil: "Esta demo no tiene inicio de sesión.",
} as const;
