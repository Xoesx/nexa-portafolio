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
  producto: {
    src: "/demos/veluno/sonicwave.webp",
    width: 830,
    height: 830,
    alt: "Mujer de perfil con auriculares de diadema en cobre y azul",
  },
  /** La misma sesión de fotos completa, para la sección de diseño. */
  productoCompleto: {
    src: "/demos/veluno/sonicwave-completa.webp",
    width: 1254,
    height: 1254,
    alt: "Mujer de perfil con auriculares de diadema en cobre y azul y una chaqueta teñida",
  },
  /** Recorte del auricular de la foto del producto, sin ampliar. */
  auricular: {
    src: "/demos/veluno/sonicwave-auricular.webp",
    width: 420,
    height: 420,
    alt: "Primer plano del auricular en cobre con su arco gris",
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

export const DISENO = {
  titulo: "Confort, estilo y rendimiento.",
  texto:
    "Las tres ideas con las que Veluno diseña sus productos electrónicos, reunidas en unos auriculares de diadema.",
} as const;

export const PIE = "Recreación de portafolio hecha por NEXA. Veluno no tiene una tienda conectada." as const;

/** Mensajes para los controles que en una tienda real llevarían a otra pantalla. */
export const AVISOS = {
  compra: "La compra no está disponible en esta demo.",
  paginas: "Esta demo recrea solo la portada de Veluno.",
  busqueda: "La búsqueda no está conectada en esta demo.",
  favoritos: "Los favoritos no están disponibles en esta demo.",
  carrito: "El carrito no está disponible en esta demo.",
  perfil: "Esta demo no tiene inicio de sesión.",
} as const;
