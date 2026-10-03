/**
 * Utilidades de seguridad para validar entradas del usuario.
 */

// Dominios permitidos para imágenes externas
const DOMINIOS_PERMITIDOS = [
  "images.unsplash.com",
  "unsplash.com",
  "i.imgur.com",
  "res.cloudinary.com",
];

/**
 * Valida que una URL sea segura y provenga de un dominio confiable,
 * o que sea base64 (imagen subida por el usuario).
 */
export function esImagenSegura(url: string): boolean {
  if (!url) return false;

  // Aceptar base64 (imagen subida en el dispositivo)
  if (url.startsWith("data:image/jpeg;base64,") ||
      url.startsWith("data:image/png;base64,") ||
      url.startsWith("data:image/webp;base64,")) {
    return true;
  }

  // Validar URL externa
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    return DOMINIOS_PERMITIDOS.some(
      (d) => parsed.hostname === d || parsed.hostname.endsWith(`.${d}`),
    );
  } catch {
    return false;
  }
}

/**
 * Sanitiza texto de entrada: quita tags HTML y caracteres de control.
 */
export function sanitizarTexto(texto: string, maxLength = 500): string {
  if (!texto) return "";
  return texto
    .replace(/<[^>]*>/g, "") // Quitar tags HTML
    .replace(/[<>]/g, "") // Quitar < >
    .replace(/[\u0000-\u001F\u007F]/g, "") // Quitar caracteres de control
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitiza un número de teléfono dejando solo dígitos, +, espacios y guiones.
 */
export function sanitizarTelefono(tel: string): string {
  return tel.replace(/[^\d+\s\-()]/g, "").slice(0, 20);
}
