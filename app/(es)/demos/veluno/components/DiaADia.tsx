import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import m from "../movimiento.module.css";
import x from "../secciones.module.css";
import { Marco } from "./Marco";

/** Tu día a día: tres momentos en una banda, con una línea que se dibuja al pasar. */
export function DiaADia({ contenido, fotos }: { contenido: Contenido["diaADia"]; fotos: readonly [Foto, Foto, Foto] }) {
  return (
    <section className={x.dia} aria-labelledby="titulo-dia">
      <div className={x.bloque}>
        <h2 id="titulo-dia" className={`${x.titulo} ${x.diaTitulo} ${m.entrada}`}>
          {contenido.titulo}
        </h2>
        <span className={`${x.trazo} ${m.trazo}`} aria-hidden="true" />
        <ol className={x.momentos}>
          {contenido.momentos.map((momento, i) => (
            <li key={momento} className={x.momento}>
              <Marco foto={fotos[i]} sizes="(min-width: 48rem) 33vw, 100vw" />
              <p className={x.momentoRotulo}>
                <span className={x.momentoNumero} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {momento}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
