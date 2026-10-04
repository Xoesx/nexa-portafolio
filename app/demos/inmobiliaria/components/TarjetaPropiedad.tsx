import Image from "next/image";
import Link from "next/link";
import { precioTexto, type Propiedad } from "../data";
import { IconoArea, IconoBano, IconoCama, IconoUbicacion } from "./Iconos";

export function TarjetaPropiedad({ p, prioridad = false }: { p: Propiedad; prioridad?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e7e1d8] bg-white transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgb(28_25_23/0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#efe9e1]">
        <Image
          src={p.fotos[0]}
          alt={`${p.titulo} en ${p.distrito}`}
          fill
          priority={prioridad}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-[#1c1917]">{p.operacion}</span>
          {p.nueva && <span className="rounded-full bg-[#b4532a] px-3 py-1 text-xs font-semibold text-white">Nuevo</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
          {precioTexto(p)}
        </p>
        <h3 className="mt-1 text-[17px] font-semibold">
          <Link href={`/demos/inmobiliaria/propiedades/${p.id}`} className="after:absolute after:inset-0">
            {p.titulo}
          </Link>
        </h3>
        <p className="mb-4 mt-1 flex items-center gap-1.5 text-sm text-[#57534e]">
          <IconoUbicacion className="shrink-0" />
          {p.distrito}, Pucallpa
        </p>
        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-1 border-t border-[#efe9e1] pt-4 text-sm text-[#44403c]" aria-label="Características">
          <li className="flex items-center gap-1.5"><IconoArea /> {p.area} m²</li>
          <li className="flex items-center gap-1.5"><IconoCama /> {p.dormitorios} dorm.</li>
          <li className="flex items-center gap-1.5"><IconoBano /> {p.banos} baños</li>
        </ul>
      </div>
    </article>
  );
}
