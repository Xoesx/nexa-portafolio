import { NextResponse } from "next/server";
import { obtenerPlatos } from "../../lib/db/queries";

export async function GET() {
  const platos = await obtenerPlatos();
  return NextResponse.json({ platos });
}
