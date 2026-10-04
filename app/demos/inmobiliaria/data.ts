export type Operacion = "venta" | "alquiler";
export type Tipo = "casa" | "departamento";
export type Moneda = "USD" | "PEN";

export type Propiedad = {
  id: string;
  titulo: string;
  operacion: Operacion;
  tipo: Tipo;
  distrito: string;
  direccion: string;
  precio: number;
  moneda: Moneda;
  area: number;
  dormitorios: number;
  banos: number;
  cocheras: number;
  fotos: string[];
  resumen: string;
  descripcion: string[];
  caracteristicas: string[];
  destacada?: boolean;
  nueva?: boolean;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600&q=80`;

const INTERIORES = {
  sala: u("1600607687939-ce8a6c25118c"),
  salaClara: u("1493809842364-78817add7ffb"),
  salaCuero: u("1554995207-c18c203602cb"),
  salaPlantas: u("1502672260266-1c1ef2d93688"),
  salaAmplia: u("1560448204-e02f11c3d0e2"),
  salaRoja: u("1522708323590-d24dbb6b0267"),
  cocina: u("1484154218962-a197022b5858"),
  dormitorio: u("1505691938895-1758d7feb511"),
};

export const DISTRITOS = ["Callería", "Yarinacocha", "Manantay"] as const;

export const PROPIEDADES: Propiedad[] = [
  {
    id: "casa-moderna-con-piscina-yarinacocha",
    titulo: "Casa moderna con piscina",
    operacion: "venta",
    tipo: "casa",
    distrito: "Yarinacocha",
    direccion: "Urb. Las Palmeras, cerca a la laguna",
    precio: 285000,
    moneda: "USD",
    area: 420,
    dormitorios: 4,
    banos: 4,
    cocheras: 2,
    fotos: [u("1600596542815-ffad4c1539a9"), INTERIORES.sala, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Dos pisos, piscina temperada y terraza techada a cinco minutos de la laguna.",
    descripcion: [
      "Casa de arquitectura contemporánea en una de las urbanizaciones más tranquilas de Yarinacocha. Los ambientes sociales se abren a la terraza y a la piscina, pensados para el calor de la selva.",
      "El segundo piso concentra los cuatro dormitorios, todos con baño propio. La principal tiene vestidor y balcón con vista al jardín.",
    ],
    caracteristicas: ["Piscina", "Terraza techada", "Cocina abierta con isla", "Cuarto de servicio", "Paneles solares", "Seguridad 24 h"],
    destacada: true,
  },
  {
    id: "departamento-centrico-calleria",
    titulo: "Departamento céntrico con balcón",
    operacion: "alquiler",
    tipo: "departamento",
    distrito: "Callería",
    direccion: "Jr. Tarapacá, a dos cuadras de la Plaza de Armas",
    precio: 1800,
    moneda: "PEN",
    area: 85,
    dormitorios: 2,
    banos: 2,
    cocheras: 1,
    fotos: [INTERIORES.salaClara, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Tercer piso con ascensor, balcón y cochera. Ideal para pareja o profesional.",
    descripcion: [
      "Departamento luminoso en pleno centro de Pucallpa, a pasos de bancos, restaurantes y la Plaza de Armas.",
      "Se entrega con cocina equipada y aire acondicionado en los dos dormitorios. Mantenimiento incluido en el precio.",
    ],
    caracteristicas: ["Ascensor", "Balcón", "Aire acondicionado", "Cocina equipada", "Mantenimiento incluido"],
    destacada: true,
    nueva: true,
  },
  {
    id: "casa-de-campo-con-jardin-manantay",
    titulo: "Casa con jardín amplio",
    operacion: "venta",
    tipo: "casa",
    distrito: "Manantay",
    direccion: "Av. Túpac Amaru, sector residencial",
    precio: 158000,
    moneda: "USD",
    area: 600,
    dormitorios: 3,
    banos: 3,
    cocheras: 3,
    fotos: [u("1570129477492-45c003edd2be"), INTERIORES.salaAmplia, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Terreno de 600 m² con jardín, frutales y espacio para ampliar.",
    descripcion: [
      "Casa de un piso sobre un terreno amplio, con jardín delantero, frutales en la parte posterior y espacio para una segunda construcción.",
      "Perfecta para una familia que busca tranquilidad sin alejarse de la ciudad.",
    ],
    caracteristicas: ["Jardín", "Árboles frutales", "Lavandería", "Depósito", "Título inscrito en SUNARP"],
  },
  {
    id: "departamento-familiar-yarinacocha",
    titulo: "Departamento familiar en condominio",
    operacion: "venta",
    tipo: "departamento",
    distrito: "Yarinacocha",
    direccion: "Condominio Los Laureles",
    precio: 92000,
    moneda: "USD",
    area: 110,
    dormitorios: 3,
    banos: 2,
    cocheras: 1,
    fotos: [INTERIORES.salaCuero, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Condominio con área de juegos, piscina común y vigilancia.",
    descripcion: [
      "Departamento de tres dormitorios dentro de un condominio cerrado con áreas verdes, piscina común y zona de parrillas.",
      "A diez minutos del centro y cerca de colegios y mercados.",
    ],
    caracteristicas: ["Piscina común", "Área de juegos", "Zona de parrillas", "Vigilancia", "Áreas verdes"],
    nueva: true,
  },
  {
    id: "casa-contemporanea-calleria",
    titulo: "Casa contemporánea de dos pisos",
    operacion: "venta",
    tipo: "casa",
    distrito: "Callería",
    direccion: "Urb. Municipal, calle residencial",
    precio: 210000,
    moneda: "USD",
    area: 300,
    dormitorios: 4,
    banos: 3,
    cocheras: 2,
    fotos: [u("1600585154340-be6161a56a0c"), INTERIORES.salaPlantas, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Ventanales de piso a techo, estudio y terraza en el segundo nivel.",
    descripcion: [
      "Casa de diseño contemporáneo con grandes ventanales que aprovechan la luz natural y mantienen los ambientes frescos.",
      "Incluye estudio independiente, ideal para trabajar desde casa, y terraza en el segundo nivel.",
    ],
    caracteristicas: ["Estudio", "Terraza", "Ventanales", "Cocina equipada", "Cerco eléctrico"],
    destacada: true,
  },
  {
    id: "minidepartamento-amoblado-calleria",
    titulo: "Minidepartamento amoblado",
    operacion: "alquiler",
    tipo: "departamento",
    distrito: "Callería",
    direccion: "Av. Centenario, cerca a la universidad",
    precio: 1100,
    moneda: "PEN",
    area: 45,
    dormitorios: 1,
    banos: 1,
    cocheras: 0,
    fotos: [INTERIORES.salaRoja, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Amoblado, con internet incluido. Listo para mudarse.",
    descripcion: [
      "Minidepartamento amoblado con cama, sofá, refrigeradora y cocina. Internet y agua incluidos.",
      "Cerca a universidades y a la avenida principal, con transporte a toda hora.",
    ],
    caracteristicas: ["Amoblado", "Internet incluido", "Agua incluida", "Ingreso independiente"],
  },
  {
    id: "residencia-con-piscina-yarinacocha",
    titulo: "Residencia con piscina y vista",
    operacion: "venta",
    tipo: "casa",
    distrito: "Yarinacocha",
    direccion: "Frente a la laguna de Yarinacocha",
    precio: 340000,
    moneda: "USD",
    area: 520,
    dormitorios: 5,
    banos: 5,
    cocheras: 3,
    fotos: [u("1564013799919-ab600027ffc6"), INTERIORES.salaAmplia, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Cinco dormitorios, piscina y terraza con vista a la laguna.",
    descripcion: [
      "Residencia de lujo frente a la laguna, con piscina, terraza mirador y amplias áreas sociales para recibir.",
      "Acabados de primera, cocina tipo isla y dormitorios con baño propio.",
    ],
    caracteristicas: ["Vista a la laguna", "Piscina", "Terraza mirador", "Bar", "Cuarto de servicio", "Seguridad 24 h"],
  },
  {
    id: "casa-para-alquilar-manantay",
    titulo: "Casa amplia para familia",
    operacion: "alquiler",
    tipo: "casa",
    distrito: "Manantay",
    direccion: "Jr. Los Cedros, zona tranquila",
    precio: 2500,
    moneda: "PEN",
    area: 200,
    dormitorios: 3,
    banos: 2,
    cocheras: 2,
    fotos: [u("1568605114967-8130f3a36994"), INTERIORES.salaClara, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Tres dormitorios, patio y cochera doble en calle tranquila.",
    descripcion: [
      "Casa de un piso con patio, cochera para dos autos y tres dormitorios amplios.",
      "Se acepta mascotas. Contrato mínimo de un año.",
    ],
    caracteristicas: ["Patio", "Cochera doble", "Acepta mascotas", "Lavandería"],
  },
  {
    id: "departamento-de-estreno-calleria",
    titulo: "Departamento de estreno",
    operacion: "venta",
    tipo: "departamento",
    distrito: "Callería",
    direccion: "Edificio Mirador del Ucayali",
    precio: 118000,
    moneda: "USD",
    area: 96,
    dormitorios: 2,
    banos: 2,
    cocheras: 1,
    fotos: [u("1512917774080-9991f1c4c750"), INTERIORES.sala, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Estreno con vista al río, terraza en azotea y gimnasio.",
    descripcion: [
      "Departamento de estreno en edificio con vista al río Ucayali. Áreas comunes con gimnasio, terraza en azotea y coworking.",
      "Financiamiento disponible con los principales bancos.",
    ],
    caracteristicas: ["Estreno", "Vista al río", "Gimnasio", "Terraza en azotea", "Coworking"],
    nueva: true,
  },
];

export const precioTexto = (p: Pick<Propiedad, "precio" | "moneda" | "operacion">) => {
  const monto = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(p.precio);
  return `${p.moneda === "USD" ? "US$" : "S/"} ${monto}${p.operacion === "alquiler" ? " /mes" : ""}`;
};

export const buscarPropiedad = (id: string) => PROPIEDADES.find((p) => p.id === id);

