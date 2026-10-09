import type { Contenido } from "../data";
import type { Foto } from "../fotos";
import x from "../secciones.module.css";
import { Marco } from "./Marco";

/*
 * Tu día a día: la ciudad al atardecer (foto del cliente, recortada sin anuncios) y tres momentos.
 * Los rótulos no afirman nada del producto: son ánimos, no funciones.
 */
export function Ciudad({
  contenido,
  ciudad,
  fotos,
}: {
  contenido: Contenido["diaADia"];
  ciudad: Foto;
  fotos: readonly [Foto, Foto, Foto];
}) {
  return (
    <section className={x.ciudad} aria-labelledby="titulo-dia">
      <div className={`${x.bloque} ${x.ciudadRejilla}`}>
        <div className={x.ciudadPortada}>
          <Marco foto={ciudad} sizes="(min-width: 56rem) 56vw, 100vw" className={x.ciudadFoto} movimiento="revelado" />
          <div className={x.ciudadVelo} aria-hidden="true" />
          <h2 id="titulo-dia" className={x.ciudadTitulo}>
            {contenido.titulo}
          </h2>
        </div>

        <ol className={x.momentos}>
          {contenido.momentos.map((momento, i) => (
            <li key={momento} className={x.momento}>
              <Marco foto={fotos[i]} sizes="(min-width: 56rem) 16vw, 40vw" className={x.momentoFoto} />
              <p className={x.momentoRotulo}>{momento}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
