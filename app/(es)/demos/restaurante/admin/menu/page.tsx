"use client";

import { useMemo, useState } from "react";
import { usePlatos } from "../../lib/context/PlatosContext";
import type { Plato, EtiquetaPlato } from "../../types";
import { CATEGORIAS } from "../../data/menu";
import { ImageUploader } from "../../components/ImageUploader";

type FormState = Omit<Plato, "id"> & { id?: string };
const VACIO: FormState = {
  nombre: "",
  categoria: "Principales",
  precio: 0,
  descripcion: "",
  imagen: "",
  etiqueta: undefined,
  disponible: true,
};

export default function AdminMenu() {
  const { platos, agregarPlato, editarPlato, eliminarPlato, alternarDisponibilidad, resetearMenu } = usePlatos();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<FormState>(VACIO);
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [confirmar, setConfirmar] = useState<Plato | null>(null);

  const filtrados = useMemo(() => {
    let lista = platos;
    if (filtro !== "Todos") lista = lista.filter((p) => p.categoria === filtro);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      lista = lista.filter((p) => p.nombre.toLowerCase().includes(q));
    }
    return lista;
  }, [platos, filtro, busqueda]);

  const abrirNuevo = () => {
    setForm(VACIO);
    setModal(true);
  };

  const abrirEditar = (p: Plato) => {
    setForm({ ...p });
    setModal(true);
  };

  const guardar = () => {
    if (!form.nombre.trim() || form.precio <= 0) {
      alert("Completa el nombre y un precio mayor a 0");
      return;
    }
    if (!form.imagen) {
      alert("Sube una imagen o pega una URL para el plato");
      return;
    }
    if (form.id) {
      const { id, ...datos } = form;
      editarPlato(id, datos);
    } else {
      agregarPlato(form);
    }
    setModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Menú del restaurante</h1>
          <p className="mt-1 text-sm text-gray-400">
            Agrega, edita o elimina platos. Los cambios se ven al instante en el sitio público.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { if (confirm("¿Restaurar menú original de 35 platos?")) resetearMenu(); }}
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-[#C1440E] hover:text-white"
          >
            Restaurar
          </button>
          <button
            onClick={abrirNuevo}
            className="rounded-full bg-[#C1440E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9A3410]"
          >
            + Agregar plato
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 min-w-[240px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar plato..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["Todos", ...CATEGORIAS].map((cat) => {
          const count = cat === "Todos" ? platos.length : platos.filter((p) => p.categoria === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filtro === cat ? "bg-[#C1440E] text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cat} · {count}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-gray-500">
            No hay platos que coincidan.
          </div>
        ) : (
          filtrados.map((p) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-[#C1440E]/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                {p.imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imagen} alt={p.nombre} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-gray-600">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <circle cx="12" cy="12" r="7" />
                      <circle cx="12" cy="12" r="3.5" />
                    </svg>
                    <span className="sr-only">Sin foto</span>
                  </div>
                )}
                {p.etiqueta && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#C1440E] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {p.etiqueta}
                  </span>
                )}
                <button
                  onClick={() => alternarDisponibilidad(p.id)}
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition ${
                    p.disponible !== false
                      ? "bg-green-500/90 text-white hover:bg-green-500"
                      : "bg-gray-600/90 text-white hover:bg-gray-500"
                  }`}
                >
                  {p.disponible !== false ? "● Visible" : "○ Oculto"}
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{p.nombre}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-widest text-[#C1440E]">
                      {p.categoria}
                    </p>
                  </div>
                  <p className="text-base font-bold text-[#F5B784]">S/ {p.precio}</p>
                </div>
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">{p.descripcion}</p>

                <div className="mt-5 flex gap-2 border-t border-white/5 pt-4">
                  <button
                    onClick={() => abrirEditar(p)}
                    className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:border-[#C1440E] hover:text-white"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setConfirmar(p)}
                    className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 transition hover:border-red-500 hover:bg-red-500/10"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Agregar/Editar */}
      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur">
          <div className="my-8 w-full max-w-xl rounded-2xl border border-white/10 bg-[#151519] p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{form.id ? "Editar plato" : "Nuevo plato"}</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Los cambios se guardan automáticamente.
                </p>
              </div>
              <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white">
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {/* NUEVO: ImageUploader con tabs */}
              <ImageUploader
                valor={form.imagen}
                onChange={(nueva) => setForm({ ...form, imagen: nueva })}
              />

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Nombre del plato
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej. Lomo saltado"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#C1440E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Categoría
                  </label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#C1440E]"
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c} className="bg-[#151519]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Precio (S/)
                  </label>
                  <input
                    type="number"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
                    min={0}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#C1440E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Etiqueta (opcional)
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[undefined, "Popular", "Nuevo", "Chef"].map((tag) => (
                    <button
                      key={tag ?? "none"}
                      type="button"
                      onClick={() => setForm({ ...form, etiqueta: tag as EtiquetaPlato })}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        form.etiqueta === tag
                          ? "bg-[#C1440E] text-white"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {tag ?? "Sin etiqueta"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Descripción
                </label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  rows={3}
                  placeholder="Ingredientes, preparación…"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#C1440E]"
                />
              </div>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.disponible !== false}
                  onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
                  className="h-4 w-4 accent-[#C1440E]"
                />
                Mostrar este plato en el menú público
              </label>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setModal(false)}
                className="rounded-full px-5 py-2.5 text-sm text-gray-400 transition hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                className="rounded-full bg-[#C1440E] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9A3410]"
              >
                {form.id ? "Guardar cambios" : "Agregar plato"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmar eliminación */}
      {confirmar && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#151519] p-7">
            <h3 className="text-lg font-bold">¿Eliminar «{confirmar.nombre}»?</h3>
            <p className="mt-2 text-sm text-gray-400">Esta acción no se puede deshacer.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmar(null)}
                className="rounded-full px-5 py-2.5 text-sm text-gray-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  eliminarPlato(confirmar.id);
                  setConfirmar(null);
                }}
                className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
