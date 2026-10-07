/**
 * Utilidades para trabajar con imágenes subidas desde el dispositivo.
 *
 * El flujo es:
 *   1. El usuario elige un archivo (JPG, PNG, WebP)
 *   2. Validamos tipo y tamaño
 *   3. Comprimimos con Canvas: máx 1200px, JPEG 80% de calidad
 *   4. Devolvemos base64 listo para guardar
 *
 * En producción real, esta función subiría la imagen a Cloudinary o Vercel Blob
 * y devolvería la URL pública en lugar de base64.
 */

const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const TAMANO_MAXIMO_MB = 3;
const MAX_DIMENSION = 1200;
const CALIDAD_JPEG = 0.8;

export type ResultadoImagen =
  | { ok: true; base64: string; pesoFinal: number }
  | { ok: false; error: string };

export async function procesarImagen(file: File): Promise<ResultadoImagen> {
  // 1. Validar tipo
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return {
      ok: false,
      error: "Formato no permitido. Usa JPG, PNG o WebP.",
    };
  }

  // 2. Validar tamaño
  const pesoMB = file.size / (1024 * 1024);
  if (pesoMB > TAMANO_MAXIMO_MB) {
    return {
      ok: false,
      error: `La imagen pesa ${pesoMB.toFixed(1)} MB. Máximo permitido: ${TAMANO_MAXIMO_MB} MB.`,
    };
  }

  // 3. Cargar en un <img> para procesar
  const dataUrlOriginal = await leerComoDataURL(file);
  const img = await cargarImagen(dataUrlOriginal);

  // 4. Calcular nuevas dimensiones respetando proporción
  let { width, height } = img;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_DIMENSION) / width);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width * MAX_DIMENSION) / height);
      height = MAX_DIMENSION;
    }
  }

  // 5. Dibujar en canvas y exportar como JPEG comprimido
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { ok: false, error: "No se pudo procesar la imagen." };
  }
  ctx.drawImage(img, 0, 0, width, height);

  const base64 = canvas.toDataURL("image/jpeg", CALIDAD_JPEG);

  // 6. Calcular peso final aproximado
  const pesoFinal = Math.round((base64.length * 3) / 4);
  return { ok: true, base64, pesoFinal };
}

function leerComoDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.readAsDataURL(file);
  });
}

function cargarImagen(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
    img.src = src;
  });
}

/**
 * Convierte bytes a string legible ("450 KB", "1.2 MB").
 */
export function pesoLegible(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
