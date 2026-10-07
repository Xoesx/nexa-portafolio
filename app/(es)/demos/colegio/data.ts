import type { Etapa } from "./lib/calendario";

const u = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export const ANIO_ESCOLAR = 2027;

export const COLEGIO = {
  nombre: "Colegio Horizonte",
  lema: "Aprender a pensar, aprender a convivir",
  direccion: "Av. Yarinacocha 1450, Yarinacocha, Pucallpa",
  telefono: "(061) 000 000",
  correo: "admision@horizonte.demo",
};

export const FOTOS = {
  hero: u("1497486751825-1233686d5d80", 1400),
  heroAula: u("1577896851231-70ef18881754", 900),
  heroDibujando: u("1588072432836-e10032774350", 900),
  directora: u("1438761681033-6461ffad8d80", 900),
  profesora: u("1596495577886-d920f1fb7238", 1200),
  campus: u("1562774053-701939374585", 1400),
  aula: u("1580582932707-520aed937b7b"),
  biblioteca: u("1427504494785-3a9ca7044f45"),
  libros: u("1497633762265-9d179a990aa6"),
};

export type Nivel = {
  id: "inicial" | "primaria" | "secundaria";
  nombre: string;
  edades: string;
  horario: string;
  pension: number;
  foto: string;
  resumen: string;
  destacados: string[];
};

export const NIVELES: Nivel[] = [
  {
    id: "inicial",
    nombre: "Inicial",
    edades: "3 a 5 años",
    horario: "8:00 a 13:00",
    pension: 380,
    foto: u("1588072432836-e10032774350", 1000),
    resumen: "Aulas de 18 niños como máximo y dos maestras en cada una. Buena parte del día se aprende jugando, y cada aula cuida su parcela del huerto.",
    destacados: ["Máximo 18 niños por aula", "Inglés desde los 3 años", "Psicomotricidad y música", "Huerto escolar"],
  },
  {
    id: "primaria",
    nombre: "Primaria",
    edades: "1.° a 6.° grado",
    horario: "7:45 a 14:30",
    pension: 450,
    foto: u("1529390079861-591de354faf5", 1000),
    resumen: "El mismo tutor acompaña al grupo dos años seguidos, así que conoce bien a cada alumno. Leen un libro al mes y desde 3.° grado llevan robótica.",
    destacados: ["Plan lector mensual", "Robótica desde 3.° grado", "Tutoría personalizada", "Talleres de arte y deporte"],
  },
  {
    id: "secundaria",
    nombre: "Secundaria",
    edades: "1.° a 5.° año",
    horario: "7:45 a 15:00",
    pension: 520,
    foto: u("1571260899304-425eee4c7efc", 1000),
    resumen: "En 4.° y 5.° año hay preparación preuniversitaria por las tardes y orientación vocacional con la psicóloga. Terminan rindiendo el examen de inglés de Cambridge.",
    destacados: ["Inglés con certificación Cambridge", "Preuniversitaria desde 4.° año", "Orientación vocacional", "Laboratorio de ciencias"],
  },
];

export const PILARES = [
  { titulo: "Inglés todos los días", texto: "Cinco horas a la semana desde inicial. En 5.° de secundaria rinden el B1 Preliminary de Cambridge." },
  { titulo: "Ciencia y tecnología", texto: "Robótica desde 3.° de primaria y laboratorio en secundaria. Cada año llevamos proyectos a la feria regional." },
  { titulo: "Una psicóloga por nivel", texto: "Y dos reuniones al año con cada familia para hablar de cómo está su hijo, aparte de la entrega de libretas." },
  { titulo: "Arte y deporte en el horario", texto: "Danza, música, fútbol y vóley dentro de la jornada escolar. No se pagan aparte." },
];

/** Ordenadas por fecha de inicio: el calendario de la portada marca en cuál estamos. */
export const FECHAS_ADMISION: Etapa[] = [
  { fecha: "2026-09-14", hasta: "2026-11-07", titulo: "Preinscripción en línea", detalle: "Desde esta web. Al terminar recibes un código y la lista de documentos." },
  { fecha: "2026-10-24", titulo: "Jornada de puertas abiertas", detalle: "Recorre las aulas con tu hijo y conversa con los profesores, de 9:00 a 12:00." },
  { fecha: "2026-11-14", titulo: "Evaluación y entrevista", detalle: "Una observación en inicial o una prueba corta desde primaria, y luego una conversación con la familia." },
  { fecha: "2026-11-21", titulo: "Resultados", detalle: "Te escribimos por correo y por WhatsApp." },
  { fecha: "2026-12-01", hasta: "2026-12-19", titulo: "Matrícula", detalle: "En línea o en la secretaría." },
];

/** Las visitas guiadas son los miércoles y sábados, en dos turnos. */
export const VISITAS = { dias: [3, 6], turnos: ["9:00", "11:00"] } as const;

export const COSTOS = [
  { concepto: "Cuota de ingreso (única vez)", monto: "S/ 600" },
  { concepto: "Matrícula anual", monto: "S/ 380" },
  ...NIVELES.map((n) => ({ concepto: `Pensión mensual · ${n.nombre}`, monto: `S/ ${n.pension}` })),
];

export const REQUISITOS = [
  "Partida de nacimiento y DNI del estudiante",
  "DNI de ambos padres o del apoderado",
  "Libreta de notas del último año (desde 1.° de primaria)",
  "Constancia de no adeudo del colegio de procedencia",
  "Dos fotos tamaño carné",
];

