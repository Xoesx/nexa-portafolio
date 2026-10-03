import { NextResponse } from "next/server";
import { reservaSchema } from "../../lib/validation/schemas";
import { crearReserva, obtenerReservas } from "../../lib/db/queries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resultado = reservaSchema.safeParse(body);

    if (!resultado.success) {
      const errores: Record<string, string> = {};
      resultado.error.issues.forEach((issue) => {
        errores[String(issue.path[0])] = issue.message;
      });
      return NextResponse.json({ errores }, { status: 400 });
    }

    const reserva = await crearReserva(resultado.data);
    return NextResponse.json({ ok: true, reserva }, { status: 201 });
  } catch {
    return NextResponse.json(
      { errores: { general: "Error interno del servidor" } },
      { status: 500 },
    );
  }
}

export async function GET() {
  const reservas = await obtenerReservas();
  return NextResponse.json({ reservas });
}
