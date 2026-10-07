"use client";

type Props = { categorias: string[]; activa: string; onChange: (cat: string) => void };

export function MenuFilter({ categorias, activa, onChange }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activa === cat
              ? "bg-[#F5B784] text-[#2A1F14]"
              : "border border-white/20 text-white/70 hover:border-white/50 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
