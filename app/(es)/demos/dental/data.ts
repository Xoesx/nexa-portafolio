const u = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export type Tratamiento = {
  id: string;
  nombre: string;
  resumen: string;
  desde: number;
  minutos: number;
  especialidad: Especialidad;
};

export type Especialidad = "general" | "estetica" | "ortodoncia" | "implantes" | "pediatria";

export type Doctor = {
  id: string;
  nombre: string;
  cargo: string;
  especialidades: Especialidad[];
  foto: string;
  bio: string;
};

export const CLINICA = {
  nombre: "Clínica Dental Alba",
  direccion: "Jr. Raimondi 355, Callería, Pucallpa",
  horario: [
    { dias: "Lunes a viernes", horas: "9:00 a 20:00" },
    { dias: "Sábado", horas: "9:00 a 14:00" },
  ],
  telefono: "(061) 000 000",
};

export const TRATAMIENTOS: Tratamiento[] = [
  {
    id: "evaluacion",
    nombre: "Evaluación y limpieza",
    resumen: "Revisión completa, radiografía digital y profilaxis con ultrasonido.",
    desde: 80,
    minutos: 45,
    especialidad: "general",
  },
  {
    id: "blanqueamiento",
    nombre: "Blanqueamiento",
    resumen: "Hasta 6 tonos más claro en una sesión, con gel de baja sensibilidad.",
    desde: 450,
    minutos: 90,
    especialidad: "estetica",
  },
  {
    id: "ortodoncia",
    nombre: "Ortodoncia",
    resumen: "Brackets estéticos o alineadores invisibles. La evaluación incluye plan y presupuesto.",
    desde: 120,
    minutos: 45,
    especialidad: "ortodoncia",
  },
  {
    id: "implantes",
    nombre: "Implantes dentales",
    resumen: "Reemplazo de piezas con titanio y corona de porcelana. Primera consulta con tomografía.",
    desde: 150,
    minutos: 60,
    especialidad: "implantes",
  },
  {
    id: "endodoncia",
    nombre: "Endodoncia",
    resumen: "Tratamiento de conducto con anestesia moderna, en una o dos sesiones.",
    desde: 350,
    minutos: 90,
    especialidad: "general",
  },
  {
    id: "ninos",
    nombre: "Odontopediatría",
    resumen: "Primera visita, flúor y sellantes en un consultorio pensado para niños.",
    desde: 70,
    minutos: 30,
    especialidad: "pediatria",
  },
];

export const DOCTORES: Doctor[] = [
  {
    id: "valeria-rios",
    nombre: "Dra. Valeria Ríos",
    cargo: "Directora médica · Rehabilitación oral",
    especialidades: ["general", "implantes", "estetica"],
    foto: u("1559839734-2b71ea197ec2", 800),
    bio: "Doce años haciendo implantes y coronas. Se formó en San Marcos y se especializó en rehabilitación oral en Brasil.",
  },
  {
    id: "andres-salazar",
    nombre: "Dr. Andrés Salazar",
    cargo: "Ortodoncista",
    especialidades: ["ortodoncia", "general"],
    foto: u("1612349317150-e413f6a5b16d", 800),
    bio: "Especialista en alineadores invisibles y ortodoncia para adultos. Atiende también casos complejos.",
  },
  {
    id: "diego-mendoza",
    nombre: "Dr. Diego Mendoza",
    cargo: "Odontopediatra",
    especialidades: ["pediatria", "general"],
    foto: u("1622253692010-333f2da6031d", 800),
    bio: "Convierte la primera visita de los más pequeños en un juego y tiene mucha paciencia con los que llegan asustados.",
  },
];

export type Resena = { nombre: string; tratamiento: string; texto: string; hace: string; estrellas: number; iniciales: string; color: string };

export const RESENAS: Resena[] = [
  {
    nombre: "Rosa Mendoza",
    iniciales: "RM",
    color: "#0f766e",
    tratamiento: "Implantes",
    hace: "hace 2 semanas",
    estrellas: 5,
    texto: "Tenía miedo por experiencias anteriores. La doctora me explicó cada paso con un modelo en la mano y no sentí dolor. Hoy como de todo otra vez.",
  },
  {
    nombre: "Jorge Lozano",
    iniciales: "JL",
    color: "#b45309",
    tratamiento: "Ortodoncia invisible",
    hace: "hace 1 mes",
    estrellas: 5,
    texto: "Agendé desde el celular a las once de la noche y al día siguiente ya tenía mi evaluación. Me dieron el presupuesto por escrito, sin sorpresas.",
  },
  {
    nombre: "Carla Pacaya",
    iniciales: "CP",
    color: "#7c3aed",
    tratamiento: "Odontopediatría",
    hace: "hace 1 mes",
    estrellas: 5,
    texto: "Mi hija de cuatro años salió feliz de su primera cita, con un sticker y sin una lágrima. Ahora pregunta cuándo vuelve al dentista.",
  },
  {
    nombre: "Luis Ramírez",
    iniciales: "LR",
    color: "#1d4ed8",
    tratamiento: "Endodoncia",
    hace: "hace 2 meses",
    estrellas: 4,
    texto: "Llegué con un dolor terrible un sábado y me atendieron ese mismo día. Muy profesionales. La espera fue un poco larga, pero valió la pena.",
  },
];

