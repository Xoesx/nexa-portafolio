export type Articulo = {
  slug: string;
  titulo: string;
  extracto: string;
  categoria: string;
  fecha: string;
  lectura: string;
  imagen: string;
  contenido: { subtitulo?: string; parrafo: string }[];
};

export const ARTICULOS: Articulo[] = [
  {
    slug: "secreto-del-aji-amarillo",
    titulo: "El secreto del ají amarillo",
    extracto:
      "Por qué este ají peruano es la base de casi todos nuestros platos y cómo lo preparamos para que no pique de más.",
    categoria: "Ingredientes",
    fecha: "12 de octubre, 2026",
    lectura: "5 min",
    imagen: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=1200&q=85",
    contenido: [
      {
        parrafo:
          "El ají amarillo es probablemente el ingrediente más importante de la cocina peruana. No es un ají picante como el rocoto o el ají limo: tiene un sabor frutado, casi dulce, con un picor suave que aparece al final. Es la base del ají de gallina, la papa a la huancaína, la causa limeña y decenas de guisos más.",
      },
      {
        subtitulo: "Cómo lo preparamos en Sabor Criollo",
        parrafo:
          "Compramos el ají fresco en el mercado de Pucallpa cada mañana. Lo lavamos, lo cortamos por la mitad y le quitamos las venas y las pepas, que es donde está casi todo el picante. Después lo sancochamos unos minutos, lo pelamos y lo licuamos con un poco del agua de cocción. Ese puré es la base de casi todas nuestras cremas.",
      },
      {
        subtitulo: "El punto del picante",
        parrafo:
          "Un error común cuando se cocina con ají amarillo es pasarse de cantidad. La regla que usamos: el ají debe dar sabor, no picar. Si el plato pica más que el sabor del ají, se pierde el equilibrio. Por eso siempre probamos la crema antes de servirla.",
      },
      {
        subtitulo: "Por qué no usamos pasta de ají comprada",
        parrafo:
          "Existen pastas de ají amarillo en el mercado, y algunas son bastante decentes. Pero ninguna se acerca al sabor del ají fresco recién preparado. Como no tenemos prisa y preparamos todo el día, seguimos usando ají fresco. El sabor lo vale.",
      },
    ],
  },
  {
    slug: "elegir-pescado-ceviche",
    titulo: "Cómo elegir el mejor pescado para un ceviche",
    extracto:
      "Los 4 criterios que usamos en cocina para saber si un pescado está listo para el ceviche y por qué el pescado congelado también sirve.",
    categoria: "Técnica",
    fecha: "5 de octubre, 2026",
    lectura: "6 min",
    imagen: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=1200&q=85",
    contenido: [
      {
        parrafo:
          "El ceviche es uno de los platos más engañosos de la cocina peruana. Se ve simple —pescado, limón, cebolla, ají— pero cada componente tiene que estar impecable. El más importante, sin duda, es el pescado.",
      },
      {
        subtitulo: "Criterio 1: Ojo brillante, agalla roja",
        parrafo:
          "El ojo del pescado fresco es negro, brillante y salido hacia afuera. Cuando empieza a ponerse turbio o hundido, ya pasó su mejor momento. Las agallas deben ser rojas intensas, no marrones ni grises.",
      },
      {
        subtitulo: "Criterio 2: Carne firme al tacto",
        parrafo:
          "Cuando presionas el lomo con el dedo, la carne debe volver sola. Si queda marcada, el pescado lleva tiempo fuera del agua. Esto es crítico para el ceviche, porque el limón no va a arreglar una carne blanda.",
      },
      {
        subtitulo: "Criterio 3: Olor a mar, no a pescado",
        parrafo:
          "El buen pescado huele a mar, a sal, a algas. Si huele fuerte a pescado, ya está pasando. Ese pescado sirve para otras preparaciones (sudado, arroz con mariscos), pero no para ceviche.",
      },
      {
        subtitulo: "Sobre el pescado congelado",
        parrafo:
          "Mucha gente cree que el ceviche solo se puede hacer con pescado fresco del día. Es un mito. El pescado congelado a menos de -20 °C por al menos 24 horas es seguro y, si se descongela bien, tiene una textura perfecta para el ceviche. De hecho, la mayoría de cevicherías serias en Lima usan pescado congelado durante parte del año.",
      },
    ],
  },
  {
    slug: "historia-lomo-saltado",
    titulo: "La historia del lomo saltado",
    extracto:
      "Cómo un plato que nació de la fusión chino-peruana se convirtió en el más pedido de nuestra carta.",
    categoria: "Historia",
    fecha: "28 de septiembre, 2026",
    lectura: "5 min",
    imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85",
    contenido: [
      {
        parrafo:
          "El lomo saltado no es un plato antiguo en la cocina peruana. Nació a finales del siglo XIX y principios del XX, cuando miles de inmigrantes chinos llegaron al Perú para trabajar en las haciendas costeras. Trajeron consigo el wok, la técnica de saltear rápido a fuego alto y la costumbre de mezclar carnes con verduras.",
      },
      {
        subtitulo: "La fusión que nadie planeó",
        parrafo:
          "En las fondas chinas de Lima, los cocineros empezaron a saltear carne de res con cebolla, tomate y ají amarillo. A esa mezcla le agregaron papas fritas, un ingrediente muy peruano. Y en lugar de servirla sola, la acompañaron con arroz blanco. Nació el lomo saltado tal como lo conocemos.",
      },
      {
        subtitulo: "Por qué se llama \"saltado\"",
        parrafo:
          "El nombre viene del verbo \"saltar\", que es la técnica de cocción en el wok. La carne se mueve constantemente a fuego muy alto para que se selle rápido por fuera sin perder sus jugos por dentro. Si se cocina a fuego bajo, la carne queda dura y el plato no funciona.",
      },
      {
        subtitulo: "Nuestra versión",
        parrafo:
          "En Sabor Criollo hacemos el lomo saltado al momento, con carne de res de primera, cebolla roja, tomate italiano, ají amarillo fresco y sillao. Las papas las freímos aparte para que queden crocantes y no se ablanden con la salsa. El arroz va blanco, con un poquito de ajo, para que acompañe sin robar protagonismo.",
      },
    ],
  },
];
