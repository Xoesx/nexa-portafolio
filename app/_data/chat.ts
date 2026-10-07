import type { Idioma } from "./idioma";

/*
 * Guion del asistente de WhatsApp de ejemplo (Clínica Dental Alba, un demo).
 * Todo son datos de ejemplo, no de un cliente real.
 */

export type Respuesta = { texto: string; opciones: string[] };

type Guion = {
  saludo: string;
  inicio: string[];
  /** Pregunta que el demo hace solo al cargar. */
  automatica: string;
  responder: (pregunta: string) => Respuesta;
};

function crearGuion(g: {
  saludo: string;
  inicio: string[];
  respuestas: Record<string, Respuesta | ((otras: string[]) => Respuesta)>;
  dias: [string, string];
  confirmar: (dia: string, hora: string) => string;
  volver: string;
  derivar: string;
}): Guion {
  return {
    saludo: g.saludo,
    inicio: g.inicio,
    automatica: g.inicio[0],
    responder(pregunta) {
      const otras = g.inicio.filter((o) => o !== pregunta);
      const r = g.respuestas[pregunta];
      if (r) return typeof r === "function" ? r(otras) : r;

      // "Hoy 4:00 p. m." o "Tomorrow 10:00 a.m.": el primer término es el día.
      const dia = g.dias.find((d) => pregunta.startsWith(`${d} `));
      if (dia) return { texto: g.confirmar(dia, pregunta.slice(dia.length + 1)), opciones: [g.volver] };

      return { texto: g.derivar, opciones: g.inicio };
    },
  };
}

const ES = crearGuion({
  saludo: "¡Hola! Soy el asistente de Clínica Dental Alba. ¿En qué te ayudo?",
  inicio: ["¿Qué horario tienen?", "¿Cuánto cuesta una limpieza?", "Quiero una cita", "¿Dónde están?"],
  respuestas: {
    "¿Qué horario tienen?": (otras) => ({
      texto: "Atendemos de lunes a viernes de 9:00 a. m. a 8:00 p. m., y los sábados de 9:00 a. m. a 2:00 p. m.",
      opciones: otras,
    }),
    "¿Cuánto cuesta una limpieza?": (otras) => ({
      texto: "La evaluación con limpieza cuesta S/ 80 e incluye radiografía digital. Dura 45 minutos y puedes pagar con Yape, Plin o tarjeta.",
      opciones: otras,
    }),
    "¿Dónde están?": (otras) => ({
      texto: "Estamos en Jr. Raimondi 355, Pucallpa. Te envío la ubicación en el mapa para que llegues fácil.",
      opciones: otras,
    }),
    "Quiero una cita": { texto: "¡Claro! ¿Para qué día quieres tu cita de evaluación?", opciones: ["Hoy", "Mañana"] },
    Hoy: { texto: "Hoy quedan dos espacios: 4:00 p. m. y 6:30 p. m. ¿Cuál prefieres?", opciones: ["Hoy 4:00 p. m.", "Hoy 6:30 p. m."] },
    Mañana: { texto: "Mañana hay turnos desde las 9:00 a. m. ¿Qué hora te queda mejor?", opciones: ["Mañana 10:00 a. m.", "Mañana 5:00 p. m."] },
    "Volver al inicio": {
      texto: "¡Claro! ¿En qué más te ayudo?",
      opciones: ["¿Qué horario tienen?", "¿Cuánto cuesta una limpieza?", "Quiero una cita", "¿Dónde están?"],
    },
  },
  dias: ["Hoy", "Mañana"],
  confirmar: (dia, hora) =>
    `Listo, tu cita quedó para ${dia.toLowerCase()} a las ${hora} con la Dra. Ríos. Te escribiré por aquí un rato antes para recordártelo.`,
  volver: "Volver al inicio",
  derivar: "Déjame pasarte con una persona de la clínica.",
});

const EN = crearGuion({
  saludo: "Hi! I'm the assistant for Clínica Dental Alba. How can I help?",
  inicio: ["What are your hours?", "How much is a cleaning?", "I'd like an appointment", "Where are you?"],
  respuestas: {
    "What are your hours?": (otras) => ({
      texto: "We're open Monday to Friday from 9:00 a.m. to 8:00 p.m., and on Saturdays from 9:00 a.m. to 2:00 p.m.",
      opciones: otras,
    }),
    "How much is a cleaning?": (otras) => ({
      texto: "A check-up with cleaning costs S/ 80 (about US$ 23) and includes a digital X-ray. It takes 45 minutes and you can pay by card or with Yape or Plin.",
      opciones: otras,
    }),
    "Where are you?": (otras) => ({
      texto: "We're at Jr. Raimondi 355 in Pucallpa. I'll send you the location on the map so it's easy to find us.",
      opciones: otras,
    }),
    "I'd like an appointment": { texto: "Sure! Which day works for your check-up?", opciones: ["Today", "Tomorrow"] },
    Today: { texto: "There are two openings left today: 4:00 p.m. and 6:30 p.m. Which one do you prefer?", opciones: ["Today 4:00 p.m.", "Today 6:30 p.m."] },
    Tomorrow: { texto: "Tomorrow we have openings from 9:00 a.m. What time suits you best?", opciones: ["Tomorrow 10:00 a.m.", "Tomorrow 5:00 p.m."] },
    "Back to the start": {
      texto: "Sure! What else can I help you with?",
      opciones: ["What are your hours?", "How much is a cleaning?", "I'd like an appointment", "Where are you?"],
    },
  },
  dias: ["Today", "Tomorrow"],
  confirmar: (dia, hora) =>
    `Done. Your appointment is booked for ${dia.toLowerCase()} at ${hora} with Dr. Ríos. I'll message you here a little before to remind you.`,
  volver: "Back to the start",
  derivar: "Let me put you in touch with someone from the clinic.",
});

export const GUION: Record<Idioma, Guion> = { es: ES, en: EN };
