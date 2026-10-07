import type { Idioma } from "./idioma";

/*
 * Contenido de la home y de los casos de estudio en español e inglés.
 * Lo que no depende del idioma (rutas, capturas, colores) está una sola vez en BASE;
 * los textos van por idioma y se combinan con proyectos(idioma).
 */

export type Pantalla = { src: string; alt: string; titulo: string; texto: string; movil?: boolean };

export type Proyecto = {
  slug: string;
  nombre: string;
  rubro: string;
  resumen: string;
  /** Una línea para la tarjeta de la home. */
  bajada: string;
  /** Tres etiquetas cortas para la tarjeta. */
  etiquetas: string[];
  /** Color de la marca del demo y sus tonos suaves para el fondo de la tarjeta. */
  tono: { marca: string; claro: string; oscuro: string };
  ruta: string;
  codigo: string;
  captura: { escritorio: string; movil: string };
  /** Datos concretos del alcance, para la ficha del caso. */
  alcance: { etiqueta: string; valor: string }[];
  reto: string;
  solucion: string[];
  pantallas: Pantalla[];
  tecnico: { titulo: string; texto: string }[];
  /** Plan de PLANES más parecido a este proyecto. */
  plan: IdPlan;
};

const REPO = "https://github.com/Xoesx/nexa-portafolio/tree/main/app/%28es%29/demos";

type Base = Pick<Proyecto, "slug" | "nombre" | "tono" | "ruta" | "codigo" | "captura" | "plan"> & {
  pantallas: { src: string; movil?: boolean }[];
};

const BASE: Base[] = [
  {
    slug: "clinica-dental",
    nombre: "Clínica Dental Alba",
    tono: { marca: "#136f63", claro: "#e2efeb", oscuro: "#11211e" },
    ruta: "/demos/dental",
    codigo: `${REPO}/dental`,
    captura: { escritorio: "/proyectos/clinica-dental/inicio.webp", movil: "/proyectos/clinica-dental/inicio-movil.webp" },
    plan: "a-medida",
    pantallas: [
      { src: "/proyectos/clinica-dental/problemas.webp" },
      { src: "/proyectos/clinica-dental/agenda-horario.webp" },
      { src: "/proyectos/clinica-dental/agenda-confirmada.webp" },
      { src: "/proyectos/clinica-dental/agenda-movil.webp", movil: true },
    ],
  },
  {
    slug: "inmobiliaria",
    nombre: "Raíces Inmobiliaria",
    tono: { marca: "#b5532a", claro: "#f2e7df", oscuro: "#231a15" },
    ruta: "/demos/inmobiliaria",
    codigo: `${REPO}/inmobiliaria`,
    captura: { escritorio: "/proyectos/inmobiliaria/inicio.webp", movil: "/proyectos/inmobiliaria/inicio-movil.webp" },
    plan: "negocio",
    pantallas: [
      { src: "/proyectos/inmobiliaria/mapa.webp" },
      { src: "/proyectos/inmobiliaria/ficha.webp" },
      { src: "/proyectos/inmobiliaria/favoritos.webp" },
      { src: "/proyectos/inmobiliaria/listado-movil.webp", movil: true },
    ],
  },
  {
    slug: "colegio",
    nombre: "Colegio Horizonte",
    tono: { marca: "#7a1f2b", claro: "#f0e5e6", oscuro: "#22181a" },
    ruta: "/demos/colegio",
    codigo: `${REPO}/colegio`,
    captura: { escritorio: "/proyectos/colegio/inicio.webp", movil: "/proyectos/colegio/inicio-movil.webp" },
    plan: "negocio",
    pantallas: [
      { src: "/proyectos/colegio/dia.webp" },
      { src: "/proyectos/colegio/preinscripcion.webp" },
      { src: "/proyectos/colegio/constancia.webp" },
      { src: "/proyectos/colegio/admision-movil.webp", movil: true },
    ],
  },
  {
    slug: "sabor-criollo",
    nombre: "Sabor Criollo",
    tono: { marca: "#c2410c", claro: "#f1e9dc", oscuro: "#221c14" },
    ruta: "/demos/restaurante",
    codigo: `${REPO}/restaurante`,
    captura: { escritorio: "/proyectos/sabor-criollo/inicio.webp", movil: "/proyectos/sabor-criollo/inicio-movil.webp" },
    plan: "negocio",
    pantallas: [
      { src: "/proyectos/sabor-criollo/reserva-rapida.webp" },
      { src: "/proyectos/sabor-criollo/experiencias.webp" },
      { src: "/proyectos/sabor-criollo/admin.webp" },
      { src: "/proyectos/sabor-criollo/menu-movil.webp", movil: true },
    ],
  },
];

