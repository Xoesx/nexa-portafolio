"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type PuntoMapa = {
  id: string;
  lat: number;
  lng: number;
  etiqueta: string;
  titulo: string;
  subtitulo: string;
  foto: string;
  href: string;
};

type Vista = { clave: string; z: number; cx: number; cy: number };

const TESELA = 256;
const ZOOM_MIN = 11;
const ZOOM_MAX = 17;

// Proyección Web Mercator: coordenadas a píxeles del mundo en un nivel de zoom.
const aX = (lng: number, z: number) => ((lng + 180) / 360) * TESELA * 2 ** z;
const aY = (lat: number, z: number) => {
  const s = Math.sin((lat * Math.PI) / 180);
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * TESELA * 2 ** z;
};

/** Zoom y centro que muestran todos los puntos con un margen. */
function encuadrar(puntos: PuntoMapa[], ancho: number, alto: number, clave: string, zoomMax = 15): Vista {
  const lista = puntos.length ? puntos : [{ lat: -8.3791, lng: -74.5539 } as PuntoMapa];
  for (let z = zoomMax; z >= ZOOM_MIN; z--) {
    const xs = lista.map((p) => aX(p.lng, z));
    const ys = lista.map((p) => aY(p.lat, z));
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    if (x1 - x0 < ancho - 120 && y1 - y0 < alto - 120) return { clave, z, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
  }
  const z = ZOOM_MIN;
  return { clave, z, cx: aX(lista[0].lng, z), cy: aY(lista[0].lat, z) };
}

export function Mapa({ puntos, alto = 460, zoomMax = 15, className = "" }: { puntos: PuntoMapa[]; alto?: number; zoomMax?: number; className?: string }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const arrastre = useRef<{ x: number; y: number; cx: number; cy: number; movido: boolean } | null>(null);
  const [ancho, setAncho] = useState(0);
  const [vista, setVista] = useState<Vista | null>(null);
  const [abierto, setAbierto] = useState<string | null>(null);

  useEffect(() => {
    const el = contenedor.current;
    if (!el) return;
    const ro = new ResizeObserver(([entrada]) => setAncho(entrada.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Si cambian los puntos (por ejemplo, al filtrar), el mapa se vuelve a encuadrar.
  const clave = puntos.map((p) => p.id).join("|");
  const actual = vista && vista.clave === clave ? vista : ancho ? encuadrar(puntos, ancho, alto, clave, zoomMax) : null;

  const mover = (dx: number, dy: number) => actual && setVista({ ...actual, cx: actual.cx + dx, cy: actual.cy + dy });
  const zoom = (paso: number) => {
    if (!actual) return;
    const z = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, actual.z + paso));
    const f = 2 ** (z - actual.z);
    setVista({ ...actual, z, cx: actual.cx * f, cy: actual.cy * f });
  };

  const teselas: { clave: string; x: number; y: number; src: string }[] = [];
  if (actual && ancho) {
    const { z, cx, cy } = actual;
    const n = 2 ** z;
    const [ix0, ix1] = [Math.floor((cx - ancho / 2) / TESELA), Math.floor((cx + ancho / 2) / TESELA)];
    const [iy0, iy1] = [Math.floor((cy - alto / 2) / TESELA), Math.floor((cy + alto / 2) / TESELA)];
    for (let ix = ix0; ix <= ix1; ix++) {
      for (let iy = iy0; iy <= iy1; iy++) {
        if (iy < 0 || iy >= n) continue;
        const xReal = ((ix % n) + n) % n;
        teselas.push({
          clave: `${z}/${ix}/${iy}`,
          x: ix * TESELA - (cx - ancho / 2),
          y: iy * TESELA - (cy - alto / 2),
          src: `https://tile.openstreetmap.org/${z}/${xReal}/${iy}.png`,
        });
      }
    }
  }

  const posicion = (p: PuntoMapa) =>
    actual ? { x: aX(p.lng, actual.z) - (actual.cx - ancho / 2), y: aY(p.lat, actual.z) - (actual.cy - alto / 2) } : { x: -999, y: -999 };

  const elegido = puntos.find((p) => p.id === abierto);

  return (
    <div
      ref={contenedor}
      role="region"
      aria-label="Mapa de propiedades. Usa las flechas para moverte y las teclas más y menos para acercar o alejar."
      tabIndex={0}
      style={{ height: alto }}
      className={`relative select-none overflow-hidden rounded-2xl border border-[#e7e1d8] bg-[#e8e4dc] outline-none [touch-action:pan-y] focus-visible:ring-2 focus-visible:ring-[#b4532a] ${className}`}
      onKeyDown={(e) => {
        const paso = 80;
        if (e.key === "ArrowLeft") mover(-paso, 0);
        else if (e.key === "ArrowRight") mover(paso, 0);
        else if (e.key === "ArrowUp") mover(0, -paso);
        else if (e.key === "ArrowDown") mover(0, paso);
        else if (e.key === "+" || e.key === "=") zoom(1);
        else if (e.key === "-") zoom(-1);
        else if (e.key === "Escape") setAbierto(null);
        else return;
        e.preventDefault();
      }}
      onPointerDown={(e) => {
        if (!actual || (e.target as HTMLElement).closest("[data-no-arrastrar]")) return;
        arrastre.current = { x: e.clientX, y: e.clientY, cx: actual.cx, cy: actual.cy, movido: false };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const a = arrastre.current;
        if (!a || !actual) return;
        const [dx, dy] = [e.clientX - a.x, e.clientY - a.y];
        if (Math.abs(dx) + Math.abs(dy) > 4) a.movido = true;
        setVista({ ...actual, cx: a.cx - dx, cy: a.cy - dy });
      }}
      onPointerUp={() => {
        if (arrastre.current && !arrastre.current.movido) setAbierto(null);
        arrastre.current = null;
      }}
      onPointerCancel={() => (arrastre.current = null)}
    >
      {/* Teselas de OpenStreetMap */}
      <div aria-hidden="true" className="absolute inset-0 cursor-grab active:cursor-grabbing">
        {teselas.map((t) => (
          // eslint-disable-next-line @next/next/no-img-element -- teselas del mapa: ya vienen optimizadas y no deben pasar por el optimizador
          <img
            key={t.clave}
            src={t.src}
            alt=""
            width={TESELA}
            height={TESELA}
            draggable={false}
            className="absolute max-w-none"
            style={{ left: t.x, top: t.y, width: TESELA, height: TESELA }}
          />
        ))}
      </div>

      {/* Marcadores */}
      {actual &&
        puntos.map((p) => {
          const { x, y } = posicion(p);
          if (x < -60 || y < -40 || x > ancho + 60 || y > alto + 40) return null;
          const activo = p.id === abierto;
          return (
            <button
              key={p.id}
              type="button"
              data-no-arrastrar
              onClick={() => setAbierto(activo ? null : p.id)}
              aria-label={`${p.titulo}, ${p.etiqueta}`}
              aria-expanded={activo}
              style={{ left: x, top: y }}
              className={`absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold shadow-md transition-transform hover:scale-105 after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[5px] after:border-transparent ${
                activo
                  ? "z-20 scale-105 bg-[#1c1917] text-white after:border-t-[#1c1917]"
                  : "bg-[#b4532a] text-white after:border-t-[#b4532a]"
              }`}
            >
              {p.etiqueta}
            </button>
          );
        })}

      {/* Tarjeta del marcador elegido */}
      {elegido && actual && (
        <div
          data-no-arrastrar
          className="absolute z-30 w-60 -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-2xl"
          style={{ left: Math.min(Math.max(posicion(elegido).x, 130), ancho - 130), top: Math.max(posicion(elegido).y - 230, 8) }}
        >
          <div className="relative h-28">
            <Image src={elegido.foto} alt="" fill sizes="240px" className="object-cover" />
            <button
              type="button"
              onClick={() => setAbierto(null)}
              aria-label="Cerrar"
              className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-[#1c1917] shadow"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="p-3">
            <p className="text-[15px] font-bold" style={{ fontFamily: "var(--font-rz-titulo)" }}>
              {elegido.etiqueta}
            </p>
            <p className="truncate text-sm font-semibold">{elegido.titulo}</p>
            <p className="truncate text-xs text-[#57534e]">{elegido.subtitulo}</p>
            <Link href={elegido.href} className="mt-2 inline-flex min-h-9 items-center text-sm font-bold text-[#933f1d] underline underline-offset-4">
              Ver ficha →
            </Link>
          </div>
        </div>
      )}

      {/* Controles */}
      <div data-no-arrastrar className="absolute right-3 top-3 z-20 flex flex-col overflow-hidden rounded-xl bg-white shadow-md">
        <button type="button" onClick={() => zoom(1)} aria-label="Acercar" className="grid h-10 w-10 place-items-center text-xl font-bold hover:bg-[#f3efe9]">
          +
        </button>
        <span className="h-px bg-[#e7e1d8]" />
        <button type="button" onClick={() => zoom(-1)} aria-label="Alejar" className="grid h-10 w-10 place-items-center text-xl font-bold hover:bg-[#f3efe9]">
          −
        </button>
      </div>
      {vista && vista.clave === clave && (
        <button
          type="button"
          data-no-arrastrar
          onClick={() => setVista(null)}
          className="absolute left-3 top-3 z-20 min-h-10 rounded-xl bg-white px-3 text-sm font-semibold shadow-md hover:bg-[#f3efe9]"
        >
          Ver todas
        </button>
      )}
      <p className="absolute bottom-0 right-0 z-20 bg-white/85 px-1.5 py-0.5 text-[11px] text-[#44403c]">
        ©{" "}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline" data-no-arrastrar>
          OpenStreetMap
        </a>
      </p>
    </div>
  );
}
