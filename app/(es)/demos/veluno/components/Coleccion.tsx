import { AVISOS, CATALOGO, type Articulo, type Contenido } from "../data";
import type { Foto } from "../fotos";
import x from "../secciones.module.css";
import s from "../veluno.module.css";
import { Aviso } from "./Aviso";
import { Marco } from "./Marco";

/*
 * La colección: los cuatro productos de la referencia. SonicWave lleva a su compra; los demás
 * no tienen tienda detrás, así que la tarjeta entera abre un aviso en lugar de fingir un enlace.
 * En el celular la fila se desliza con el dedo (región con nombre, enfocable).
 */
export function Coleccion({
  contenido,
  fotos,
}: {
  contenido: Contenido["coleccion"];
  fotos: Record<Articulo["id"], Foto>;
}) {
  return (
    <section className={x.coleccion} aria-labelledby="titulo-coleccion">
      <div className={`${x.bloque} ${x.cabeza}`}>
        <h2 id="titulo-coleccion" className={x.titulo}>
          {contenido.titulo}
        </h2>
        <p className={x.cuerpo}>{contenido.texto}</p>
      </div>

      <div className={`${x.bloque} ${x.carril}`} role="region" aria-label="Productos de la colección">
        <ul className={x.productos}>
          {CATALOGO.map((articulo) => {
            const precio = `${articulo.desde ? "Desde " : ""}${articulo.precio}`;
            return (
              <li key={articulo.id} className={`${x.producto} ${s.anclaje}`}>
                <Marco foto={fotos[articulo.id]} sizes="(min-width: 64rem) 24vw, (min-width: 48rem) 48vw, 78vw" className={x.productoFoto} />
                <div className={x.productoPie}>
                  <h3 className={x.productoNombre}>{articulo.nombre}</h3>
                  <p className={x.productoPrecio}>
                    {articulo.desde && <span>Desde</span>} {articulo.precio}
                  </p>
                </div>
                {articulo.id === "sonicwave" ? (
                  <a href="#comprar" className={x.productoAccion} aria-label={`${articulo.nombre}, ${precio}. Ir a comprar`} />
                ) : (
                  <>
                    <button
                      type="button"
                      className={`${x.productoAccion} ${s.disparador}`}
                      aria-label={`${articulo.nombre}, ${precio}`}
                      popoverTarget={`aviso-${articulo.id}`}
                    />
                    <Aviso id={`aviso-${articulo.id}`}>{AVISOS.tienda}</Aviso>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
