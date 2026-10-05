# NEXA — Soluciones Digitales

Sitio y portafolio de NEXA, un estudio de desarrollo web en Pucallpa (Perú). Hacemos páginas web, agendas de citas, catálogos con buscador y sistemas a medida para negocios.

**En vivo:** https://nexa-portafolio.vercel.app

## Proyectos incluidos

| Demo | Ruta | Qué muestra |
|------|------|-------------|
| Clínica Dental Alba | [`/demos/dental`](https://nexa-portafolio.vercel.app/demos/dental) | Clínica dental humanizada: “¿Qué te está pasando?” lleva del síntoma a la cita correcta, historia de la doctora, reseñas y agenda en 4 pasos con horarios libres según la duración. La cita se descarga como archivo `.ics`. |
| Raíces Inmobiliaria | [`/demos/inmobiliaria`](https://nexa-portafolio.vercel.app/demos/inmobiliaria) | Portal de terrenos, casas, departamentos y locales: mapa interactivo propio (OpenStreetMap, sin librerías), filtros con precio en soles o dólares guardados en la URL, favoritos con comparativo por m², fichas con asesor, visita agendada y calculadora hipotecaria. |
| Colegio Horizonte | [`/demos/colegio`](https://nexa-portafolio.vercel.app/demos/colegio) | Colegio con mensaje de la directora, “Un día en Horizonte”, testimonios de familias, vida escolar y noticias, más preinscripción en 3 pasos que calcula el grado según la edad al 31 de marzo. |
| Sabor Criollo | [`/demos/restaurante`](https://nexa-portafolio.vercel.app/demos/restaurante) | Restaurante criollo y amazónico con reserva rápida desde la portada (horarios disponibles por día), eventos, historia de la familia, reseñas, reservas validadas con Zod en el servidor y panel de administración. |

Cada demo tiene su caso de estudio en `/proyectos/<slug>` (reto, recorrido por pantallas, métricas de Lighthouse y detalles técnicos).

Los demos usan datos de ejemplo. Los formularios de la clínica, la inmobiliaria y el colegio se validan pero no envían nada. En Sabor Criollo, los cambios del panel se guardan en el `localStorage` del navegador y las rutas de API trabajan en memoria; `app/demos/restaurante/db/schema.sql` es el diseño de la base de datos PostgreSQL, que aún no está conectada.

## Stack

Esto es lo que usa el repositorio, según `package.json`:

- Next.js 16 (App Router) y React 19
- TypeScript
- Tailwind CSS 4
- Zod 4 para validar formularios (en los demos se carga bajo demanda) y rutas de API
- Despliegue en Vercel

## Estructura

```
app/
├── layout.tsx              # Layout raíz: metadata y SEO
├── (sitio)/                # Páginas de NEXA (con las fuentes de la marca)
│   ├── page.tsx            # Home: solo compone las secciones
│   └── proyectos/[slug]/   # Casos de estudio, generados en build
├── globals.css             # Tokens de marca (colores, tipografía) y animaciones
├── _components/            # Secciones de la home (Header, Hero, Proyectos, Precios…)
├── _data/                  # Textos, proyectos, métricas de Lighthouse y datos del sitio
├── icon.svg, apple-icon.png, opengraph-image.png
├── robots.ts, sitemap.ts
└── demos/
    ├── dental/             # Clínica Dental Alba
    ├── inmobiliaria/       # Raíces Inmobiliaria
    ├── colegio/            # Colegio Horizonte
    └── restaurante/        # Sabor Criollo
proxy.ts                    # Límite de solicitudes para las rutas de API de los demos
public/proyectos/           # Capturas de los demos (WebP) para la home y los casos de estudio
```

## Marca

| Token | Color | Uso |
|-------|-------|-----|
| `tinta` | `#0B1F3A` | Texto principal |
| `marino` | `#0A1A33` | Secciones oscuras y footer |
| `papel` | `#FFFFFF` | Fondo |
| `niebla` | `#F2F5FA` | Fondo alterno |
| `azul` | `#2457F5` | Acciones principales y acentos |
| `cielo` | `#9DBBFF` | Acento sobre fondos oscuros |

Tipografías: Schibsted Grotesk para títulos e Instrument Sans para el texto. Cada demo tiene su propia identidad (colores y fuentes) para mostrar rango.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

Si cambias el contenido de la home o de los casos de estudio, edita `app/_data/contenido.ts`. Los puntajes de Lighthouse están en `app/_data/metricas.ts` y solo se muestran los que fueron medidos de verdad sobre el sitio publicado (PageSpeed Insights, modo celular). Para cambiar el dominio, el número de WhatsApp o el enlace de GitHub, edita `app/_data/sitio.ts`.

## Contacto

WhatsApp: [918 641 720](https://wa.me/51918641720)
