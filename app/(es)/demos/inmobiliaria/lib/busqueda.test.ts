import { describe, expect, it } from "vitest";
import { ACTIVAS, enSoles, TIPO_DE_CAMBIO } from "../data";
import { buscar, filtrosActivos, filtrosDesdeURL, ordenar } from "./busqueda";
import { cuotaMensual } from "./credito";

const filtros = (q: string) => filtrosDesdeURL(new URLSearchParams(q));

describe("filtrosDesdeURL", () => {
  it("lee los filtros conocidos", () => {
    expect(filtros("op=venta&tipo=casa&distrito=Yarinacocha&dorm=3&max=200000&moneda=USD&orden=precio-asc")).toEqual({
      op: "venta",
      tipo: "casa",
      distrito: "Yarinacocha",
      dorm: 3,
      max: 200000,
      moneda: "USD",
      orden: "precio-asc",
    });
  });

  it("ignora valores inventados en vez de dejar la lista vacía", () => {
    expect(filtros("op=permuta&tipo=castillo&distrito=Lima&dorm=muchos&max=-5&moneda=EUR&orden=azar")).toEqual({
      op: "",
      tipo: "",
      distrito: "",
      dorm: 0,
      max: 0,
      moneda: "PEN",
      orden: "recientes",
    });
  });

  it("cuenta los filtros activos sin contar el orden", () => {
    expect(filtrosActivos(filtros("op=venta&dorm=2&orden=area"))).toBe(2);
    expect(filtrosActivos(filtros(""))).toBe(0);
  });
});

describe("buscar", () => {
  it("sin filtros devuelve todas las propiedades activas", () => {
    expect(buscar(ACTIVAS, filtros(""))).toHaveLength(ACTIVAS.length);
  });

  it("cada resultado cumple todos los filtros", () => {
    const f = filtros("op=venta&distrito=Yarinacocha&dorm=2");
    const r = buscar(ACTIVAS, f);
    expect(r.length).toBeGreaterThan(0);
    for (const p of r) {
      expect(p.operacion).toBe("venta");
      expect(p.distrito).toBe("Yarinacocha");
      expect(p.dormitorios).toBeGreaterThanOrEqual(2);
    }
  });

  it("compara el precio máximo en la moneda elegida", () => {
    const tope = 100000;
    for (const p of buscar(ACTIVAS, filtros(`max=${tope}&moneda=USD`))) expect(enSoles(p)).toBeLessThanOrEqual(tope * TIPO_DE_CAMBIO);
    for (const p of buscar(ACTIVAS, filtros(`max=${tope}&moneda=PEN`))) expect(enSoles(p)).toBeLessThanOrEqual(tope);
  });
});

describe("ordenar", () => {
  it("ordena por precio en soles aunque las monedas se mezclen", () => {
    const precios = ordenar(ACTIVAS, "precio-asc").map(enSoles);
    expect(precios).toEqual([...precios].sort((a, b) => a - b));
  });

  it("no modifica la lista original", () => {
    const antes = ACTIVAS.map((p) => p.id);
    ordenar(ACTIVAS, "area");
    expect(ACTIVAS.map((p) => p.id)).toEqual(antes);
  });
});

describe("cuotaMensual", () => {
  it("con esa cuota la deuda queda en cero justo en el último mes", () => {
    const tem = Math.pow(1.095, 1 / 12) - 1;
    const cuota = cuotaMensual(100000, 9.5, 20);
    let saldo = 100000;
    for (let mes = 0; mes < 240; mes++) saldo = saldo * (1 + tem) - cuota;
    expect(Math.abs(saldo)).toBeLessThan(0.01);
    // US$ 100 000 a 20 años con TEA de 9.5 %
    expect(cuota).toBeCloseTo(906.8, 1);
  });

  it("al final se paga más que el monto prestado, salvo con tasa cero", () => {
    expect(cuotaMensual(50000, 8, 15) * 15 * 12).toBeGreaterThan(50000);
    expect(cuotaMensual(12000, 0, 1)).toBe(1000);
  });

  it("devuelve 0 con montos o plazos imposibles", () => {
    expect(cuotaMensual(0, 9, 20)).toBe(0);
    expect(cuotaMensual(-1, 9, 20)).toBe(0);
    expect(cuotaMensual(1000, 9, 0)).toBe(0);
  });
});
