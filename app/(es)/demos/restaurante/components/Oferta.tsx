import Image from "next/image";
import Link from "next/link";

export function Oferta() {
  return (
    <section className="bg-[#1F1A15] px-6 py-16 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="text-4xl leading-[1.05] tracking-[-0.01em] md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
            20% de descuento en tu primera reserva
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/75">
            De martes a jueves, para grupos de 2 a 6 personas. Escribe el código <span className="font-semibold text-white">BIENVENIDO20</span> en
            las notas de la reserva y te lo descontamos en la cuenta.
          </p>
          <Link
            href="/demos/restaurante/reservar"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#C1440E] px-7 text-[15px] font-semibold text-white transition hover:bg-[#9A3410]"
          >
            Reservar con el descuento
          </Link>
        </div>

        <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] md:block">
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85"
            alt="Lomo saltado servido en la mesa"
            fill
            sizes="(min-width: 768px) 38vw, 1px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
