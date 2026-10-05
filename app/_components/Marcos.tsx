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
      className={`overflow-hidden rounded-xl border border-linea bg-superficie shadow-[0_32px_70px_-36px_rgb(12_20_40/0.55)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-linea bg-alterno px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-tinta/20" />
          <span className="h-2 w-2 rounded-full bg-tinta/20" />
          <span className="h-2 w-2 rounded-full bg-tinta/20" />
        </span>
        <span className="truncate rounded-md bg-superficie px-2.5 py-0.5 font-mono text-[11px] text-tenue">
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

/** Captura de celular con bisel oscuro (el bisel es igual en modo claro y oscuro, como un teléfono real). */
export function MarcoCelular({ src, alt, sizes, prioridad = false, className = "" }: Omit<Props, "ruta">) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.6rem] border-[6px] border-[#0b0f17] bg-[#0b0f17] shadow-[0_30px_60px_-30px_rgb(12_20_40/0.6)] ${className}`}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.15rem]">
        <Image src={src} alt={alt} fill priority={prioridad} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}
