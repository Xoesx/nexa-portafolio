import type { StaticImageData } from "next/image";
import ciudadImg from "./ciudad.webp";
import portadaProducto from "./portada-producto.webp";
import portadaRetrato from "./portada-retrato.webp";

/*
 * Fotos de la landing. Las propias van como imports estáticos (Next conoce su tamaño y genera el
 * desenfoque de carga); las de Unsplash se sirven en alta resolución desde su CDN, a través del
 * optimizador de Next (images.unsplash.com ya está permitido en next.config y en la CSP).
 * Va aparte de data.ts porque data.ts también lo importa un componente de cliente (el buscador).
 *
 * Solo la foto de la portada (y sus recortes) muestra a SonicWave; el resto son fotos de ambiente
 * y de los otros productos del catálogo, y su texto alternativo nunca las llama SonicWave.
 */
export type Foto = {
  src: StaticImageData | string;
  alt: string;
  /** Recorte dentro del marco. Va en el prop style para que el desenfoque de carga coincida. */
  posicion?: string;
  /** Color dominante: fondo del marco mientras llega una foto remota. */
  color?: string;
};

/** URL de Unsplash a 2400 px: la fuente que el optimizador de Next recorta a cada ancho. */
function unsplash(foto: string, ancho = 2400) {
  return `https://images.unsplash.com/${foto}?auto=format&fit=max&w=${ancho}&q=85`;
}

const retrato: Foto = {
  src: portadaRetrato,
  alt: "Mujer de perfil con auriculares de diadema lila y el pelo al viento",
  posicion: "50% 45%",
};

const producto: Foto = {
  src: portadaProducto,
  alt: "Mujer de perfil con auriculares de diadema lila y chaqueta negra, sobre un fondo lila",
  posicion: "45% 40%",
};

const ciudad: Foto = {
  src: ciudadImg,
  alt: "Rascacielos de vidrio y una antena al atardecer, con el cielo azul y rosado",
  posicion: "50% 60%",
};

// Unsplash: elegidas sin logotipos ni marcas visibles, con luz y paleta acordes a la página.
// Autores y enlaces en lib/creditos.ts (una prueba comprueba que coinciden con estas fotos).
const sonido: Foto = {
  src: unsplash("photo-1756706916864-0e4ed0fa85cf"),
  alt: "Persona de espaldas con auriculares de diadema, de pie en penumbra frente a un fondo oscuro con suaves trazos de luz vertical",
  posicion: "50% 40%",
  color: "#262626",
};

const airbeats: Foto = {
  src: unsplash("photo-1739764575613-ecc078ed173d"),
  alt: "Auriculares inalambricos blancos asomando de su estuche de carga abierto, sobre una superficie lisa de tono blanco roto calido",
  posicion: "50% 60%",
  color: "#c0a6a6",
};

const cylinder: Foto = {
  src: unsplash("photo-1761384409444-2f8359d67a69"),
  alt: "Altavoz inteligente cilindrico de malla blanca sobre una mesa blanca, con luz natural suave y una pared clara de fondo",
  posicion: "50% 66%",
  color: "#d9d9d9",
};

const visiontone: Foto = {
  src: unsplash("photo-1618902544104-7ebfb9849b4d"),
  alt: "Persona de cabello platino con un visor futurista de lente oscura envolvente; levanta las manos frente a la cámara como si manejara una interfaz invisible, sobre un fondo gris liso de estudio",
  posicion: "50% 35%",
  color: "#737373",
};

const allaDeLoReal: Foto = {
  src: unsplash("photo-1548659545-93415a88191c"),
  alt: "Mujer de cabello largo y liso con gafas de escudo futuristas de lente azul espejada; se las ajusta con una mano y lleva una chaqueta negra satinada caída sobre los hombros, ante un fondo gris claro de estudio",
  posicion: "50% 28%",
  color: "#d9d9d9",
};

const confort: Foto = {
  src: unsplash("photo-1668092834733-60f7c0d567a1"),
  alt: "Mujer con los ojos cerrados sostiene con ambas manos unos auriculares de diadema claros frente a una pared de madera clara",
  posicion: "50% 35%",
  color: "#a6a68c",
};

