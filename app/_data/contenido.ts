export type Pantalla = {
  src: string;
  alt: string;
  titulo: string;
  texto: string;
  movil?: boolean;
};

export type Proyecto = {
  slug: string;
  nombre: string;
  rubro: string;
  resumen: string;
  incluye: string[];
  ruta: string;
  codigo: string;
  captura: { escritorio: string; movil: string };
  /** Datos concretos del alcance, para la ficha del caso. */
  alcance: { etiqueta: string; valor: string }[];
  reto: string;
  solucion: string[];
  pantallas: Pantalla[];
  tecnico: { titulo: string; texto: string }[];
  /** Nombre del plan de PLANES más parecido a este proyecto. */
  plan: string;
};

export const PROYECTOS: Proyecto[] = [
  {
    slug: "sabor-criollo",
    nombre: "Sabor Criollo",
    rubro: "Restaurante de cocina peruana",
    resumen:
      "Sitio completo para un restaurante: el cliente revisa la carta, reserva mesa y escribe por WhatsApp; el dueño actualiza platos y precios desde su propio panel, sin depender de nadie.",
    incluye: [
      "Carta con filtros por categoría",
      "Reservas con validación y confirmación por WhatsApp",
      "Panel para editar platos, precios y fotos",
      "Blog, páginas legales y aviso de cookies",
    ],
    ruta: "/demos/restaurante",
    codigo: "https://github.com/Xoesx/nexa-portafolio/tree/main/app/demos/restaurante",
    captura: {
      escritorio: "/proyectos/sabor-criollo/inicio.webp",
      movil: "/proyectos/sabor-criollo/inicio-movil.webp",
    },
    alcance: [
      { etiqueta: "Páginas públicas", valor: "12" },
      { etiqueta: "Panel de administración", valor: "4 pantallas" },
      { etiqueta: "Rutas de API", valor: "3" },
      { etiqueta: "Idioma", valor: "Español" },
    ],
    reto:
      "Un restaurante que recibe pedidos y reservas por teléfono pierde clientes cuando no puede contestar, y cada cambio de precio en la carta depende de alguien que sepa editar la web.",
    solucion: [
      "Armamos un sitio de doce páginas donde el cliente ve la carta con fotos, filtra por categoría y reserva su mesa en un formulario que valida los datos antes de enviarlos.",
      "Para el dueño hicimos un panel propio: agrega o edita platos, cambia precios, sube fotos (que se comprimen solas en el navegador) y revisa las reservas que llegan.",
      "Completamos con blog para aparecer en Google, páginas legales y un aviso de cookies que solo activa analítica y chat si el visitante lo acepta.",
    ],
    pantallas: [
      {
        src: "/proyectos/sabor-criollo/menu.webp",
        alt: "Carta del restaurante con filtros por categoría",
        titulo: "Carta con filtros",
        texto: "Entradas, principales, postres y bebidas en un toque. Las etiquetas destacan los platos más pedidos.",
      },
      {
        src: "/proyectos/sabor-criollo/reservar.webp",
        alt: "Formulario de reserva de mesa",
        titulo: "Reservas sin llamadas",
        texto: "El formulario revisa nombre, teléfono, fecha y hora antes de enviar. Los grupos grandes pasan directo a WhatsApp.",
      },
      {
        src: "/proyectos/sabor-criollo/admin.webp",
        alt: "Panel de administración con la lista de platos",
        titulo: "Panel para el dueño",
        texto: "Buscar, agregar, editar o pausar un plato toma segundos. Los cambios se ven al instante en el sitio público.",
      },
      {
        src: "/proyectos/sabor-criollo/blog.webp",
        alt: "Blog con artículos de cocina peruana",
        titulo: "Blog para Google",
        texto: "Artículos sobre la cocina de la casa que ayudan a que el restaurante aparezca en más búsquedas.",
      },
      {
        src: "/proyectos/sabor-criollo/menu-movil.webp",
        alt: "La carta del restaurante vista en un celular",
        titulo: "Pensado para el celular",
        texto: "La mayoría de clientes llega desde el teléfono, así que cada pantalla se diseñó primero para ahí.",
        movil: true,
      },
    ],
    tecnico: [
      { titulo: "Validación en el servidor", texto: "Las reservas y mensajes se validan con Zod en la API, no solo en el navegador." },
      { titulo: "Límite de solicitudes", texto: "Un proxy frena a quien envía demasiados formularios por minuto desde la misma IP." },
      { titulo: "Cabeceras de seguridad", texto: "Content-Security-Policy, HSTS y protección contra iframes en todas las respuestas." },
      { titulo: "Textos limpios", texto: "Lo que se escribe en el panel se sanea antes de guardarse para evitar código malicioso." },
      { titulo: "Fotos livianas", texto: "Las imágenes que sube el dueño se reducen a 1200 px y se comprimen antes de guardarse." },
      { titulo: "Privacidad por defecto", texto: "Analítica y chat en vivo solo se cargan si el visitante acepta las cookies." },
    ],
    plan: "Negocio",
  },
  {
    slug: "steakhouse",
    nombre: "Steakhouse",
    rubro: "Parrilla y carnes premium",
    resumen:
      "Una sola página pensada para que el comensal quiera reservar: fotografía protagonista, historia de la casa, carta por tiempos, eventos y reserva en línea, en español y en inglés.",
    incluye: [
      "Versión en español y en inglés",
      "Formulario de reserva con validación",
      "Carta por tiempos y agenda de eventos",
      "Animaciones suaves al recorrer la página",
    ],
    ruta: "/demos/steakhouse",
    codigo: "https://github.com/Xoesx/nexa-portafolio/tree/main/app/demos/steakhouse",
    captura: {
      escritorio: "/proyectos/steakhouse/inicio.webp",
      movil: "/proyectos/steakhouse/inicio-movil.webp",
    },
    alcance: [
      { etiqueta: "Formato", valor: "Landing de una página" },
      { etiqueta: "Secciones", valor: "6" },
      { etiqueta: "Idiomas", valor: "Español e inglés" },
      { etiqueta: "Reserva", valor: "Formulario validado" },
    ],
    reto:
      "Una parrilla de ticket alto necesita transmitir experiencia antes de que el cliente llegue, atender también a turistas y convertir esa primera impresión en una mesa reservada.",
    solucion: [
      "Diseñamos una landing oscura y editorial donde la fotografía manda, con tipografía clásica y animaciones que acompañan el recorrido sin distraer.",
      "Toda la página funciona en español y en inglés: el visitante cambia de idioma con un toque y el sitio lo recuerda en su próxima visita.",
      "La reserva se hace ahí mismo, con un formulario que valida teléfono, fecha y horario de atención antes de enviar.",
    ],
    pantallas: [
      {
        src: "/proyectos/steakhouse/carta.webp",
        alt: "Sección de la carta con platos en fotografía circular",
        titulo: "Carta por tiempos",
        texto: "Entrada, plato fuerte, para compartir y postre, cada uno con su foto y una descripción corta.",
      },
      {
        src: "/proyectos/steakhouse/reserva.webp",
        alt: "Formulario de reserva sobre fotografía del salón",
        titulo: "Reserva en la misma página",
        texto: "Si falta un dato, el formulario lo dice junto al campo y lleva el cursor ahí. Sin recargar ni perder lo escrito.",
      },
      {
        src: "/proyectos/steakhouse/ingles.webp",
        alt: "La misma página en inglés",
        titulo: "Bilingüe de verdad",
        texto: "No es un traductor automático: cada texto está escrito para su idioma y la página avisa al navegador en qué idioma está.",
      },
      {
        src: "/proyectos/steakhouse/menu-movil.webp",
        alt: "Menú de navegación abierto en un celular",
        titulo: "Menú móvil accesible",
        texto: "Se abre a pantalla completa, se cierra con la tecla Escape y funciona con lectores de pantalla.",
        movil: true,
      },
    ],
    tecnico: [
      { titulo: "Idioma recordado", texto: "La preferencia se guarda en el navegador y el atributo lang cambia con ella." },
      { titulo: "Carga rápida", texto: "Las fotos se sirven en formatos modernos y al tamaño de cada pantalla." },
      { titulo: "Primer pantallazo inmediato", texto: "El título y la foto principal aparecen sin esperar a que cargue JavaScript." },
      { titulo: "Validación bajo demanda", texto: "La librería de validación se descarga recién cuando el cliente envía la reserva." },
      { titulo: "Accesible con teclado", texto: "Errores ligados a cada campo, foco al primer error y menú controlable con teclado." },
      { titulo: "Animación respetuosa", texto: "Los efectos de entrada son suaves y se pueden desactivar desde el sistema." },
    ],
    plan: "Emprendedor",
  },
];

