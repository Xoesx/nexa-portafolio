export function Reservation() {
  return (
    <section
      id="reservation"
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden py-32"
    >
      {/* Fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85"
          alt="Interior del restaurante"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p
          className="text-[28px] text-[#C9A96E]"
          style={{ fontFamily: "var(--font-script), cursive" }}
          data-reveal
        >
          Reservation
        </p>
        <h2
          className="mt-4 text-[42px] leading-[1.1] text-white md:text-[56px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
          data-reveal
          data-delay="100"
        >
          Book Your Table
        </h2>
        <div data-reveal data-delay="300" className="mt-10">
          <a
            href="#contact"
            className="inline-block border border-white px-10 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Online Booking
          </a>
        </div>
      </div>
    </section>
  );
}