type TextoProyecto = Omit<Proyecto, keyof Base | "pantallas"> & {
  pantallas: Omit<Pantalla, "src" | "movil">[];
};

const TEXTO_PROYECTO: Record<Idioma, Record<string, TextoProyecto>> = {
  es: {
    "clinica-dental": {
      rubro: "Salud · Clínica dental",
      resumen:
        "Sitio para una clínica dental que empieza por lo que siente el paciente: elige su problema, ve quién lo va a atender y reserva un horario libre en menos de un minuto, a cualquier hora.",
      bajada: "El paciente cuenta qué le pasa y reserva un horario libre en menos de un minuto.",
      etiquetas: ["Citas en línea", "Horarios reales", "Recordatorio en el celular"],
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
        "En lugar de una lista de tratamientos técnicos, el paciente elige lo que le pasa (\"me duele una muela\", \"me falta una pieza\") y llega a la agenda con el tratamiento correcto ya elegido.",
        "La agenda ofrece solo horarios realmente libres según la duración del tratamiento y el especialista, y al confirmar permite guardar la cita en el calendario del celular.",
      ],
      pantallas: [
        { alt: "Sección \"¿Qué te está pasando?\" con seis problemas comunes", titulo: "Del síntoma a la cita", texto: "Seis problemas en palabras del paciente. Cada uno lleva a la agenda con el tratamiento indicado ya elegido." },
        { alt: "Paso de la agenda para elegir día y hora disponibles", titulo: "Solo horarios libres", texto: "Los turnos ocupados aparecen tachados. Una endodoncia de 90 minutos nunca se ofrece a última hora." },
        { alt: "Confirmación de la cita con el resumen y el botón para agregarla al calendario", titulo: "Confirmación clara", texto: "Resumen de la cita, indicaciones para el día y un botón para guardarla en el calendario con recordatorio." },
        { alt: "La agenda de citas vista en un celular", titulo: "Hecha para el celular", texto: "Botones grandes, días deslizables y pasos cortos: se agenda con el pulgar." },
      ],
      tecnico: [
        { titulo: "Horarios según la duración", texto: "Cada turno se ofrece solo si el tratamiento termina antes del cierre de ese día." },
        { titulo: "Enlaces con tratamiento", texto: "La agenda lee ?tratamiento= de la URL y salta directo a elegir especialista." },
        { titulo: "Cita al calendario", texto: "Se genera un archivo .ics estándar con recordatorio, compatible con Google, Apple y Outlook." },
        { titulo: "Validación al confirmar", texto: "DNI, celular y correo se revisan con Zod, que se descarga recién en el último paso." },
        { titulo: "Accesible por pasos", texto: "Al avanzar, el foco va al título del paso y los lectores de pantalla anuncian en qué paso estás." },
        { titulo: "Datos con consentimiento", texto: "El paciente autoriza explícitamente el uso de sus datos antes de reservar." },
      ],
    },
    inmobiliaria: {
      rubro: "Inmobiliaria · Venta y alquiler",
      resumen:
        "Portal inmobiliario con terrenos, casas, departamentos y locales: buscador con mapa interactivo, precios en soles o dólares, favoritos, fichas con asesor y calculadora de crédito.",
      bajada: "Terrenos y casas con buscador, mapa interactivo y calculadora de crédito.",
      etiquetas: ["Mapa propio", "Soles y dólares", "Favoritos"],
      alcance: [
        { etiqueta: "Propiedades", valor: "14 fichas" },
        { etiqueta: "Tipos", valor: "Terrenos, casas, deptos y locales" },
        { etiqueta: "Mapa", valor: "Interactivo, sin librerías" },
        { etiqueta: "Asesores", valor: "4" },
      ],
      reto:
        "En Pucallpa se venden sobre todo terrenos y casas, con precios en soles o dólares. Publicar solo en redes no deja filtrar, comparar ni ver dónde queda cada propiedad, y los compradores serios se van.",
      solucion: [
        "Construimos un portal con cuatro tipos de inmueble, códigos y estados (disponible, ocasión, remate). El buscador filtra por tipo, distrito, dormitorios y precio máximo, y convierte soles y dólares con un tipo de cambio referencial.",
        "Cada búsqueda se puede ver en lista o en un mapa interactivo hecho a medida: se arrastra, hace zoom y muestra el precio de cada propiedad sobre su ubicación.",
        "Las fichas presentan al asesor responsable, permiten agendar una visita, compartir el enlace, guardar en favoritos y simular la cuota del crédito. Las vendidas recientemente quedan como prueba de confianza.",
      ],
      pantallas: [
        { alt: "Buscador de propiedades en vista de mapa con precios sobre cada ubicación", titulo: "Buscar en el mapa", texto: "Lista y mapa sincronizados: al filtrar, el mapa se reencuadra solo para mostrar los resultados." },
        { alt: "Ficha de una casa con galería, botones para compartir y guardar, y contacto con el asesor", titulo: "Una persona detrás de cada ficha", texto: "Galería, datos, ubicación y el asesor responsable con su foto. Se puede agendar la visita ahí mismo." },
        { alt: "Página de favoritos con tabla comparativa de precio por metro cuadrado", titulo: "Favoritos para comparar", texto: "Las propiedades guardadas se comparan en una tabla con el precio por m², todo llevado a soles." },
        { alt: "El buscador de propiedades en un celular", titulo: "Buscar desde el celular", texto: "Operación en pestañas, filtros plegables con contador y cambio rápido entre lista y mapa." },
      ],
      tecnico: [
        { titulo: "Mapa sin dependencias", texto: "Proyección Web Mercator y teselas de OpenStreetMap con arrastre, zoom y teclado, sin librerías externas." },
        { titulo: "Soles y dólares", texto: "Filtros y orden por precio comparan ambas monedas con un tipo de cambio referencial." },
        { titulo: "Búsqueda en la URL", texto: "Filtros y vista viven en el enlace: se comparten, se guardan y funcionan con el botón atrás." },
        { titulo: "Favoritos sincronizados", texto: "Se guardan en el navegador y se actualizan entre pestañas con useSyncExternalStore." },
        { titulo: "Cálculo financiero correcto", texto: "Cuota con sistema francés y TEA convertida a tasa efectiva mensual, no dividida entre 12." },
        { titulo: "Fichas generadas en build", texto: "Cada propiedad es una página estática con su propio título y descripción para Google." },
      ],
    },
    colegio: {
      rubro: "Educación · Colegio privado",
      resumen:
        "Sitio institucional que muestra el colegio por dentro: un día de clases hora por hora, la directora, las familias y la vida escolar, con una preinscripción en línea que calcula sola el grado del alumno.",
      bajada: "El colegio por dentro y una preinscripción que calcula sola el grado del alumno.",
      etiquetas: ["Preinscripción", "Grado automático", "Constancia"],
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
        { alt: "Sección \"Un día en Horizonte\" con horarios y fotos de alumnos", titulo: "Un día, hora por hora", texto: "Desde el saludo en la puerta hasta los talleres de la tarde, con fotos de cada momento." },
        { alt: "Primer paso de la preinscripción con el grado calculado automáticamente", titulo: "El grado, calculado al instante", texto: "Con la fecha de nacimiento, el formulario indica el grado del próximo año y avisa si la edad no corresponde." },
        { alt: "Constancia de preinscripción con código y lista de documentos", titulo: "Constancia con código", texto: "Resumen, fecha de visita y documentos a llevar, con un botón para imprimirla." },
        { alt: "La página de admisión vista en un celular", titulo: "Admisión desde el celular", texto: "Los padres se preinscriben desde el teléfono, en el trabajo o de camino a casa." },
      ],
      tecnico: [
        { titulo: "Regla del 31 de marzo", texto: "La edad se calcula a la fecha de corte que usa el Ministerio de Educación del Perú." },
        { titulo: "Pasos que no pierden datos", texto: "Un solo formulario con pasos: al volver atrás, todo lo escrito sigue ahí." },
        { titulo: "Validación por paso", texto: "Cada paso se revisa antes de avanzar; si hay un error en un paso anterior, el formulario regresa a él." },
        { titulo: "Pestañas accesibles", texto: "Los niveles se recorren con las flechas del teclado, según el patrón ARIA de pestañas." },
        { titulo: "Constancia imprimible", texto: "Al imprimir se ocultan los botones y queda solo la información útil." },
        { titulo: "Protección de datos", texto: "La autorización de uso de datos cita la Ley 29733 de protección de datos personales." },
      ],
    },
    "sabor-criollo": {
      rubro: "Gastronomía · Restaurante",
      resumen:
        "Restaurante de cocina criolla y amazónica con reserva rápida desde la portada, eventos, la historia de la familia y un panel para que el dueño actualice platos y precios sin depender de nadie.",
      bajada: "Reserva de mesa desde la portada y un panel para que el dueño edite su carta.",
      etiquetas: ["Reservas", "Panel del dueño", "API validada"],
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
        { alt: "Portada del restaurante con el widget de reserva rápida y horarios disponibles", titulo: "Reservar sin salir de la portada", texto: "Personas, día y horario en tres toques. Los grupos de más de 8 pasan a WhatsApp para armar un menú especial." },
        { alt: "Sección de eventos y experiencias del restaurante", titulo: "Eventos que dan ganas de ir", texto: "Música en vivo, taller de ceviche y almuerzo familiar, cada uno con su día, hora y precio." },
        { alt: "Panel de administración con la lista de platos", titulo: "Panel para el dueño", texto: "Buscar, agregar, editar o pausar un plato toma segundos. Los cambios se ven al instante en el sitio." },
        { alt: "La carta del restaurante vista en un celular", titulo: "Pensado para el celular", texto: "La mayoría de clientes llega desde el teléfono, así que cada pantalla se diseñó primero para ahí." },
      ],
      tecnico: [
        { titulo: "Disponibilidad en vivo", texto: "Los horarios respetan la atención de cada día y ocultan los que ya pasaron si reservas para hoy." },
        { titulo: "Reserva precargada", texto: "El widget pasa fecha, hora y personas por la URL y el formulario llega completo." },
        { titulo: "Validación en el servidor", texto: "Las reservas y mensajes se validan con Zod en la API, no solo en el navegador." },
        { titulo: "Límite de solicitudes", texto: "Un proxy frena a quien envía demasiados formularios por minuto desde la misma IP." },
        { titulo: "Fotos livianas", texto: "Las imágenes que sube el dueño se reducen a 1200 px y se comprimen antes de guardarse." },
        { titulo: "Privacidad por defecto", texto: "Analítica y chat en vivo solo se cargan si el visitante acepta las cookies." },
      ],
    },
  },

  en: {
    "clinica-dental": {
      rubro: "Health · Dental clinic",
      resumen:
        "A dental clinic website that starts with how the patient feels: they pick what's wrong, see who will treat them and book an open slot in under a minute, at any hour.",
      bajada: "Patients say what's wrong and book an open slot in under a minute.",
      etiquetas: ["Online booking", "Real availability", "Calendar reminder"],
      alcance: [
        { etiqueta: "Pages", valor: "Home and booking" },
        { etiqueta: "Booking", valor: "4 steps" },
        { etiqueta: "Specialists", valor: "3, each with their own hours" },
        { etiqueta: "Guided problems", valor: "6" },
      ],
      reto:
        "Most people look for a dentist at night, and they're nervous. They don't know which treatment they need or who they'll see, and if nobody picks up the phone, the appointment goes to another clinic.",
      solucion: [
        "We designed a homepage with people in it: real photos of patients being treated, the dentist's story in her own words, the team, reviews and what the first visit looks like, step by step.",
        "Instead of a list of technical treatments, patients choose what's happening to them (\"a tooth hurts\", \"I'm missing a tooth\") and reach the booking form with the right treatment already selected.",
        "The booking form only offers slots that are actually free for that treatment's length and that specialist. After confirming, patients can save the appointment to their phone calendar.",
      ],
      pantallas: [
        { alt: "The \"What's happening?\" section with six common problems", titulo: "From symptom to appointment", texto: "Six problems in the patient's own words. Each one opens the booking form with the right treatment already chosen." },
        { alt: "Booking step to pick an available day and time", titulo: "Only free slots", texto: "Taken slots are crossed out. A 90-minute root canal is never offered at the end of the day." },
        { alt: "Appointment confirmation with a summary and a button to add it to the calendar", titulo: "A clear confirmation", texto: "A summary of the appointment, instructions for the day and a button to save it to the calendar with a reminder." },
        { alt: "The booking form on a phone", titulo: "Made for phones", texto: "Big buttons, swipeable days and short steps. You can book with one thumb." },
      ],
      tecnico: [
        { titulo: "Slots that fit the treatment", texto: "A slot is only offered if the treatment ends before closing time that day." },
        { titulo: "Links that carry the treatment", texto: "The booking page reads ?tratamiento= from the URL and jumps straight to choosing a specialist." },
        { titulo: "Appointment to calendar", texto: "It generates a standard .ics file with a reminder that works with Google, Apple and Outlook." },
        { titulo: "Validation at the last step", texto: "ID number, phone and email are checked with Zod, which only downloads at the final step." },
        { titulo: "Accessible steps", texto: "When moving forward, focus goes to the step title and screen readers announce which step you're on." },
        { titulo: "Data with consent", texto: "Patients explicitly agree to the use of their data before booking." },
      ],
    },
    inmobiliaria: {
      rubro: "Real estate · Sales and rentals",
      resumen:
        "A real estate portal with land, houses, apartments and shops: search with an interactive map, prices in soles or dollars, favorites, listings with an agent and a mortgage calculator.",
      bajada: "Land and houses with search, an interactive map and a mortgage calculator.",
      etiquetas: ["Custom map", "Soles and dollars", "Favorites"],
      alcance: [
        { etiqueta: "Properties", valor: "14 listings" },
        { etiqueta: "Types", valor: "Land, houses, apartments and shops" },
        { etiqueta: "Map", valor: "Interactive, no libraries" },
        { etiqueta: "Agents", valor: "4" },
      ],
      reto:
        "In Pucallpa, most of what's for sale is land and houses, priced in soles or dollars. Posting only on social media doesn't let buyers filter, compare or see where each property is, so serious buyers move on.",
      solucion: [
        "We built a portal with four property types, listing codes and statuses (available, bargain, foreclosure). The search filters by type, district, bedrooms and maximum price, converting between soles and dollars with a reference exchange rate.",
        "Any search can be shown as a list or on a custom interactive map. You can drag it, zoom in and see each property's price on its location.",
        "Listings show the agent in charge and let visitors schedule a viewing, share the link, save it to favorites and estimate the loan payment. Recently sold properties stay on the site as proof of trust.",
      ],
      pantallas: [
        { alt: "Property search in map view with prices on each location", titulo: "Search on the map", texto: "The list and the map stay in sync. When you filter, the map reframes itself to show the results." },
        { alt: "House listing with a gallery, share and save buttons, and agent contact", titulo: "A person behind every listing", texto: "Gallery, details, location and the agent in charge, with their photo. You can schedule a viewing right there." },
        { alt: "Favorites page with a price per square meter comparison table", titulo: "Favorites you can compare", texto: "Saved properties are compared in a table with the price per m², all converted to soles." },
        { alt: "The property search on a phone", titulo: "Search from your phone", texto: "Buy or rent in tabs, collapsible filters with a counter and a quick switch between list and map." },
      ],
      tecnico: [
        { titulo: "A map without dependencies", texto: "Web Mercator projection and OpenStreetMap tiles with dragging, zoom and keyboard support, without external libraries." },
        { titulo: "Soles and dollars", texto: "Price filters and sorting compare both currencies using a reference exchange rate." },
        { titulo: "The search lives in the URL", texto: "Filters and view are part of the link, so they can be shared, bookmarked and work with the back button." },
        { titulo: "Synced favorites", texto: "They're stored in the browser and stay in sync across tabs with useSyncExternalStore." },
        { titulo: "Correct loan math", texto: "Payments use the French amortization method, with the annual rate converted to an effective monthly rate instead of divided by 12." },
        { titulo: "Listings built ahead of time", texto: "Each property is a static page with its own title and description for Google." },
      ],
    },
    colegio: {
      rubro: "Education · Private school",
      resumen:
        "A school website that shows what happens inside: a school day hour by hour, the principal, families and school life, plus online pre-registration that works out the student's grade by itself.",
      bajada: "The school from the inside, and a pre-registration that works out each student's grade.",
      etiquetas: ["Pre-registration", "Automatic grade", "Printable record"],
      alcance: [
        { etiqueta: "Pages", valor: "Home and admissions" },
        { etiqueta: "Levels", valor: "Preschool, primary and secondary" },
        { etiqueta: "Pre-registration", valor: "3 steps" },
        { etiqueta: "Record", valor: "Printable" },
      ],
      reto:
        "Parents choose a school based on trust. They want to see what it's like inside and who will look after their kids. Meanwhile, the front office repeats the same answers every admissions season and fills out forms by hand.",
      solucion: [
        "We showed the school through real people: a photo collage of students, a message from the principal, a school day hour by hour, testimonials from families, school life and news.",
        "The practical information (levels, schedules, fees, requirements and dates) is organized in tabs and on a clear admissions page.",
        "Pre-registration asks for the student's and guardian's details and a visit date. From the date of birth it works out the grade using Peru's March 31 cutoff and gives the family a record with a code, ready to print.",
      ],
      pantallas: [
        { alt: "The \"A day at Horizonte\" section with times and photos of students", titulo: "A day, hour by hour", texto: "From the greeting at the door to the afternoon workshops, with a photo of each moment." },
        { alt: "First pre-registration step with the grade calculated automatically", titulo: "The grade, worked out instantly", texto: "From the date of birth, the form shows next year's grade and warns parents if the age doesn't fit." },
        { alt: "Pre-registration record with a code and a list of documents", titulo: "A record with a code", texto: "Summary, visit date and the documents to bring, with a print button." },
        { alt: "The admissions page on a phone", titulo: "Admissions from a phone", texto: "Parents pre-register from their phone, at work or on the way home." },
      ],
      tecnico: [
        { titulo: "The March 31 rule", texto: "Age is calculated at the cutoff date used by Peru's Ministry of Education." },
        { titulo: "Steps that keep your data", texto: "It's one form split into steps. When you go back, everything you typed is still there." },
        { titulo: "Validation per step", texto: "Each step is checked before moving on. If an earlier step has an error, the form goes back to it." },
        { titulo: "Accessible tabs", texto: "Levels can be browsed with the arrow keys, following the ARIA tabs pattern." },
        { titulo: "Printable record", texto: "When you print it, the buttons disappear and only the useful information is left." },
        { titulo: "Data protection", texto: "The consent text cites Peru's Law 29733 on personal data protection." },
      ],
    },
    "sabor-criollo": {
      rubro: "Food · Restaurant",
      resumen:
        "A Peruvian and Amazonian restaurant with quick booking from the homepage, weekly events, the family's story and a panel where the owner updates dishes and prices without depending on anyone.",
      bajada: "Table booking from the homepage and a panel where the owner edits the menu.",
      etiquetas: ["Reservations", "Owner's panel", "Validated API"],
      alcance: [
        { etiqueta: "Public pages", valor: "12" },
        { etiqueta: "Admin panel", valor: "4 screens" },
        { etiqueta: "API routes", valor: "3" },
        { etiqueta: "Booking", valor: "From the homepage" },
      ],
      reto:
        "A restaurant that only takes bookings by phone loses tables whenever nobody can pick up, and a PDF menu doesn't show what it feels like to eat there or who's behind the kitchen.",
      solucion: [
        "The homepage opens with people sharing a table and a booking widget like the ones on the big platforms: party size, day and times with free tables, without leaving the page.",
        "We told the family's story in the first person, featured the Amazonian dishes from Pucallpa and the week's events, and added reviews from diners.",
        "The owner gets a panel of their own to add or edit dishes, change prices, upload photos (they're compressed automatically) and check bookings, which are validated on the server.",
      ],
      pantallas: [
        { alt: "Restaurant homepage with the quick booking widget and available times", titulo: "Book without leaving the homepage", texto: "Party size, day and time in three taps. Groups of more than 8 move to WhatsApp to plan a special menu." },
        { alt: "The restaurant's events section", titulo: "Events worth going to", texto: "Live music, a ceviche workshop and a family lunch, each with its day, time and price." },
        { alt: "Admin panel with the list of dishes", titulo: "A panel for the owner", texto: "Finding, adding, editing or pausing a dish takes seconds. Changes show up on the site right away." },
        { alt: "The restaurant menu on a phone", titulo: "Designed for phones", texto: "Most customers arrive from their phone, so every screen was designed for it first." },
      ],
      tecnico: [
        { titulo: "Live availability", texto: "Times follow each day's opening hours and hide the ones that already passed if you book for today." },
        { titulo: "Pre-filled booking", texto: "The widget passes date, time and party size in the URL, so the form arrives complete." },
        { titulo: "Server-side validation", texto: "Bookings and messages are validated with Zod in the API, not only in the browser." },
        { titulo: "Rate limiting", texto: "A proxy slows down anyone sending too many forms per minute from the same IP address." },
        { titulo: "Light photos", texto: "Images the owner uploads are resized to 1200 px and compressed before they're saved." },
        { titulo: "Privacy by default", texto: "Analytics and live chat only load if the visitor accepts cookies." },
      ],
    },
  },
};

