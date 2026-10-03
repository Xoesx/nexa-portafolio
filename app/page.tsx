import type { Metadata } from "next";
import Image from "next/image";
import { Figtree, Young_Serif } from "next/font/google";
import ChatDemo from "./ChatDemo";

const titulos = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-titulos",
});
const texto = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-texto",
});

export const metadata: Metadata = {
  title: "NEXA | Páginas web y asistentes de WhatsApp en Pucallpa",
  description:
    "Páginas web, asistentes de WhatsApp con IA y automatizaciones para negocios de Pucallpa y todo el Perú. Precios en soles y propuesta por escrito antes de empezar.",
  openGraph: {
    title: "NEXA | Páginas web y asistentes de WhatsApp",
    description:
      "Hacemos que tu negocio responda a tiempo y se vea bien en internet. Pucallpa, Perú.",
    locale: "es_PE",
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/* Contacto                                                            */
/* ------------------------------------------------------------------ */
const WHATSAPP = "51918641720";
const wa = (mensaje: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
const cotizar = wa("Hola NEXA, quiero cotizar una solución digital.");
const externo = { target: "_blank", rel: "noopener noreferrer" } as const;

/* ------------------------------------------------------------------ */
/* Contenido que vas llenando tú                                       */
/* Las secciones "Trabajos" y "Reseñas" aparecen solas cuando estos    */
/* arreglos tengan algo. Mientras estén vacíos, no se muestran.        */
/* ------------------------------------------------------------------ */
type Proyecto = {
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: string; // ruta dentro de /public, por ejemplo "/trabajos/clinica.jpg"
  url?: string;
};
const proyectos: Proyecto[] = [];

type Resena = { nombre: string; negocio: string; texto: string };
const resenas: Resena[] = [];

type Demo = {
  nombre: string;
  tipo: string;
  descripcion: string;
  caracteristicas: string[];
  url?: string; // cuando tengas la demo lista, pega aquí el enlace
};
const demos: Demo[] = [
{
  nombre: "Restaurante",
  tipo: "Menú digital + reservas",
  descripcion: "Menú con fotos, botón de WhatsApp para pedidos y sistema de reservas sin llamadas.",
  caracteristicas: ["Menú editable", "Reservas por WhatsApp", "Ubicación con mapa"],
  url: "/demos/restaurante",
},
  {
    nombre: "Tienda de ropa",
    tipo: "Catálogo digital",
    descripcion:
      "Catálogo con fotos, tallas disponibles y pedido directo por WhatsApp.",
    caracteristicas: ["Catálogo con filtros", "Pedidos por WhatsApp", "Control de stock"],
  },
  {
    nombre: "Clínica dental",
    tipo: "Citas y automatización",
    descripcion:
      "Agenda de citas con recordatorios automáticos y asistente que responde a cualquier hora.",
    caracteristicas: ["Agendamiento online", "Recordatorios automáticos", "Asistente 24/7"],
  },
];

/* ------------------------------------------------------------------ */
/* Textos                                                              */
/* ------------------------------------------------------------------ */
const enlaces = [
  { label: "Servicios", href: "#servicios" },
  { label: "Demos", href: "#demos" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Precios", href: "#precios" },
  { label: "Preguntas", href: "#faq" },
];


const servicios = [
  {
    titulo: "Páginas web",
    texto:
      "Tu negocio con su propia página: se ve bien en el celular, carga rápido aunque el internet no sea el mejor y tiene un botón directo a tu WhatsApp.",
    ejemplo: "Para una clínica, un restaurante o una tienda que quiere que la encuentren en Google.",
  },
  {
    titulo: "Asistente de WhatsApp",
    texto:
      "Responde las preguntas de siempre (horarios, precios, ubicación), toma datos para reservas o pedidos y te avisa cuando un cliente necesita hablar contigo.",
    ejemplo: "Como el demo que ves arriba, pero con la información de tu negocio.",
  },
  {
    titulo: "Automatizaciones",
    texto:
      "Quitamos tareas repetitivas: pasar pedidos a una hoja de cálculo, enviar recordatorios de citas, avisarte cuando llega un formulario.",
    ejemplo: "Para que dejes de copiar y pegar lo mismo todos los días.",
  },
  {
    titulo: "Sistemas a medida",
    texto:
      "Un panel para llevar tus clientes, tus citas o tu inventario, hecho según cómo trabajas y no al revés.",
    ejemplo: "Cuando una hoja de cálculo ya se te quedó corta.",
  },
];

const pasos = [
  {
    titulo: "Nos cuentas tu caso",
    texto: "Por WhatsApp o videollamada. Me explicas cómo funciona tu negocio y qué te gustaría resolver.",
  },
  {
    titulo: "Recibes una propuesta por escrito",
    texto: "Qué incluye, cuánto cuesta y en cuántos días. Si no te convence, no pasa nada.",
  },
  {
    titulo: "Construimos y te mostramos avances",
    texto: "Ves cómo va quedando y puedes pedir cambios mientras se construye, no al final.",
  },
  {
    titulo: "Entregamos y te enseñamos a usarlo",
    texto: "Queda funcionando, te explicamos cómo manejarlo y seguimos atentos durante tu periodo de soporte.",
  },
];

const planes = [
  {
    nombre: "Emprendedor",
    para: "Para empezar a estar en internet",
    precio: "300",
    incluye: [
      "Página de una sola sección (landing)",
      "Botón de WhatsApp y formulario de contacto",
      "Diseño que se adapta al celular",
      "1 mes de soporte",
    ],
  },
  {
    nombre: "Negocio",
    para: "Para mostrar todo lo que ofreces",
    precio: "600",
    destacado: true,
    incluye: [
      "Web completa con varias secciones",
      "Panel de administración",
      "Asistente de WhatsApp con IA (opcional)",
      "SEO básico para aparecer en Google",
      "Capacitación para que lo manejes tú",
      "3 meses de soporte",
    ],
  },
  {
    nombre: "A medida",
    para: "Para sistemas y automatizaciones",
    precio: "1000",
    incluye: [
      "Sistema hecho según tu forma de trabajar",
      "Conexión con otras herramientas (APIs)",
      "Automatizaciones avanzadas",
      "Base de datos propia",
      "Soporte prioritario",
    ],
  },
];

const preguntas = [
  {
    q: "¿Cómo se paga?",
    a: "50% para empezar y 50% al entregar. Aceptamos Yape, Plin y transferencia bancaria. Si el proyecto es grande, se puede dividir en 2 o 3 pagos.",
  },
  {
    q: "¿Cuánto demora mi proyecto?",
    a: "Depende de lo que necesites. Una landing puede estar lista en 3 a 5 días hábiles, una web completa en 1 a 2 semanas y un sistema a medida entre 2 y 4 semanas. El plazo exacto va en la propuesta.",
  },
  {
    q: "¿Hay soporte después de entregar?",
    a: "Sí. El plan Emprendedor incluye 1 mes y el plan Negocio, 3 meses. Pasado ese tiempo, puedes contratar un mantenimiento mensual o pedir ayuda cuando la necesites.",
  },
  {
    q: "¿Trabajan solo en Pucallpa?",
    a: "No. Estamos en Pucallpa, pero atendemos a negocios de todo el Perú de forma 100% online, por WhatsApp y videollamada.",
  },
  {
    q: "¿Puedo pedir cambios mientras se construye?",
    a: "Sí. Te mostramos avances durante el proceso para que puedas decir qué ajustar antes de la entrega, no después.",
  },
];

/* ------------------------------------------------------------------ */
/* Íconos                                                              */
/* ------------------------------------------------------------------ */
function IconoWhatsApp({ tam = 22 }: { tam?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={tam} height={tam} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function Check() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[#E8590C]" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div
      className={`${titulos.variable} ${texto.variable} min-h-screen bg-[#F3F5F1] text-[#13201E] antialiased selection:bg-[#C2410C] selection:text-white`}
      style={{ fontFamily: "var(--font-texto), system-ui, sans-serif" }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        .nx-titulos { font-family: var(--font-titulos), Georgia, "Times New Roman", serif; font-weight: 400; }
        a:focus-visible, button:focus-visible, summary:focus-visible { outline: 2px solid #C2410C; outline-offset: 3px; border-radius: 6px; }
        .nx-oscuro a:focus-visible { outline-color: #FFB27A; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* ============ Cabecera ============ */}
      <header className="sticky top-0 z-40 border-b border-[#13201E]/10 bg-[#F3F5F1]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#inicio" className="nx-titulos text-2xl tracking-tight">
            NEXA
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-8 text-[15px] md:flex">
            {enlaces.map((e) => (
              <a key={e.href} href={e.href} className="text-[#13201E]/70 transition-colors hover:text-[#13201E]">
                {e.label}
              </a>
            ))}
          </nav>

          <a
            href={cotizar}
            {...externo}
            className="inline-flex items-center gap-2 rounded-full bg-[#13201E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C]"
          >
            <IconoWhatsApp tam={16} />
            Escribir por WhatsApp
          </a>
        </div>

        <nav aria-label="Secciones" className="flex gap-6 overflow-x-auto border-t border-[#13201E]/10 px-5 py-2 text-sm text-[#13201E]/70 md:hidden">
          {enlaces.map((e) => (
            <a key={e.href} href={e.href} className="whitespace-nowrap">
              {e.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="inicio">
        {/* ============ Hero ============ */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="nx-titulos text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl">
              Que tu negocio responda a tiempo, incluso cuando tú no puedes.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#13201E]/75">
              Hacemos páginas web y asistentes de WhatsApp para negocios de Pucallpa y de todo el Perú. NEXA es un estudio pequeño: hablas directamente con quien construye tu proyecto, y recibes precio y plazo por escrito antes de pagar.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={cotizar}
                {...externo}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#C2410C] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#9A3412]"
              >
                <IconoWhatsApp tam={20} />
                Cotizar por WhatsApp
              </a>
              <a href="#precios" className="font-semibold underline decoration-[#13201E]/30 underline-offset-4 transition-colors hover:decoration-[#C2410C]">
                Ver precios
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-[#13201E]/15 pt-6 text-sm text-[#13201E]/70">
              <li>Respondemos en menos de 24 horas</li>
              <li>Atendemos de lunes a sábado</li>
              <li>Pagos con Yape, Plin o transferencia</li>
            </ul>
          </div>

          <ChatDemo />
        </section>

        {/* ============ Servicios ============ */}
        <section id="servicios" className="scroll-mt-28 border-t border-[#13201E]/10">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.7fr] md:py-28">
            <div>
              <h2 className="nx-titulos text-3xl tracking-tight sm:text-4xl">Lo que hacemos</h2>
              <p className="mt-4 max-w-sm leading-relaxed text-[#13201E]/70">
                No partimos de una plantilla. Primero entendemos cómo trabaja tu negocio y después construimos lo que de verdad te ahorra tiempo o te trae clientes.
              </p>
            </div>

            <ul className="divide-y divide-[#13201E]/15 border-y border-[#13201E]/15">
              {servicios.map((s) => (
                <li key={s.titulo} className="grid gap-2 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <h3 className="nx-titulos text-xl">{s.titulo}</h3>
                  <div>
                    <p className="leading-relaxed">{s.texto}</p>
                    <p className="mt-2 text-sm text-[#13201E]/60">{s.ejemplo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

{/* ============ Demos ============ */}
<section id="demos" className="scroll-mt-28 border-t border-[#13201E]/10">
  <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
    <div className="max-w-2xl">
      <h2 className="nx-titulos text-3xl tracking-tight sm:text-4xl">
        Demos que puedes probar tú mismo
      </h2>
      <p className="mt-4 leading-relaxed text-[#13201E]/70">
        No te mostramos capturas bonitas. Te dejamos probar cómo se vería tu negocio con estos ejemplos reales que armamos para cada rubro.
      </p>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {demos.map((d) => (
        <article
          key={d.nombre}
          className="flex flex-col rounded-2xl border border-[#13201E]/15 bg-white p-7"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C2410C]">
            {d.tipo}
          </span>
          <h3 className="nx-titulos mt-2 text-2xl">{d.nombre}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[#13201E]/75">
            {d.descripcion}
          </p>
          <ul className="mt-5 flex-1 space-y-2 text-sm text-[#13201E]/70">
            {d.caracteristicas.map((c) => (
              <li key={c} className="flex gap-2">
                <Check />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          {d.url ? (
            <a
              href={d.url}
              {...externo}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#13201E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C]"
            >
              Probar demo
            </a>
          ) : (
            <span className="mt-6 inline-flex items-center justify-center rounded-full border border-dashed border-[#13201E]/30 px-5 py-2.5 text-sm font-medium text-[#13201E]/50">
              Demo próximamente
            </span>
          )}
        </article>
      ))}
    </div>

    <p className="mt-8 max-w-2xl text-sm text-[#13201E]/60">
      ¿Quieres ver un demo hecho con la información de tu propio negocio?{" "}
      <a
        href={wa("Hola NEXA, quiero ver un demo con mi negocio.")}
        {...externo}
        className="font-semibold text-[#C2410C] underline underline-offset-4"
      >
        Pídelo por WhatsApp
      </a>
      .
    </p>
  </div>
</section>

        {/* ============ Proceso ============ */}
        <section id="proceso" className="nx-oscuro scroll-mt-28 bg-[#0E3A34] text-[#F3F5F1]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="nx-titulos max-w-xl text-3xl tracking-tight sm:text-4xl">Cómo trabajamos juntos</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[#F3F5F1]/75">
              Sin letra chica: antes de pagar sabes qué vas a recibir, cuánto cuesta y en cuánto tiempo.
            </p>

            <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
              {pasos.map((p, i) => (
                <li key={p.titulo} className="border-t border-[#F3F5F1]/25 pt-5">
                  <span className="nx-titulos text-4xl text-[#FFB27A]">{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{p.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#F3F5F1]/75">{p.texto}</p>
                </li>
              ))}
            </ol>

            <p className="mt-14 max-w-xl border-l-2 border-[#FFB27A] pl-4 text-[15px] leading-relaxed text-[#F3F5F1]/90">
              Forma de pago: 50% para empezar y 50% al entregar, con Yape, Plin o transferencia.
            </p>
          </div>
        </section>

        {/* ============ Trabajos (solo si hay) ============ */}
        {proyectos.length > 0 && (
          <section id="trabajos" className="scroll-mt-28 border-b border-[#13201E]/10">
            <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
              <h2 className="nx-titulos max-w-xl text-3xl tracking-tight sm:text-4xl">Trabajos reales</h2>
              <div className="mt-12 grid gap-10 md:grid-cols-2">
                {proyectos.map((p) => (
                  <article key={p.nombre}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#13201E]/15 bg-white">
                      <Image src={p.imagen} alt={`Captura de ${p.nombre}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                    </div>
                    <h3 className="nx-titulos mt-5 text-2xl">{p.nombre}</h3>
                    <p className="mt-1 text-sm text-[#13201E]/60">{p.tipo}</p>
                    <p className="mt-3 leading-relaxed text-[#13201E]/80">{p.descripcion}</p>
                    {p.url && (
                      <a href={p.url} {...externo} className="mt-4 inline-block font-semibold underline decoration-[#13201E]/30 underline-offset-4 hover:decoration-[#C2410C]">
                        Visitar el sitio
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ Precios ============ */}
        <section id="precios" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="nx-titulos max-w-xl text-3xl tracking-tight sm:text-4xl">Precios en soles</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[#13201E]/70">
              Son precios de partida. El monto final depende de lo que necesites, y lo confirmas por escrito antes de pagar.
            </p>

            <div className="mt-12 grid divide-y divide-[#13201E]/15 overflow-hidden rounded-2xl border border-[#13201E]/15 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
              {planes.map((p) => (
                <div
                  key={p.nombre}
                  className={`flex flex-col p-7 sm:p-9 ${p.destacado ? "bg-[#13201E] text-[#F3F5F1]" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="nx-titulos text-2xl">{p.nombre}</h3>
                    {p.destacado && <span className="text-sm font-semibold text-[#FFB27A]">Recomendado</span>}
                  </div>
                  <p className={`mt-1 text-sm ${p.destacado ? "text-[#F3F5F1]/70" : "text-[#13201E]/60"}`}>{p.para}</p>

                  <p className="mt-7 flex items-baseline gap-2">
                    <span className={`text-sm ${p.destacado ? "text-[#F3F5F1]/70" : "text-[#13201E]/60"}`}>desde</span>
                    <span className="nx-titulos text-5xl tracking-tight">S/ {p.precio}</span>
                  </p>

                  <ul className="mt-7 flex-1 space-y-3 text-[15px] leading-snug">
                    {p.incluye.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={wa(`Hola NEXA, me interesa el plan ${p.nombre}. ¿Podemos conversar?`)}
                    {...externo}
                    className={`mt-9 block rounded-full px-5 py-3 text-center font-semibold transition-colors ${
                      p.destacado
                        ? "bg-[#FFB27A] text-[#13201E] hover:bg-white"
                        : "border border-[#13201E]/30 hover:bg-[#13201E] hover:text-white"
                    }`}
                  >
                    Consultar este plan
                  </a>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-[#13201E]/60">
              ¿Tu caso no encaja en ninguno?{" "}
              <a href={cotizar} {...externo} className="font-semibold text-[#C2410C] underline underline-offset-4">
                Cuéntanos qué necesitas
              </a>{" "}
              y armamos una propuesta.
            </p>
          </div>
        </section>

        {/* ============ Reseñas (solo si hay) ============ */}
        {resenas.length > 0 && (
          <section id="resenas" className="scroll-mt-28 border-t border-[#13201E]/10">
            <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
              <h2 className="nx-titulos max-w-xl text-3xl tracking-tight sm:text-4xl">Lo que dicen quienes ya trabajaron con nosotros</h2>
              <div className="mt-12 grid gap-10 md:grid-cols-3">
                {resenas.map((r) => (
                  <figure key={r.nombre} className="border-t-2 border-[#13201E] pt-5">
                    <blockquote className="leading-relaxed">“{r.texto}”</blockquote>
                    <figcaption className="mt-4 text-sm text-[#13201E]/70">
                      <span className="font-semibold text-[#13201E]">{r.nombre}</span>, {r.negocio}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ Preguntas ============ */}
        <section id="faq" className="scroll-mt-28 border-t border-[#13201E]/10">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1fr_1.7fr] md:py-28">
            <h2 className="nx-titulos text-3xl tracking-tight sm:text-4xl">Preguntas frecuentes</h2>

            <div className="border-t border-[#13201E]/15">
              {preguntas.map((f) => (
                <details key={f.q} className="group border-b border-[#13201E]/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="text-2xl font-normal text-[#C2410C] transition-transform group-open:rotate-45 motion-reduce:transition-none">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 leading-relaxed text-[#13201E]/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Contacto ============ */}
        <section id="contacto" className="scroll-mt-28 border-t border-[#13201E]/10">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:items-end md:py-28">
            <div>
              <h2 className="nx-titulos max-w-2xl text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                Cuéntanos qué necesita tu negocio.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#13201E]/75">
                Escríbenos por WhatsApp. Te respondemos en menos de 24 horas y la primera conversación no te cuesta nada.
              </p>
            </div>
            <div>
              <a
                href={cotizar}
                {...externo}
                className="inline-flex items-center gap-3 rounded-full bg-[#C2410C] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#9A3412]"
              >
                <IconoWhatsApp tam={24} />
                918 641 720
              </a>
              <p className="mt-3 text-sm text-[#13201E]/60">Atendemos de lunes a sábado.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ============ Pie ============ */}
      <footer className="nx-oscuro bg-[#13201E] text-[#F3F5F1]/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="nx-titulos text-2xl text-[#F3F5F1]">NEXA</p>
            <p className="mt-1 text-sm">Soluciones digitales</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              Páginas web, asistentes de WhatsApp y automatizaciones para negocios de Pucallpa y de todo el Perú.
            </p>
          </div>
          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-8 gap-y-2 text-sm md:justify-end md:self-end">
            {enlaces.map((e) => (
              <a key={e.href} href={e.href} className="transition-colors hover:text-white">
                {e.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-[#F3F5F1]/10">
          <p className="mx-auto max-w-6xl px-5 py-5 text-xs">© 2026 NEXA Soluciones Digitales. Pucallpa, Ucayali, Perú.</p>
        </div>
      </footer>

      {/* ============ Botón flotante ============ */}
      <a
        href={cotizar}
        {...externo}
        aria-label="Escribir por WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#1F9D55] text-white shadow-lg transition-colors hover:bg-[#178044]"
      >
        <IconoWhatsApp tam={28} />
      </a>
    </div>
  );
}
