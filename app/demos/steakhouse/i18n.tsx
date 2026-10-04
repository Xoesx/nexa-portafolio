"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

export type Idioma = "es" | "en";

const CLAVE = "steakhouse_idioma";
const EVENTO = "steakhouse-idioma";

export const TEXTOS = {
  es: {
    nav: [
      { label: "Inicio", href: "#home" },
      { label: "Nosotros", href: "#story" },
      { label: "Carta", href: "#menu" },
      { label: "Eventos", href: "#events" },
      { label: "Contacto", href: "#contact" },
      { label: "Reservas", href: "#reservation" },
    ],
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    cambiarIdioma: "Cambiar idioma",
    hero: { titulo: ["Una parrilla", "auténtica y", "de primera"], cta: "Reservar mesa", alt: "Bife a la parrilla con papas fritas" },
    historia: {
      antetitulo: "Descubre",
      titulo: "Nuestra historia",
      texto:
        "Cortes seleccionados, fuego de leña y un servicio que no tiene prisa. Ya sea una cena romántica, una reunión de trabajo, una celebración privada o un trago en la barra, aquí cada visita se recuerda.",
      cta: "Conocer más",
      alt: "Costillas a la parrilla sobre tabla de madera",
    },
    carta: {
      antetitulo: "Descubre",
      titulo: "Nuestra carta",
      texto:
        "Pocas cosas se comparan con un buen corte cocinado sin apuro. Nuestros parrilleros tratan cada pieza con el respeto que merece.",
      platos: [
        { nombre: "Entrada", descripcion: "Bowl fresco de hojas verdes, huevo, tofu dorado y maíz tostado para abrir el apetito." },
        { nombre: "Plato fuerte", descripcion: "Bife jugoso servido en sartén de hierro con papas doradas al romero." },
        { nombre: "Para compartir", descripcion: "Tabla de carnes en láminas con ensalada fresca, ají y salsas de la casa." },
        { nombre: "Postre", descripcion: "Helado artesanal con caramelo tibio y barquillo crocante para cerrar la noche." },
      ],
    },
    eventos: {
      antetitulo: "Descubre",
      titulo: "Próximos eventos",
      texto: "Además del mejor corte de la ciudad, aquí te reúnes con tus amigos de siempre alrededor de la parrilla.",
      evento: "Noche de parrilla",
      detalle: "26 de diciembre · Almuerzo · Casual",
      cta: "Ver más eventos",
      alt: "Personas cenando en el restaurante",
    },
    ingredientes: {
      antetitulo: "Descubre",
      titulo: "Los mejores ingredientes",
      texto:
        "Elegimos a nuestros proveedores con cuidado para que cada plato tenga el sabor más auténtico posible.",
      alt: "Corte de carne cruda",
    },
    reserva: {
      antetitulo: "Reservas",
      titulo: "Reserva tu mesa",
      texto: "Te confirmamos por teléfono en menos de una hora dentro del horario de atención.",
      campos: {
        nombre: "Nombre completo",
        telefono: "Teléfono",
        fecha: "Fecha",
        hora: "Hora",
        personas: "Personas",
        nota: "Comentarios (opcional)",
      },
      enviar: "Solicitar reserva",
      errores: {
        nombre: "Escribe tu nombre (mínimo 3 letras).",
        telefono: "Escribe un teléfono válido de 9 dígitos.",
        fecha: "Elige una fecha desde hoy en adelante.",
        hora: "Elige una hora entre las 12:00 y las 22:30.",
        personas: "Entre 1 y 20 personas.",
      },
      exito: (n: string, fecha: string, hora: string, p: number) =>
        `Gracias, ${n}. Recibimos tu solicitud para ${p} ${p === 1 ? "persona" : "personas"} el ${fecha} a las ${hora}.`,
      nota: "Demo: esta reserva no se envía a ningún lugar.",
      otra: "Hacer otra reserva",
    },
    pie: {
      ubicacion: "Ubicación",
      direccion: ["Av. Centenario 1220", "Pucallpa, Ucayali"],
      horario: "Horario",
      horas: ["Lunes a jueves · 12:00 – 22:00", "Viernes · 12:00 – 23:30", "Sábado y domingo · 12:00 – 23:30"],
      demo: "Demo hecha por NEXA",
    },
  },
  en: {
    nav: [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#story" },
      { label: "Menu", href: "#menu" },
      { label: "Events", href: "#events" },
      { label: "Contact", href: "#contact" },
      { label: "Reservations", href: "#reservation" },
    ],
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    cambiarIdioma: "Change language",
    hero: { titulo: ["A Premium", "And Authentic", "Steakhouse"], cta: "Book a table", alt: "Grilled steak with fries" },
    historia: {
      antetitulo: "Discover",
      titulo: "Our Story",
      texto:
        "Hand-picked cuts, a wood fire and service that never rushes you. Whether it's a romantic dinner, a business meeting, a private party or just a drink at the bar, every visit here is one to remember.",
      cta: "More about us",
      alt: "Grilled ribs on a wooden board",
    },
    carta: {
      antetitulo: "Discover",
      titulo: "Our Menu",
      texto:
        "Few things come close to a great cut cooked without hurry. Our grill masters treat every piece with the respect it deserves.",
      platos: [
        { nombre: "Starter", descripcion: "A fresh bowl of greens, egg, golden tofu and toasted corn to open the appetite." },
        { nombre: "Main Dish", descripcion: "A juicy steak served on a cast-iron skillet with rosemary roasted potatoes." },
        { nombre: "To Share", descripcion: "Sliced meat platter with fresh salad, chili and house sauces." },
        { nombre: "Dessert", descripcion: "Artisan ice cream with warm caramel and a crispy wafer to end the night." },
      ],
    },
    eventos: {
      antetitulo: "Discover",
      titulo: "Upcoming Events",
      texto: "Not only can you get the best steak in town — you can gather with old friends around the grill.",
      evento: "Barbecue Night",
      detalle: "December 26 · Lunch time · Casual",
      cta: "More events",
      alt: "People dining at the restaurant",
    },
    ingredientes: {
      antetitulo: "Discover",
      titulo: "The Best Ingredients",
      texto:
        "We choose our suppliers carefully so every dish tastes as delicious and authentic as possible.",
      alt: "Raw cut of beef",
    },
    reserva: {
      antetitulo: "Reservations",
      titulo: "Book Your Table",
      texto: "We'll confirm by phone within an hour during opening hours.",
      campos: {
        nombre: "Full name",
        telefono: "Phone",
        fecha: "Date",
        hora: "Time",
        personas: "Guests",
        nota: "Comments (optional)",
      },
      enviar: "Request booking",
      errores: {
        nombre: "Enter your name (at least 3 letters).",
        telefono: "Enter a valid 9-digit phone number.",
        fecha: "Pick a date from today onwards.",
        hora: "Pick a time between 12:00 and 22:30.",
        personas: "Between 1 and 20 guests.",
      },
      exito: (n: string, fecha: string, hora: string, p: number) =>
        `Thank you, ${n}. We received your request for ${p} ${p === 1 ? "guest" : "guests"} on ${fecha} at ${hora}.`,
      nota: "Demo: this booking is not sent anywhere.",
      otra: "Make another booking",
    },
    pie: {
      ubicacion: "Location",
      direccion: ["1220 Centenario Ave.", "Pucallpa, Peru"],
      horario: "Working Hours",
      horas: ["Monday – Thursday · 12 pm – 10 pm", "Friday · 12 pm – 11:30 pm", "Saturday – Sunday · 12 pm – 11:30 pm"],
      demo: "Demo built by NEXA",
    },
  },
};