/** Proyectos con sus textos en el idioma pedido. */
export function proyectos(idioma: Idioma): Proyecto[] {
  return BASE.map((b) => {
    const t = TEXTO_PROYECTO[idioma][b.slug];
    return { ...b, ...t, pantallas: b.pantallas.map((p, i) => ({ ...p, ...t.pantallas[i] })) };
  });
}

export const SLUGS = BASE.map((b) => b.slug);

/* ---------- Planes ---------- */

export type IdPlan = "emprendedor" | "negocio" | "a-medida";

export type Plan = {
  id: IdPlan;
  nombre: string;
  para: string;
  /** Precio de partida en soles y en dólares (tipo de cambio en SITIO.cambio). */
  precio: { pen: number; usd: number };
  incluye: string[];
  destacado?: boolean;
};

const PRECIOS: Record<IdPlan, Plan["precio"]> = {
  emprendedor: { pen: 300, usd: 90 },
  negocio: { pen: 600, usd: 175 },
  "a-medida": { pen: 1000, usd: 290 },
};

const TEXTO_PLAN: Record<Idioma, Record<IdPlan, Pick<Plan, "nombre" | "para" | "incluye">>> = {
  es: {
    emprendedor: {
      nombre: "Emprendedor",
      para: "Para empezar a estar en internet",
      incluye: ["Página de una sola sección (landing)", "Botón de WhatsApp y formulario de contacto", "Diseño que se adapta al celular", "1 mes de soporte"],
    },
    negocio: {
      nombre: "Negocio",
      para: "Para mostrar todo lo que ofreces",
      incluye: [
        "Web completa con varias secciones",
        "Panel de administración",
        "Asistente de WhatsApp con IA (opcional)",
        "SEO básico para aparecer en Google",
        "Capacitación para que lo manejes tú",
        "3 meses de soporte",
      ],
    },
    "a-medida": {
      nombre: "A medida",
      para: "Para sistemas y automatizaciones",
      incluye: ["Sistema hecho según tu forma de trabajar", "Conexión con otras herramientas (APIs)", "Automatizaciones avanzadas", "Base de datos propia", "Soporte prioritario"],
    },
  },
  en: {
    emprendedor: {
      nombre: "Starter",
      para: "To get your business online",
      incluye: ["One-section page (landing page)", "WhatsApp button and contact form", "Design that adapts to phones", "1 month of support"],
    },
    negocio: {
      nombre: "Business",
      para: "To show everything you offer",
      incluye: [
        "Full website with several sections",
        "Admin panel",
        "WhatsApp assistant with AI (optional)",
        "Basic SEO to show up on Google",
        "Training so you can run it yourself",
        "3 months of support",
      ],
    },
    "a-medida": {
      nombre: "Custom",
      para: "For systems and automation",
      incluye: ["A system built around how you work", "Connections to other tools (APIs)", "Advanced automation", "Your own database", "Priority support"],
    },
  },
};

