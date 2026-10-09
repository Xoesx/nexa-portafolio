import { AVISOS, type Contenido } from "../data";
import type { Foto } from "../fotos";
import x from "../secciones.module.css";
import s from "../veluno.module.css";
import { Aviso } from "./Aviso";
import { Marco } from "./Marco";

/*
 * Dos piezas lado a lado, como en la referencia ampliada: una tarjeta grande con SonicWave y una
 * vertical con las gafas VisionTone. La grande lleva a la compra; la vertical solo puede avisar.
 */
export function Destacado({
  contenido,
  producto,
  lateral,
}: {
  contenido: Contenido["destacado"];
  producto: Foto;
  lateral: Foto;
}) {
  return (
    <section className={x.destacado} aria-labelledby="titulo-destacado">
      <div className={`${x.bloque} ${x.bento}`}>
        <article className={x.bentoGrande}>
          <div className={x.bentoTexto}>
            <h2 id="titulo-destacado" className={x.bentoTitulo}>
              {contenido.titulo}
            </h2>
            <p className={x.cuerpo}>{contenido.texto}</p>
            <a href="#comprar" className={x.boton}>
              {contenido.accion}
            </a>
          </div>
          <Marco foto={producto} sizes="(min-width: 56rem) 34vw, 100vw" className={x.bentoFoto} />
        </article>

        <article className={`${x.bentoLateral} ${s.anclaje}`}>
          <Marco foto={lateral} sizes="(min-width: 56rem) 30vw, 100vw" className={x.bentoLateralFoto} />
          <h3 className={x.bentoLateralTitulo}>{contenido.lateral}</h3>
          <button
            type="button"
            className={`${x.flecha} ${s.disparador}`}
            aria-label="Ver VisionTone Smart Glasses"
            popoverTarget="aviso-lateral"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </button>
          <Aviso id="aviso-lateral">{AVISOS.tienda}</Aviso>
        </article>
      </div>
    </section>
  );
}
