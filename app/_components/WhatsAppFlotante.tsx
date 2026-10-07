import type { Idioma } from "../_data/idioma";
import { cotizar, EXTERNO } from "../_data/sitio";
import { TEXTOS } from "../_data/textos";
import { IconoWhatsApp } from "./Iconos";

/** Botón flotante de WhatsApp. Aparece después de bajar un poco (antes ya está el del hero). */
export function WhatsAppFlotante({ idioma }: { idioma: Idioma }) {
  return (
    <a
      href={cotizar(idioma)}
      {...EXTERNO}
      aria-label={TEXTOS[idioma].flotante}
      className="flotante fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_30px_-12px_rgb(31_157_85/0.75)] transition-transform duration-300 hover:[transform:translateY(-3px)] motion-reduce:transition-none sm:right-6 sm:bottom-6"
    >
      <IconoWhatsApp tam={27} />
    </a>
  );
}
