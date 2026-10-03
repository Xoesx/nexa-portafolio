import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (antes middleware) con rate limiting en memoria.
 * Next.js 16 renombró "middleware" a "proxy".
 */

type Registro = { count: number; reset: number };
const attempts = new Map<string, Registro>();

const LIMITES = {
  api: 30,
  contacto: 5,
  reservas: 10,
} as const;

const VENTANA_MS = 60 * 1000;

function getIP(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function obtenerLimite(pathname: string): number {
  if (pathname.includes("/api/contacto")) return LIMITES.contacto;
  if (pathname.includes("/api/reservations")) return LIMITES.reservas;
  return LIMITES.api;
}

// Next.js 16 espera export "proxy" (no "middleware")
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = getIP(req);
  const ahora = Date.now();

  if (pathname.includes("/api/")) {
    const clave = `${ip}:${pathname.split("/api/")[0]}`;
    const registro = attempts.get(clave);
    const limite = obtenerLimite(pathname);

    if (!registro || ahora > registro.reset) {
      attempts.set(clave, { count: 1, reset: ahora + VENTANA_MS });
    } else {
      registro.count += 1;
      if (registro.count > limite) {
        return new NextResponse(
          JSON.stringify({
            error: "Demasiadas solicitudes. Espera un minuto e intenta de nuevo.",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": "60",
            },
          },
        );
      }
    }

    const metodo = req.method;
    if (!["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].includes(metodo)) {
      return new NextResponse("Método no permitido", { status: 405 });
    }

    if (["POST", "PUT", "PATCH"].includes(metodo)) {
      const contentType = req.headers.get("content-type") ?? "";
      if (
        !contentType.includes("application/json") &&
        !contentType.includes("multipart/form-data")
      ) {
        return new NextResponse(
          JSON.stringify({ error: "Content-Type no permitido" }),
          { status: 415, headers: { "Content-Type": "application/json" } },
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/demos/:path*/api/:path*"],
};
