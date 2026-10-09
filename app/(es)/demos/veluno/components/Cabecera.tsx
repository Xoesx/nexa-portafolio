import Image from "next/image";
import Link from "next/link";
import { AVISOS, FOTOS, NAVEGACION } from "../data";
import s from "../veluno.module.css";
import { Aviso } from "./Aviso";
import { Buscador } from "./Buscador";
import { IconoCarrito, IconoCorazon, IconoMenu } from "./Iconos";
import { Marca } from "./Marca";

const [INICIO, ...OTRAS_PAGINAS] = NAVEGACION;

/** Enlaces de la portada. Solo "Inicio" existe; el resto avisa en lugar de llevar a un 404. */
function Enlaces({ aviso, clase }: { aviso: string; clase: string }) {
  return (
    <ul className={`${clase} ${s.disparador}`}>
      <li>
        <Link href="/demos/veluno" aria-current="page">
          {INICIO}
        </Link>
      </li>
      {OTRAS_PAGINAS.map((pagina) => (
        <li key={pagina}>
          <button type="button" popoverTarget={aviso}>
            {pagina}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Cabecera() {
  return (
    <header className={s.cabecera}>
      <Marca className={s.marca} selloClassName={s.sello} />

      <nav aria-label="Principal" className={`${s.nav} ${s.anclaje}`}>
        <Enlaces aviso="aviso-paginas" clase={s.enlaces} />
        <Aviso id="aviso-paginas">{AVISOS.paginas}</Aviso>
      </nav>

      <div className={s.acciones}>
        <Buscador id="buscar" className={s.soloAncho} />

        <div className={`${s.anclaje} ${s.soloAncho}`}>
          <button type="button" className={`${s.disco} ${s.disparador}`} aria-label="Favoritos" popoverTarget="aviso-favoritos">
            <IconoCorazon className={s.discoIcono} />
          </button>
          <Aviso id="aviso-favoritos">{AVISOS.favoritos}</Aviso>
        </div>

        <div className={s.anclaje}>
          <button type="button" className={`${s.disco} ${s.disparador}`} aria-label="Carrito" popoverTarget="aviso-carrito">
            <IconoCarrito className={s.discoIcono} />
          </button>
          <Aviso id="aviso-carrito">{AVISOS.carrito}</Aviso>
        </div>

        <div className={s.anclaje}>
          <button type="button" className={`${s.avatar} ${s.disparador}`} aria-label="Perfil" popoverTarget="aviso-perfil">
            <Image src={FOTOS.avatar.src} alt={FOTOS.avatar.alt} width={FOTOS.avatar.width} height={FOTOS.avatar.height} sizes="48px" />
          </button>
          <Aviso id="aviso-perfil">{AVISOS.perfil}</Aviso>
        </div>

        <button
          type="button"
          className={`${s.disco} ${s.soloCompacto}`}
          aria-label="Menú"
          popoverTarget="menu-veluno"
        >
          <IconoMenu className={`${s.discoIcono} ${s.iconoMenu}`} />
        </button>
      </div>

      {/* Menú del celular: la misma navegación, el buscador y favoritos en una hoja bajo la cabecera. */}
      <div id="menu-veluno" popover="auto" className={s.menu}>
        <Buscador id="buscar-menu" />
        <nav aria-label="Principal" className={s.anclaje}>
          <Enlaces aviso="aviso-paginas-menu" clase={s.menuEnlaces} />
          <Aviso id="aviso-paginas-menu">{AVISOS.paginas}</Aviso>
        </nav>
        <div className={s.anclaje}>
          <button type="button" className={`${s.menuFila} ${s.disparador}`} popoverTarget="aviso-favoritos-menu">
            <IconoCorazon className={s.discoIcono} />
            Favoritos
          </button>
          <Aviso id="aviso-favoritos-menu">{AVISOS.favoritos}</Aviso>
        </div>
      </div>
    </header>
  );
}
