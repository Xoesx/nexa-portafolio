type Props = {
  className?: string;
  /** Muestra solo el isotipo, sin la palabra NEXA. */
  soloMarca?: boolean;
};

/**
 * Isotipo de NEXA: una N cuyo trazo diagonal va en color mango,
 * como un río que cruza la letra. Funciona igual a 16 px que en grande.
 */
export function Marca({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#0e3a34" />
      <rect x="9" y="8" width="3.4" height="16" fill="#f3f5f1" />
      <rect x="19.6" y="8" width="3.4" height="16" fill="#f3f5f1" />
      <path d="M9 8h3.4L23 24h-3.4Z" fill="#ffb27a" />
    </svg>
  );
}

export function Logo({ className = "", soloMarca = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Marca className="h-8 w-8 shrink-0" />
      {!soloMarca && (
        <span className="font-serif text-[1.45rem] leading-none tracking-tight">NEXA</span>
      )}
    </span>
  );
}
