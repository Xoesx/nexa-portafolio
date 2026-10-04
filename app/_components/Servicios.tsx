import { SERVICIOS } from "../_data/contenido";

export function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-28 border-t border-tinta/10 bg-papel-hondo/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.7fr] md:py-28">
        <div data-revelar>
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Lo que hacemos</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-tinta/70">
            No partimos de una plantilla. Primero entendemos cómo trabaja tu negocio y después construimos lo que de
            verdad te ahorra tiempo o te trae clientes.
          </p>
        </div>

        <ul className="divide-y divide-tinta/15 border-y border-tinta/15">
          {SERVICIOS.map((s) => (
            <li key={s.titulo} data-revelar className="grid gap-2 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
              <h3 className="font-serif text-xl">{s.titulo}</h3>
              <div>
                <p className="leading-relaxed">{s.texto}</p>
                <p className="mt-2 text-sm text-tinta/70">{s.ejemplo}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