export const PREGUNTAS = [
  { q: "¿Hay vacantes en todos los grados?", a: "Sí, aunque en inicial 3 años y 1.° de primaria se llenan primero. Te recomendamos preinscribirte cuanto antes." },
  { q: "¿Ofrecen becas o descuentos?", a: "Descuento de 10% en la pensión para el segundo hermano y becas por rendimiento académico desde 3.° de primaria." },
  { q: "¿Tienen movilidad escolar?", a: "Trabajamos con movilidades autorizadas que cubren Callería, Yarinacocha y Manantay. Se contratan aparte." },
  { q: "¿Cómo es la evaluación de ingreso?", a: "En inicial es una observación mientras juega. Desde primaria, una prueba corta de comunicación y matemática que nos sirve para saber en qué apoyarlo los primeros meses." },
];

export const MENSAJE_DIRECTORA = {
  nombre: "Mg. Patricia Saldaña",
  cargo: "Directora general",
  parrafos: [
    "Mis padres fundaron Horizonte en 2001 con seis maestros y 48 alumnos. Yo fui de la primera promoción de primaria, y dos de esos maestros todavía enseñan aquí.",
    "Hoy somos 640 alumnos y me sigo sabiendo el nombre de cada uno. Sé quién necesita un empujón en matemática y quién está pasando un mal momento en casa.",
    "Si algo te preocupa de tu hijo, pide una cita conmigo en secretaría. Atiendo a las familias los martes y jueves por la tarde.",
  ],
};

export const DIA = [
  { hora: "7:45", titulo: "Buenos días", texto: "Cada tutor recibe a su grupo en la puerta del aula y conversan un rato antes de empezar.", foto: u("1503676382389-4809596d5290", 800) },
  { hora: "8:00", titulo: "Matemática y lectura", texto: "Van en las primeras horas, cuando están más despiertos. Se trabaja con material concreto y en grupos de cuatro.", foto: u("1577896851231-70ef18881754", 800) },
  { hora: "10:15", titulo: "Recreo", texto: "El quiosco vende fruta, sánguches y refrescos naturales. Los de 6.° grado ayudan a cuidar el patio de inicial.", foto: u("1588075592446-265fd1e6e76f", 800) },
  { hora: "11:00", titulo: "Inglés", texto: "Una hora diaria, casi siempre con un proyecto. Este bimestre, 4.° grado está grabando un noticiero en inglés.", foto: u("1529390079861-591de354faf5", 800) },
  { hora: "13:30", titulo: "Talleres", texto: "Robótica, danza, fútbol, vóley o música. Cada alumno elige uno por bimestre.", foto: u("1531482615713-2afd69097998", 800) },
];

export const TESTIMONIOS = [
  {
    nombre: "Andrea Vela",
    rol: "Mamá de Sofía, 3.° de primaria",
    foto: u("1531123897727-8f129e1688ce", 400),
    texto: "Sofía llegó tímida de otro colegio. En un año la vimos exponer en la feria de ciencias frente a todos. Su tutora nos llama cuando algo pasa, bueno o malo.",
  },
  {
    nombre: "Martín Arévalo",
    rol: "Papá de Diego, 5.° de secundaria",
    foto: u("1500648767791-00dcc994a43e", 400),
    texto: "Diego no sabía qué estudiar hasta 4.° de secundaria. Con la orientación vocacional se decidió por Agroindustrial y entró a la Universidad Nacional de Ucayali en su primer intento.",
  },
  {
    nombre: "Don Julio Panduro",
    rol: "Abuelo de dos exalumnas",
    foto: u("1472099645785-5658abf4ff4e", 400),
    texto: "Mis dos nietas estudiaron aquí desde inicial. La mayor ya es enfermera y todavía pasa a saludar a su profesora de primaria.",
  },
];

export const VIDA_ESCOLAR = [
  { src: u("1541339907198-e08756dedf3f", 1200), alt: "Promoción lanzando sus birretes al aire en la ceremonia de graduación", pie: "Promoción 2025" },
  { src: u("1588075592446-265fd1e6e76f", 900), alt: "Niños de primaria sentados en el piso del aula durante una actividad", pie: "Lectura en grupo" },
  { src: u("1531482615713-2afd69097998", 900), alt: "Estudiantes de secundaria trabajando juntos en computadoras", pie: "Taller de programación" },
  { src: u("1562774053-701939374585", 900), alt: "Edificio principal del colegio con jardines", pie: "Nuestro campus" },
  { src: u("1503676382389-4809596d5290", 900), alt: "Estudiante sonriente con sus cuadernos", pie: "Primer día de clases" },
];

export const NOTICIAS = [
  { fecha: "2026-09-26", titulo: "Ganamos la feria regional de ciencias", texto: "El proyecto de purificación de agua con semillas de 4.° de secundaria representará a Ucayali en la etapa nacional.", foto: u("1531482615713-2afd69097998", 800) },
  { fecha: "2026-09-12", titulo: "Campeonas de vóley sub-14", texto: "Nuestras chicas ganaron el torneo interescolar de Yarinacocha sin perder un solo set.", foto: u("1497486751825-1233686d5d80", 800) },
  { fecha: "2026-08-30", titulo: "96% de la promoción ingresó a la universidad", texto: "La promoción 2025 ingresó a universidades de Pucallpa, Lima y el extranjero.", foto: u("1541339907198-e08756dedf3f", 800) },
];

export const fechaLegible = (iso: string, opciones: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", opciones);
