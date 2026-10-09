import Link from "next/link";
import { CONTENIDO, PIE, type Contenido, type Hero, type Producto } from "../data";
import { FOTOS_LANDING } from "../fotos";
import l from "../landing.module.css";
import s from "../veluno.module.css";
import { Cabecera } from "./Cabecera";
import { Compra } from "./Compra";
import { Confort } from "./Confort";
import { DiaADia } from "./DiaADia";
import { Estilo } from "./Estilo";
import { Final } from "./Final";
import { Manifiesto } from "./Manifiesto";
import { Sello } from "./Marca";
import { Recorrido } from "./Recorrido";
import { Rendimiento } from "./Rendimiento";
import { Sonido } from "./Sonido";

/**
 * La página completa. El header se monta en su marco de siempre (mismo ancho y misma escala que
 * la versión anterior); el resto ocupa todo el ancho disponible.
 *
 * Orden: portada y cámara → sonido → las tres ideas (manifiesto, confort, estilo, rendimiento) →
 * día a día → cierre → compra. La compra va al final para que la última llamada no mande hacia arriba.
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
        <Manifiesto contenido={contenido.manifiesto} fotos={[f.confort, f.estilo[0], f.rendimiento]} />
        <Confort contenido={contenido.confort} foto={f.confort} />
        <Estilo contenido={contenido.estilo} fotos={f.estilo} />
        <Rendimiento contenido={contenido.rendimiento} foto={f.rendimiento} />
        <DiaADia contenido={contenido.diaADia} fotos={f.dia} />
        <Final texto={contenido.cierre} foto={f.final} />
        <Compra producto={producto} />
      </main>

      <footer className={l.pie}>
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
      </footer>
    </>
  );
}
