"use client";

import { useEffect, useRef, useState } from "react";

type Mensaje = { id: number; de: "bot" | "cliente"; texto: string };
type Respuesta = { texto: string; opciones: string[] };

const INICIO = [
  "¿Qué horario tienen?",
  "¿Cuánto cuesta una limpieza?",
  "Quiero una cita",
  "¿Dónde están?",
];

// Todo lo que dice el demo son datos de ejemplo, no de un cliente real.
function responder(pregunta: string): Respuesta {
  const otras = INICIO.filter((o) => o !== pregunta);

  switch (pregunta) {
    case "¿Qué horario tienen?":
      return {
        texto:
          "Atendemos de lunes a viernes de 9:00 a. m. a 8:00 p. m., y los sábados de 9:00 a. m. a 2:00 p. m.",
        opciones: otras,
      };
    case "¿Cuánto cuesta una limpieza?":
      return {
        texto:
          "La evaluación con limpieza cuesta S/ 80 e incluye radiografía digital. Dura 45 minutos y puedes pagar con Yape, Plin o tarjeta.",
        opciones: otras,
      };
    case "¿Dónde están?":
      return {
        texto:
          "Estamos en Jr. Raimondi 355, Pucallpa. Te envío la ubicación en el mapa para que llegues fácil.",
        opciones: otras,
      };
    case "Quiero una cita":
      return {
        texto: "¡Claro! ¿Para qué día quieres tu cita de evaluación?",
        opciones: ["Hoy", "Mañana"],
      };
    case "Hoy":
      return {
        texto: "Hoy quedan dos espacios: 4:00 p. m. y 6:30 p. m. ¿Cuál prefieres?",
        opciones: ["Hoy 4:00 p. m.", "Hoy 6:30 p. m."],
      };
    case "Mañana":
      return {
        texto: "Mañana hay turnos desde las 9:00 a. m. ¿Qué hora te queda mejor?",
        opciones: ["Mañana 10:00 a. m.", "Mañana 5:00 p. m."],
      };
    case "Volver al inicio":
      return { texto: "¡Claro! ¿En qué más te ayudo?", opciones: INICIO };
  }

  if (pregunta.startsWith("Hoy ") || pregunta.startsWith("Mañana ")) {
    const [dia, ...hora] = pregunta.split(" ");
    return {
      texto: `Listo, tu cita quedó para ${dia.toLowerCase()} a las ${hora.join(" ")} con la Dra. Ríos. Te escribiré por aquí un rato antes para recordártelo.`,
      opciones: ["Volver al inicio"],
    };
  }

  return { texto: "Déjame pasarte con una persona de la clínica.", opciones: INICIO };
}

const sinMovimiento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Conversación de ejemplo con un asistente de WhatsApp. Se muestra dentro del teléfono del hero. */
export default function ChatDemo() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: 0, de: "bot", texto: "¡Hola! Soy el asistente de Clínica Dental Alba. ¿En qué te ayudo?" },
  ]);
  const [opciones, setOpciones] = useState<string[]>(INICIO);
  const [escribiendo, setEscribiendo] = useState(false);

  const siguienteId = useRef(1);
  const temporizadores = useRef<number[]>([]);
  const autoplay = useRef<number | undefined>(undefined);
  const lista = useRef<HTMLDivElement>(null);

  const enviar = (pregunta: string) => {
    const idCliente = siguienteId.current++;
    const idBot = siguienteId.current++;
    const espera = sinMovimiento() ? 0 : 900;

    setOpciones([]);
    setMensajes((m) => [...m, { id: idCliente, de: "cliente", texto: pregunta }]);
    setEscribiendo(true);

    temporizadores.current.push(
      window.setTimeout(() => {
        const r = responder(pregunta);
        setEscribiendo(false);
        setMensajes((m) => [...m, { id: idBot, de: "bot", texto: r.texto }]);
        setOpciones(r.opciones);
      }, espera),
    );
  };

  // Un solo momento animado: al cargar, el demo hace la primera pregunta solo.
  useEffect(() => {
    autoplay.current = window.setTimeout(
      () => enviar("¿Qué horario tienen?"),
      sinMovimiento() ? 0 : 1600,
    );
    return () => {
      window.clearTimeout(autoplay.current);
      temporizadores.current.forEach((t) => window.clearTimeout(t));
      temporizadores.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Se mueve solo la lista del chat, nunca la página.
  useEffect(() => {
    const el = lista.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: sinMovimiento() ? "auto" : "smooth" });
  }, [mensajes, escribiendo]);

  return (
    <div id="demo" className="chat flex scroll-mt-28 flex-col bg-[var(--chat-fondo)] text-[var(--chat-texto)]">
      <div className="flex items-center gap-3 bg-[var(--chat-cabecera)] px-4 pb-3 pt-9 text-white">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-[#0f6b5f]">A</div>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold">Clínica Dental Alba</p>
          <p className="text-xs text-white/75">{escribiendo ? "escribiendo…" : "en línea"}</p>
        </div>
      </div>

      <div
        ref={lista}
        role="log"
        aria-live="polite"
        aria-label="Conversación de ejemplo con el asistente"
        className="h-[290px] space-y-2 overflow-y-auto px-3 py-4 [scrollbar-width:thin]"
      >
        {mensajes.map((m) => (
          <div
            key={m.id}
            className={`max-w-[86%] rounded-xl px-3 py-2 text-[13.5px] leading-snug shadow-[0_1px_0.5px_rgb(0_0_0/0.13)] ${
              m.de === "cliente"
                ? "ml-auto rounded-tr-sm bg-[var(--chat-sale)]"
                : "mr-auto rounded-tl-sm bg-[var(--chat-entra)]"
            }`}
          >
            {m.texto}
          </div>
        ))}
        {escribiendo && (
          <div className="mr-auto flex w-16 justify-center gap-1 rounded-xl rounded-tl-sm bg-[var(--chat-entra)] px-3 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-40 motion-reduce:animate-none"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="min-h-[124px] border-t border-black/5 bg-[var(--chat-pie)] px-3 pb-5 pt-3">
        {opciones.length > 0 && (
          <>
            <p className="mb-2 text-[11.5px] opacity-70">Toca una opción para responder:</p>
            <div className="flex flex-wrap gap-1.5">
              {opciones.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    window.clearTimeout(autoplay.current);
                    enviar(o);
                  }}
                  className="min-h-9 rounded-full border border-[var(--chat-opcion)]/35 px-3 py-1 text-[13px] text-[var(--chat-opcion)] transition-colors hover:bg-[var(--chat-opcion)] hover:text-[var(--chat-pie)]"
                >
                  {o}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
