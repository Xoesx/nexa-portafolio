"use client";

import { useEffect, useRef, useState } from "react";
import { procesarImagen, pesoLegible } from "../lib/utils/imagen";

type Props = {
  valor: string;
  onChange: (nuevaImagen: string) => void;
};

export function ImageUploader({ valor, onChange }: Props) {
  // Garantiza SIEMPRE string. Ni undefined ni null.
  const valorSeguro = String(valor ?? "");
  const esBase64 = valorSeguro.startsWith("data:");
  const urlParaInput = esBase64 ? "" : valorSeguro;

  const [modo, setModo] = useState<"subir" | "url">("subir");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [peso, setPeso] = useState<number | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Sincronizar el modo con el valor entrante (útil al editar un plato ya guardado)
  useEffect(() => {
    if (esBase64) setModo("subir");
  }, [esBase64]);

  const handleArchivo = async (file: File) => {
    setError(null);
    setCargando(true);
    try {
      const resultado = await procesarImagen(file);
      if (!resultado.ok) {
        setError(resultado.error);
        return;
      }
      onChange(resultado.base64);
      setPeso(resultado.pesoFinal);
    } catch {
      setError("No se pudo procesar la imagen");
    } finally {
      setCargando(false);
    }
  };

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleArchivo(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleArchivo(file);
  };

  const handleInputUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitizar entrada: solo aceptar caracteres válidos de URL
    const limpio = e.target.value.replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 500);
    onChange(limpio);
    setPeso(null);
  };

  const limpiar = () => {
    onChange("");
    setPeso(null);
    setError(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        Imagen del plato
      </label>

      {/* Tabs */}
      <div className="mt-2 flex gap-1 rounded-full bg-white/5 p-1">
        <button
          type="button"
          onClick={() => { setModo("subir"); setError(null); }}
          className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition ${
            modo === "subir" ? "bg-[#C1440E] text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          📁 Subir archivo
        </button>
        <button
          type="button"
          onClick={() => { setModo("url"); setError(null); }}
          className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition ${
            modo === "url" ? "bg-[#C1440E] text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          🔗 Pegar URL
        </button>
      </div>

      {/* SECCIÓN SUBIR ARCHIVO — siempre montada, solo oculta */}
      <div className={`mt-3 ${modo === "subir" ? "block" : "hidden"}`}>
        <input
          ref={inputFileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputFile}
          className="hidden"
        />
        <div
          onClick={() => inputFileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="grid cursor-pointer place-items-center rounded-lg border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-8 text-center transition hover:border-[#C1440E]/50 hover:bg-[#C1440E]/5"
        >
          {cargando ? (
            <>
              <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#C1440E]" />
              <p className="text-xs text-gray-400">Procesando imagen…</p>
            </>
          ) : (
            <>
              <div className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-lg">
                📷
              </div>
              <p className="text-sm font-medium text-white">
                Haz clic o arrastra una imagen aquí
              </p>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG o WebP · máx 3 MB · se comprime automáticamente
              </p>
            </>
          )}
        </div>
      </div>

      {/* SECCIÓN URL — siempre montada, solo oculta */}
      <div className={`mt-3 ${modo === "url" ? "block" : "hidden"}`}>
        <input
          type="url"
          value={urlParaInput}
          onChange={handleInputUrl}
          placeholder="https://images.unsplash.com/..."
          maxLength={500}
          spellCheck={false}
          autoComplete="off"
          inputMode="url"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#C1440E]"
        />
      </div>

      {/* Error */}
      {error && <p className="mt-2 text-xs text-red-400">⚠ {error}</p>}

      {/* Preview */}
      {valorSeguro && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Vista previa {peso !== null && `· ${pesoLegible(peso)}`}
            </p>
            <button
              type="button"
              onClick={limpiar}
              className="text-xs text-red-400 transition hover:text-red-300"
            >
              Quitar imagen
            </button>
          </div>
          <div className="mt-2 overflow-hidden rounded-lg border border-white/10 bg-black/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={valorSeguro}
              alt="Vista previa"
              className="h-40 w-full object-cover"
              onError={() => setError("La URL no apunta a una imagen válida")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
