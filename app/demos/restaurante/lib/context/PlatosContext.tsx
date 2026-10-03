"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Plato } from "../../types";
import { MENU_COMPLETO } from "../../data/menu";
import { esImagenSegura, sanitizarTexto } from "../utils/seguridad";

const STORAGE_KEY = "nexa_sabor_criollo_platos_v4";

type Contexto = {
  platos: Plato[];
  agregarPlato: (p: Omit<Plato, "id">) => void;
  editarPlato: (id: string, p: Omit<Plato, "id">) => void;
  eliminarPlato: (id: string) => void;
  alternarDisponibilidad: (id: string) => void;
  resetearMenu: () => void;
  limpiarCache: () => void;
};

const PlatosContext = createContext<Contexto | null>(null);

/**
 * Normaliza un plato: sanitiza textos y valida la imagen.
 */
function normalizarPlato(p: Omit<Plato, "id">): Omit<Plato, "id"> {
  return {
    nombre: sanitizarTexto(p.nombre, 100),
    categoria: sanitizarTexto(p.categoria, 40),
    precio: Math.max(0, Math.min(9999, Number(p.precio) || 0)),
    descripcion: sanitizarTexto(p.descripcion, 500),
    imagen: esImagenSegura(p.imagen) ? p.imagen : "",
    disponible: p.disponible !== false,
    etiqueta: p.etiqueta,
  };
}

export function PlatosProvider({ children }: { children: React.ReactNode }) {
  const [platos, setPlatos] = useState<Plato[]>(MENU_COMPLETO);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (Array.isArray(parsed)) {
          setPlatos(parsed);
        }
      }
    } catch {
      // Si falla el parseo, usar los datos por defecto
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(platos));
    } catch (err) {
      // Si el storage está lleno, avisar sin romper la app
      if (err instanceof Error && err.name === "QuotaExceededError") {
        console.warn("localStorage lleno. Limpia el caché desde el admin.");
      }
    }
  }, [platos, cargado]);

  const agregarPlato = (datos: Omit<Plato, "id">) => {
    const limpio = normalizarPlato(datos);
    const nuevo: Plato = { ...limpio, id: `p_${Date.now()}` };
    setPlatos((prev) => [...prev, nuevo]);
  };

  const editarPlato = (id: string, datos: Omit<Plato, "id">) => {
    const limpio = normalizarPlato(datos);
    setPlatos((prev) => prev.map((p) => (p.id === id ? { ...limpio, id } : p)));
  };

  const eliminarPlato = (id: string) => {
    setPlatos((prev) => prev.filter((p) => p.id !== id));
  };

  const alternarDisponibilidad = (id: string) => {
    setPlatos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, disponible: !p.disponible } : p)),
    );
  };

  const resetearMenu = () => {
    setPlatos(MENU_COMPLETO);
  };

  const limpiarCache = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setPlatos(MENU_COMPLETO);
    } catch {}
  };

  return (
    <PlatosContext.Provider
      value={{
        platos,
        agregarPlato,
        editarPlato,
        eliminarPlato,
        alternarDisponibilidad,
        resetearMenu,
        limpiarCache,
      }}
    >
      {children}
    </PlatosContext.Provider>
  );
}

export function usePlatos() {
  const ctx = useContext(PlatosContext);
  if (!ctx) throw new Error("usePlatos debe usarse dentro de PlatosProvider");
  return ctx;
}