const ORDEN_PLANES: IdPlan[] = ["emprendedor", "negocio", "a-medida"];

export function planes(idioma: Idioma): Plan[] {
  return ORDEN_PLANES.map((id) => ({ id, precio: PRECIOS[id], destacado: id === "negocio", ...TEXTO_PLAN[idioma][id] }));
}

/** Precio de partida tal como se muestra: en soles para el español (con su equivalente en dólares) y en dólares para el inglés. */
export function formatoPrecio(precio: Plan["precio"], idioma: Idioma) {
  return idioma === "es"
    ? { principal: `S/ ${precio.pen.toLocaleString("es-PE")}`, secundario: `US$ ${precio.usd}` }
    : { principal: `US$ ${precio.usd}`, secundario: null };
}

/* ---------- Proceso, preguntas y habilidades ---------- */

const PASOS: Record<Idioma, { titulo: string; texto: string }[]> = {
  es: [
    { titulo: "Conversamos", texto: "Nos cuentas qué necesitas, por WhatsApp o videollamada. No cuesta nada." },
    { titulo: "Propuesta por escrito", texto: "Qué incluye, cuánto cuesta y cuándo lo entregamos. Si no te convence, no pagas." },
    { titulo: "Construimos contigo", texto: "Ves los avances en un enlace privado y pides cambios en el camino." },
    { titulo: "Entregamos", texto: "Lo publicamos, te enseñamos a usarlo y seguimos contigo en el soporte." },
  ],
  en: [
    { titulo: "We talk", texto: "You tell us what you need, on WhatsApp or a video call. It's free." },
    { titulo: "Written proposal", texto: "What's included, what it costs and when we deliver. If you're not convinced, you don't pay." },
    { titulo: "We build it with you", texto: "You follow the progress on a private link and ask for changes along the way." },
    { titulo: "We deliver", texto: "We publish it, show you how to use it and stay with you during the support period." },
  ],
};

