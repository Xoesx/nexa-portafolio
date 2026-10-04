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
    { dias: "Lunes a viernes", horas: "9:00 – 20:00" },
    { dias: "Sábado", horas: "9:00 – 14:00" },
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
    bio: "Doce años devolviendo sonrisas con implantes y coronas. Formada en la UNMSM con especialidad en Brasil.",
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
    bio: "Hace que la primera visita de los más pequeños sea un juego. Paciencia infinita, cero miedo.",
  },
];

export const TESTIMONIOS = [
  { nombre: "Rosa M.", tratamiento: "Implantes", texto: "Tenía miedo por experiencias anteriores. Aquí me explicaron cada paso y no sentí dolor." },
  { nombre: "Jorge L.", tratamiento: "Ortodoncia invisible", texto: "Agendé desde el celular a las once de la noche y al día siguiente ya tenía mi evaluación." },
  { nombre: "Carla P.", tratamiento: "Odontopediatría", texto: "Mi hija salió feliz de su primera cita. Ahora pregunta cuándo vuelve." },
];

export const PREGUNTAS = [
  { q: "¿Atienden con seguro?", a: "Trabajamos con las principales aseguradoras de salud. Trae tu tarjeta y validamos tu cobertura en la recepción." },
  { q: "¿Puedo pagar en cuotas?", a: "Sí. Ortodoncia e implantes se pueden pagar en cuotas mensuales sin intereses, con tarjeta o con Yape." },
  { q: "¿Qué pasa si llego tarde?", a: "Te esperamos hasta 15 minutos. Si no llegas, te escribimos para reprogramar sin costo." },
  { q: "¿Atienden urgencias?", a: "Sí, en horario de atención reservamos espacios para dolor agudo o golpes. Llama y te damos el primero libre." },
];

export const FOTOS = {
  hero: u("1629909613654-28e377c37b09", 1600),
  consultorio: u("1598256989800-fe5f95da9787"),
  radiografia: u("1588776814546-1ffcf47267a5"),
  alineadores: u("1609840114035-3c981b782dfe"),
};

export const buscarTratamiento = (id: string) => TRATAMIENTOS.find((t) => t.id === id);
export const doctoresPara = (esp: Especialidad) => DOCTORES.filter((d) => d.especialidades.includes(esp));
