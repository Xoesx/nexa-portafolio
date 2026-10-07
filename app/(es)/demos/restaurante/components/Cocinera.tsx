import Image from "next/image";
import Link from "next/link";

export function Cocinera() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-24 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80"
              alt="Miguel emplatando un lomo saltado en la cocina"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 w-56 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:right-[-1.5rem]">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=75"
                alt="La parrilla encendida en la cocina"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl leading-[1.05] text-[#1F1A15] md:text-5xl" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}>
            Empezamos con cuatro mesas y la receta de lomo de mi papá.
          </h2>
          <figure className="mt-6">
            <blockquote className="max-w-lg space-y-4 border-l-2 border-[#C1440E] pl-5 text-[16px] leading-relaxed text-[#1F1A15]/80">
              <p>
                Abrimos en 2014 en un local chiquito del Jr. Comercio. Mi papá cocinaba, mi mamá Rosa atendía y yo lavaba platos
                después del colegio.
              </p>
              <p>
                Hoy somos 22 personas, pero el lomo saltado se sigue haciendo igual: en wok, a fuego alto y uno por uno. Si algún día
                lo hacemos en serie, cierro el restaurante.
              </p>
            </blockquote>
            <figcaption className="mt-6 pl-5 font-semibold text-[#1F1A15]">
              Miguel Huamán <span className="font-normal text-[#6E6457]">· Cocinero y dueño</span>
            </figcaption>
          </figure>
          <Link
            href="/demos/restaurante/nosotros"
            className="ml-5 mt-8 inline-flex min-h-12 items-center rounded-full bg-[#1F1A15] px-7 text-[15px] font-semibold text-white transition hover:bg-[#C1440E]"
          >
            Cómo empezó todo
          </Link>
        </div>
      </div>
    </section>
  );
}
