import { DISTRITOS, enSoles, TIPO_DE_CAMBIO, TIPOS, type Moneda, type Operacion, type Propiedad, type Tipo } from "../data";

export const ORDENES = {
  recientes: "Más recientes",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  area: "Mayor área",
} as const;
export type Orden = keyof typeof ORDENES;

export type Filtros = {
  op: Operacion | "";
  tipo: Tipo | "";
  distrito: string;
  dorm: number;
  max: number;
  moneda: Moneda;
  orden: Orden;
};

const entero = (valor: string | null) => {
  const n = Number(valor);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
};

/**
 * Los filtros viven en la URL para que una búsqueda se pueda compartir. Un valor que no existe (un enlace viejo o
 * escrito a mano) se ignora en lugar de dejar la lista vacía.
 */
export function filtrosDesdeURL(params: URLSearchParams): Filtros {
  const op = params.get("op");
  const tipo = params.get("tipo");
  const distrito = params.get("distrito") ?? "";
  const orden = params.get("orden");
  return {
    op: op === "venta" || op === "alquiler" ? op : "",
    tipo: tipo && tipo in TIPOS ? (tipo as Tipo) : "",
    distrito: (DISTRITOS as readonly string[]).includes(distrito) ? distrito : "",
    dorm: entero(params.get("dorm")),
    max: entero(params.get("max")),
    moneda: params.get("moneda") === "USD" ? "USD" : "PEN",
    orden: orden && orden in ORDENES ? (orden as Orden) : "recientes",
  };
}

/** Cuántos filtros están activos (el orden no cuenta), para el contador del botón en el celular. */
export const filtrosActivos = (f: Filtros) => [f.op, f.tipo, f.distrito, f.dorm, f.max].filter(Boolean).length;

/** Para comparar precios en soles y dólares, todo se lleva a soles con el tipo de cambio referencial. */
export function ordenar(lista: Propiedad[], orden: Orden) {
  const copia = [...lista];
  switch (orden) {
    case "precio-asc":
      return copia.sort((a, b) => enSoles(a) - enSoles(b));
    case "precio-desc":
      return copia.sort((a, b) => enSoles(b) - enSoles(a));
    case "area":
      return copia.sort((a, b) => b.area - a.area);
    default:
      return copia.sort((a, b) => Number(!!b.nueva) - Number(!!a.nueva) || Number(b.codigo) - Number(a.codigo));
  }
}

export function buscar(lista: Propiedad[], f: Filtros): Propiedad[] {
  const topeEnSoles = f.max ? f.max * (f.moneda === "USD" ? TIPO_DE_CAMBIO : 1) : Infinity;
  return ordenar(
    lista.filter(
      (p) =>
        (!f.op || p.operacion === f.op) &&
        (!f.tipo || p.tipo === f.tipo) &&
        (!f.distrito || p.distrito === f.distrito) &&
        p.dormitorios >= f.dorm &&
        enSoles(p) <= topeEnSoles,
    ),
    f.orden,
  );
}
