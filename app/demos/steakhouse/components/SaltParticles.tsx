// Partículas blancas tipo "sal espolvoreada" alrededor de las imágenes.
// Se generan con posiciones y opacidades variables para dar naturalidad.

type Props = {
  count?: number;
  className?: string;
};

export function SaltParticles({ count = 40, className = "" }: Props) {
  // Generamos posiciones determinísticas para que no cambien en cada render
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rand = seed / 233280;
    const rand2 = ((i * 4523 + 7919) % 1000) / 1000;
    const rand3 = ((i * 7919 + 104729) % 1000) / 1000;
    return {
      top: `${rand * 100}%`,
      left: `${rand2 * 100}%`,
      size: 1.5 + rand3 * 2.5,
      opacity: 0.25 + rand3 * 0.5,
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
}
