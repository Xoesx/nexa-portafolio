import { z } from "zod";

export const reservaSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es demasiado largo"),
  telefono: z.string().min(6, "El teléfono es obligatorio").max(20, "El teléfono es demasiado largo"),
  personas: z.number().int("Debe ser un número entero").min(1, "Mínimo 1 persona").max(20, "Máximo 20 personas por reserva"),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  hora: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  notas: z.string().max(500).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type ReservaInput = z.infer<typeof reservaSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
