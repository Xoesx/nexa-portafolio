import type { MetadataRoute } from "next";
import { ACTIVAS } from "./(es)/demos/inmobiliaria/data";
import { ARTICULOS } from "./(es)/demos/restaurante/data/blog";
import { SLUGS } from "./_data/contenido";
import { RUTA } from "./_data/idioma";
import { SITIO } from "./_data/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITIO.url;
  const ahora = new Date();
  const url = (ruta: string) => (ruta === "/" ? base : `${base}${ruta}`);

  // Páginas de NEXA en los dos idiomas: cada una declara su versión en el otro idioma.
  const bilingue = (rutas: { es: string; en: string }, prioridad: number): MetadataRoute.Sitemap =>
    (["es", "en"] as const).map((idioma) => ({
      url: url(rutas[idioma]),
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: prioridad,
      alternates: { languages: { es: url(rutas.es), en: url(rutas.en) } },
    }));

  const nexa: MetadataRoute.Sitemap = [
    ...bilingue(RUTA.inicio, 1),
    ...SLUGS.flatMap((slug) => bilingue(RUTA.caso(slug), 0.9)),
  ];

  // Demos (solo en español).
  const demos: MetadataRoute.Sitemap = [
    { url: `${base}/demos/dental`, lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/demos/dental/agendar`, lastModified: ahora, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/demos/inmobiliaria`, lastModified: ahora, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/demos/inmobiliaria/propiedades`, lastModified: ahora, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/demos/colegio`, lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/demos/colegio/admision`, lastModified: ahora, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/demos/restaurante`, lastModified: ahora, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/demos/restaurante/menu`, lastModified: ahora, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/demos/restaurante/nosotros`, lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demos/restaurante/blog`, lastModified: ahora, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/demos/restaurante/reservar`, lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demos/restaurante/contacto`, lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demos/restaurante/legal/terminos`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/demos/restaurante/legal/privacidad`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/demos/restaurante/legal/cookies`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articulos: MetadataRoute.Sitemap = ARTICULOS.map((a) => ({
    url: `${base}/demos/restaurante/blog/${a.slug}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const propiedades: MetadataRoute.Sitemap = ACTIVAS.map((p) => ({
    url: `${base}/demos/inmobiliaria/propiedades/${p.id}`,
    lastModified: ahora,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...nexa, ...demos, ...propiedades, ...articulos];
}
