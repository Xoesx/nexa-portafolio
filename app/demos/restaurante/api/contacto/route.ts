import { NextResponse } from "next/server";
import { z } from "zod";

const contactoSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio").max(100),
  email: z.string().email("Correo inválido").max(120),
  asunto: z.string().min(2, "El asunto es obligatorio").max(120),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
  acepto: z.literal(true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resultado = contactoSchema.safeParse(body);

    if (!resultado.success) {
      const errores: Record<string, string> = {};
      resultado.error.issues.forEach((issue) => {
        errores[String(issue.path[0])] = issue.message;
      });
      return NextResponse.json({ errores }, { status: 400 });
    }

    // Aquí, en producción, enviarías el correo con Resend, SendGrid o Nodemailer.
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "web@saborcriollo.pe",
    //     to: "hola@saborcriollo.pe",
    //     subject: `[Web] ${resultado.data.asunto}`,
    //     text: `De: ${resultado.data.nombre} <${resultado.data.email}>\n\n${resultado.data.mensaje}`,
    //   });

    // Para la demo solo registramos en consola y devolvemos éxito.
    console.log("[Contacto]", resultado.data);

    return NextResponse.json(
      { ok: true, mensaje: "Tu mensaje fue enviado. Te responderemos pronto." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { errores: { general: "Error al procesar tu mensaje. Intenta de nuevo." } },
      { status: 500 },
    );
  }
}
