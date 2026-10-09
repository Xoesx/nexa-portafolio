import Image from "next/image";
import { FOTOS, type Hero, type Producto } from "../data";
import s from "../veluno.module.css";
import { Cabecera } from "./Cabecera";

/** La portada completa. Recibe los textos por props para poder probarla con otros datos. */
export function Portada({ hero, producto }: { hero: Hero; producto: Producto }) {
  const destino = `#${producto.id}`;

  return (
    <div className={s.tarjeta}>
      <Cabecera />

      <main className={s.hero}>
        <div className={s.lienzo}>
          <Image
            src={FOTOS.hero.src}
            alt={FOTOS.hero.alt}
            fill
            preload
            sizes="(min-width: 1500px) 1360px, (min-width: 640px) 92vw, 100vw"
            className={s.foto}
          />
          <div className={s.velo} aria-hidden="true" />
        </div>

        <div className={s.copia}>
          <h1 className={s.titulo}>
            <span>{hero.titulo[0]}</span> <span>{hero.titulo[1]}</span>
          </h1>
          <p className={s.descripcion}>
            {hero.descripcion[0]} <span className={s.sinCorte}>{hero.descripcion[1]}</span>
          </p>
          <a href={destino} className={s.accion}>
            {hero.accion}
          </a>
        </div>

        {/* Va después del texto para que el título se lea primero; se coloca sobre los auriculares de la foto. */}
        <a href={destino} className={s.punto} aria-label={`Ver ${producto.nombre}, los auriculares de la foto`} />

        <div className={s.indicadores} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} />
          ))}
        </div>

        <article id={producto.id} className={s.producto} tabIndex={-1} aria-labelledby={`${producto.id}-nombre`}>
          <Image
            src={FOTOS.producto.src}
            alt={FOTOS.producto.alt}
            width={FOTOS.producto.width}
            height={FOTOS.producto.height}
            sizes="(min-width: 896px) 152px, 104px"
            className={s.productoFoto}
          />
          <div className={s.productoTexto}>
            <h2 id={`${producto.id}-nombre`} className={s.productoNombre}>
              {producto.nombre}
            </h2>
            <p className={s.productoDetalle}>
              {producto.descripcion[0]} <span className={s.sinCorte}>{producto.descripcion[1]}</span>
            </p>
            <p className={s.precio}>
              <span className={s.oculto}>Precio: </span>
              {producto.precio}
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
