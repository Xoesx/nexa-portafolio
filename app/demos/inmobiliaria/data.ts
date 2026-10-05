export type Operacion = "venta" | "alquiler";
export type Tipo = "casa" | "departamento" | "terreno" | "local";
export type Moneda = "USD" | "PEN";
export type Estado = "disponible" | "ocasion" | "remate" | "vendido";

export type Asesor = {
  id: string;
  nombre: string;
  especialidad: string;
  foto: string;
  correo: string;
  experiencia: string;
};

export type Propiedad = {
  id: string;
  codigo: string;
  titulo: string;
  operacion: Operacion;
  tipo: Tipo;
  estado: Estado;
  distrito: string;
  direccion: string;
  precio: number;
  moneda: Moneda;
  area: number;
  areaConstruida?: number;
  dormitorios: number;
  banos: number;
  cocheras: number;
  lat: number;
  lng: number;
  fotos: string[];
  resumen: string;
  descripcion: string[];
  caracteristicas: string[];
  asesor: string;
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
  salaAmarilla: u("1586023492125-27b2c045efd7"),
  comedor: u("1560185007-cde436f6a4d0"),
  escalera: u("1502005229762-cf1b2da7c5d6"),
  cocina: u("1484154218962-a197022b5858"),
  dormitorio: u("1505691938895-1758d7feb511"),
};

/** Tipo de cambio referencial para comparar precios en soles y dólares. */
export const TIPO_DE_CAMBIO = 3.75;

export const DISTRITOS = ["Callería", "Yarinacocha", "Manantay"] as const;

export const TIPOS: Record<Tipo, { singular: string; plural: string }> = {
  terreno: { singular: "Terreno", plural: "Terrenos" },
  casa: { singular: "Casa", plural: "Casas" },
  departamento: { singular: "Departamento", plural: "Departamentos" },
  local: { singular: "Local u oficina", plural: "Locales y oficinas" },
};

export const ESTADOS: Record<Estado, { etiqueta: string; clase: string }> = {
  disponible: { etiqueta: "Disponible", clase: "bg-[#166534] text-white" },
  ocasion: { etiqueta: "Ocasión", clase: "bg-[#1d4ed8] text-white" },
  remate: { etiqueta: "Remate", clase: "bg-[#b91c1c] text-white" },
  vendido: { etiqueta: "Vendido", clase: "bg-[#1c1917] text-white" },
};

export const ASESORES: Asesor[] = [
  {
    id: "milagros-pinedo",
    nombre: "Milagros Pinedo",
    especialidad: "Terrenos y lotes",
    foto: u("1494790108377-be9c29b29330"),
    correo: "milagros@raices.demo",
    experiencia: "9 años vendiendo terrenos en Yarinacocha y la Federico Basadre.",
  },
  {
    id: "carlos-vasquez",
    nombre: "Carlos Vásquez",
    especialidad: "Casas y departamentos",
    foto: u("1507003211169-0a1dd7228f2d"),
    correo: "carlos@raices.demo",
    experiencia: "Acompañó a más de 200 familias en la compra de su primera casa.",
  },
  {
    id: "lucia-ramirez",
    nombre: "Lucía Ramírez",
    especialidad: "Alquileres",
    foto: u("1580489944761-15a19d654956"),
    correo: "lucia@raices.demo",
    experiencia: "Se encarga de que propietario e inquilino firmen tranquilos.",
  },
  {
    id: "renzo-flores",
    nombre: "Renzo Flores",
    especialidad: "Locales y oficinas",
    foto: u("1557862921-37829c790f19"),
    correo: "renzo@raices.demo",
    experiencia: "Conoce cada esquina comercial del centro de Pucallpa.",
  },
];

