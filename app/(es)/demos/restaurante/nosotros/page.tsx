import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Nosotros | Sabor Criollo",
  description: "Conoce al equipo detrás de Sabor Criollo en Pucallpa.",
};

const valores = [
  {
    icon: "🌿",
    titulo: "Ingredientes frescos",
    texto: "Compramos cada mañana en el mercado de Pucallpa. Nada de congelados ni conservantes.",
  },
  {
    icon: "👨‍🍳",
    titulo: "Recetas familiares",
    texto: "Cocinamos como nos enseñaron en casa. Sin atajos, sin apuros, sin imitaciones.",
  },
  {
    icon: "🤝",
    titulo: "Atención de barrio",
    texto: "Tratamos a cada cliente como vecino. Aquí no eres un ticket, eres alguien que vuelve.",
  },
];

const equipo = [
  {
    nombre: "Rosa Quispe",
    rol: "Fundadora y chef principal",
    bio: "Empezó con un puesto en el mercado en 2010. Sigue cocinando todos los días.",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
  },
  {
    nombre: "Marco Quispe",
    rol: "Chef de cocina",
    bio: "Hijo de Rosa. Aprendió a cocinar antes que a leer. Maneja el wok como nadie.",
    foto: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=85",
  },
  {
    nombre: "Lucía Torres",
    rol: "Jefa de postres",
    bio: "Sus suspiros a la limeña son los más pedidos del menú. Literalmente.",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85",
  },
  {
    nombre: "Pedro Ríos",
    rol: "Maître",
    bio: "Recibe a los clientes como si fueran a su casa. Lleva 8 años en el salón.",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
            Nosotros
          </p>
          <h1
            className="mx-auto mt-3 max-w-3xl text-[42px] leading-[1.05] md:text-[64px]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Cocina con historia,
            <br />
            <span className="italic text-[#C1440E]">servida con calma.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[#1F1A15]/70">
            Sabor Criollo nació en 2010 como un puesto en el mercado central de Pucallpa.
            Hoy somos un restaurante con 12 mesas, un equipo de 4 personas y las mismas recetas de siempre.
          </p>
        </div>
      </section>

      {/* Foto del equipo */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-[#F0E7D5] shadow-2xl">
          <Image width={1400} height={788} sizes="(min-width: 1152px) 1152px, 100vw"
            src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1400&q=85"
            alt="Equipo de Sabor Criollo"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Historia extendida */}
      <section className="bg-[#F5F0E6] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C1440E]">
              Nuestra historia
            </p>
            <h2
              className="mt-4 text-[32px] leading-[1.1] md:text-[42px]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
            >
              Empezamos con una olla y una mesa prestada.
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-[1.8] text-[#1F1A15]/75">
            <p>
              En 2010, Rosa Quispe puso un puesto en el mercado central de Pucallpa. Cocía
              el ají de gallina como se lo enseñó su madre, con la misma olla que trajo
              desde Huánuco. Vendía 30 platos al día.
            </p>
            <p>
              Diez años después, ese puesto se convirtió en un restaurante con 12 mesas,
              tres cocineros y una lista de clientes que vuelven cada semana. La olla sigue
              siendo la misma.
            </p>
            <p>
              No hemos cambiado la receta. No hemos cambiado la olla. Solo hemos aprendido
              a servir a más gente sin perder lo que nos trajo hasta acá.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
            Lo que nos define
          </p>
          <h2
            className="mt-3 text-[32px] leading-tight md:text-[42px]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            Tres cosas que no negociamos
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {valores.map((v) => (
            <div
              key={v.titulo}
              className="rounded-2xl border border-[#1F1A15]/8 bg-white p-8 transition hover:border-[#C1440E]/30 hover:shadow-lg"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#F0E7D5] text-2xl">
                {v.icon}
              </div>
              <h3
                className="mt-6 text-[20px] leading-tight text-[#1F1A15]"
                style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
              >
                {v.titulo}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#1F1A15]/65">{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-[#F5F0E6] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
              El equipo
            </p>
            <h2
              className="mt-3 text-[32px] leading-tight md:text-[42px]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
            >
              Las personas detrás de cada plato
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipo.map((p) => (
              <div key={p.nombre} className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#F0E7D5]">
                  <Image width={600} height={750} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={p.foto}
                    alt={p.nombre}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <h3
                  className="mt-5 text-[18px] leading-tight text-[#1F1A15]"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
                >
                  {p.nombre}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#C1440E]">
                  {p.rol}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#1F1A15]/70">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-[#1F1A15] px-8 py-16 text-center text-white md:px-16">
          <h2
            className="text-[32px] leading-tight md:text-[42px]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
          >
            ¿Nos visitas esta semana?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/60">
            Reserva una mesa o pasa sin reserva. Te esperamos con el ají fresco del día.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/demos/restaurante/reservar"
              className="rounded-full bg-[#C1440E] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition hover:bg-[#9A3410]"
            >
              Reservar mesa
            </Link>
            <Link
              href="/demos/restaurante/contacto"
              className="rounded-full border border-white/30 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition hover:bg-white/10"
            >
              Cómo llegar
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
