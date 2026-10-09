import s from "../veluno.module.css";

/**
 * Nota breve para los controles sin destino real en esta demo.
 * Usa la Popover API: se cierra con Esc o al tocar fuera, sin JavaScript propio.
 * Se coloca junto al elemento `.disparador` de su `.anclaje` más cercano (anchor positioning);
 * sin soporte, el navegador la muestra centrada.
 */
export function Aviso({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} popover="auto" role="status" className={s.aviso}>
      {children}
    </div>
  );
}
