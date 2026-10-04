type Props = {
  className?: string;
  /** Muestra solo el isotipo, sin la palabra NEXA. */
  soloMarca?: boolean;
  /** Variante para fondos oscuros: el cuadrado pasa a azul para no perderse. */
  sobreOscuro?: boolean;
};

/**
 * Isotipo de NEXA: una N de astas blancas cuya diagonal va en azul,
 * como una conexión entre dos puntos. Funciona igual a 16 px que en grande.
 */
export function Marca({ className = "h-8 w-8", sobreOscuro = false }: { className?: string; sobreOscuro?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={sobreOscuro ? "#2457f5" : "#0b1f3a"} />
      <rect x="9" y="8" width="3.6" height="16" rx="0.6" fill="#ffffff" />
      <rect x="19.4" y="8" width="3.6" height="16" rx="0.6" fill="#ffffff" />
      <path d="M9 8h3.6L23 24h-3.6Z" fill={sobreOscuro ? "#0b1f3a" : "#4d7cff"} />
    </svg>
  );
}

export function Logo({ className = "", soloMarca = false, sobreOscuro = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Marca className="h-8 w-8 shrink-0" sobreOscuro={sobreOscuro} />
      {!soloMarca && <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight">NEXA</span>}
    </span>
  );
}
