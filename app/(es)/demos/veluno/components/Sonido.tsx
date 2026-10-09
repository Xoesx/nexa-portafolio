import Image from "next/image";
import { SONIDO } from "../data";
import type { Foto } from "../fotos";
import l from "../landing.module.css";

/*
 * Ondas dibujadas como metáfora, no como datos: una lenta y amplia para los graves, una rápida y
 * fina para los agudos y una compuesta para los tonos ricos. Miden el doble del ancho visible para
 * que el scroll las desplace sin que se vea el final.
 */
const ANCHO = 1200;
const ALTO = 360;

function onda(componentes: { ciclos: number; amplitud: number; fase?: number }[]) {
  const pasos = 480;
  let d = "";
  for (let i = 0; i <= pasos; i++) {
    const x = (i / pasos) * ANCHO * 2;
    const y =
      ALTO / 2 +
      componentes.reduce(
        (suma, { ciclos, amplitud, fase = 0 }) => suma + amplitud * Math.sin((x / ANCHO) * ciclos * Math.PI * 2 + fase),
        0,
      );
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const ONDAS = [
  onda([{ ciclos: 2, amplitud: 118 }]),
  onda([{ ciclos: 13, amplitud: 34, fase: 1.1 }]),
  onda([
    { ciclos: 2, amplitud: 62, fase: 0.6 },
    { ciclos: 5, amplitud: 34, fase: 2 },
    { ciclos: 11, amplitud: 14 },
  ]),
];

export function Sonido({ fondo }: { fondo: Foto }) {
  return (
    <section className={l.sonido} aria-labelledby="titulo-sonido">
      {/* Foto de ambiente casi a oscuras, fija detrás del texto mientras dura el capítulo. */}
      <div className={l.sonidoFondo} aria-hidden="true">
        <div className={l.sonidoCapa}>
          <div className={l.sonidoImagen}>
            <Image
              src={fondo.src}
              alt=""
              fill
              sizes="(max-aspect-ratio: 1/1) 150vh, 100vw"
              placeholder={typeof fondo.src === "string" ? "empty" : "blur"}
              className={l.sonidoFoto}
              style={{ objectPosition: fondo.posicion }}
            />
          </div>
        </div>
      </div>
      <div className={l.sonidoEscenario}>
        <div className={l.sonidoTexto}>
          <h2 id="titulo-sonido" className={l.sonidoTitulo}>
            {SONIDO.titulo}
          </h2>
          <ul className={l.cualidades}>
            {SONIDO.cualidades.map((cualidad) => (
              <li key={cualidad}>{cualidad}</li>
            ))}
          </ul>
        </div>

        <svg className={l.ondas} viewBox={`0 0 ${ANCHO} ${ALTO}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          {ONDAS.map((d, i) => (
            <g key={i} className={l.onda}>
              <path d={d} />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
