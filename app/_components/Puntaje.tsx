type Props = {
  valor: number;
  etiqueta: string;
  /** Tamaño en píxeles del anillo. */
  tam?: number;
  oscuro?: boolean;
};

// Mismos umbrales que usa Lighthouse: 90+ bueno, 50–89 mejorable, <50 malo.
const colorDe = (v: number) => (v >= 90 ? "#0f8a4f" : v >= 50 ? "#c77700" : "#c2410c");

export function Puntaje({ valor, etiqueta, tam = 76, oscuro = false }: Props) {
  const r = 15.9155; // radio para que la circunferencia mida 100
  return (
    <figure className="flex min-w-0 flex-col items-center gap-2 text-center">
      <div className="relative" style={{ width: tam, height: tam }}>
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r={r} fill="none" strokeWidth="2.6" className={oscuro ? "stroke-papel/15" : "stroke-tinta/10"} />
          <circle
            cx="18"
            cy="18"
            r={r}
            fill="none"
            strokeWidth="2.6"
            strokeLinecap="round"
            stroke={colorDe(valor)}
            strokeDasharray={`${valor} 100`}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-[1.35rem] tabular-nums" style={{ color: colorDe(valor) }}>
          {valor}
        </span>
      </div>
      <figcaption lang="es" className={`text-[11px] font-medium leading-tight hyphens-auto sm:text-xs ${oscuro ? "text-papel/75" : "text-tinta/70"}`}>{etiqueta}</figcaption>
    </figure>
  );
}
