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
  hero: u("1509062522246-3755977927d7", 1800),
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
    resumen: "Aprenden jugando: lenguaje, motricidad y emociones en aulas de máximo 18 niños con dos maestras.",
    destacados: ["Máximo 18 niños por aula", "Inglés desde los 3 años", "Psicomotricidad y música", "Huerto escolar"],
  },
  {
    id: "primaria",
    nombre: "Primaria",
    edades: "1.° a 6.° grado",
    horario: "7:45 a 14:30",
    pension: 450,
    foto: u("1503676260728-1c00da094a0b", 1000),
    resumen: "Lectura, matemática y ciencia con proyectos reales. Cada alumno tiene un tutor que conoce su ritmo.",
    destacados: ["Plan lector mensual", "Robótica desde 3.° grado", "Tutoría personalizada", "Talleres de arte y deporte"],
  },
  {
    id: "secundaria",
    nombre: "Secundaria",
    edades: "1.° a 5.° año",
    horario: "7:45 a 15:00",
    pension: 520,
    foto: u("1571260899304-425eee4c7efc", 1000),
    resumen: "Preparación preuniversitaria desde 4.° año, orientación vocacional y certificación internacional de inglés.",
    destacados: ["Inglés con certificación Cambridge", "Pre universitaria desde 4.°", "Orientación vocacional", "Laboratorio de ciencias"],
  },
];

export const PILARES = [
  { titulo: "Inglés todos los días", texto: "Cinco horas semanales desde inicial y examen internacional al terminar la secundaria." },
  { titulo: "Ciencia y tecnología", texto: "Robótica, programación y laboratorio desde primaria, con proyectos que se exponen en feria." },
  { titulo: "Acompañamiento cercano", texto: "Psicóloga por nivel y reuniones con cada familia dos veces al año, no solo cuando hay problemas." },
  { titulo: "Arte y deporte", texto: "Danza, música, fútbol y vóley en la jornada escolar, sin costo adicional." },
];

export const FECHAS_ADMISION = [
  { fecha: "2026-10-24", titulo: "Jornada de puertas abiertas", detalle: "Conoce las aulas, a los profesores y resuelve tus dudas. 9:00 a 12:00." },
  { fecha: "2026-11-07", titulo: "Cierre de preinscripciones", detalle: "Último día para registrar a tu hijo en línea." },
  { fecha: "2026-11-14", titulo: "Evaluación y entrevista", detalle: "Evaluación según el nivel y entrevista con la familia." },
  { fecha: "2026-11-21", titulo: "Publicación de resultados", detalle: "Te escribimos por correo y por WhatsApp." },
  { fecha: "2026-12-01", titulo: "Matrícula", detalle: "Del 1 al 19 de diciembre, en línea o en la secretaría." },
];

export const VISITAS = ["2026-10-24", "2026-10-31", "2026-11-04", "2026-11-06"];

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
  { q: "¿Cómo es la evaluación de ingreso?", a: "En inicial es una observación de juego. Desde primaria, una evaluación breve de comunicación y matemática, sin presión." },
];

export const fechaLegible = (iso: string, opciones: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", opciones);
