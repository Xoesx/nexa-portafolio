import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import x from "../secciones.module.css";
import { Marco } from "./Marco";

/** En detalle: un mosaico de primeros planos, con un rótulo corto para cada uno. */
export function EnDetalle({ contenido, fotos }: { contenido: Contenido["detalle"]; fotos: readonly [Foto, Foto, Foto] }) {
  const tamanos = ["(min-width: 56rem) 56vw, 100vw", "(min-width: 56rem) 38vw, 100vw", "(min-width: 56rem) 38vw, 100vw"];
  return (
    <section className={x.detalle} aria-labelledby="titulo-detalle">
      <div className={`${x.bloque} ${x.cabeza}`}>
        <h2 id="titulo-detalle" className={x.titulo}>
          {contenido.titulo}
        </h2>
        <p className={x.cuerpo}>{contenido.texto}</p>
      </div>
      <ul className={`${x.bloque} ${x.mosaico}`}>
        {fotos.map((foto, i) => (
          <li key={i} className={x.mosaicoPieza}>
            <Marco foto={foto} sizes={tamanos[i]} paralaje={i === 0} />
            <p className={x.mosaicoRotulo}>{contenido.rotulos[i]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
