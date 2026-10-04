import { PLANES } from "../_data/contenido";
import { COTIZAR, EXTERNO, wa } from "../_data/sitio";
import { Check } from "./Iconos";

export function Precios() {
  return (
    <section id="precios" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div data-revelar>
          <h2 className="max-w-xl font-serif text-3xl tracking-tight sm:text-4xl">Precios en soles</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-tinta/70">
            Son precios de partida. El monto final depende de lo que necesites, y lo confirmas por escrito antes de pagar.
          </p>
        </div>

        <div
          data-revelar
          className="mt-12 grid divide-y divide-tinta/15 overflow-hidden rounded-2xl border border-tinta/15 bg-white md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {PLANES.map((p) => (
            <div
              key={p.nombre}
              className={`flex flex-col p-7 sm:p-9 ${p.destacado ? "sobre-oscuro bg-tinta text-papel" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl">{p.nombre}</h3>
                {p.destacado && <span className="text-sm font-semibold text-mango">Recomendado</span>}
              </div>
              <p className={`mt-1 text-sm ${p.destacado ? "text-papel/70" : "text-tinta/60"}`}>{p.para}</p>

              <p className="mt-7 flex items-baseline gap-2">
                <span className={`text-sm ${p.destacado ? "text-papel/70" : "text-tinta/60"}`}>desde</span>
                <span className="font-serif text-5xl tracking-tight">S/ {p.precio}</span>
              </p>

              <ul className="mt-7 flex-1 space-y-3 text-[15px] leading-snug">
                {p.incluye.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className={p.destacado ? "text-mango" : "text-arcilla"} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={wa(`Hola NEXA, me interesa el plan ${p.nombre}. ¿Podemos conversar?`)}
                {...EXTERNO}
                className={`mt-9 flex min-h-12 items-center justify-center rounded-full px-5 font-semibold transition-colors ${
                  p.destacado
                    ? "bg-mango text-tinta hover:bg-white"
                    : "border border-tinta/30 hover:bg-tinta hover:text-papel"
                }`}
              >
                Consultar este plan
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-tinta/60">
          ¿Tu caso no encaja en ninguno?{" "}
          <a href={COTIZAR} {...EXTERNO} className="font-semibold text-arcilla underline underline-offset-4">
            Cuéntanos qué necesitas
          </a>{" "}
          y armamos una propuesta.
        </p>
      </div>
    </section>
  );
}
