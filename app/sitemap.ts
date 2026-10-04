import type { MetadataRoute } from "next";
import { SITIO } from "./_data/sitio";
import { PROYECTOS } from "./_data/contenido";
import { PROPIEDADES } from "./demos/inmobiliaria/data";
import { ARTICULOS } from "./demos/restaurante/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITIO.url;
  const ahora = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: base, lastModified: ahora, changeFrequency: "weekly", priority: 1.0 },
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

  const casos: MetadataRoute.Sitemap = PROYECTOS.map((p) => ({
    url: `${base}/proyectos/${p.slug}`,
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const propiedades: MetadataRoute.Sitemap = PROPIEDADES.map((p) => ({
    url: `${base}/demos/inmobiliaria/propiedades/${p.id}`,
    lastModified: ahora,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...estaticas, ...casos, ...propiedades, ...articulos];
}
