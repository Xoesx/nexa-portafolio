import Image from "next/image";
import { AVISOS, type Producto } from "../data";
import { FOTOS_LANDING } from "../fotos";
import l from "../landing.module.css";
import m from "../movimiento.module.css";
import s from "../veluno.module.css";
import { Aviso } from "./Aviso";

/**
 * Cierre: el producto con su precio y el botón de compra. La demo no tiene tienda,
 * así que el botón lo dice en un aviso en lugar de fingir una compra.
 */
export function Compra({ producto }: { producto: Producto }) {
  return (
    <section id="comprar" className={l.compra} aria-labelledby="titulo-compra">
      <div className={l.compraRejilla}>
        <figure className={`${l.compraFoto} ${m.revelado}`}>
          <Image
            src={FOTOS_LANDING.producto.src}
            alt={FOTOS_LANDING.producto.alt}
            sizes="(min-width: 56rem) 50vw, 100vw"
            placeholder="blur"
            style={{ objectPosition: FOTOS_LANDING.producto.posicion }}
          />
        </figure>

        <div className={l.compraTexto}>
          <h2 id="titulo-compra" className={l.compraNombre}>
            {producto.nombre}
          </h2>
          <p className={l.seccionCuerpo}>
            {producto.descripcion[0]} <span className={s.sinCorte}>{producto.descripcion[1]}</span>
          </p>
          <p className={l.compraPrecio}>
            <span className={s.oculto}>Precio: </span>
            {producto.precio}
          </p>
          <div className={s.anclaje}>
            <button type="button" className={`${l.compraBoton} ${s.disparador}`} popoverTarget="aviso-compra">
              Comprar ahora
            </button>
            <Aviso id="aviso-compra">{AVISOS.compra}</Aviso>
          </div>
        </div>
      </div>
    </section>
  );
}
