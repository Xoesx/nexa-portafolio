import Image from "next/image";
import { SaltParticles } from "./SaltParticles";
import { useIdioma } from "../i18n";

export function BestIngredients() {
  const { t } = useIdioma();
  return (
    <section className="relative bg-[#111111] py-28 md:py-40">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10">
        {/* Encabezado centrado */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-2xl text-[#C9A96E]"
            style={{ fontFamily: "var(--font-script), cursive" }}
            data-reveal
          >
            {t.ingredientes.antetitulo}
          </p>
          <h2
            className="mt-2 text-[38px] leading-[1.15] text-white md:text-[48px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
            data-reveal
            data-delay="100"
          >
            {t.ingredientes.titulo}
          </h2>
          <p
            className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.8] text-[#B0B0B0]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            data-reveal
            data-delay="200"
          >
            {t.ingredientes.texto}
          </p>
        </div>

        {/* Composición cenital de ingredientes */}
        <div className="relative mt-20" data-reveal data-delay="300">
          <div className="relative mx-auto aspect-square w-full max-w-[700px]">
            {/* Carne central */}
            <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <Image width={900} height={900} sizes="(min-width: 768px) 390px, 55vw"
                src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=900&q=85"
                alt={t.ingredientes.alt}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Ingredientes alrededor con posiciones absolutas */}
            {/* Cuchara con tomates */}
            <div className="absolute left-[6%] top-[45%] hidden md:block" style={{ transform: "rotate(-10deg)" }}>
              <div className="flex h-36 w-7 flex-col items-center">
                <div className="h-6 w-6 rounded-full bg-red-500 shadow-lg" />
                <div className="h-6 w-6 rounded-full bg-red-500 -mt-1 shadow-lg" />
                <div className="h-20 w-3 rounded-b-full bg-gradient-to-b from-amber-700 to-amber-900" />
              </div>
            </div>

            {/* Hierbas varias */}
            <div className="absolute left-[3%] top-[20%] hidden h-20 w-3 rotate-[-20deg] rounded-full bg-gradient-to-b from-green-600 to-green-800 md:block" />
            <div className="absolute left-[10%] bottom-[8%] hidden h-24 w-3 rotate-[15deg] rounded-full bg-gradient-to-b from-green-500 to-green-700 md:block" />
            <div className="absolute right-[6%] top-[18%] hidden h-20 w-3 rotate-[25deg] rounded-full bg-gradient-to-b from-green-600 to-green-800 md:block" />
            <div className="absolute right-[10%] bottom-[15%] hidden h-24 w-3 rotate-[-15deg] rounded-full bg-gradient-to-b from-green-500 to-green-700 md:block" />

            {/* Pimiento rojo */}
            <div className="absolute right-[8%] bottom-[8%] hidden h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-xl md:block" />

            {/* Cebolla morada */}
            <div className="absolute right-[12%] top-[42%] hidden h-10 w-10 rounded-full border-4 border-purple-600 bg-purple-500/30 md:block" />

            {/* Sal */}
            <SaltParticles count={70} className="-inset-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
