import Link from "next/link";
import { MARCA } from "../data";

/** Sello de Veluno: un sol de doce lóbulos en negro, como en la referencia. */
export function Sello({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.7a2.84 2.84 0 0 1 4.65 1.25 2.84 2.84 0 0 1 3.4 3.4A2.84 2.84 0 0 1 21.3 12a2.84 2.84 0 0 1-1.25 4.65 2.84 2.84 0 0 1-3.4 3.4A2.84 2.84 0 0 1 12 21.3a2.84 2.84 0 0 1-4.65-1.25 2.84 2.84 0 0 1-3.4-3.4A2.84 2.84 0 0 1 2.7 12a2.84 2.84 0 0 1 1.25-4.65 2.84 2.84 0 0 1 3.4-3.4A2.84 2.84 0 0 1 12 2.7Z"
      />
    </svg>
  );
}

export function Marca({ className, selloClassName }: { className?: string; selloClassName?: string }) {
  return (
    <Link href="/demos/veluno" className={className} aria-label={`${MARCA}, inicio`}>
      <Sello className={selloClassName} />
      <span aria-hidden="true">{MARCA}</span>
    </Link>
  );
}
