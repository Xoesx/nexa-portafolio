/**
 * Capa de acceso a datos. En la demo no hay base de datos conectada: el menú sale de `data/menu.ts` y las reservas
 * no se guardan en ningún lado. `db/schema.sql` tiene el diseño para cuando se conecte PostgreSQL.
 */

import type { Plato, Reserva } from "../../types";
import { MENU_COMPLETO } from "../../data/menu";

export async function obtenerPlatos(): Promise<Plato[]> {
  return MENU_COMPLETO.filter((p) => p.disponible !== false);
}

export async function obtenerPlatosPorCategoria(categoria: string): Promise<Plato[]> {
  return MENU_COMPLETO.filter((p) => p.categoria === categoria && p.disponible !== false);
}

/** Arma la reserva con su estado inicial. Con una base de datos, aquí iría el INSERT. */
export async function crearReserva(datos: Omit<Reserva, "id" | "estado" | "creadaEn">): Promise<Reserva> {
  return {
    ...datos,
    id: `r_${crypto.randomUUID()}`,
    estado: "pendiente",
    creadaEn: new Date().toISOString(),
  };
}
