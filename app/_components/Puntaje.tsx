type Props = {
  valor: number;
  etiqueta: string;
  /** Tamaño en píxeles del anillo. */
  tam?: number;
  /** Sobre fondo oscuro se usan tonos más claros para mantener el contraste. */
  oscuro?: boolean;
};

// Mismos umbrales que usa Lighthouse: 90+ bueno, 50–89 mejorable, <50 malo.
const colorDe = (v: number, oscuro: boolean) =>
  v >= 90 ? (oscuro ? "#4fd08f" : "#0f8a4f") : v >= 50 ? (oscuro ? "#f2b84b" : "#c77700") : oscuro ? "#ff8a65" : "#c2410c";

export function Puntaje({ valor, etiqueta, tam = 76, oscuro = false }: Props) {
  const r = 15.9155; // radio para que la circunferencia mida 100
  const color = colorDe(valor, oscuro);
  return (
    <figure className="flex min-w-0 flex-col items-center gap-2 text-center">
      <div className="relative" style={{ width: tam, height: tam }}>
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r={r} fill="none" strokeWidth="2.6" className="stroke-tinta/15" />
          <circle cx="18" cy="18" r={r} fill="none" strokeWidth="2.6" strokeLinecap="round" stroke={color} strokeDasharray={`${valor} 100`} />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-[1.35rem] tabular-nums" style={{ color }}>
          {valor}
        </span>
      </div>
      <figcaption lang="es" className="font-mono text-[11px] leading-tight text-tenue hyphens-auto sm:text-xs">
        {etiqueta}
      </figcaption>
    </figure>
  );
}
