import { formatoPrecio, pasos, planes, type Plan } from "../_data/contenido";
import { ANCLA, type Idioma } from "../_data/idioma";
import { cotizar, EXTERNO, wa } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { Check, Flecha } from "./Iconos";
import { FlechaMano } from "./Trazos";

function Contenido({ p, idioma }: { p: Plan; idioma: Idioma }) {
  const t = TEXTOS[idioma].precios;
  const enlace = wa(t.mensaje(p.nombre));
  const precio = formatoPrecio(p.precio, idioma);
  return (
    <>
      <h4 className="font-display text-xl">{p.nombre}</h4>
      <p className="mt-1 text-sm text-tenue">{p.para}</p>

      <p className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-sm text-tenue">{t.desde}</span>
        <span className="font-display text-[2.9rem] font-extrabold leading-none">{precio.principal}</span>
        {precio.secundario && <span className="font-mono text-sm text-tenue">· {precio.secundario}</span>}
      </p>

      <ul className="mt-7 flex-1 space-y-3 text-[15px] leading-snug">
        {p.incluye.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {p.destacado ? (
        <a
          href={enlace}
          {...EXTERNO}
          className="mt-9 flex min-h-12 items-center justify-center rounded-full bg-acento px-5 font-semibold text-sobre-acento transition-colors hover:bg-acento-hondo"
        >
          {t.consultar}
        </a>
      ) : (
        <a href={enlace} {...EXTERNO} className="group mt-9 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-acento">
          {t.consultar}
          <Flecha className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      )}
    </>
  );
}

export function Precios({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].precios;

  return (
    <section id={ANCLA[idioma].precios} className="scroll-mt-24 border-t border-linea">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        {/* Cómo trabajamos */}
        <div className="max-w-2xl" data-revelar>
          <p className="font-mono text-[13px] text-tenue">{t.etiqueta}</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.03] text-balance">{t.titulo}</h2>
        </div>

        <ol className="proceso relative mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
          {pasos(idioma).map((p, i) => (
            <li key={p.titulo} data-revelar style={{ "--i": i } as React.CSSProperties} className="relative pl-14 lg:pl-0">
              <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-linea bg-fondo font-mono text-sm lg:static">
                {i + 1}
              </span>
              <h3 className="font-display text-[1.1rem] lg:mt-5">{p.titulo}</h3>
              <p className="mt-1.5 max-w-xs text-[15px] leading-relaxed text-tenue">{p.texto}</p>
            </li>
          ))}
        </ol>

        {/* Planes: dos columnas sueltas y el destacado elevado, sin tres cajas iguales. */}
        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end" data-revelar>
          <h3 className="font-display text-[1.6rem] leading-tight sm:text-[2rem]">{t.planesTitulo}</h3>
          <p className="max-w-sm text-[15px] leading-relaxed text-tenue">{t.planesNota}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:mt-24 md:grid-cols-3 md:items-stretch">
          {planes(idioma).map((p) =>
            p.destacado ? (
              <div key={p.id} data-revelar className="relative mb-6 mt-16 md:-my-6">
                <div aria-hidden="true" className="trazo-al-ver pointer-events-none absolute -top-14 right-5 flex items-start gap-1 text-acento">
                  <FlechaMano className="mt-3 h-11 w-12" />
                  <span className="-rotate-[5deg] font-mano text-[1.4rem] leading-none">{t.elegido}</span>
                </div>
                <div className="invertido flex h-full flex-col rounded-[1.75rem] p-8 shadow-[0_40px_80px_-40px_rgb(12_20_40/0.7)] sm:p-9">
                  <Contenido p={p} idioma={idioma} />
                </div>
              </div>
            ) : (
              <div key={p.id} data-revelar className="flex flex-col border-t border-linea py-8 md:border-t-0 md:px-8 md:py-2">
                <Contenido p={p} idioma={idioma} />
              </div>
            ),
          )}
        </div>

        <p className="mt-14 text-[15px] text-tenue">
          {t.noEncaja}{" "}
          <a href={cotizar(idioma)} {...EXTERNO} className="font-semibold text-acento underline underline-offset-4">
            {t.cuentanos}
          </a>{" "}
          {t.armamos}
        </p>
      </div>
    </section>
  );
}
