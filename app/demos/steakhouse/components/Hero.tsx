import { SaltParticles } from "./SaltParticles";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#111111]"
    >
      <div className="mx-auto grid w-full max-w-[1300px] gap-12 px-6 pt-32 pb-20 md:px-10 lg:grid-cols-2 lg:items-center">
        {/* Columna izquierda: texto */}
        <div className="relative z-10">
          <h1
            className="text-[42px] leading-[1.1] text-white md:text-[56px] lg:text-[64px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
            data-reveal
          >
            A Premium
            <br />
            And Authentic
            <br />
            Steakhouse
          </h1>

          <div data-reveal data-delay="300" className="mt-10">
            <a
              href="#reservation"
              className="inline-block border border-white px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Book A Table
            </a>
          </div>
        </div>

        {/* Columna derecha: imagen cenital */}
        <div className="relative" data-reveal data-delay="400">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {/* Imagen principal: sartén con steak */}
            <img
              src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000&q=85"
              alt="Steak en sartén de hierro"
              className="relative z-10 h-full w-full rounded-full object-cover shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
            />
            {/* Sal alrededor de la imagen */}
            <SaltParticles count={50} className="-inset-16" />

            {/* Cuchara con tomates (decorativa) */}
            <div className="absolute -right-8 top-1/3 z-20 hidden md:block" style={{ transform: "rotate(15deg)" }}>
              <div className="flex h-32 w-6 flex-col items-center">
                <div className="h-5 w-5 rounded-full bg-red-500 shadow-lg" />
                <div className="h-5 w-5 rounded-full bg-red-500 shadow-lg -mt-1" />
                <div className="h-24 w-3 rounded-b-full bg-gradient-to-b from-amber-700 to-amber-900" />
              </div>
            </div>

            {/* Hojas verdes decorativas */}
            <div className="absolute -left-6 bottom-1/4 z-20 hidden md:block">
              <div className="h-24 w-3 rotate-[-25deg] rounded-full bg-gradient-to-b from-green-600 to-green-800" />
            </div>
            <div className="absolute -left-2 bottom-1/3 z-20 hidden md:block">
              <div className="h-16 w-2.5 rotate-[-40deg] rounded-full bg-gradient-to-b from-green-500 to-green-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Detalle: pimienta alrededor del hero */}
      <SaltParticles count={80} className="opacity-60" />
    </section>
  );
}
