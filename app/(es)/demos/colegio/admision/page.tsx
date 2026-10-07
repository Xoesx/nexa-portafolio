import type { Metadata } from "next";
import { Preinscripcion } from "../components/Preinscripcion";
import { ANIO_ESCOLAR, COSTOS, FECHAS_ADMISION, fechaLegible, REQUISITOS } from "../data";

export const metadata: Metadata = {
  title: `Admisión ${ANIO_ESCOLAR}`,
  description: "Requisitos, costos, fechas y preinscripción en línea para inicial, primaria y secundaria.",
};

const titulo = { fontFamily: "var(--font-hz-titulo)" };

const PROCESO = [
  { paso: "Preinscríbete en línea", texto: "Te toma tres minutos. El sistema te dice a qué grado corresponde tu hijo." },
  { paso: "Visita el colegio", texto: "Recorre las aulas con tu hijo y conversa con la coordinadora del nivel." },
  { paso: "Evaluación y entrevista", texto: "Una observación amable para conocer a tu hijo, sin exámenes difíciles." },
  { paso: "Matrícula", texto: "Con los resultados, separas la vacante y matriculas en línea o en secretaría." },
];

export default function AdmisionPage() {
  return (
    <main>
      <section className="border-b border-[#ebe3d6] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#7a1f2b]">Admisión {ANIO_ESCOLAR}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl" style={titulo}>
            Cuatro pasos para que tu hijo sea parte de Horizonte
          </h1>
          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
            {PROCESO.map((p, i) => (
              <li key={p.paso} className="relative border-t-2 border-[#7a1f2b] pt-5">
                <span className="text-4xl font-semibold text-[#c9a227]" style={titulo}>
                  {i + 1}
                </span>
                <h2 className="mt-2 text-lg font-bold">{p.paso}</h2>
                <p className="mt-1 leading-relaxed text-[#5a4f47]">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="preinscripcion" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold" style={titulo}>
              Preinscripción en línea
            </h2>
            <p className="mt-2 max-w-lg text-[#5a4f47]">
              Al terminar recibes un código y la lista de documentos para tu visita.
            </p>
            <div className="mt-8">
              <Preinscripcion />
            </div>
          </div>

          <aside className="space-y-6 lg:pt-20">
            <div className="rounded-2xl border border-[#ebe3d6] bg-white p-6">
              <h2 className="text-xl font-semibold" style={titulo}>
                Costos {ANIO_ESCOLAR}
              </h2>
              <table className="mt-4 w-full text-[15px]">
                <caption className="sr-only">Costos de admisión y pensiones</caption>
                <tbody className="divide-y divide-[#efe7da]">
                  {COSTOS.map((c) => (
                    <tr key={c.concepto}>
                      <th scope="row" className="py-2.5 pr-3 text-left font-normal text-[#5a4f47]">
                        {c.concepto}
                      </th>
                      <td className="py-2.5 text-right font-bold tabular-nums">{c.monto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-[#ebe3d6] bg-white p-6">
              <h2 className="text-xl font-semibold" style={titulo}>
                Requisitos
              </h2>
              <ul className="mt-4 space-y-2.5 text-[15px] text-[#5a4f47]">
                {REQUISITOS.map((r) => (
                  <li key={r} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7a1f2b]" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#3d1016] p-6 text-[#fbf8f3]">
              <h2 className="text-xl font-semibold" style={titulo}>
                Fechas clave
              </h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                {FECHAS_ADMISION.map((f) => (
                  <li key={f.fecha} className="flex justify-between gap-4">
                    <span className="text-[#fbf8f3]/80">{f.titulo}</span>
                    <time dateTime={f.fecha} className="shrink-0 font-bold">
                      {fechaLegible(f.fecha, { day: "numeric", month: "short" }).replace(".", "")}
                    </time>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
