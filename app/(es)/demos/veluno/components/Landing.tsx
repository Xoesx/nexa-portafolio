import Link from "next/link";
import { PIE, type Hero, type Producto } from "../data";
import l from "../landing.module.css";
import s from "../veluno.module.css";
import { Cabecera } from "./Cabecera";
import { Compra } from "./Compra";
import { Diseno } from "./Diseno";
import { Sello } from "./Marca";
import { Recorrido } from "./Recorrido";
import { Sonido } from "./Sonido";

/**
 * La página completa. El header se monta en su marco de siempre (mismo ancho y misma escala que
 * la versión anterior); el resto ocupa todo el ancho disponible.
 */
export function Landing({ hero, producto }: { hero: Hero; producto: Producto }) {
  return (
    <>
      <div className={s.marcoCabecera}>
        <Cabecera />
      </div>

      <main className={l.landing}>
        <Recorrido hero={hero} producto={producto} />
        <Sonido />
        <Diseno />
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
