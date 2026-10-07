import { NextResponse } from "next/server";
import { erroresPorCampo } from "../../lib/validation/errores";
import { contactoSchema } from "../../lib/validation/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resultado = contactoSchema.safeParse(body);

    if (!resultado.success) return NextResponse.json({ errores: erroresPorCampo(resultado.error.issues) }, { status: 400 });

    // Aquí, en producción, enviarías el correo con Resend, SendGrid o Nodemailer.
    //   import { Resend } from "resend";
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: "web@saborcriollo.pe",
    //     to: "hola@saborcriollo.pe",
    //     subject: `[Web] ${resultado.data.asunto}`,
    //     text: `De: ${resultado.data.nombre} <${resultado.data.email}>\n\n${resultado.data.mensaje}`,
    //   });

    // En la demo el mensaje no se envía ni se guarda en ningún lado, tampoco en los logs del servidor.
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