export type Textos = (typeof TEXTOS)["es"];

// Respaldo cuando el navegador no permite localStorage (modo privado, etc.).
let enMemoria: Idioma = "es";

function leer(): Idioma {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado === "en" || guardado === "es" ? guardado : enMemoria;
  } catch {
    return enMemoria;
  }
}

function suscribir(aviso: () => void) {
  window.addEventListener(EVENTO, aviso);
  window.addEventListener("storage", aviso);
  return () => {
    window.removeEventListener(EVENTO, aviso);
    window.removeEventListener("storage", aviso);
  };
}

const Contexto = createContext<{ idioma: Idioma; t: Textos; cambiar: (i: Idioma) => void } | null>(null);

export function IdiomaProvider({ children }: { children: (idioma: Idioma) => React.ReactNode }) {
  // El servidor siempre renderiza en español; el navegador aplica la preferencia guardada.
  const idioma = useSyncExternalStore(suscribir, leer, () => "es" as const);

  const cambiar = useCallback((i: Idioma) => {
    enMemoria = i;
    try {
      localStorage.setItem(CLAVE, i);
    } catch {
      // Sin almacenamiento disponible: el cambio dura solo esta visita.
    }
    window.dispatchEvent(new Event(EVENTO));
  }, []);

  return <Contexto.Provider value={{ idioma, t: TEXTOS[idioma] as Textos, cambiar }}>{children(idioma)}</Contexto.Provider>;
}

export function useIdioma() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useIdioma debe usarse dentro de IdiomaProvider");
  return ctx;
}
