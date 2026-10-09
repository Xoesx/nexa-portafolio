import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import x from "../secciones.module.css";
import { Marco } from "./Marco";

/** Cierre a pantalla completa antes de la compra: la frase de la marca sobre una foto que se aleja. */
export function Final({ texto, foto }: { texto: Contenido["cierre"]; foto: Foto }) {
  return (
    <section className={x.final} aria-labelledby="titulo-final">
      <Marco foto={foto} sizes="(max-aspect-ratio: 1/1) 150vh, 100vw" className={x.finalFoto} movimiento="alejar" />
      <div className={x.finalVelo} aria-hidden="true" />
      <h2 id="titulo-final" className={x.finalTexto}>
        {texto}
      </h2>
    </section>
  );
}
