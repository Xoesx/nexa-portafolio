import Image from "next/image";
import Link from "next/link";
import { areaTexto, ESTADOS, precioTexto, TIPOS, type Propiedad } from "../data";
import { BotonFavorito } from "./BotonFavorito";
import { IconoArea, IconoBano, IconoCama, IconoUbicacion } from "./Iconos";

export function TarjetaPropiedad({ p, prioridad = false }: { p: Propiedad; prioridad?: boolean }) {
  const estado = ESTADOS[p.estado];
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
        <div className="absolute left-3 right-16 top-3 flex flex-wrap gap-1.5">
          <span className={`rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide ${estado.clase}`}>{estado.etiqueta}</span>
          <span className="rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-[#1c1917]">{p.operacion}</span>
          {p.nueva && <span className="rounded-md bg-[#b4532a] px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Nuevo</span>}
        </div>
        {p.estado !== "vendido" && (
          <div className="absolute right-3 top-3">
            <BotonFavorito id={p.id} titulo={p.titulo} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-rz-titulo)" }}>
            {precioTexto(p)}
          </p>
          <p className="shrink-0 text-xs font-semibold text-[#78716c]">Cód. {p.codigo}</p>
        </div>
        <h3 className="mt-1 text-[17px] font-semibold">
          {p.estado === "vendido" ? (
            p.titulo
          ) : (
            <Link href={`/demos/inmobiliaria/propiedades/${p.id}`} className="after:absolute after:inset-0">
              {p.titulo}
            </Link>
          )}
        </h3>
        <p className="mb-4 mt-1 flex items-center gap-1.5 text-sm text-[#57534e]">
          <IconoUbicacion className="shrink-0" />
          {p.distrito}, Pucallpa · {TIPOS[p.tipo].singular}
        </p>
        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-1 border-t border-[#efe9e1] pt-4 text-sm text-[#44403c]" aria-label="Características">
          <li className="flex items-center gap-1.5">
            <IconoArea /> {areaTexto(p.area)}
          </li>
          {p.dormitorios > 0 && (
            <li className="flex items-center gap-1.5">
              <IconoCama /> {p.dormitorios} dorm.
            </li>
          )}
          {p.banos > 0 && (
            <li className="flex items-center gap-1.5">
              <IconoBano /> {p.banos} {p.banos === 1 ? "baño" : "baños"}
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}
