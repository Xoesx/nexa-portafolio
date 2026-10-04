import { COTIZAR, EXTERNO } from "../_data/sitio";
import { IconoWhatsApp } from "./Iconos";

export function WhatsAppFlotante() {
  return (
    <a
      href={COTIZAR}
      {...EXTERNO}
      aria-label="Escribir por WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-300 hover:scale-105 motion-reduce:transition-none sm:right-5 sm:bottom-5"
    >
      <IconoWhatsApp tam={28} />
    </a>
  );
}