const estiloUno: Foto = {
  src: unsplash("photo-1625786682948-2168238883d2"),
  alt: "Mujer de cabello castaño con auriculares de diadema blancos, ojos cerrados y manos sobre las orejas, con jersey blanco de punto y collar dorado ante una pared beige lisa",
  posicion: "50% 30%",
  color: "#a6a68c",
};

const estiloDos: Foto = {
  src: unsplash("photo-1759432172550-6e77baf8bd46"),
  alt: "Retrato en tono sepia de un hombre joven de pelo corto oscuro, con auriculares de diadema claros y camisa negra, mirando de frente a cámara sobre fondo liso",
  posicion: "50% 30%",
  color: "#c0a6a6",
};

const estiloTres: Foto = {
  src: unsplash("photo-1730973915515-e79273d90b7c"),
  alt: "Mujer pelirroja con auriculares de diadema plateados, de perfil, mirando hacia arriba con la mano en la frente, con abrigo negro sobre fondo urbano oscuro desenfocado",
  posicion: "50% 30%",
  color: "#262626",
};

const rendimiento: Foto = {
  src: unsplash("photo-1723912628184-dfde150fab82"),
  alt: "Hombre con gafas que se ajusta unos auriculares de diadema con ambas manos, con los ojos bajos y concentrado, iluminado por luz roja y azul verdosa sobre un fondo negro",
  posicion: "50% 35%",
  color: "#260c0c",
};

const manana: Foto = {
  src: unsplash("photo-1790438329317-e64a2dc12adc"),
  alt: "Joven con auriculares de diadema y mochila camina por una acera de la ciudad bajo el sol de la mañana, mirando su teléfono",
  posicion: "50% 30%",
  color: "#262626",
};

const ritmo: Foto = {
  src: unsplash("photo-1759984782169-36efef7ed33e"),
  alt: "Mujer joven con gafas y auriculares claros estudia y subraya apuntes con rotuladores de colores en un escritorio junto a una ventana luminosa",
  posicion: "50% 30%",
  color: "#f3f3f3",
};

const momento: Foto = {
  src: unsplash("photo-1713863574532-aea8fab1e4a8"),
  alt: "Mujer sonriente con auriculares rosa y blanco se estira relajada en un sofá verde de terciopelo frente a una pared beige cálida",
  posicion: "50% 35%",
  color: "#a68c73",
};

const detalleUno: Foto = {
  src: unsplash("photo-1674989844487-722ec77b9b81"),
  alt: "Macro de unos auriculares de diadema grises sobre fondo blanco: almohadillas de piel sintética, la pieza de ajuste del arco y la articulación metálica de una copa",
  posicion: "50% 50%",
  color: "#f3f3f3",
};

const detalleDos: Foto = {
  src: unsplash("photo-1658927420074-85930da203ec"),
  alt: "Macro en blanco y negro de unos auriculares de diadema negros: la almohadilla mullida y los botones de control en el borde de la copa, con luz rasante",
  posicion: "50% 50%",
  color: "#404040",
};

const detalleTres: Foto = {
  src: unsplash("photo-1737291937135-3a0fcb5e0c44"),
  alt: "Auriculares de diadema en crema y gris metalizado, suspendidos en el aire sobre un fondo degradado en tono arena",
  posicion: "50% 55%",
  color: "#d9d9d9",
};

const final: Foto = {
  src: unsplash("photo-1597352651426-56ccf1dbc926"),
  alt: "Silueta de un hombre con auriculares de diadema y cable recortada contra el cielo azul del anochecer, con rascacielos y arboles al fondo",
  posicion: "40% 50%",
  color: "#597373",
};

export const FOTOS_LANDING = {
  retrato,
  producto,
  ciudad,
  sonido,
  allaDeLoReal,
  coleccion: { airbeats, cylinder, visiontone },
  confort,
  estilo: [estiloUno, estiloDos, estiloTres] as const,
  rendimiento,
  dia: [manana, ritmo, momento] as const,
  detalle: [detalleUno, detalleDos, detalleTres] as const,
  final,
};