export const pasos = (idioma: Idioma) => PASOS[idioma];

const PREGUNTAS: Record<Idioma, { q: string; a: string }[]> = {
  es: [
    {
      q: "¿Cuánto demora mi proyecto?",
      a: "Una página de una sección, de 3 a 5 días hábiles. Una web completa, de 1 a 2 semanas. Un sistema con agenda, catálogo o panel, de 2 a 4 semanas. El plazo exacto va en la propuesta.",
    },
    {
      q: "¿Cómo se paga?",
      a: "50% para empezar y 50% al entregar. En el Perú, con Yape, Plin o transferencia; desde otros países acordamos el medio en la propuesta. En proyectos grandes se puede dividir en 2 o 3 pagos.",
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
      a: "No. Estamos en Pucallpa, pero atendemos a negocios de todo el Perú y de otros países, 100% en línea por WhatsApp y videollamada.",
    },
    {
      q: "¿Los demos son de clientes reales?",
      a: "No: son proyectos que construimos para mostrar lo que hacemos, con datos de ejemplo. Puedes usarlos como si fueras un cliente y revisar su código en GitHub.",
    },
  ],
  en: [
    {
      q: "How long does a project take?",
      a: "A one-section page takes 3 to 5 business days. A full website, 1 to 2 weeks. A system with booking, a catalog or an admin panel, 2 to 4 weeks. The exact timeline goes in the proposal.",
    },
    {
      q: "How do I pay?",
      a: "50% to start and 50% on delivery. For clients outside Peru we agree on the payment method in the written proposal. Larger projects can be split into 2 or 3 payments.",
    },
    {
      q: "Can I see progress and ask for changes?",
      a: "Yes. We share a private link so you can see how it's coming along and tell us what to adjust before delivery.",
    },
    {
      q: "What happens after delivery?",
      a: "The Starter plan includes 1 month of support and the Business plan, 3 months. After that you can hire monthly maintenance or write to us whenever you need something.",
    },
    {
      q: "Do you work with clients outside Peru?",
      a: "Yes. We're based in Pucallpa, Peru (UTC-5), and work fully online over WhatsApp and video calls, in Spanish or English. Prices are in US dollars.",
    },
    {
      q: "Are the demos real clients?",
      a: "No. They're projects we built to show what we do, with sample data. You can use them as if you were a customer and read their code on GitHub. They're in Spanish because they were made for businesses in Peru, and we build sites in English too.",
    },
  ],
};

