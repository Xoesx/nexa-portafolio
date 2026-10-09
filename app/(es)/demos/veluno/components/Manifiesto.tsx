import Image from "next/image";
import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import m from "../movimiento.module.css";
import x from "../secciones.module.css";
import { palabraMasLarga } from "./medida";

/** Las tres ideas de la marca a todo el ancho, cada una con una miniatura dentro de la línea. */
export function Manifiesto({ contenido, fotos }: { contenido: Contenido["manifiesto"]; fotos: readonly [Foto, Foto, Foto] }) {
  return (
    <section className={x.manifiesto} aria-labelledby="titulo-manifiesto">
      <div className={`${x.bloque} ${x.manifiestoBloque}`}>
        <h2 id="titulo-manifiesto" className={x.manifiestoLinea} style={palabraMasLarga(contenido.palabras)}>
          {contenido.palabras.map((palabra, i) => (
            <span key={palabra} className={`${x.palabra} ${m.palabra}`}>
              <span className={`${x.miniatura} ${m.miniatura}`} aria-hidden="true">
                <Image
                  src={fotos[i].src}
                  alt=""
                  fill
                  sizes="14rem"
                  placeholder={typeof fotos[i].src === "string" ? "empty" : "blur"}
                  className={x.foto}
                  style={{ objectPosition: fotos[i].posicion }}
                />
              </span>
              {palabra}
            </span>
          ))}
        </h2>
        <p className={`${x.cuerpo} ${x.manifiestoTexto}`}>{contenido.texto}</p>
      </div>
    </section>
  );
}
