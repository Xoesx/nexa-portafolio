import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CREDITOS } from "./creditos";

// fotos/index.ts importa .webp (no se puede cargar en node): se leen sus ids de Unsplash como texto.
const catalogo = readFileSync(join(__dirname, "../fotos/index.ts"), "utf8");
const fotosRemotas = [...catalogo.matchAll(/unsplash\("(photo-[0-9a-f-]+)"\)/g)].map((m) => m[1]);

describe("CREDITOS", () => {
  it("cada crédito tiene autor y un enlace a su foto en Unsplash", () => {
    for (const credito of CREDITOS) {
      expect(credito.autor.trim()).not.toBe("");
      expect(credito.enlace).toMatch(/^https:\/\/unsplash\.com\/photos\//);
      expect(credito.enlace.endsWith(credito.id)).toBe(true);
      expect(credito.foto).toMatch(/^photo-[0-9a-f-]+$/);
    }
  });

  it("no repite fotos", () => {
    expect(new Set(CREDITOS.map((c) => c.id)).size).toBe(CREDITOS.length);
    expect(new Set(CREDITOS.map((c) => c.foto)).size).toBe(CREDITOS.length);
  });

  it("acredita exactamente las fotos de Unsplash que usa la landing", () => {
    expect(fotosRemotas.length).toBeGreaterThan(0);
    expect(new Set(fotosRemotas).size).toBe(fotosRemotas.length);
    expect([...fotosRemotas].sort()).toEqual(CREDITOS.map((c) => c.foto).sort());
  });
});