export const preguntas = (idioma: Idioma) => PREGUNTAS[idioma];

/** Con lo que trabajamos, agrupado. Sin versiones: lo importante es el oficio. */
const HABILIDADES: Record<Idioma, { area: string; items: string[] }[]> = {
  es: [
    { area: "Frontend", items: ["HTML5", "CSS3 (Flexbox y Grid)", "JavaScript", "jQuery", "Bootstrap", "Diseño responsive", "Estándares W3C"] },
    { area: "Backend", items: ["PHP (POO y MVC)", "Laravel", "API RESTful", "MySQL"] },
    { area: "CMS", items: ["WordPress", "CMS propio, hecho desde cero"] },
    { area: "UX/UI", items: ["Experiencia de usuario", "Interfaz de usuario", "Accesibilidad y usabilidad"] },
    { area: "Diseño", items: ["Photoshop", "Illustrator", "Inkscape"] },
    { area: "Herramientas", items: ["Git y GitHub", "VS Code", "Sublime Text", "Dreamweaver", "XAMPP y WAMP"] },
  ],
  en: [
    { area: "Frontend", items: ["HTML5", "CSS3 (Flexbox and Grid)", "JavaScript", "jQuery", "Bootstrap", "Responsive design", "W3C standards"] },
    { area: "Backend", items: ["PHP (OOP and MVC)", "Laravel", "RESTful APIs", "MySQL"] },
    { area: "CMS", items: ["WordPress", "Custom CMS built from scratch"] },
    { area: "UX/UI", items: ["User experience", "User interface", "Accessibility and usability"] },
    { area: "Design", items: ["Photoshop", "Illustrator", "Inkscape"] },
    { area: "Tools", items: ["Git and GitHub", "VS Code", "Sublime Text", "Dreamweaver", "XAMPP and WAMP"] },
  ],
};

export const habilidades = (idioma: Idioma) => HABILIDADES[idioma];

/** Con qué está hecho este sitio y sus demos (se puede comprobar en el código). */
export const STACK_SITIO = ["Next.js", "React", "TypeScript", "Tailwind CSS"];
