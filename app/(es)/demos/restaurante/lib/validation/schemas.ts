import { z } from "zod";

// Cada campo tiene su mensaje también para cuando falta (sin él, Zod responde en inglés).
export const reservaSchema = z.object({
  nombre: z.string({ error: "Escribe tu nombre." }).trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es demasiado largo"),
  telefono: z.string({ error: "El teléfono es obligatorio" }).trim().min(6, "El teléfono es obligatorio").max(20, "El teléfono es demasiado largo"),
  personas: z
    .number({ error: "Indica cuántas personas vienen" })
    .int("Debe ser un número entero")
    .min(1, "Mínimo 1 persona")
    .max(20, "Máximo 20 personas por reserva"),
  fecha: z.string({ error: "Elige una fecha" }).regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  hora: z.string({ error: "Elige una hora" }).regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  notas: z.string().max(500, "Las notas son demasiado largas").optional(),
});

export const contactoSchema = z.object({
  nombre: z.string({ error: "El nombre es obligatorio" }).trim().min(2, "El nombre es obligatorio").max(100),
  email: z.email({ error: "Correo inválido" }).max(120),
  asunto: z.string({ error: "El asunto es obligatorio" }).trim().min(2, "El asunto es obligatorio").max(120),
  mensaje: z.string({ error: "Escribe tu mensaje" }).trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
  acepto: z.literal(true, { error: "Debes aceptar la política de privacidad" }),
});

export type ReservaInput = z.infer<typeof reservaSchema>;
export type ContactoInput = z.infer<typeof contactoSchema>;
