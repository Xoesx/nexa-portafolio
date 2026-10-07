import { NextResponse } from "next/server";
import { reservaSchema } from "../../lib/validation/schemas";
import { crearReserva } from "../../lib/db/queries";
import { erroresPorCampo } from "../../lib/validation/errores";

// Solo POST. Listar reservas expondría nombres y teléfonos: eso le corresponde al panel, detrás de un inicio de sesión.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ errores: { general: "La solicitud no es un JSON válido." } }, { status: 400 });
  }

  const resultado = reservaSchema.safeParse(body);
  if (!resultado.success) return NextResponse.json({ errores: erroresPorCampo(resultado.error.issues) }, { status: 400 });

  try {
    const reserva = await crearReserva(resultado.data);
    return NextResponse.json({ ok: true, reserva }, { status: 201 });
  } catch {
    return NextResponse.json({ errores: { general: "No pudimos registrar la reserva. Intenta de nuevo." } }, { status: 500 });
  }
}