export const SERVICIOS = [
  {
    titulo: "Páginas web",
    texto:
      "Tu negocio con su propia página: se ve bien en el celular, carga rápido aunque el internet no sea el mejor y tiene un botón directo a tu WhatsApp.",
    ejemplo: "Para una clínica, un restaurante o una tienda que quiere que la encuentren en Google.",
  },
  {
    titulo: "Asistente de WhatsApp",
    texto:
      "Responde las preguntas de siempre (horarios, precios, ubicación), toma datos para reservas o pedidos y te avisa cuando un cliente necesita hablar contigo.",
    ejemplo: "Como el demo de arriba, pero con la información de tu negocio.",
  },
  {
    titulo: "Automatizaciones",
    texto:
      "Quitamos tareas repetitivas: pasar pedidos a una hoja de cálculo, enviar recordatorios de citas, avisarte cuando llega un formulario.",
    ejemplo: "Para que dejes de copiar y pegar lo mismo todos los días.",
  },
  {
    titulo: "Sistemas a medida",
    texto:
      "Un panel para llevar tus clientes, tus citas o tu inventario, hecho según cómo trabajas y no al revés.",
    ejemplo: "Cuando una hoja de cálculo ya se te quedó corta.",
  },
];

export const PASOS = [
  {
    titulo: "Nos cuentas tu caso",
    texto: "Por WhatsApp o videollamada. Nos explicas cómo funciona tu negocio y qué te gustaría resolver.",
  },
  {
    titulo: "Recibes una propuesta por escrito",
    texto: "Qué incluye, cuánto cuesta y en cuántos días. Si no te convence, no pasa nada.",
  },
  {
    titulo: "Construimos y te mostramos avances",
    texto: "Ves cómo va quedando y puedes pedir cambios mientras lo construimos, no al final.",
  },
  {
    titulo: "Entregamos y te enseñamos a usarlo",
    texto: "Lo dejamos funcionando, te explicamos cómo manejarlo y seguimos atentos durante tu periodo de soporte.",
  },
];

