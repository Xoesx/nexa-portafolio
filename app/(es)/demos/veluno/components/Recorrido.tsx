import Image from "next/image";
import { FOTOS, RECORRIDO, type Hero, type Producto } from "../data";
import { FOTOS_LANDING } from "../fotos";
import l from "../landing.module.css";
import s from "../veluno.module.css";
import { CapaPortada } from "./CapaPortada";

/**
 * Primer capítulo: la portada y la "cámara" que se acerca al auricular.
 * El escenario queda fijo mientras se hace scroll; el marco de la foto se abre hasta llenar la
 * pantalla y la imagen avanza hacia el auricular (CSS scroll-driven animations, ver landing.module.css).
 * Sin soporte o con movimiento reducido es una portada normal, sin pasos intermedios.
 */
export function Recorrido({ hero, producto }: { hero: Hero; producto: Producto }) {
  const destino = "#comprar";

  return (
    <section className={l.viaje} aria-labelledby="titulo-portada">
      <div className={l.escenario}>
        <div className={l.ventana}>
          {/* Con object-fit: cover, en pantallas más altas que 16:9 la foto se pinta a lo ancho de
              su alto (≈ 1.78 × alto), no del viewport: así el móvil no recibe una versión pequeña. */}
          <Image
            src={FOTOS.hero.src}
            alt={FOTOS.hero.alt}
            fill
            preload
            sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
            className={l.camara}
          />
          <div className={l.velo} aria-hidden="true" />
          <div className={l.penumbra} aria-hidden="true" />
        </div>

        <CapaPortada className={l.portada}>
          <div className={l.copia}>
            <h1 id="titulo-portada" className={l.titulo}>
              <span>{hero.titulo[0]}</span> <span>{hero.titulo[1]}</span>
            </h1>
            <p className={l.descripcion}>
              {hero.descripcion[0]} <span className={s.sinCorte}>{hero.descripcion[1]}</span>
            </p>
            <a href={destino} className={l.accion}>
              {hero.accion}
            </a>
          </div>

          <a href={destino} className={l.ficha} aria-label={`${producto.nombre}, ${producto.precio}. Ir a comprar`}>
            <Image
              src={FOTOS_LANDING.retrato.imagen}
              alt=""
              sizes="128px"
              placeholder="blur"
              className={l.fichaFoto}
              style={{ objectPosition: FOTOS_LANDING.retrato.posicion }}
            />
            <span className={l.fichaTexto}>
              <span className={l.fichaNombre}>{producto.nombre}</span>
              <span className={l.fichaDetalle}>
                {producto.descripcion[0]} <span className={s.sinCorte}>{producto.descripcion[1]}</span>
              </span>
              <span className={l.fichaPrecio}>{producto.precio}</span>
            </span>
          </a>

          {/* Después del texto para que el título se lea primero; queda encima del auricular de la foto. */}
          <a href={destino} className={l.punto} aria-label={`Ver ${producto.nombre}, los auriculares de la foto`} />
        </CapaPortada>

        {/* Pasos de la cámara: solo existen cuando hay recorrido (ver landing.module.css). */}
        <p className={l.lema}>
          {RECORRIDO.lema}
        </p>
        <p className={l.cierre}>
          {RECORRIDO.cierre}
        </p>
      </div>
    </section>
  );
}
