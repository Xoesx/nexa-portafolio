import { useId } from "react";

type Props = {
  etiqueta: string;
  nombre: string;
  error?: string;
  children?: (props: { id: string; name: string; "aria-invalid"?: true; "aria-describedby"?: string; className: string }) => React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

export const estiloCampo =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-[#e7e1d8] bg-white px-3.5 text-[15px] text-[#1c1917] outline-none transition-colors placeholder:text-[#a8a29e] focus:border-[#b4532a] focus:ring-2 focus:ring-[#b4532a]/20 aria-[invalid=true]:border-[#b91c1c]";

/** Campo con etiqueta y mensaje de error ligado por aria-describedby. */
export function Campo({ etiqueta, nombre, error, children, ...resto }: Props) {
  const id = useId();
  const props = {
    id,
    name: nombre,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: estiloCampo,
  };
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-[#44403c]">
        {etiqueta}
      </label>
      {children ? children(props) : <input {...props} {...resto} />}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b91c1c]">
          {error}
        </p>
      )}
    </div>
  );
}
