import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import x from "../secciones.module.css";
import { palabraMasLarga } from "./medida";
import { Marco } from "./Marco";

const TAMANOS = ["(min-width: 48rem) 42vw, 80vw", "(min-width: 48rem) 33vw, 80vw", "(min-width: 48rem) 25vw, 80vw"];

/*
 * Estilo: tres retratos en un tríptico asimétrico a todo el ancho, cada uno a su velocidad.
 * En el celular la fila se desliza con el dedo; por eso es una región con nombre y enfocable.
 */
export function Estilo({ contenido, fotos }: { contenido: Contenido["estilo"]; fotos: readonly [Foto, Foto, Foto] }) {
  return (
    <section className={x.estilo} aria-labelledby="titulo-estilo">
      <div className={`${x.bloque} ${x.cabeza}`}>
        <div className={x.columna} style={palabraMasLarga(contenido.titulo)}>
          <h2 id="titulo-estilo" className={x.titulo}>
            {contenido.titulo}
          </h2>
        </div>
        <p className={x.cuerpo}>{contenido.texto}</p>
      </div>

      <div className={`${x.bloque} ${x.triptico}`} role="region" aria-label="Fotos de estilo">
        <ul className={x.tripticoLista}>
          {fotos.map((foto, i) => (
            <li key={i} className={x.tripticoFoto}>
              <Marco foto={foto} sizes={TAMANOS[i]} paralaje />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