export const PROPIEDADES: Propiedad[] = [
  {
    id: "casa-moderna-con-piscina-yarinacocha",
    codigo: "00712",
    titulo: "Casa moderna con piscina",
    operacion: "venta",
    tipo: "casa",
    estado: "disponible",
    distrito: "Yarinacocha",
    direccion: "Urb. Las Palmeras, cerca a la laguna",
    precio: 285000,
    moneda: "USD",
    area: 420,
    areaConstruida: 310,
    dormitorios: 4,
    banos: 4,
    cocheras: 2,
    lat: -8.3555,
    lng: -74.5905,
    fotos: [u("1600596542815-ffad4c1539a9"), INTERIORES.sala, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Dos pisos, piscina y terraza techada a cinco minutos de la laguna.",
    descripcion: [
      "Casa de arquitectura contemporánea en una de las urbanizaciones más tranquilas de Yarinacocha. Los ambientes sociales se abren a la terraza y a la piscina, pensados para el calor de la selva.",
      "El segundo piso concentra los cuatro dormitorios, todos con baño propio. La principal tiene vestidor y balcón con vista al jardín.",
    ],
    caracteristicas: ["Piscina", "Terraza techada", "Cocina abierta con isla", "Cuarto de servicio", "Paneles solares", "Seguridad 24 h"],
    asesor: "carlos-vasquez",
    destacada: true,
  },
  {
    id: "terreno-urbano-yarinacocha",
    codigo: "00731",
    titulo: "Terreno urbano de 300 m²",
    operacion: "venta",
    tipo: "terreno",
    estado: "disponible",
    distrito: "Yarinacocha",
    direccion: "Jr. Los Shiringales, a dos cuadras de la Av. Yarinacocha",
    precio: 165000,
    moneda: "PEN",
    area: 300,
    dormitorios: 0,
    banos: 0,
    cocheras: 0,
    lat: -8.3492,
    lng: -74.5842,
    fotos: [u("1500382017468-9049fed747ef"), u("1541888946425-d81bb19240f5"), u("1503387762-592deb58ef4e")],
    resumen: "10 x 30 m, con agua, luz y desagüe en la puerta. Listo para construir.",
    descripcion: [
      "Terreno plano de 10 metros de frente por 30 de fondo, en zona residencial consolidada con pistas y veredas.",
      "Cuenta con título inscrito en SUNARP y factibilidad de servicios. Ideal para vivienda familiar o un pequeño edificio.",
    ],
    caracteristicas: ["Título en SUNARP", "Agua, luz y desagüe", "Pista asfaltada", "Zona residencial", "Acepta crédito"],
    asesor: "milagros-pinedo",
    destacada: true,
    nueva: true,
  },
  {
    id: "departamento-centrico-calleria",
    codigo: "00706",
    titulo: "Departamento céntrico con balcón",
    operacion: "alquiler",
    tipo: "departamento",
    estado: "disponible",
    distrito: "Callería",
    direccion: "Jr. Tarapacá, a dos cuadras de la Plaza de Armas",
    precio: 1800,
    moneda: "PEN",
    area: 85,
    dormitorios: 2,
    banos: 2,
    cocheras: 1,
    lat: -8.3797,
    lng: -74.5531,
    fotos: [INTERIORES.salaClara, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Tercer piso con ascensor, balcón y cochera. Ideal para pareja o profesional.",
    descripcion: [
      "Departamento luminoso en pleno centro de Pucallpa, a pasos de bancos, restaurantes y la Plaza de Armas.",
      "Se entrega con cocina equipada y aire acondicionado en los dos dormitorios. Mantenimiento incluido en el precio.",
    ],
    caracteristicas: ["Ascensor", "Balcón", "Aire acondicionado", "Cocina equipada", "Mantenimiento incluido"],
    asesor: "lucia-ramirez",
    destacada: true,
  },
  {
    id: "terreno-comercial-av-centenario",
    codigo: "00698",
    titulo: "Terreno comercial en esquina",
    operacion: "venta",
    tipo: "terreno",
    estado: "ocasion",
    distrito: "Callería",
    direccion: "Av. Centenario, km 4.5",
    precio: 125000,
    moneda: "USD",
    area: 450,
    dormitorios: 0,
    banos: 0,
    cocheras: 0,
    lat: -8.3938,
    lng: -74.5728,
    fotos: [u("1541888946425-d81bb19240f5"), u("1500382017468-9049fed747ef"), u("1503387762-592deb58ef4e")],
    resumen: "450 m² en esquina sobre la Centenario, con doble frente para negocio.",
    descripcion: [
      "Terreno en esquina con 15 metros de frente a la Av. Centenario y 30 metros a la calle lateral. Alto flujo vehicular todo el día.",
      "Zonificación comercial. Perfecto para grifo, tienda, restaurante o galería.",
    ],
    caracteristicas: ["Esquina", "Doble frente", "Zonificación comercial", "Alto tránsito", "Título en SUNARP"],
    asesor: "renzo-flores",
    destacada: true,
  },
  {
    id: "casa-contemporanea-calleria",
    codigo: "00701",
    titulo: "Casa contemporánea de dos pisos",
    operacion: "venta",
    tipo: "casa",
    estado: "disponible",
    distrito: "Callería",
    direccion: "Urb. Municipal, calle residencial",
    precio: 210000,
    moneda: "USD",
    area: 300,
    areaConstruida: 260,
    dormitorios: 4,
    banos: 3,
    cocheras: 2,
    lat: -8.3878,
    lng: -74.5462,
    fotos: [u("1600585154340-be6161a56a0c"), INTERIORES.salaPlantas, INTERIORES.escalera, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Ventanales de piso a techo, estudio y terraza en el segundo nivel.",
    descripcion: [
      "Casa de diseño contemporáneo con grandes ventanales que aprovechan la luz natural y mantienen los ambientes frescos.",
      "Incluye estudio independiente, ideal para trabajar desde casa, y terraza en el segundo nivel.",
    ],
    caracteristicas: ["Estudio", "Terraza", "Ventanales", "Cocina equipada", "Cerco eléctrico"],
    asesor: "carlos-vasquez",
    destacada: true,
  },
  {
    id: "local-comercial-jr-tarapaca",
    codigo: "00689",
    titulo: "Local comercial en zona financiera",
    operacion: "venta",
    tipo: "local",
    estado: "disponible",
    distrito: "Callería",
    direccion: "Jr. Tarapacá, frente a agencias bancarias",
    precio: 230000,
    moneda: "USD",
    area: 180,
    dormitorios: 0,
    banos: 2,
    cocheras: 0,
    lat: -8.3783,
    lng: -74.5522,
    fotos: [u("1441986300917-64674bd600d8"), u("1497366811353-6870744d04b2"), u("1497366216548-37526070297c")],
    resumen: "Primer piso con vitrina a la calle y mezanine, en la cuadra más transitada.",
    descripcion: [
      "Local de 180 m² en primer piso con vitrina de 8 metros, mezanine para depósito u oficina y dos baños.",
      "Se vende con inquilino actual, lo que asegura renta desde el primer mes.",
    ],
    caracteristicas: ["Vitrina a la calle", "Mezanine", "Dos baños", "Con inquilino", "Zona financiera"],
    asesor: "renzo-flores",
  },
  {
    id: "residencia-con-piscina-yarinacocha",
    codigo: "00684",
    titulo: "Residencia con piscina y vista",
    operacion: "venta",
    tipo: "casa",
    estado: "disponible",
    distrito: "Yarinacocha",
    direccion: "Frente a la laguna de Yarinacocha",
    precio: 340000,
    moneda: "USD",
    area: 520,
    areaConstruida: 380,
    dormitorios: 5,
    banos: 5,
    cocheras: 3,
    lat: -8.3388,
    lng: -74.6011,
    fotos: [u("1564013799919-ab600027ffc6"), INTERIORES.salaAmplia, INTERIORES.comedor, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Cinco dormitorios, piscina y terraza con vista a la laguna.",
    descripcion: [
      "Residencia frente a la laguna, con piscina, terraza mirador y amplias áreas sociales para recibir.",
      "Acabados de primera, cocina tipo isla y dormitorios con baño propio.",
    ],
    caracteristicas: ["Vista a la laguna", "Piscina", "Terraza mirador", "Bar", "Cuarto de servicio", "Seguridad 24 h"],
    asesor: "carlos-vasquez",
  },
  {
    id: "terreno-rural-federico-basadre",
    codigo: "00677",
    titulo: "Terreno rural de 2 hectáreas",
    operacion: "venta",
    tipo: "terreno",
    estado: "remate",
    distrito: "Callería",
    direccion: "Carretera Federico Basadre, km 12",
    precio: 48000,
    moneda: "USD",
    area: 20000,
    dormitorios: 0,
    banos: 0,
    cocheras: 0,
    lat: -8.3962,
    lng: -74.6448,
    fotos: [u("1500076656116-558758c991c1"), u("1500382017468-9049fed747ef")],
    resumen: "2 ha con acceso por carretera, ideal para casa de campo o cultivo.",
    descripcion: [
      "Terreno de dos hectáreas con 80 metros de frente a la carretera Federico Basadre, a 20 minutos del centro.",
      "Tiene un pozo de agua y árboles frutales. Precio de remate por viaje del propietario.",
    ],
    caracteristicas: ["Frente a carretera", "Pozo de agua", "Árboles frutales", "Constancia de posesión"],
    asesor: "milagros-pinedo",
  },
  {
    id: "departamento-familiar-yarinacocha",
    codigo: "00695",
    titulo: "Departamento familiar en condominio",
    operacion: "venta",
    tipo: "departamento",
    estado: "disponible",
    distrito: "Yarinacocha",
    direccion: "Condominio Los Laureles",
    precio: 92000,
    moneda: "USD",
    area: 110,
    dormitorios: 3,
    banos: 2,
    cocheras: 1,
    lat: -8.3618,
    lng: -74.5796,
    fotos: [INTERIORES.salaCuero, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Condominio con área de juegos, piscina común y vigilancia.",
    descripcion: [
      "Departamento de tres dormitorios dentro de un condominio cerrado con áreas verdes, piscina común y zona de parrillas.",
      "A diez minutos del centro y cerca de colegios y mercados.",
    ],
    caracteristicas: ["Piscina común", "Área de juegos", "Zona de parrillas", "Vigilancia", "Áreas verdes"],
    asesor: "carlos-vasquez",
    nueva: true,
  },
  {
    id: "departamento-de-estreno-calleria",
    codigo: "00728",
    titulo: "Departamento de estreno con vista al río",
    operacion: "venta",
    tipo: "departamento",
    estado: "disponible",
    distrito: "Callería",
    direccion: "Edificio Mirador del Ucayali, malecón",
    precio: 118000,
    moneda: "USD",
    area: 96,
    dormitorios: 2,
    banos: 2,
    cocheras: 1,
    lat: -8.3765,
    lng: -74.5459,
    fotos: [INTERIORES.salaAmarilla, INTERIORES.comedor, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Estreno con vista al río, terraza en azotea y gimnasio.",
    descripcion: [
      "Departamento de estreno en edificio con vista al río Ucayali. Áreas comunes con gimnasio, terraza en azotea y coworking.",
      "Financiamiento disponible con los principales bancos.",
    ],
    caracteristicas: ["Estreno", "Vista al río", "Gimnasio", "Terraza en azotea", "Coworking"],
    asesor: "carlos-vasquez",
    destacada: true,
    nueva: true,
  },
  {
    id: "casa-con-jardin-manantay",
    codigo: "00669",
    titulo: "Casa de campo con jardín",
    operacion: "venta",
    tipo: "casa",
    estado: "ocasion",
    distrito: "Manantay",
    direccion: "Av. Túpac Amaru, sector residencial",
    precio: 158000,
    moneda: "USD",
    area: 600,
    areaConstruida: 220,
    dormitorios: 3,
    banos: 3,
    cocheras: 3,
    lat: -8.4092,
    lng: -74.5528,
    fotos: [u("1416331108676-a22ccb276e35"), INTERIORES.salaAmplia, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "600 m² con piscina, jardín, frutales y espacio para ampliar.",
    descripcion: [
      "Casa de un piso sobre un terreno amplio, con piscina, jardín delantero y frutales en la parte posterior.",
      "Perfecta para una familia que busca tranquilidad sin alejarse de la ciudad.",
    ],
    caracteristicas: ["Piscina", "Jardín", "Árboles frutales", "Lavandería", "Título en SUNARP"],
    asesor: "carlos-vasquez",
  },
  {
    id: "minidepartamento-amoblado-calleria",
    codigo: "00719",
    titulo: "Minidepartamento amoblado",
    operacion: "alquiler",
    tipo: "departamento",
    estado: "disponible",
    distrito: "Callería",
    direccion: "Av. Centenario, cerca a la universidad",
    precio: 1100,
    moneda: "PEN",
    area: 45,
    dormitorios: 1,
    banos: 1,
    cocheras: 0,
    lat: -8.3866,
    lng: -74.5618,
    fotos: [INTERIORES.salaRoja, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Amoblado, con internet incluido. Listo para mudarse.",
    descripcion: [
      "Minidepartamento amoblado con cama, sofá, refrigeradora y cocina. Internet y agua incluidos.",
      "Cerca a universidades y a la avenida principal, con transporte a toda hora.",
    ],
    caracteristicas: ["Amoblado", "Internet incluido", "Agua incluida", "Ingreso independiente"],
    asesor: "lucia-ramirez",
  },
  {
    id: "casa-para-alquilar-manantay",
    codigo: "00714",
    titulo: "Casa amplia para familia",
    operacion: "alquiler",
    tipo: "casa",
    estado: "disponible",
    distrito: "Manantay",
    direccion: "Jr. Los Cedros, zona tranquila",
    precio: 2500,
    moneda: "PEN",
    area: 200,
    dormitorios: 3,
    banos: 2,
    cocheras: 2,
    lat: -8.4018,
    lng: -74.5418,
    fotos: [u("1600047509807-ba8f99d2cdde"), INTERIORES.salaClara, INTERIORES.cocina, INTERIORES.dormitorio],
    resumen: "Tres dormitorios, patio y cochera doble en calle tranquila.",
    descripcion: ["Casa de un piso con patio, cochera para dos autos y tres dormitorios amplios.", "Se acepta mascotas. Contrato mínimo de un año."],
    caracteristicas: ["Patio", "Cochera doble", "Acepta mascotas", "Lavandería"],
    asesor: "lucia-ramirez",
  },
  {
    id: "oficina-en-alquiler-calleria",
    codigo: "00722",
    titulo: "Oficina corporativa amoblada",
    operacion: "alquiler",
    tipo: "local",
    estado: "disponible",
    distrito: "Callería",
    direccion: "Jr. Raimondi, segundo piso",
    precio: 3200,
    moneda: "PEN",
    area: 120,
    dormitorios: 0,
    banos: 2,
    cocheras: 1,
    lat: -8.3772,
    lng: -74.5507,
    fotos: [u("1497366811353-6870744d04b2"), u("1497366216548-37526070297c")],
    resumen: "120 m² con sala de reuniones, recepción y aire acondicionado central.",
    descripcion: [
      "Oficina amoblada lista para operar: recepción, sala de reuniones para 8 personas y área abierta para 12 puestos.",
      "A una cuadra de la Plaza de Armas, con cochera incluida.",
    ],
    caracteristicas: ["Amoblada", "Sala de reuniones", "Aire acondicionado", "Cochera", "Internet de fibra"],
    asesor: "renzo-flores",
  },
  // Vendidas recientemente (se muestran como prueba social, no en el buscador)
  {
    id: "villa-vendida-yarinacocha",
    codigo: "00655",
    titulo: "Villa con piscina",
    operacion: "venta",
    tipo: "casa",
    estado: "vendido",
    distrito: "Yarinacocha",
    direccion: "Urb. Las Palmeras",
    precio: 195000,
    moneda: "USD",
    area: 380,
    dormitorios: 4,
    banos: 3,
    cocheras: 2,
    lat: -8.3571,
    lng: -74.5932,
    fotos: [u("1580587771525-78b9dba3b914")],
    resumen: "Vendida en 34 días.",
    descripcion: [],
    caracteristicas: [],
    asesor: "carlos-vasquez",
  },
  {
    id: "terreno-vendido-manantay",
    codigo: "00648",
    titulo: "Terreno de 250 m²",
    operacion: "venta",
    tipo: "terreno",
    estado: "vendido",
    distrito: "Manantay",
    direccion: "Sector Nuevo Bellavista",
    precio: 85000,
    moneda: "PEN",
    area: 250,
    dormitorios: 0,
    banos: 0,
    cocheras: 0,
    lat: -8.4121,
    lng: -74.5467,
    fotos: [u("1500382017468-9049fed747ef")],
    resumen: "Vendido en 21 días.",
    descripcion: [],
    caracteristicas: [],
    asesor: "milagros-pinedo",
  },
  {
    id: "casa-vendida-calleria",
    codigo: "00641",
    titulo: "Casa de dos pisos",
    operacion: "venta",
    tipo: "casa",
    estado: "vendido",
    distrito: "Callería",
    direccion: "Urb. Municipal",
    precio: 172000,
    moneda: "USD",
    area: 240,
    dormitorios: 3,
    banos: 3,
    cocheras: 1,
    lat: -8.3851,
    lng: -74.5441,
    fotos: [u("1613490493576-7fde63acd811")],
    resumen: "Vendida en 48 días.",
    descripcion: [],
    caracteristicas: [],
    asesor: "carlos-vasquez",
  },
];

/** Propiedades que se pueden buscar (las vendidas quedan fuera del buscador). */
export const ACTIVAS = PROPIEDADES.filter((p) => p.estado !== "vendido");
export const VENDIDAS = PROPIEDADES.filter((p) => p.estado === "vendido");

export const enSoles = (p: Pick<Propiedad, "precio" | "moneda">) => (p.moneda === "USD" ? p.precio * TIPO_DE_CAMBIO : p.precio);

export const precioTexto = (p: Pick<Propiedad, "precio" | "moneda" | "operacion">) => {
  const monto = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(p.precio);
  return `${p.moneda === "USD" ? "US$" : "S/"} ${monto}${p.operacion === "alquiler" ? " /mes" : ""}`;
};

export const areaTexto = (m2: number) =>
  m2 >= 10000 ? `${new Intl.NumberFormat("es-PE", { maximumFractionDigits: 1 }).format(m2 / 10000)} ha` : `${new Intl.NumberFormat("es-PE").format(m2)} m²`;

export const buscarPropiedad = (id: string) => PROPIEDADES.find((p) => p.id === id);
export const buscarAsesor = (id: string) => ASESORES.find((a) => a.id === id)!;
