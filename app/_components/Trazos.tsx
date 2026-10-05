/*
 * Trazos dibujados a mano (subrayado y flecha). Se "dibujan" con stroke-dashoffset:
 * pathLength="1" permite animar cualquier trazo de 1 a 0 sin medirlo.
 */

const retraso = (ms?: number) => (ms === undefined ? undefined : ({ "--retraso": `${ms}ms` } as React.CSSProperties));

export function Subrayado({ className = "", demora }: { className?: string; demora?: number }) {
  return (
    <svg viewBox="0 0 220 16" preserveAspectRatio="none" fill="none" className={className} aria-hidden="true">
      <path
        className="trazo"
        style={retraso(demora)}
        pathLength={1}
        d="M3 11.5C38 6.5 79 4.2 121 5.4c32 .9 61 3.3 96 7.6"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Flecha curva que apunta hacia abajo a la izquierda. Para otras direcciones,
 * rótala o voltéala con clases (por ejemplo `-scale-x-100`).
 */
export function FlechaMano({ className = "", demora }: { className?: string; demora?: number }) {
  return (
    <svg viewBox="0 0 64 56" fill="none" className={className} aria-hidden="true">
      <path
        className="trazo"
        style={retraso(demora)}
        pathLength={1}
        d="M58 6C42 4 24 12 16 30c-2.6 5.8-3.8 11-4 17"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        className="trazo"
        style={retraso(demora === undefined ? undefined : demora + 350)}
        pathLength={1}
        d="M4 38.5 11.8 48l8.6-8.2"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
