export type Proyecto = {
  slug: string;
  nombre: string;
  rubro: string;
  resumen: string;
  incluye: string[];
  ruta: string;
  codigo: string;
  captura: { escritorio: string; movil: string };
  nota?: string;
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
      escritorio: "/proyectos/sabor-criollo-escritorio.png",
      movil: "/proyectos/sabor-criollo-movil.png",
    },
  },
  {
    slug: "steakhouse",
    nombre: "Steakhouse",
    rubro: "Parrilla y carnes premium",
    resumen:
      "Una sola página pensada para que el comensal quiera reservar: fotografía a pantalla completa, historia de la casa, carta por tiempos y agenda de eventos.",
    incluye: [
      "Diseño oscuro con tipografía editorial",
      "Animaciones suaves al recorrer la página",
      "Carta por tiempos y agenda de eventos",
      "Llamado directo a reservar mesa",
    ],
    ruta: "/demos/steakhouse",
    codigo: "https://github.com/Xoesx/nexa-portafolio/tree/main/app/demos/steakhouse",
    captura: {
      escritorio: "/proyectos/steakhouse-escritorio.png",
      movil: "/proyectos/steakhouse-movil.png",
    },
    nota: "Sitio en inglés, para un público internacional.",
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
