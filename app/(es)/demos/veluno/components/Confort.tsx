import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import m from "../movimiento.module.css";
import x from "../secciones.module.css";
import { palabraMasLarga } from "./medida";
import { Marco } from "./Marco";

/** Confort: una foto apaisada grande y el texto al pie, en arena. */
export function Confort({ contenido, foto }: { contenido: Contenido["confort"]; foto: Foto }) {
  return (
    <section className={x.confort} aria-labelledby="titulo-confort">
      <div className={`${x.bloque} ${x.confortRejilla}`}>
        <Marco foto={foto} sizes="(min-width: 56rem) 66vw, 100vw" className={x.confortFoto} movimiento="revelado" paralaje />
        <div className={`${x.confortTexto} ${x.columna}`} style={palabraMasLarga(contenido.titulo)}>
          <h2 id="titulo-confort" className={`${x.titulo} ${m.entrada}`}>
            {contenido.titulo}
          </h2>
          <p className={x.cuerpo}>{contenido.texto}</p>
        </div>
      </div>
    </section>
  );
}
