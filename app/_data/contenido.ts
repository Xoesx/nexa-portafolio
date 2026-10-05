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
      "Sitio para una clínica dental que empieza por lo que siente el paciente: elige su problema, ve quién lo va a atender y reserva un horario libre en menos de un minuto, a cualquier hora.",
    incluye: [
      "Agenda en línea con horarios reales por especialista",
      "“¿Qué te está pasando?”: del síntoma a la cita correcta",
      "Historia de la doctora, equipo y reseñas",
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
      { etiqueta: "Problemas guiados", valor: "6" },
    ],
    reto:
      "La mayoría de pacientes busca dentista de noche y con miedo. No sabe qué tratamiento necesita ni a quién va a ver, y si nadie contesta el teléfono, la cita se va a otra clínica.",
    solucion: [
      "Diseñamos una portada humana: fotos reales de atención, la historia de la doctora contada por ella misma, el equipo, reseñas y cómo es la primera visita paso a paso.",
      "En lugar de una lista de tratamientos técnicos, el paciente elige lo que le pasa (“me duele una muela”, “me falta una pieza”) y llega a la agenda con el tratamiento correcto ya elegido.",
      "La agenda ofrece solo horarios realmente libres según la duración del tratamiento y el especialista, y al confirmar permite guardar la cita en el calendario del celular.",
    ],
    pantallas: [
      {
        src: "/proyectos/clinica-dental/problemas.webp",
        alt: "Sección “¿Qué te está pasando?” con seis problemas comunes",
        titulo: "Del síntoma a la cita",
        texto: "Seis problemas en palabras del paciente. Cada uno lleva a la agenda con el tratamiento indicado ya elegido.",
      },
      {
        src: "/proyectos/clinica-dental/agenda-horario.webp",
        alt: "Paso de la agenda para elegir día y hora disponibles",
        titulo: "Solo horarios libres",
        texto: "Los turnos ocupados aparecen tachados. Una endodoncia de 90 minutos nunca se ofrece a última hora.",
      },
      {
        src: "/proyectos/clinica-dental/agenda-confirmada.webp",
        alt: "Confirmación de la cita con el resumen y el botón para agregarla al calendario",
        titulo: "Confirmación clara",
        texto: "Resumen de la cita, indicaciones para el día y un botón para guardarla en el calendario con recordatorio.",
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
      { titulo: "Enlaces con tratamiento", texto: "La agenda lee ?tratamiento= de la URL y salta directo a elegir especialista." },
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
      "Portal inmobiliario con terrenos, casas, departamentos y locales: buscador con mapa interactivo, precios en soles o dólares, favoritos, fichas con asesor y calculadora de crédito.",
    incluye: [
      "Mapa interactivo con los precios de cada propiedad",
      "Filtros por tipo, distrito, dormitorios y precio en S/ o US$",
      "Favoritos con comparativo de precio por m²",
      "Ficha con asesor, visita agendada y calculadora",
    ],
    ruta: "/demos/inmobiliaria",
    codigo: "https://github.com/Xoesx/nexa-portafolio/tree/main/app/demos/inmobiliaria",
    captura: {
      escritorio: "/proyectos/inmobiliaria/inicio.webp",
      movil: "/proyectos/inmobiliaria/inicio-movil.webp",
    },
    alcance: [
      { etiqueta: "Propiedades", valor: "14 fichas" },
      { etiqueta: "Tipos", valor: "Terrenos, casas, deptos y locales" },
      { etiqueta: "Mapa", valor: "Interactivo, sin librerías" },
      { etiqueta: "Asesores", valor: "4" },
    ],
    reto:
      "En Pucallpa se venden sobre todo terrenos y casas, con precios en soles o dólares. Publicar solo en redes no deja filtrar, comparar ni ver dónde queda cada propiedad, y los compradores serios se van.",
    solucion: [
      "Construimos un portal con cuatro tipos de inmueble, códigos y estados (disponible, ocasión, remate). El buscador filtra por tipo, distrito, dormitorios y precio máximo, convirtiendo soles y dólares con un tipo de cambio referencial.",
      "Cada búsqueda se puede ver en lista o en un mapa interactivo hecho a medida: se arrastra, hace zoom y muestra el precio de cada propiedad sobre su ubicación.",
      "Las fichas presentan al asesor responsable, permiten agendar una visita, compartir el enlace, guardar en favoritos y simular la cuota del crédito. Las vendidas recientemente quedan como prueba de confianza.",
    ],
    pantallas: [
      {
        src: "/proyectos/inmobiliaria/mapa.webp",
        alt: "Buscador de propiedades en vista de mapa con precios sobre cada ubicación",
        titulo: "Buscar en el mapa",
        texto: "Lista y mapa sincronizados: al filtrar, el mapa se reencuadra solo para mostrar los resultados.",
      },
      {
        src: "/proyectos/inmobiliaria/ficha.webp",
        alt: "Ficha de una casa con galería, botones para compartir y guardar, y contacto con el asesor",
        titulo: "Una persona detrás de cada ficha",
        texto: "Galería, datos, ubicación y el asesor responsable con su foto. Se puede agendar la visita ahí mismo.",
      },
      {
        src: "/proyectos/inmobiliaria/favoritos.webp",
        alt: "Página de favoritos con tabla comparativa de precio por metro cuadrado",
        titulo: "Favoritos para comparar",
        texto: "Las propiedades guardadas se comparan en una tabla con el precio por m², todo llevado a soles.",
      },
      {
        src: "/proyectos/inmobiliaria/listado-movil.webp",
        alt: "El buscador de propiedades en un celular",
        titulo: "Buscar desde el celular",
        texto: "Operación en pestañas, filtros plegables con contador y cambio rápido entre lista y mapa.",
        movil: true,
      },
    ],
    tecnico: [
      { titulo: "Mapa sin dependencias", texto: "Proyección Web Mercator y teselas de OpenStreetMap con arrastre, zoom y teclado, sin librerías externas." },
      { titulo: "Soles y dólares", texto: "Filtros y orden por precio comparan ambas monedas con un tipo de cambio referencial." },
      { titulo: "Búsqueda en la URL", texto: "Filtros y vista viven en el enlace: se comparten, se guardan y funcionan con el botón atrás." },
      { titulo: "Favoritos sincronizados", texto: "Se guardan en el navegador y se actualizan entre pestañas con useSyncExternalStore." },
      { titulo: "Cálculo financiero correcto", texto: "Cuota con sistema francés y TEA convertida a tasa efectiva mensual, no dividida entre 12." },
      { titulo: "Fichas generadas en build", texto: "Cada propiedad es una página estática con su propio título y descripción para Google." },
    ],
    plan: "Negocio",
  },
  {
    slug: "colegio",
    nombre: "Colegio Horizonte",
    rubro: "Educación · Colegio privado",
    resumen:
      "Sitio institucional que muestra el colegio por dentro: un día de clases hora por hora, la directora, las familias y la vida escolar, con una preinscripción en línea que calcula sola el grado del alumno.",
    incluye: [
      "Preinscripción en línea en tres pasos",
      "Grado calculado según la fecha de nacimiento",
      "“Un día en Horizonte”, familias y vida escolar",
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
      "Los padres eligen colegio por confianza: quieren ver cómo se vive adentro y quién va a cuidar a sus hijos. Mientras tanto, la secretaría repite las mismas respuestas cada temporada de admisión y llena fichas a mano.",
    solucion: [
      "Mostramos el colegio con personas reales: un collage de alumnos, el mensaje de la directora, un día de clases hora por hora, testimonios de familias, vida escolar y noticias.",
      "La información práctica (niveles, horarios, pensiones, requisitos y fechas) está ordenada en pestañas y en una página de admisión clara.",
      "La preinscripción pide los datos del alumno, del apoderado y la fecha de visita. Con la fecha de nacimiento indica el grado según la regla del 31 de marzo y entrega una constancia con código para imprimir.",
    ],
    pantallas: [
      {
        src: "/proyectos/colegio/dia.webp",
        alt: "Sección “Un día en Horizonte” con horarios y fotos de alumnos",
        titulo: "Un día, hora por hora",
        texto: "Desde el saludo en la puerta hasta los talleres de la tarde, con fotos de cada momento.",
      },
      {
        src: "/proyectos/colegio/preinscripcion.webp",
        alt: "Primer paso de la preinscripción con el grado calculado automáticamente",
        titulo: "El grado, calculado al instante",
        texto: "Con la fecha de nacimiento, el formulario indica el grado del próximo año y avisa si la edad no corresponde.",
      },
      {
        src: "/proyectos/colegio/constancia.webp",
        alt: "Constancia de preinscripción con código y lista de documentos",
        titulo: "Constancia con código",
        texto: "Resumen, fecha de visita y documentos a llevar, con un botón para imprimirla.",
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
      "Restaurante de cocina criolla y amazónica con reserva rápida desde la portada, eventos, la historia de la familia y un panel para que el dueño actualice platos y precios sin depender de nadie.",
    incluye: [
      "Reserva rápida con horarios disponibles",
      "Eventos, sabores de la selva y reseñas",
      "Panel para editar platos, precios y fotos",
      "Reservas validadas en el servidor",
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
      { etiqueta: "Reserva", valor: "Desde la portada" },
    ],
    reto:
      "Un restaurante que solo recibe reservas por teléfono pierde mesas cuando no puede contestar, y una carta en PDF no transmite lo que se vive en el local ni quién está detrás de la cocina.",
    solucion: [
      "La portada abre con gente compartiendo la mesa y un widget de reserva al estilo de las plataformas grandes: personas, día y horarios con mesas libres, sin salir de la página.",
      "Contamos la historia de la familia en primera persona, destacamos los platos amazónicos de Pucallpa y los eventos de la semana, y mostramos reseñas de comensales.",
      "Para el dueño hay un panel propio: agrega o edita platos, cambia precios, sube fotos (que se comprimen solas) y revisa las reservas, que se validan en el servidor.",
    ],
    pantallas: [
      {
        src: "/proyectos/sabor-criollo/reserva-rapida.webp",
        alt: "Portada del restaurante con el widget de reserva rápida y horarios disponibles",
        titulo: "Reservar sin salir de la portada",
        texto: "Personas, día y horario en tres toques. Los grupos de más de 8 pasan a WhatsApp para armar un menú especial.",
      },
      {
        src: "/proyectos/sabor-criollo/experiencias.webp",
        alt: "Sección de eventos y experiencias del restaurante",
        titulo: "Eventos que dan ganas de ir",
        texto: "Música en vivo, taller de ceviche y almuerzo familiar, cada uno con su día, hora y precio.",
      },
      {
        src: "/proyectos/sabor-criollo/admin.webp",
        alt: "Panel de administración con la lista de platos",
        titulo: "Panel para el dueño",
        texto: "Buscar, agregar, editar o pausar un plato toma segundos. Los cambios se ven al instante en el sitio.",
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
      { titulo: "Disponibilidad en vivo", texto: "Los horarios respetan la atención de cada día y ocultan los que ya pasaron si reservas para hoy." },
      { titulo: "Reserva precargada", texto: "El widget pasa fecha, hora y personas por la URL y el formulario llega completo." },
      { titulo: "Validación en el servidor", texto: "Las reservas y mensajes se validan con Zod en la API, no solo en el navegador." },
      { titulo: "Límite de solicitudes", texto: "Un proxy frena a quien envía demasiados formularios por minuto desde la misma IP." },
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
