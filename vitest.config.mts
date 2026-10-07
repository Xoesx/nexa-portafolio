import { defineConfig } from "vitest/config";

// Pruebas de la lógica pura de las demos (fechas, cálculos, validaciones). La interfaz se revisa en el navegador.
export default defineConfig({
  test: {
    include: ["app/**/*.test.ts"],
    environment: "node",
  },
});