export const CALIFICACION = { promedio: 4.9, total: 386, distribucion: [92, 6, 1, 1, 0] };

export type Problema = { titulo: string; texto: string; tratamiento: string; icono: string };

export const PROBLEMAS: Problema[] = [
  { titulo: "Me duele una muela", texto: "Dolor que no deja dormir o que aumenta con lo frío y lo caliente.", tratamiento: "endodoncia", icono: "dolor" },
  { titulo: "Se me rompió un diente", texto: "Un golpe, una caída o algo duro que mordiste.", tratamiento: "evaluacion", icono: "roto" },
  { titulo: "Me sangran las encías", texto: "Al cepillarte o al usar hilo dental, aunque no duela.", tratamiento: "evaluacion", icono: "encia" },
  { titulo: "Quiero dientes más blancos", texto: "Manchas de café, té o el paso de los años.", tratamiento: "blanqueamiento", icono: "brillo" },
  { titulo: "Tengo los dientes torcidos", texto: "Para ti o para tus hijos, con brackets o alineadores.", tratamiento: "ortodoncia", icono: "alinear" },
  { titulo: "Me falta una pieza", texto: "Recupera la mordida y la sonrisa con un implante fijo.", tratamiento: "implantes", icono: "implante" },
];

export const PRIMERA_VISITA = [
  { titulo: "Te recibimos sin apuro", texto: "Llegas, te ofrecemos agua y conversamos de lo que te preocupa antes de sentarte en el sillón." },
  { titulo: "Revisión y radiografía digital", texto: "Revisamos boca, encías y mordida. La radiografía sale en segundos en la pantalla." },
  { titulo: "Plan y presupuesto por escrito", texto: "Te mostramos lo que vimos y te damos opciones con precios. Tú decides, sin presión." },
  { titulo: "Si quieres, empezamos ese día", texto: "La limpieza se hace en la misma cita. Lo demás lo agendamos cuando te acomode." },
];

export const HISTORIA = {
  cita: "Atiendo a cada paciente como me gustaría que atendieran a mi mamá.",
  parrafos: [
    "Soy Valeria Ríos y crecí en Pucallpa. Elegí la odontología después de ver a mi abuela dejar de sonreír en las fotos porque le faltaban dientes.",
    "Estudié en San Marcos, me especialicé en rehabilitación oral en Brasil y volví en 2014 para abrir Alba con una idea fija: que ir al dentista deje de dar miedo.",
    "Por eso nuestras citas son largas, te explicamos todo con el modelo en la mano y nunca empezamos un tratamiento sin que sepas cuánto va a costar.",
  ],
};

export const GALERIA = [
  { src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80", alt: "Consultorio principal con sillón dental y luz natural" },
  { src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200&q=80", alt: "Sala de tratamiento con equipos modernos" },
  { src: "https://images.unsplash.com/photo-1609207825181-52d3214556dd?w=1200&q=80", alt: "Especialista preparando el consultorio para un paciente" },
  { src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&q=80", alt: "Sillón dental de la sala de odontopediatría" },
];

export const PREGUNTAS = [
  { q: "¿Atienden con seguro?", a: "Trabajamos con las principales aseguradoras de salud. Trae tu tarjeta y validamos tu cobertura en la recepción." },
  { q: "¿Puedo pagar en cuotas?", a: "Sí. Ortodoncia e implantes se pueden pagar en cuotas mensuales sin intereses, con tarjeta o con Yape." },
  { q: "¿Qué pasa si llego tarde?", a: "Te esperamos hasta 15 minutos. Si no llegas, te escribimos para reprogramar sin costo." },
  { q: "¿Atienden urgencias?", a: "Sí, en horario de atención reservamos espacios para dolor agudo o golpes. Llama y te damos el primero libre." },
];

export const FOTOS = {
  hero: u("1606811841689-23dfddce3e95", 1400),
  familia: u("1609220136736-443140cffec6", 1200),
  sonrisa: u("1595152772835-219674b2a8a6", 1000),
  clinica: u("1629909613654-28e377c37b09", 1600),
  consultorio: u("1598256989800-fe5f95da9787"),
  radiografia: u("1588776814546-1ffcf47267a5"),
  alineadores: u("1609840114035-3c981b782dfe"),
};

export const buscarTratamiento = (id: string) => TRATAMIENTOS.find((t) => t.id === id);
export const doctoresPara = (esp: Especialidad) => DOCTORES.filter((d) => d.especialidades.includes(esp));
