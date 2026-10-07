import { wa } from "../lib/whatsapp";

type Props = {
  mensaje: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "whatsapp";
  className?: string;
};

export function WhatsAppButton({ mensaje, children, variant = "primary", className = "" }: Props) {
  const base = "inline-flex items-center gap-2 rounded-full font-semibold transition";
  const estilos = {
    primary: "bg-[#B14A28] px-6 py-3 text-white hover:bg-[#8B3A1F]",
    ghost: "border border-white/40 px-6 py-3 text-white hover:bg-white hover:text-[#2A1F14]",
    whatsapp: "bg-[#25D366] px-6 py-3 text-white hover:bg-[#1DA851]",
  };
  return (
    <a href={wa(mensaje)} target="_blank" rel="noopener noreferrer" className={`${base} ${estilos[variant]} ${className}`}>
      {children}
    </a>
  );
}
