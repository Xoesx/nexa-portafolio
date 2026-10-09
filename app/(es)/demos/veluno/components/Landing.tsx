import Link from "next/link";
import { CONTENIDO, PIE, type Contenido, type Hero, type Producto } from "../data";
import { FOTOS_LANDING } from "../fotos";
import { CREDITOS } from "../lib/creditos";
import l from "../landing.module.css";
import s from "../veluno.module.css";
import { Cabecera } from "./Cabecera";
import { Ciudad } from "./Ciudad";
import { Coleccion } from "./Coleccion";
import { Compra } from "./Compra";
import { Confort } from "./Confort";
import { Destacado } from "./Destacado";
import { EnDetalle } from "./EnDetalle";
import { Estilo } from "./Estilo";
import { Final } from "./Final";
import { Manifiesto } from "./Manifiesto";
import { Sello } from "./Marca";
import { Recorrido } from "./Recorrido";
import { Rendimiento } from "./Rendimiento";
import { Sonido } from "./Sonido";
import { Valores } from "./Valores";

/**
 * La página completa. El header se monta en su marco de siempre (mismo ancho y misma escala que
 * la versión anterior); el resto ocupa todo el ancho disponible.
 *
 * Orden: portada y cámara → sonido → cualidades → destacado → colección → las tres ideas
 * (manifiesto, confort, estilo) → la ciudad → rendimiento → en detalle → cierre → compra.
 * La compra va al final para que la última llamada no mande hacia arriba.
 */
export function Landing({
  hero,
  producto,
  contenido = CONTENIDO,
}: {
  hero: Hero;
  producto: Producto;
  contenido?: Contenido;
}) {
  const f = FOTOS_LANDING;

  return (
    <>
      <div className={s.marcoCabecera}>
        <Cabecera />
      </div>

      <main className={l.landing}>
        <Recorrido hero={hero} producto={producto} />
        <Sonido fondo={f.sonido} />
        <Valores valores={contenido.valores} />
        <Destacado contenido={contenido.destacado} producto={f.producto} lateral={f.allaDeLoReal} />
        <Coleccion contenido={contenido.coleccion} fotos={{ sonicwave: f.retrato, ...f.coleccion }} />
        <Manifiesto contenido={contenido.manifiesto} fotos={[f.confort, f.estilo[0], f.rendimiento]} />
        <Confort contenido={contenido.confort} foto={f.confort} />
        <Estilo contenido={contenido.estilo} fotos={f.estilo} />
        <Ciudad contenido={contenido.diaADia} ciudad={f.ciudad} fotos={f.dia} />
        <Rendimiento contenido={contenido.rendimiento} foto={f.rendimiento} />
        <EnDetalle contenido={contenido.detalle} fotos={f.detalle} />
        <Final texto={contenido.cierre} foto={f.final} />
        <Compra producto={producto} />
      </main>

      <footer className={l.pie}>
        <div className={l.pieFila}>
          <span className={l.pieMarca}>
            <Sello className={l.pieSello} />
            Veluno
          </span>
          <p>
            {PIE}{" "}
            <Link href="/" className={l.pieEnlace}>
              Volver a NEXA
            </Link>
          </p>
        </div>
        {CREDITOS.length > 0 && (
          <details className={l.pieCreditos}>
            <summary>Créditos de las fotos</summary>
            <p>
              Fotos de{" "}
              {CREDITOS.map((credito, i) => (
                <span key={credito.id}>
                  <a href={credito.enlace} className={l.pieEnlace} rel="noopener noreferrer" target="_blank">
                    {credito.autor}
                  </a>
                  {i < CREDITOS.length - 2 ? ", " : i === CREDITOS.length - 2 ? " y " : ""}
                </span>
              ))}{" "}
              en Unsplash. La foto de la ciudad es del cliente.
            </p>
          </details>
        )}
        {/* La marca a todo el ancho, como cierre de la referencia ampliada: puro dibujo. */}
        <p className={l.pieGigante} aria-hidden="true">
          Veluno
        </p>
      </footer>
    </>
  );
}
