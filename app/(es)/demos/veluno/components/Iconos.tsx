/** Íconos de trazo dibujados para Veluno: misma caja de 24, mismo grosor y puntas redondas. */

type Props = { className?: string };

function Trazo({ className, children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconoLupa(props: Props) {
  return (
    <Trazo {...props}>
      <circle cx="10.75" cy="10.75" r="6.25" />
      <path d="m15.5 15.5 4.75 4.75" />
    </Trazo>
  );
}

export function IconoCorazon(props: Props) {
  return (
    <Trazo {...props}>
      <path d="M12 19.25s-7.25-4.3-7.25-9.6A4.1 4.1 0 0 1 12 7.1a4.1 4.1 0 0 1 7.25 2.55c0 5.3-7.25 9.6-7.25 9.6Z" />
    </Trazo>
  );
}

export function IconoCarrito(props: Props) {
  return (
    <Trazo {...props}>
      <path d="M3.25 4.25h2.1l2.2 10.1a1.5 1.5 0 0 0 1.47 1.18h8.1a1.5 1.5 0 0 0 1.45-1.12l1.45-6.16H6.4" />
      <circle cx="9.5" cy="19.25" r="1.1" />
      <circle cx="17" cy="19.25" r="1.1" />
    </Trazo>
  );
}

export function IconoMenu(props: Props) {
  return (
    <Trazo {...props}>
      <path d="M4.5 8.5h15" />
      <path d="M4.5 15.5h15" />
    </Trazo>
  );
}
