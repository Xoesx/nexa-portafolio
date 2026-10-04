import Image from "next/image";
import { SITIO } from "../_data/sitio";

const dominio = new URL(SITIO.url).host;

type Props = {
  src: string;
  alt: string;
  sizes: string;
  /** Ruta que se muestra en la barra de direcciones. */
  ruta?: string;
  prioridad?: boolean;
  className?: string;
};

/** Captura de escritorio dentro de una ventana de navegador mínima. */
export function MarcoNavegador({ src, alt, sizes, ruta = "", prioridad = false, className = "" }: Props) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-tinta/15 bg-white shadow-[0_24px_60px_-30px_rgb(19_32_30/0.45)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-tinta/10 bg-papel-hondo px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-tinta/20" />
          <span className="h-2 w-2 rounded-full bg-tinta/20" />
        </span>
        <span className="truncate rounded-md bg-white/70 px-2.5 py-0.5 text-xs text-tinta/70">
          {dominio}
          {ruta}
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill priority={prioridad} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}

/** Captura de celular con bisel oscuro. */
export function MarcoCelular({ src, alt, sizes, prioridad = false, className = "" }: Omit<Props, "ruta">) {
  return (
    <figure className={`overflow-hidden rounded-[1.4rem] border-[5px] border-tinta bg-tinta shadow-xl ${className}`}>
      <div className="relative aspect-[390/844]">
        <Image src={src} alt={alt} fill priority={prioridad} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}
