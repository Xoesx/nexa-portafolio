import { describe, expect, it } from "vitest";
import { edadAlCorte, gradoSegunNacimiento, motivoSinGrado, rangoNacimiento } from "./grado";

describe("edadAlCorte", () => {
  it("cuenta la edad cumplida al 31 de marzo del año escolar", () => {
    expect(edadAlCorte("2020-03-31", 2027)).toBe(7);
    expect(edadAlCorte("2020-04-01", 2027)).toBe(6);
    expect(edadAlCorte("2020-01-15", 2027)).toBe(7);
    expect(edadAlCorte("2020-12-31", 2027)).toBe(6);
  });

  it("rechaza fechas mal escritas o que no existen", () => {
    expect(edadAlCorte("", 2027)).toBeNull();
    expect(edadAlCorte("2020-2-3", 2027)).toBeNull();
    expect(edadAlCorte("15/03/2020", 2027)).toBeNull();
    expect(edadAlCorte("2021-02-29", 2027)).toBeNull();
    expect(edadAlCorte("2020-13-01", 2027)).toBeNull();
  });

  it("acepta el 29 de febrero de un año bisiesto", () => {
    expect(edadAlCorte("2020-02-29", 2027)).toBe(7);
  });
});

describe("gradoSegunNacimiento", () => {
  it("ubica cada edad en su nivel y grado", () => {
    expect(gradoSegunNacimiento("2023-06-10", 2027)).toEqual({ grado: "Inicial 3 años", nivel: "inicial" });
    expect(gradoSegunNacimiento("2021-02-01", 2027)).toEqual({ grado: "1.° de primaria", nivel: "primaria" });
    expect(gradoSegunNacimiento("2015-09-20", 2027)).toEqual({ grado: "6.° de primaria", nivel: "primaria" });
    expect(gradoSegunNacimiento("2014-11-02", 2027)).toEqual({ grado: "1.° de secundaria", nivel: "secundaria" });
    expect(gradoSegunNacimiento("2010-05-05", 2027)).toEqual({ grado: "5.° de secundaria", nivel: "secundaria" });
  });

  it("devuelve null si todavía no le toca o ya terminó el colegio", () => {
    expect(gradoSegunNacimiento("2024-04-01", 2027)).toBeNull();
    expect(gradoSegunNacimiento("2010-03-31", 2027)).toBeNull();
  });
});

describe("rangoNacimiento", () => {
  it("sus extremos son el último y el primer grado, y un día afuera ya no entra", () => {
    const { min, max } = rangoNacimiento(2027);
    expect(gradoSegunNacimiento(min, 2027)?.grado).toBe("5.° de secundaria");
    expect(gradoSegunNacimiento(max, 2027)?.grado).toBe("Inicial 3 años");
    expect(gradoSegunNacimiento("2010-03-31", 2027)).toBeNull();
    expect(gradoSegunNacimiento("2024-04-01", 2027)).toBeNull();
  });
});

describe("motivoSinGrado", () => {
  it("explica el caso concreto", () => {
    expect(motivoSinGrado("2025-01-01", 2027)).toContain("todavía no le toca");
    expect(motivoSinGrado("2005-01-01", 2027)).toContain("ya no le corresponde");
    expect(motivoSinGrado("no es fecha", 2027)).toBe("Revisa la fecha de nacimiento.");
  });
});
