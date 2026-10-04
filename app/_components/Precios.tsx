import { PLANES } from "../_data/contenido";
import { COTIZAR, EXTERNO, wa } from "../_data/sitio";
import { Check } from "./Iconos";

export function Precios() {
  return (
    <section id="precios" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end" data-revelar>
          <div>
            <p className="text-sm font-semibold text-azul">Precios</p>
            <h2 className="mt-2 font-display text-3xl text-balance sm:text-[2.75rem] sm:leading-[1.1]">Precios claros, en soles</h2>
          </div>
          <p className="leading-relaxed text-tinta/75">
            Son precios de partida. El monto final depende de lo que necesites y lo confirmas por escrito antes de pagar.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" data-revelar>
          {PLANES.map((p) => (
            <div
              key={p.nombre}
              className={`relative flex flex-col rounded-3xl p-7 sm:p-8 ${
                p.destacado ? "sobre-oscuro bg-marino text-papel shadow-[0_30px_60px_-30px_rgb(11_31_58/0.6)]" : "border border-linea bg-white"
              }`}
            >
              {p.destacado && (
                <span className="absolute -top-3 left-7 rounded-full bg-azul px-3 py-1 text-xs font-semibold text-white">El más elegido</span>
              )}
              <h3 className="font-display text-xl">{p.nombre}</h3>
              <p className={`mt-1 text-sm ${p.destacado ? "text-papel/70" : "text-tinta/70"}`}>{p.para}</p>

              <p className="mt-7 flex items-baseline gap-2">
                <span className={`text-sm ${p.destacado ? "text-papel/70" : "text-tinta/70"}`}>desde</span>
                <span className="font-display text-5xl font-extrabold">S/ {p.precio}</span>
              </p>

              <ul className="mt-7 flex-1 space-y-3 text-[15px] leading-snug">
                {p.incluye.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className={p.destacado ? "text-cielo" : "text-azul"} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={wa(`Hola NEXA, me interesa el plan ${p.nombre}. ¿Podemos conversar?`)}
                {...EXTERNO}
                className={`mt-9 flex min-h-12 items-center justify-center rounded-xl px-5 font-semibold transition-colors ${
                  p.destacado ? "bg-azul text-white hover:bg-azul-hondo" : "border border-linea hover:border-tinta/40"
                }`}
              >
                Consultar este plan
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-tinta/70">
          ¿Tu caso no encaja en ninguno?{" "}
          <a href={COTIZAR} {...EXTERNO} className="font-semibold text-azul underline underline-offset-4">
            Cuéntanos qué necesitas
          </a>{" "}
          y armamos una propuesta.
        </p>
      </div>
    </section>
  );
}
