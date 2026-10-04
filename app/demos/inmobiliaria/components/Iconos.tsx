type P = { className?: string };
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconoCama = ({ className }: P) => (
  <svg {...base} className={className}><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.6" /></svg>
);
export const IconoBano = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2" /></svg>
);
export const IconoArea = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 4h16v16H4zM4 9h5V4M20 15h-5v5" /></svg>
);
export const IconoAuto = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 13h.01M17 13h.01" /></svg>
);
export const IconoUbicacion = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
