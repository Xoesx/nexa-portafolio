import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import m from "../movimiento.module.css";
import x from "../secciones.module.css";
import { palabraMasLarga } from "./medida";
import { Marco } from "./Marco";

/** Rendimiento: foto a sangre de un lado y tipografía grande del otro, de noche. */
export function Rendimiento({ contenido, foto }: { contenido: Contenido["rendimiento"]; foto: Foto }) {
  return (
    <section className={x.rendimiento} aria-labelledby="titulo-rendimiento">
      <div className={x.rendimientoRejilla}>
        <Marco foto={foto} sizes="(min-width: 56rem) 60vw, 100vw" className={x.rendimientoFoto} movimiento="revelado" />
        <div className={`${x.rendimientoTexto} ${x.columna}`} style={palabraMasLarga(contenido.titulo)}>
          <h2 id="titulo-rendimiento" className={`${x.titulo} ${m.entrada}`}>
            {contenido.titulo}
          </h2>
          <p className={`${x.cuerpo} ${x.cuerpoClaro}`}>{contenido.texto}</p>
        </div>
      </div>
    </section>
  );
}
