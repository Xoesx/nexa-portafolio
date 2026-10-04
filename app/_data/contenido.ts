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
    slug: "clinica-dental",
    nombre: "Clínica Dental Alba",
    rubro: "Salud · Clínica dental",
    resumen:
      "Sitio para una clínica dental donde el paciente elige tratamiento, especialista, día y hora libres, y reserva su cita en menos de un minuto, a cualquier hora.",
    incluye: [
      "Agenda en línea con horarios reales por especialista",
      "Tratamientos con precios de referencia",
      "Equipo, testimonios y preguntas frecuentes",
      "Cita descargable al calendario del celular",
    ],
    ruta: "/demos/dental",
    codigo: "https://github.com/Xoesx/nexa-portafolio/tree/main/app/demos/dental",
    captura: {
      escritorio: "/proyectos/clinica-dental/inicio.webp",
      movil: "/proyectos/clinica-dental/inicio-movil.webp",
    },
    alcance: [
      { etiqueta: "Páginas", valor: "Inicio y agenda" },
      { etiqueta: "Agenda", valor: "4 pasos" },
      { etiqueta: "Especialistas", valor: "3 con horario propio" },
      { etiqueta: "Tratamientos", valor: "6" },
    ],
    reto:
      "La mayoría de pacientes busca dentista de noche, cuando la clínica está cerrada. Si nadie contesta el teléfono, la cita se va a otra clínica.",
    solucion: [
      "Construimos una agenda en línea en cuatro pasos: el paciente elige el tratamiento, el especialista (o el primero disponible), el día y un horario que de verdad está libre.",
      "Los horarios se calculan según la duración de cada tratamiento y el horario de atención: una endodoncia de 90 minutos nunca aparece a las 19:30.",
      "Al confirmar, el paciente puede guardar la cita en el calendario de su celular con un recordatorio dos horas antes.",
    ],
    pantallas: [
      {
        src: "/proyectos/clinica-dental/agenda-horario.webp",
        alt: "Paso de la agenda para elegir día y hora disponibles",
        titulo: "Solo horarios libres",
        texto: "Los turnos ocupados aparecen tachados y no se pueden elegir. Con “primer especialista disponible” se ven más opciones.",
      },
      {
        src: "/proyectos/clinica-dental/agenda-confirmada.webp",
        alt: "Confirmación de la cita con el resumen y el botón para agregarla al calendario",
        titulo: "Confirmación clara",
        texto: "Resumen de la cita, indicaciones para el día y un botón para guardarla en el calendario del celular.",
      },
      {
        src: "/proyectos/clinica-dental/tratamientos.webp",
        alt: "Lista de tratamientos con duración y precio desde",
        titulo: "Precios a la vista",
        texto: "Cada tratamiento muestra cuánto dura y desde cuánto cuesta. Menos preguntas repetidas por WhatsApp.",
      },
      {
        src: "/proyectos/clinica-dental/agenda-movil.webp",
        alt: "La agenda de citas vista en un celular",
        titulo: "Hecha para el celular",
        texto: "Botones grandes, días deslizables y pasos cortos: se agenda con el pulgar.",
        movil: true,
      },
    ],
    tecnico: [
      { titulo: "Horarios según la duración", texto: "Cada turno se ofrece solo si el tratamiento termina antes del cierre de ese día." },
      { titulo: "Disponibilidad por especialista", texto: "Cada doctor tiene su propia agenda; “cualquiera” combina las de todos." },
      { titulo: "Cita al calendario", texto: "Se genera un archivo .ics estándar con recordatorio, compatible con Google, Apple y Outlook." },
      { titulo: "Validación al confirmar", texto: "DNI, celular y correo se revisan con Zod, que se descarga recién en el último paso." },
      { titulo: "Accesible por pasos", texto: "Al avanzar, el foco va al título del paso y los lectores de pantalla anuncian en qué paso estás." },
      { titulo: "Datos con consentimiento", texto: "El paciente autoriza explícitamente el uso de sus datos antes de reservar." },
    ],
    plan: "A medida",
  },
  {
    slug: "inmobiliaria",
    nombre: "Raíces Inmobiliaria",
    rubro: "Inmobiliaria · Venta y alquiler",
    resumen:
      "Portal de propiedades con buscador y filtros, fichas con galería, calculadora de crédito hipotecario y formularios para contactar a un asesor o pedir una tasación.",
    incluye: [
      "Buscador con filtros que se pueden compartir",
      "Ficha por propiedad con galería de fotos",
      "Calculadora de cuota hipotecaria",
      "Formularios de contacto y de tasación",
    ],
    ruta: "/demos/inmobiliaria",
    codigo: "https://github.com/Xoesx/nexa-portafolio/tree/main/app/demos/inmobiliaria",
    captura: {
      escritorio: "/proyectos/inmobiliaria/inicio.webp",
      movil: "/proyectos/inmobiliaria/inicio-movil.webp",
    },
    alcance: [
      { etiqueta: "Propiedades", valor: "9 fichas" },
      { etiqueta: "Filtros", valor: "5" },
      { etiqueta: "Calculadora", valor: "Crédito hipotecario" },
      { etiqueta: "Formularios", valor: "2" },
    ],
    reto:
      "Una inmobiliaria que solo publica en redes pierde a los compradores serios: quieren filtrar, comparar y saber cuánto pagarían al mes antes de llamar.",
    solucion: [
      "Diseñamos un portal donde el visitante filtra por operación, tipo, distrito y dormitorios, y ordena por precio o área. La búsqueda queda en el enlace, lista para enviarla por WhatsApp.",
      "Cada propiedad tiene su propia página con galería, características y una calculadora que estima la cuota mensual según la inicial, el plazo y la tasa.",
      "Para captar propietarios, la portada incluye un formulario de tasación gratuita; cada ficha, un formulario para contactar al asesor o agendar una visita.",
    ],
    pantallas: [
      {
        src: "/proyectos/inmobiliaria/listado.webp",
        alt: "Listado de propiedades con filtros por operación, tipo y distrito",
        titulo: "Filtros que se comparten",
        texto: "Cada filtro actualiza el enlace al instante: el cliente puede enviar su búsqueda exacta a su pareja o a su asesor.",
      },
      {
        src: "/proyectos/inmobiliaria/ficha.webp",
        alt: "Ficha de una casa con galería, datos principales y formulario de contacto",
        titulo: "Fichas completas",
        texto: "Galería navegable con el teclado, datos principales, descripción y características, con el contacto siempre a la mano.",
      },
      {
        src: "/proyectos/inmobiliaria/calculadora.webp",
        alt: "Calculadora de crédito hipotecario con cuota mensual estimada",
        titulo: "¿Cuánto pagaría al mes?",
        texto: "La calculadora usa el sistema francés que aplican los bancos y convierte la tasa anual a mensual.",
      },
      {
        src: "/proyectos/inmobiliaria/listado-movil.webp",
        alt: "El buscador de propiedades en un celular",
        titulo: "Buscar desde el celular",
        texto: "Los filtros se pliegan en un botón con el número de filtros activos, para dejar espacio a las fotos.",
        movil: true,
      },
    ],
    tecnico: [
      { titulo: "Búsqueda en la URL", texto: "Los filtros viven en el enlace: se pueden compartir, guardar y volver atrás con el navegador." },
      { titulo: "Fichas generadas en build", texto: "Cada propiedad es una página estática con su propio título y descripción para Google." },
      { titulo: "Cálculo financiero correcto", texto: "Cuota con sistema francés y TEA convertida a tasa efectiva mensual, no dividida entre 12." },
      { titulo: "Buscador sin JavaScript", texto: "El buscador de la portada es un formulario normal: funciona aunque el script aún no haya cargado." },
      { titulo: "Galería accesible", texto: "Se navega con flechas del teclado y cada foto tiene su texto alternativo." },
      { titulo: "Fotos livianas", texto: "Todas las imágenes se sirven en formatos modernos y al tamaño exacto de cada pantalla." },
    ],
    plan: "Negocio",
  },
  {
    slug: "colegio",
    nombre: "Colegio Horizonte",
    rubro: "Educación · Colegio privado",
    resumen:
      "Sitio institucional para un colegio con sus tres niveles, propuesta educativa, calendario de admisión y una preinscripción en línea que calcula sola el grado que le corresponde al alumno.",
    incluye: [
      "Preinscripción en línea en tres pasos",
      "Grado calculado según la fecha de nacimiento",
      "Niveles, costos, requisitos y fechas de admisión",
      "Constancia con código lista para imprimir",
    ],
    ruta: "/demos/colegio",
    codigo: "https://github.com/Xoesx/nexa-portafolio/tree/main/app/demos/colegio",
    captura: {
      escritorio: "/proyectos/colegio/inicio.webp",
      movil: "/proyectos/colegio/inicio-movil.webp",
    },
    alcance: [
      { etiqueta: "Páginas", valor: "Inicio y admisión" },
      { etiqueta: "Niveles", valor: "Inicial, primaria y secundaria" },
      { etiqueta: "Preinscripción", valor: "3 pasos" },
      { etiqueta: "Constancia", valor: "Imprimible" },
    ],
    reto:
      "Cada temporada de admisión, la secretaría responde las mismas preguntas cientos de veces y llena fichas a mano. Muchas familias ni siquiera saben a qué grado corresponde su hijo.",
    solucion: [
      "Organizamos la información que las familias buscan (niveles, horarios, pensiones, requisitos y fechas) en un sitio claro, con pestañas por nivel.",
      "La preinscripción en línea pide los datos del alumno, del apoderado y la fecha de visita. Al ingresar la fecha de nacimiento, el sistema indica el grado que le corresponde según la regla del 31 de marzo.",
      "Al terminar, la familia recibe un código de preinscripción y la lista de documentos para llevar, lista para imprimir.",
    ],
    pantallas: [
      {
        src: "/proyectos/colegio/preinscripcion.webp",
        alt: "Primer paso de la preinscripción con el grado calculado automáticamente",
        titulo: "El grado, calculado al instante",
        texto: "Con la fecha de nacimiento, el formulario indica el grado del próximo año. Si la edad no corresponde, lo avisa antes de enviar.",
      },
      {
        src: "/proyectos/colegio/constancia.webp",
        alt: "Constancia de preinscripción con código y lista de documentos",
        titulo: "Constancia con código",
        texto: "Resumen, fecha de visita y documentos a llevar, con un botón para imprimirla.",
      },
      {
        src: "/proyectos/colegio/niveles.webp",
        alt: "Sección de niveles con pestañas para inicial, primaria y secundaria",
        titulo: "Un nivel a la vez",
        texto: "Pestañas para inicial, primaria y secundaria con horario, pensión y lo que hace distinto a cada nivel.",
      },
      {
        src: "/proyectos/colegio/admision-movil.webp",
        alt: "La página de admisión vista en un celular",
        titulo: "Admisión desde el celular",
        texto: "Los padres se preinscriben desde el teléfono, en el trabajo o de camino a casa.",
        movil: true,
      },
    ],
    tecnico: [
      { titulo: "Regla del 31 de marzo", texto: "La edad se calcula a la fecha de corte que usa el Ministerio de Educación del Perú." },
      { titulo: "Pasos que no pierden datos", texto: "Un solo formulario con pasos: al volver atrás, todo lo escrito sigue ahí." },
      { titulo: "Validación por paso", texto: "Cada paso se revisa antes de avanzar; si hay un error en un paso anterior, el formulario regresa a él." },
      { titulo: "Pestañas accesibles", texto: "Los niveles se recorren con las flechas del teclado, según el patrón ARIA de pestañas." },
      { titulo: "Constancia imprimible", texto: "Al imprimir se ocultan los botones y queda solo la información útil." },
      { titulo: "Protección de datos", texto: "La autorización de uso de datos cita la Ley 29733 de protección de datos personales." },
    ],
    plan: "Negocio",
  },
  {
    slug: "sabor-criollo",
    nombre: "Sabor Criollo",
    rubro: "Gastronomía · Restaurante",
    resumen:
      "Sitio completo para un restaurante: el cliente revisa la carta, reserva mesa y escribe por WhatsApp; el dueño actualiza platos y precios desde su propio panel, sin depender de nadie.",
    incluye: [
      "Carta con filtros por categoría",
      "Reservas con validación en el servidor",
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
];

export type Servicio = {
  titulo: string;
  texto: string;
  ejemplo: { label: string; href: string };
};

export const SERVICIOS: Servicio[] = [
  {
    titulo: "Páginas web que venden",
    texto:
      "Tu negocio en Google y en el celular de tus clientes: rápida, clara y con un botón directo a tu WhatsApp. Sin plantillas genéricas.",
    ejemplo: { label: "Mira Sabor Criollo", href: "/proyectos/sabor-criollo" },
  },
  {
    titulo: "Citas y reservas en línea",
    texto:
      "Tus clientes eligen el día y la hora que están libres, a cualquier hora. Tú recibes la agenda ordenada, sin llamadas ni cuadernos.",
    ejemplo: { label: "Prueba la agenda dental", href: "/proyectos/clinica-dental" },
  },
  {
    titulo: "Catálogos con buscador",
    texto:
      "Propiedades, productos o servicios con filtros, fichas detalladas y formularios que te llegan listos para responder.",
    ejemplo: { label: "Busca en la inmobiliaria", href: "/proyectos/inmobiliaria" },
  },
  {
    titulo: "Formularios y sistemas a medida",
    texto:
      "Admisiones, inscripciones, paneles de administración y asistentes de WhatsApp: lo que hoy haces a mano en papel o en hojas de cálculo.",
    ejemplo: { label: "Preinscríbete en el colegio", href: "/proyectos/colegio" },
  },
];

export const PASOS = [
  {
    titulo: "Conversamos",
    texto: "Por WhatsApp o videollamada nos cuentas cómo funciona tu negocio y qué quieres resolver. Es gratis.",
  },
  {
    titulo: "Propuesta por escrito",
    texto: "Te enviamos qué incluye, cuánto cuesta y en cuántos días lo entregamos. Si no te convence, no pagas nada.",
  },
  {
    titulo: "Construimos contigo",
    texto: "Ves avances en un enlace privado y pides cambios mientras lo hacemos, no al final.",
  },
  {
    titulo: "Entregamos y te enseñamos",
    texto: "Lo publicamos, te capacitamos para manejarlo y te acompañamos durante tu periodo de soporte.",
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
    q: "¿Cuánto demora mi proyecto?",
    a: "Una página de una sección, de 3 a 5 días hábiles. Una web completa, de 1 a 2 semanas. Un sistema con agenda, catálogo o panel, de 2 a 4 semanas. El plazo exacto va en la propuesta.",
  },
  {
    q: "¿Cómo se paga?",
    a: "50% para empezar y 50% al entregar, con Yape, Plin o transferencia. En proyectos grandes se puede dividir en 2 o 3 pagos.",
  },
  {
    q: "¿Puedo ver avances y pedir cambios?",
    a: "Sí. Te compartimos un enlace privado para que veas cómo va quedando y nos digas qué ajustar antes de la entrega.",
  },
  {
    q: "¿Qué pasa después de la entrega?",
    a: "El plan Emprendedor incluye 1 mes de soporte y el plan Negocio, 3 meses. Después puedes contratar un mantenimiento mensual o escribirnos cuando lo necesites.",
  },
  {
    q: "¿Trabajan solo en Pucallpa?",
    a: "No. Estamos en Pucallpa, pero atendemos a negocios de todo el Perú de forma 100% online, por WhatsApp y videollamada.",
  },
  {
    q: "¿Los demos son de clientes reales?",
    a: "No: son proyectos que construimos para mostrar lo que hacemos, con datos de ejemplo. Puedes usarlos como si fueras un cliente y revisar su código en GitHub.",
  },
];