export type Plan = {
  nombre: string;
  para: string;
  precio: string;
  incluye: string[];
  destacado?: boolean;
};

export const PLANES: Plan[] = [
  {
    nombre: "Emprendedor",
    para: "Para empezar a estar en internet",
    precio: "300",
    incluye: [
      "Página de una sola sección (landing)",
      "Botón de WhatsApp y formulario de contacto",
      "Diseño que se adapta al celular",
      "1 mes de soporte",
    ],
  },
  {
    nombre: "Negocio",
    para: "Para mostrar todo lo que ofreces",
    precio: "600",
    destacado: true,
    incluye: [
      "Web completa con varias secciones",
      "Panel de administración",
      "Asistente de WhatsApp con IA (opcional)",
      "SEO básico para aparecer en Google",
      "Capacitación para que lo manejes tú",
      "3 meses de soporte",
    ],
  },
  {
    nombre: "A medida",
    para: "Para sistemas y automatizaciones",
    precio: "1000",
    incluye: [
      "Sistema hecho según tu forma de trabajar",
      "Conexión con otras herramientas (APIs)",
      "Automatizaciones avanzadas",
      "Base de datos propia",
      "Soporte prioritario",
    ],
  },
];

export const PREGUNTAS = [
  {
    q: "¿Cómo se paga?",
    a: "50% para empezar y 50% al entregar. Aceptamos Yape, Plin y transferencia bancaria. Si el proyecto es grande, se puede dividir en 2 o 3 pagos.",
  },
  {
    q: "¿Cuánto demora mi proyecto?",
    a: "Depende de lo que necesites. Una landing puede estar lista en 3 a 5 días hábiles, una web completa en 1 a 2 semanas y un sistema a medida entre 2 y 4 semanas. El plazo exacto va en la propuesta.",
  },
  {
    q: "¿Hay soporte después de entregar?",
    a: "Sí. El plan Emprendedor incluye 1 mes y el plan Negocio, 3 meses. Pasado ese tiempo, puedes contratar un mantenimiento mensual o pedirnos ayuda cuando la necesites.",
  },
  {
    q: "¿Trabajan solo en Pucallpa?",
    a: "No. Estamos en Pucallpa, pero atendemos a negocios de todo el Perú de forma 100% online, por WhatsApp y videollamada.",
  },
  {
    q: "¿Puedo pedir cambios mientras se construye?",
    a: "Sí. Te mostramos avances durante el proceso para que puedas decir qué ajustar antes de la entrega, no después.",
  },
];
