import Image from "next/image";
import type { Foto } from "../fotos";
import m from "../movimiento.module.css";
import x from "../secciones.module.css";

type Movimiento = "revelado" | "escala" | "alejar" | "ninguno";

/**
 * Una foto en su marco. Tres capas para que los efectos no se pisen: el marco recorta (y puede
 * revelarse con clip-path), la capa se desplaza con el scroll (propiedad translate) y la imagen
 * se asienta (propiedad scale).
 */
export function Marco({
  foto,
  sizes,
  className,
  movimiento = "ninguno",
  paralaje = false,
  eager = false,
}: {
  foto: Foto;
  sizes: string;
  className?: string;
  movimiento?: Movimiento;
  paralaje?: boolean;
  eager?: boolean;
}) {
  const marco = [x.marco, movimiento !== "ninguno" && m[movimiento], className].filter(Boolean).join(" ");
  const capa = [x.capa, paralaje && m.paralaje].filter(Boolean).join(" ");

  // Las fotos propias traen su desenfoque de carga; las de Unsplash, su color dominante de fondo.
  const remota = typeof foto.src === "string";

  return (
    <figure className={marco} style={foto.color ? ({ "--color-foto": foto.color } as React.CSSProperties) : undefined}>
      <div className={capa}>
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes={sizes}
          placeholder={remota ? "empty" : "blur"}
          loading={eager ? "eager" : undefined}
          className={x.foto}
          style={{ objectPosition: foto.posicion }}
        />
      </div>
    </figure>
  );
}
