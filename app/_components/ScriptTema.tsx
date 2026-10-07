/*
 * Pone el tema (claro u oscuro) en <html> antes del primer pintado, así no hay destello.
 * Usa la elección guardada y, si no hay, la del sistema. Va en el <head> de cada layout raíz.
 * El CSS del modo oscuro solo afecta a las páginas de NEXA: los demos se ven siempre igual.
 */
const TEMA = `(function(){try{var t=localStorage.getItem("nexa-tema");if(t!=="oscuro"&&t!=="claro")t=matchMedia("(prefers-color-scheme: dark)").matches?"oscuro":"claro";document.documentElement.dataset.tema=t}catch(e){}})()`;

export function ScriptTema() {
  return <script dangerouslySetInnerHTML={{ __html: TEMA }} />;
}
