import { SaltParticles } from "./SaltParticles";
import { useIdioma } from "../i18n";

export function UpcomingEvents() {
  const { t } = useIdioma();
  return (
    <section id="events" className="relative bg-[#111111] py-28 md:py-40">
      <div className="mx-auto grid max-w-[1300px] gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:items-center">
        {/* Imagen con sal */}
        <div className="relative" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85"
              alt={t.eventos.alt}
              className="h-full w-full object-cover"
            />
            <SaltParticles count={40} />
          </div>
        </div>

        {/* Tarjeta blanca */}
        <div className="relative" data-reveal data-delay="200">
          <div className="bg-white p-10 md:p-14">
            <p
              className="text-2xl text-[#C9A96E]"
              style={{ fontFamily: "var(--font-script), cursive" }}
            >
              {t.eventos.antetitulo}
            </p>
            <h2
              className="mt-2 text-[34px] leading-[1.15] text-[#111111] md:text-[42px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
            >
              {t.eventos.titulo}
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#555555]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {t.eventos.texto}
            </p>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <p
                className="text-[17px] font-bold text-[#111111]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {t.eventos.evento}
              </p>
              <p className="mt-1 text-[13px] text-[#888888]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                {t.eventos.detalle}
              </p>
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#111111] transition hover:text-[#C9A96E]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {t.eventos.cta}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Cuchara decorativa */}
          <div className="absolute -bottom-6 -right-4 hidden h-32 w-8 md:block" style={{ transform: "rotate(35deg)" }}>
            <div className="mx-auto h-10 w-6 rounded-t-full bg-gradient-to-b from-amber-700 to-amber-900" />
            <div className="mx-auto h-20 w-2.5 bg-gradient-to-b from-amber-800 to-amber-950" />
          </div>
        </div>
      </div>
    </section>
  );
}
