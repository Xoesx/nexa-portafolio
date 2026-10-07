import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Nosotros | Sabor Criollo",
  description: "La familia detrás de Sabor Criollo: de un puesto de ají de gallina en el mercado Bellavista a un restaurante en el Jr. Comercio.",
};

const display = { fontFamily: "var(--font-display), Georgia, serif" };

const NO_CAMBIA = [
  {
    titulo: "Las compras del día",
    texto: "Rosa sigue yendo al mercado Bellavista cada mañana por las verduras, el pescado de río y la fruta de los jugos.",
  },
  {
    titulo: "Las recetas",
    texto: "El ají de gallina es el de Rosa y el lomo saltado, el de don Aurelio. Los preparamos igual que el primer día.",
  },
  {
    titulo: "La gente",
    texto: "Varios clientes vienen desde que éramos un puesto en el mercado. A muchos los saludamos por su nombre.",
  },
];

const EQUIPO = [
  {
    nombre: "Miguel Huamán",
    rol: "Cocinero y dueño",
    bio: "Lavaba platos aquí después del colegio. Desde 2020 lleva la cocina y sigue haciendo el lomo saltado uno por uno.",
    foto: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=85",
  },
  {
    nombre: "Rosa Quispe",
    rol: "Fundadora",
    bio: "Empezó con un puesto de ají de gallina en el mercado Bellavista en 2010. Todavía hace las compras cada mañana.",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
  },
  {
    nombre: "Lucía Torres",
    rol: "Postres",
    bio: "Prepara los postres desde 2016. Los domingos, sus suspiros a la limeña se acaban antes de las cuatro.",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85",
  },
  {
    nombre: "Pedro Ríos",
    rol: "Jefe de salón",
    bio: "Lleva ocho años en el salón y se acuerda de lo que pide cada cliente que vuelve.",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24">
          <h1 className="max-w-3xl text-[42px] leading-[1.05] md:text-[64px]" style={{ ...display, fontWeight: 400 }}>
            Una familia de Pucallpa cocinando desde 2010
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#1F1A15]/75">
            Sabor Criollo empezó como un puesto de ají de gallina en el mercado Bellavista. En 2014 abrimos el local del Jr. Comercio y
            hoy somos 22 personas entre la cocina y el salón.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-[#F0E7D5]">
            <Image
              src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1400&q=85"
              alt="La cocina de Sabor Criollo durante el almuerzo"
              fill
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="bg-[#F5F0E6] py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:gap-20">
            <h2 className="text-[32px] leading-[1.1] md:text-[42px]" style={{ ...display, fontWeight: 400 }}>
              Empezamos con una olla y una mesa prestada.
            </h2>
            <div className="space-y-5 text-[16px] leading-[1.8] text-[#1F1A15]/80">
              <p>
                En 2010, Rosa Quispe puso un puesto en el mercado Bellavista. Cocinaba el ají de gallina como se lo enseñó su madre, con
                la misma olla que trajo desde Huánuco, y vendía unos 30 platos al día.
              </p>
              <p>
                En 2014, con lo ahorrado, ella y su esposo Aurelio alquilaron un local chiquito en el Jr. Comercio. Tenía cuatro mesas, y
                él sumó a la carta su lomo saltado.
              </p>
              <p>
                Hoy la cocina la lleva su hijo Miguel. La olla de Huánuco sigue en la cocina, aunque ya solo sale los domingos.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2 className="text-[32px] leading-tight md:text-[42px]" style={{ ...display, fontWeight: 400 }}>
            Lo que no ha cambiado desde el mercado
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {NO_CAMBIA.map((v) => (
              <div key={v.titulo} className="border-t-2 border-[#C1440E] pt-5">
                <h3 className="text-[22px] leading-tight" style={{ ...display, fontWeight: 500 }}>
                  {v.titulo}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1F1A15]/75">{v.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F5F0E6] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-[32px] leading-tight md:text-[42px]" style={{ ...display, fontWeight: 400 }}>
              Quiénes cocinan y atienden
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {EQUIPO.map((p) => (
                <div key={p.nombre}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F0E7D5]">
                    <Image src={p.foto} alt={`Retrato de ${p.nombre}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-[20px] leading-tight" style={{ ...display, fontWeight: 500 }}>
                    {p.nombre}
                  </h3>
                  <p className="mt-1 text-[14px] font-semibold text-[#C1440E]">{p.rol}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#1F1A15]/75">{p.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl bg-[#1F1A15] px-8 py-14 text-white md:px-16">
            <h2 className="text-[32px] leading-tight md:text-[42px]" style={{ ...display, fontWeight: 400 }}>
              ¿Nos visitas esta semana?
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/75">
              Puedes reservar o venir sin reserva. Los fines de semana, después de la una, conviene reservar.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/demos/restaurante/reservar" className="rounded-full bg-[#C1440E] px-7 py-3.5 text-[15px] font-semibold transition hover:bg-[#9A3410]">
                Reservar mesa
              </Link>
              <Link href="/demos/restaurante/contacto" className="rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold transition hover:bg-white/10">
                Cómo llegar
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
