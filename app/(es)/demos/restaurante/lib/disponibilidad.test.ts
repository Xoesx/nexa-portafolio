import { describe, expect, it } from "vitest";
import { idCategoria, MENU_COMPLETO, CATEGORIAS } from "../data/menu";
import { turnosDelDia } from "./disponibilidad";
import { erroresPorCampo } from "./validation/errores";
import { contactoSchema, reservaSchema } from "./validation/schemas";
import { esImagenSegura, sanitizarTexto } from "./utils/seguridad";
import { wa } from "./whatsapp";

// Martes 6 de octubre de 2026
const martes = new Date(2026, 9, 6);
const domingo = new Date(2026, 9, 11);

describe("turnosDelDia", () => {
  it("la última mesa se da una hora antes del cierre", () => {
    const turnos = turnosDelDia(martes, 2, new Date(2026, 9, 1));
    expect(turnos[0].hora).toBe("12:00");
    expect(turnos.at(-1)?.hora).toBe("21:00");
    expect(turnosDelDia(domingo, 2, new Date(2026, 9, 1)).at(-1)?.hora).toBe("16:00");
  });

  it("hoy solo ofrece horarios con al menos media hora de anticipación", () => {
    const turnos = turnosDelDia(martes, 2, new Date(2026, 9, 6, 15, 10));
    expect(turnos[0].hora).toBe("16:00");
  });

  it("los grupos grandes encuentran menos mesas libres", () => {
    let pareja = 0;
    let grupo = 0;
    for (let d = 1; d <= 28; d++) {
      const fecha = new Date(2026, 10, d);
      pareja += turnosDelDia(fecha, 2, new Date(2026, 9, 1)).filter((t) => t.libre).length;
      grupo += turnosDelDia(fecha, 8, new Date(2026, 9, 1)).filter((t) => t.libre).length;
    }
    expect(grupo).toBeLessThan(pareja);
  });
});

describe("reservaSchema", () => {
  const valida = { nombre: "Karina Soto", telefono: "987654321", personas: 4, fecha: "2026-10-10", hora: "13:30" };

  it("acepta una reserva completa", () => {
    expect(reservaSchema.safeParse(valida).success).toBe(true);
  });

  it("devuelve el primer error de cada campo, que es el que ve el cliente", () => {
    const r = reservaSchema.safeParse({ ...valida, nombre: "", personas: 0 });
    expect(r.success).toBe(false);
    if (r.success) return;
    const errores = erroresPorCampo(r.error.issues);
    expect(Object.keys(errores).sort()).toEqual(["nombre", "personas"]);
    expect(errores.nombre).toBe("El nombre debe tener al menos 2 caracteres");
  });

  it("rechaza grupos fuera de rango y formatos de fecha u hora inválidos", () => {
    expect(reservaSchema.safeParse({ ...valida, personas: 0 }).success).toBe(false);
    expect(reservaSchema.safeParse({ ...valida, personas: 2.5 }).success).toBe(false);
    expect(reservaSchema.safeParse({ ...valida, fecha: "10/10/2026" }).success).toBe(false);
    expect(reservaSchema.safeParse({ ...valida, hora: "1:30" }).success).toBe(false);
  });
});

describe("contactoSchema", () => {
  it("responde en español también cuando falta un campo", () => {
    const r = contactoSchema.safeParse({ nombre: "Ana" });
    expect(r.success).toBe(false);
    if (r.success) return;
    expect(erroresPorCampo(r.error.issues)).toEqual({
      email: "Correo inválido",
      asunto: "El asunto es obligatorio",
      mensaje: "Escribe tu mensaje",
      acepto: "Debes aceptar la política de privacidad",
    });
  });
});

describe("seguridad", () => {
  it("solo acepta imágenes de dominios conocidos por https o subidas como base64", () => {
    expect(esImagenSegura("https://images.unsplash.com/photo-1?w=500")).toBe(true);
    expect(esImagenSegura("data:image/png;base64,iVBORw0KGgo=")).toBe(true);
    expect(esImagenSegura("http://images.unsplash.com/photo-1")).toBe(false);
    expect(esImagenSegura("https://unsplash.com.atacante.net/x.png")).toBe(false);
    expect(esImagenSegura("data:image/svg+xml;base64,PHN2Zz4=")).toBe(false);
    expect(esImagenSegura("javascript:alert(1)")).toBe(false);
  });

  it("quita etiquetas HTML y recorta el largo", () => {
    expect(sanitizarTexto("<b>Lomo</b> <script>x</script>saltado")).toBe("Lomo xsaltado");
    expect(sanitizarTexto("a".repeat(600), 100)).toHaveLength(100);
  });
});

describe("carta", () => {
  it("cada plato está en una categoría conocida y tiene un id único", () => {
    const ids = MENU_COMPLETO.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of MENU_COMPLETO) expect(CATEGORIAS as readonly string[]).toContain(p.categoria);
  });

  it("las anclas de categoría no llevan tildes ni espacios", () => {
    expect(idCategoria("De la selva")).toBe("de-la-selva");
    expect(idCategoria("Café y té")).toBe("cafe-y-te");
  });
});

describe("wa", () => {
  it("arma el enlace de WhatsApp con el mensaje codificado", () => {
    expect(wa("Hola, mesa para 2 & niños")).toBe("https://wa.me/51918641720?text=Hola%2C%20mesa%20para%202%20%26%20ni%C3%B1os");
  });
});
