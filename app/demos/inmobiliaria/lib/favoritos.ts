"use client";

import { useSyncExternalStore } from "react";

const CLAVE = "raices_favoritos";
const EVENTO = "raices-favoritos";
const VACIO: string[] = [];

// useSyncExternalStore exige devolver la misma referencia si nada cambió:
// guardamos el último texto leído y su lista ya convertida.
let cache: { texto: string | null; lista: string[] } = { texto: null, lista: VACIO };

function leer(): string[] {
  let texto: string | null = null;
  try {
    texto = localStorage.getItem(CLAVE);
  } catch {
    return cache.lista;
  }
  if (texto === cache.texto) return cache.lista;
  let lista = VACIO;
  try {
    const datos = JSON.parse(texto ?? "[]");
    if (Array.isArray(datos)) lista = datos.filter((x): x is string => typeof x === "string");
  } catch {
    // Valor corrupto: empezamos de cero.
  }
  cache = { texto, lista };
  return lista;
}

function suscribir(aviso: () => void) {
  window.addEventListener(EVENTO, aviso);
  window.addEventListener("storage", aviso);
  return () => {
    window.removeEventListener(EVENTO, aviso);
    window.removeEventListener("storage", aviso);
  };
}

export function useFavoritos() {
  const favoritos = useSyncExternalStore(suscribir, leer, () => VACIO);

  const alternar = (id: string) => {
    const actual = leer();
    const nueva = actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id];
    try {
      localStorage.setItem(CLAVE, JSON.stringify(nueva));
    } catch {
      cache = { texto: JSON.stringify(nueva), lista: nueva };
    }
    window.dispatchEvent(new Event(EVENTO));
  };

  return { favoritos, alternar, esFavorito: (id: string) => favoritos.includes(id) };
}
