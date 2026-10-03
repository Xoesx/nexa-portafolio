/**
 * Capa de acceso a datos (compatibilidad con el patrón de API).
 * Devuelve los datos del menú desde la fuente central.
 */

import type { Plato, Reserva } from "../../types";
import { MENU_COMPLETO } from "../../data/menu";

const RESERVAS: Reserva[] = [];

export async function obtenerPlatos(): Promise<Plato[]> {
  return MENU_COMPLETO.filter((p) => p.disponible !== false);
}

export async function obtenerPlatosPorCategoria(categoria: string): Promise<Plato[]> {
  return MENU_COMPLETO.filter(
    (p) => p.categoria === categoria && p.disponible !== false,
  );
}

export async function crearReserva(
  datos: Omit<Reserva, "id" | "estado" | "creadaEn">,
): Promise<Reserva> {
  const nueva: Reserva = {
    ...datos,
    id: `r_${Date.now()}`,
    estado: "pendiente",
    creadaEn: new Date().toISOString(),
  };
  RESERVAS.push(nueva);
  return nueva;
}

export async function obtenerReservas(): Promise<Reserva[]> {
  return RESERVAS;
}
