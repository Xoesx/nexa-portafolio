/** Idiomas del sitio de NEXA. Los demos están solo en español: se hicieron para negocios del Perú. */
export type Idioma = "es" | "en";

export const IDIOMAS: Idioma[] = ["es", "en"];

/** Formato de fechas y números de cada idioma. */
export const LOCALE: Record<Idioma, string> = { es: "es-PE", en: "en-US" };

/** Rutas equivalentes en cada idioma, para enlaces, la canónica y hreflang. */
export const RUTA = {
  inicio: { es: "/", en: "/en" },
  caso: (slug: string) => ({ es: `/proyectos/${slug}`, en: `/en/projects/${slug}` }),
} as const;

/** Anclas de las secciones de la home en cada idioma. */
export const ANCLA = {
  es: { proyectos: "proyectos", experiencia: "experiencia", precios: "precios", faq: "faq", contacto: "contacto" },
  en: { proyectos: "projects", experiencia: "experience", precios: "pricing", faq: "faq", contacto: "contact" },
} as const satisfies Record<Idioma, Record<string, string>>;

/** Prefijo de los enlaces a secciones: "#proyectos" dentro de la home, "/#proyectos" o "/en#projects" desde otra página. */
export const baseInicio = (idioma: Idioma, enInicio: boolean) => (enInicio ? "" : RUTA.inicio[idioma]);

/** Alternativas de idioma para la metadata de una página. */
export function alternas(rutas: Record<Idioma, string>, idioma: Idioma) {
  return {
    canonical: rutas[idioma],
    languages: { es: rutas.es, en: rutas.en, "x-default": rutas.es },
  };
}
