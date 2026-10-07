import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBF9F4] px-6 text-center">
      <p
        className="text-[120px] leading-none text-[#C1440E] md:text-[180px]"
        style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
      >
        404
      </p>
      <h1
        className="mt-4 text-[32px] leading-tight text-[#1F1A15] md:text-[42px]"
        style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
      >
        Esta página no existe.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#1F1A15]/70">
        Puede que el enlace esté roto o que la página se haya movido.
        Vuelve al inicio para seguir explorando.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/demos/restaurante"
          className="rounded-full bg-[#C1440E] px-7 py-4 text-[15px] font-semibold text-white transition hover:bg-[#9A3410]"
        >
          Volver al inicio
        </Link>
        <Link
          href="/demos/restaurante/menu"
          className="rounded-full border border-[#1F1A15]/20 px-7 py-4 text-[15px] font-semibold text-[#1F1A15] transition hover:border-[#C1440E] hover:text-[#C1440E]"
        >
          Ver el menú
        </Link>
      </div>
    </div>
  );
}
