import { SaltParticles } from "./SaltParticles";
import { useIdioma } from "../i18n";

export function OurStory() {
  const { t } = useIdioma();
  return (
    <section id="story" className="relative bg-[#111111] py-28 md:py-40">
      <div className="mx-auto grid max-w-[1300px] gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:items-center">
        {/* Imagen con efecto sal en los bordes */}
        <div className="relative" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85"
              alt={t.historia.alt}
              className="h-full w-full object-cover"
            />
            <SaltParticles count={60} />
          </div>
        </div>

        {/* Tarjeta blanca */}
        <div className="relative" data-reveal data-delay="200">
          <div className="bg-white p-10 md:p-14">
            <p
              className="text-2xl text-[#C9A96E]"
              style={{ fontFamily: "var(--font-script), cursive" }}
            >
              {t.historia.antetitulo}
            </p>
            <h2
              className="mt-2 text-[34px] leading-[1.15] text-[#111111] md:text-[42px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
            >
              {t.historia.titulo}
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-[#555555]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {t.historia.texto}
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#111111] transition hover:text-[#C9A96E]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {t.historia.cta}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Decoración: ramas de hierbas que sobresalen */}
          <div className="absolute -bottom-4 -right-2 hidden h-20 w-32 md:block">
            <div className="h-16 w-2 rotate-[30deg] rounded-full bg-gradient-to-b from-green-700 to-green-900 opacity-80" />
            <div className="absolute top-4 left-6 h-14 w-2 rotate-[20deg] rounded-full bg-gradient-to-b from-green-600 to-green-800 opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
