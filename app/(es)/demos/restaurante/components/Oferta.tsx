import Image from "next/image";
import Link from "next/link";

export function Oferta() {
  return (
    <section className="bg-[#1F1A15] px-6 py-16 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E8A87C]">
            Oferta especial
          </p>
          <h2
            className="mt-4 text-4xl leading-[1.05] tracking-[-0.01em] md:text-5xl"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            20% de descuento
            <br />
            <span className="italic text-[#E8A87C]">en tu primera reserva.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">
            Válido de martes a jueves, para grupos de 2 a 6 personas.
            Menciona el código <span className="font-semibold text-white">BIENVENIDO20</span> al reservar.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/demos/restaurante/reservar"
              className="inline-flex items-center gap-3 rounded-full bg-[#C1440E] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#9A3410]"
            >
              Reservar ahora →
            </Link>
          </div>
        </div>

        {/* Foto del plato a la derecha */}
        <div className="relative hidden md:block">
          <div className="aspect-square overflow-hidden rounded-full border-4 border-[#1F1A15] shadow-2xl">
            <Image width={800} height={800} sizes="(min-width: 768px) 40vw, 1px"
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85"
              alt="Plato especial"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
