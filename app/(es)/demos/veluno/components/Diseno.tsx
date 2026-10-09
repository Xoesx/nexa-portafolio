import Image from "next/image";
import { DISENO, FOTOS } from "../data";
import l from "../landing.module.css";

/** Capítulo editorial: la foto completa del producto y un primer plano del auricular. */
export function Diseno() {
  return (
    <section className={l.diseno} aria-labelledby="titulo-diseno">
      <div className={l.disenoRejilla}>
        <figure className={l.disenoFoto}>
          <Image
            src={FOTOS.productoCompleto.src}
            alt={FOTOS.productoCompleto.alt}
            width={FOTOS.productoCompleto.width}
            height={FOTOS.productoCompleto.height}
            sizes="(min-width: 56rem) 55vw, 100vw"
          />
        </figure>

        <div className={l.disenoTexto}>
          <h2 id="titulo-diseno" className={l.seccionTitulo}>
            {DISENO.titulo}
          </h2>
          <p className={l.seccionCuerpo}>{DISENO.texto}</p>
          <figure className={l.disenoDetalle}>
            <Image
              src={FOTOS.auricular.src}
              alt={FOTOS.auricular.alt}
              width={FOTOS.auricular.width}
              height={FOTOS.auricular.height}
              sizes="20rem"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
