"use client";

import { useEffect, useRef, useState } from "react";

type Mensaje = { id: number; de: "bot" | "cliente"; texto: string };
type Respuesta = { texto: string; opciones: string[] };

const INICIO = [
  "¿Qué horario tienen?",
  "¿Cuánto cuesta un corte?",
  "Quiero reservar",
  "¿Dónde están?",
];

// Todo lo que dice el demo son datos de ejemplo, no de un cliente real.
function responder(pregunta: string): Respuesta {
  const otras = INICIO.filter((o) => o !== pregunta);

  switch (pregunta) {
    case "¿Qué horario tienen?":
      return {
        texto:
          "Atendemos de lunes a sábado, de 9:00 a. m. a 8:00 p. m. Los domingos, de 10:00 a. m. a 2:00 p. m.",
        opciones: otras,
      };
    case "¿Cuánto cuesta un corte?":
      return {
        texto:
          "Corte clásico: S/ 15. Corte y barba: S/ 25. Puedes pagar en efectivo, con Yape o con Plin.",
        opciones: otras,
      };
    case "¿Dónde están?":
      return {
        texto:
          "Estamos en Jr. Ejemplo 123, Pucallpa. Te envío la ubicación en el mapa para que llegues fácil.",
        opciones: otras,
      };
    case "Quiero reservar":
      return {
        texto: "Claro. ¿Para qué día quieres tu cita?",
        opciones: ["Hoy", "Mañana"],
      };
    case "Hoy":
      return {
        texto: "Hoy quedan turnos a las 4:00 p. m. y a las 6:30 p. m. ¿Cuál prefieres?",
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
      texto: `Listo, tu cita quedó anotada para ${dia.toLowerCase()} a las ${hora.join(" ")}. Te escribiré por aquí un rato antes para recordártelo.`,
      opciones: ["Volver al inicio"],
    };
  }

  return { texto: "Déjame pasarte con una persona del negocio.", opciones: INICIO };
}

const sinMovimiento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ChatDemo() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: 0, de: "bot", texto: "¡Hola! Soy el asistente de Barbería Demo. ¿En qué te ayudo?" },
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
      sinMovimiento() ? 0 : 1300,
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
    <div id="demo" className="scroll-mt-28">
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-selva"
        />
        <div className="relative overflow-hidden rounded-2xl border border-tinta/20 bg-white">
          <div className="flex items-center gap-3 bg-selva px-4 py-3 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-papel text-sm font-bold text-selva">
              B
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Barbería Demo</p>
              <p className="text-xs text-white/70">{escribiendo ? "escribiendo…" : "en línea"}</p>
            </div>
          </div>

          <div
            ref={lista}
            role="log"
            aria-live="polite"
            aria-label="Conversación de ejemplo con el asistente"
            className="h-[320px] space-y-2 overflow-y-auto bg-[#EFEAE2] px-3 py-4"
          >
            {mensajes.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-snug shadow-sm ${
                  m.de === "cliente"
                    ? "ml-auto rounded-tr-sm bg-[#D9FDD3]"
                    : "mr-auto rounded-tl-sm bg-white"
                }`}
              >
                {m.texto}
              </div>
            ))}
            {escribiendo && (
              <div className="mr-auto flex w-16 justify-center gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-3 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-tinta/40 motion-reduce:animate-none"
                    style={{ animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="min-h-[104px] border-t border-tinta/10 bg-white p-3">
            {opciones.length > 0 && (
              <>
                <p className="mb-2 text-xs text-tinta/60">Toca una opción para responder:</p>
                <div className="flex flex-wrap gap-2">
                  {opciones.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => {
                        window.clearTimeout(autoplay.current);
                        enviar(o);
                      }}
                      className="min-h-10 rounded-full border border-selva/30 px-3.5 py-1.5 text-sm text-selva transition-colors hover:bg-selva hover:text-white"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="mt-7 max-w-sm text-sm text-tinta/60">
        Demo con datos de ejemplo. El tuyo respondería con tus horarios, tus precios y tus turnos.
      </p>
    </div>
  );
}
