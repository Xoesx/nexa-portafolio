import type { Contenido } from "../data";
import m from "../movimiento.module.css";
import x from "../secciones.module.css";
import { Sello } from "./Marca";

/*
 * Banda de cualidades. Se desplaza solo con el scroll (no corre sola), así que no hace falta un
 * botón de pausa; sin soporte o con movimiento reducido es una línea quieta. La segunda copia
 * existe para que la banda no muestre su final y los lectores de pantalla la ignoran.
 */
export function Valores({ valores }: { valores: Contenido["valores"] }) {
  const lista = (oculta: boolean) => (
    <ul className={x.valoresLista} aria-hidden={oculta || undefined}>
      {valores.map((valor) => (
        <li key={valor}>
          <Sello className={x.valoresSello} />
          {valor}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={x.valores} aria-label="Lo que define a Veluno">
      <div className={`${x.valoresPista} ${m.desfile}`}>
        {lista(false)}
        {lista(true)}
      </div>
    </section>
  );
}
